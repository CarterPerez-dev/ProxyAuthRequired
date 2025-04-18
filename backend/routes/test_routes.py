from flask import Blueprint, request, jsonify, session, g  
from bson.objectid import ObjectId
from datetime import datetime, timedelta
import pytz
import time
from mongodb.database import db

# Mongo collections
from mongodb.database import (
    mainusers_collection,
    shop_collection,
    achievements_collection,
    tests_collection,
    testAttempts_collection,
    correctAnswers_collection,
    dailyQuestions_collection,
    dailyAnswers_collection
)

# Models
from models.test import (
    get_user_by_identifier,
    create_user,
    get_user_by_id,
    update_user_coins,
    update_user_xp,
    apply_daily_bonus,
    get_shop_items,
    purchase_item,
    get_achievements,
    get_test_by_id_and_category,
    validate_username,
    validate_email,
    validate_password,
    update_user_fields,
    get_user_by_id,
    hash_password,  
    check_password,
    award_correct_answers_in_bulk
)

api_bp = Blueprint('test', __name__)
public_leaderboard_bp = Blueprint('public_leaderboard', __name__)
#############################################
# Leaderboard Caching Setup (15-second TTL)
#############################################
leaderboard_cache = []
leaderboard_cache_timestamp = 0
LEADERBOARD_CACHE_DURATION_MS = 15000  # 15 seconds

def serialize_user(user):
    """Helper to convert _id, etc. to strings if needed."""
    if not user:
        return None
    user['_id'] = str(user['_id'])
    if 'currentAvatar' in user and user['currentAvatar']:
        user['currentAvatar'] = str(user['currentAvatar'])
    if 'purchasedItems' in user and isinstance(user['purchasedItems'], list):
        user['purchasedItems'] = [str(item) for item in user['purchasedItems']]
    return user

def serialize_datetime(dt):
    """Helper: convert a datetime to an ISO string (or return None)."""
    return dt.isoformat() if dt else None



def check_and_unlock_achievements(user_id):
    start_db = time.time()
    user = get_user_by_id(user_id)
    duration = time.time() - start_db
    if not hasattr(g, 'db_time_accumulator'):
        g.db_time_accumulator = 0.0
    g.db_time_accumulator += duration

    if not user:
        return []

    counters = user.get("achievement_counters", {})
    unlocked = set(user.get("achievements", []))
    newly_unlocked = []

    start_db = time.time()
    all_ach = list(achievements_collection.find({}))  # or get_achievements()
    duration = time.time() - start_db
    if not hasattr(g, 'db_time_accumulator'):
        g.db_time_accumulator = 0.0
    g.db_time_accumulator += duration

    for ach in all_ach:
        aid = ach["achievementId"]
        # If already unlocked, skip
        if aid in unlocked:
            continue

        crit = ach.get("criteria", {})

        # 1) testCount => total_tests_completed
        test_count_req = crit.get("testCount")
        if test_count_req is not None:
            if counters.get("total_tests_completed", 0) >= test_count_req:
                unlocked.add(aid)
                newly_unlocked.append(aid)
                continue

        # 2) minScore => e.g. "accuracy_king" with 90
        min_score_req = crit.get("minScore")
        if min_score_req is not None:
            if counters.get("highest_score_ever", 0) >= min_score_req:
                unlocked.add(aid)
                newly_unlocked.append(aid)
                continue

        # 3) perfectTests => e.g. "perfectionist_1", "double_trouble_2", etc.
        perfect_req = crit.get("perfectTests")
        if perfect_req is not None:
            if counters.get("perfect_tests_count", 0) >= perfect_req:
                unlocked.add(aid)
                newly_unlocked.append(aid)
                continue

        # 4) coins => coin achievements
        coin_req = crit.get("coins")
        if coin_req is not None:
            if user.get("coins", 0) >= coin_req:
                unlocked.add(aid)
                newly_unlocked.append(aid)
                continue

        # 5) level => e.g. "level_up_5", "mid_tier_grinder_25", etc.
        level_req = crit.get("level")
        if level_req is not None:
            if user.get("level", 1) >= level_req:
                unlocked.add(aid)
                newly_unlocked.append(aid)
                continue

        # 6) totalQuestions => e.g. "answer_machine_1000"
        total_q_req = crit.get("totalQuestions")
        if total_q_req is not None:
            if counters.get("total_questions_answered", 0) >= total_q_req:
                unlocked.add(aid)
                newly_unlocked.append(aid)
                continue

        # 7) perfectTestsInCategory => "category_perfectionist"
        perfect_in_cat_req = crit.get("perfectTestsInCategory")
        if perfect_in_cat_req is not None:
            perfect_by_cat = counters.get("perfect_tests_by_category", {})
            for cat_name, cat_count in perfect_by_cat.items():
                if cat_count >= perfect_in_cat_req:
                    unlocked.add(aid)
                    newly_unlocked.append(aid)
                    break
            continue

        # 8) redemption_arc => minScoreBefore + minScoreAfter
        min_before = crit.get("minScoreBefore")
        min_after = crit.get("minScoreAfter")
        if min_before is not None and min_after is not None:
            if (counters.get("lowest_score_ever", 100) <= min_before and
                counters.get("highest_score_ever", 0) >= min_after):
                unlocked.add(aid)
                newly_unlocked.append(aid)
                continue

        # 9) testsCompletedInCategory => "subject_finisher"
        cat_required = crit.get("testsCompletedInCategory")
        if cat_required is not None:
            tcbc = counters.get("tests_completed_by_category", {})
            for cat_name, test_set in tcbc.items():
                if len(test_set) >= cat_required:
                    unlocked.add(aid)
                    newly_unlocked.append(aid)
                    break
            continue

        # 10) allTestsCompleted => "test_finisher"
        if crit.get("allTestsCompleted"):
            user_completed_tests = counters.get("tests_completed_set", set())
            TOTAL_TESTS = 130
            if len(user_completed_tests) >= TOTAL_TESTS:
                unlocked.add(aid)
                newly_unlocked.append(aid)
                continue

    if newly_unlocked:
        start_db = time.time()
        mainusers_collection.update_one(
            {"_id": user["_id"]},
            {"$set": {"achievements": list(unlocked)}}
        )
        duration = time.time() - start_db
        if not hasattr(g, 'db_time_accumulator'):
            g.db_time_accumulator = 0.0
        g.db_time_accumulator += duration

    return newly_unlocked


# -------------------------------------------------------------------
# USER ROUTES
# -------------------------------------------------------------------
@api_bp.route('/user/<user_id>', methods=['GET'])
def get_user(user_id):
    start_db = time.time()
    user = get_user_by_id(user_id)
    duration = time.time() - start_db
    if not hasattr(g, 'db_time_accumulator'):
        g.db_time_accumulator = 0.0
    g.db_time_accumulator += duration

    if not user:
        return jsonify({"error": "User not found"}), 404
    user = serialize_user(user)
    if "password" not in user:
        user["password"] = user.get("password")
        
    # Make sure freemium fields are included
    user["practiceQuestionsRemaining"] = user.get("practiceQuestionsRemaining", 0)
    user["subscriptionType"] = user.get("subscriptionType", "free")
    user["freeUserCreatedAt"] = user.get("freeUserCreatedAt")
    
    return jsonify(user), 200

@api_bp.route('/user', methods=['POST'])
def register_user():
    """
    Registration: /api/user
    Expects {username, email, password, confirmPassword} in JSON
    Calls create_user, returns {message, user_id} or error.
    """
    user_data = request.json or {}
    try:
        user_data.setdefault("achievement_counters", {
            "total_tests_completed": 0,
            "perfect_tests_count": 0,
            "perfect_tests_by_category": {},
            "highest_score_ever": 0.0,
            "lowest_score_ever": 100.0,
            "total_questions_answered": 0,
        })

        start_db = time.time()
        user_id = create_user(user_data)
        duration = time.time() - start_db
        if not hasattr(g, 'db_time_accumulator'):
            g.db_time_accumulator = 0.0
        g.db_time_accumulator += duration

        return jsonify({"message": "User created", "user_id": str(user_id)}), 201
    except ValueError as ve:
        return jsonify({"error": str(ve)}), 400
    except Exception as e:
        return jsonify({"error": "Internal server error", "details": str(e)}), 500

@api_bp.route('/login', methods=['POST'])
def login():
    data = request.json
    if not data:
        start_db = time.time()
        db.auditLogs.insert_one({
            "timestamp": datetime.utcnow(),
            "userId": None,
            "ip": request.remote_addr or "unknown",
            "success": False,
            "reason": "No JSON data provided"
        })
        duration = time.time() - start_db
        if not hasattr(g, 'db_time_accumulator'):
            g.db_time_accumulator = 0.0
        g.db_time_accumulator += duration

        return jsonify({"error": "No JSON data provided"}), 400

    identifier = data.get("usernameOrEmail")
    password = data.get("password")
    if not identifier or not password:
        start_db = time.time()
        db.auditLogs.insert_one({
            "timestamp": datetime.utcnow(),
            "userId": None,
            "ip": request.remote_addr or "unknown",
            "success": False,
            "reason": "Missing username/password"
        })
        duration = time.time() - start_db
        if not hasattr(g, 'db_time_accumulator'):
            g.db_time_accumulator = 0.0
        g.db_time_accumulator += duration

        return jsonify({"error": "Username (or Email) and password are required"}), 400

    start_db = time.time()
    user = get_user_by_identifier(identifier)
    duration = time.time() - start_db
    if not hasattr(g, 'db_time_accumulator'):
        g.db_time_accumulator = 0.0
    g.db_time_accumulator += duration

    # Using check_password instead of direct comparison
    if not user or not check_password(password, user.get("password", "")):
        start_db = time.time()
        db.auditLogs.insert_one({
            "timestamp": datetime.utcnow(),
            "userId": None,
            "ip": request.remote_addr or "unknown",
            "success": False,
            "reason": "Invalid username or password"
        })
        duration = time.time() - start_db
        if not hasattr(g, 'db_time_accumulator'):
            g.db_time_accumulator = 0.0
        g.db_time_accumulator += duration

        return jsonify({"error": "Invalid username or password"}), 401

    session['userId'] = str(user["_id"])

    start_db = time.time()
    db.auditLogs.insert_one({
        "timestamp": datetime.utcnow(),
        "userId": user["_id"],
        "ip": request.remote_addr or "unknown",
        "success": True
    })
    duration = time.time() - start_db
    if not hasattr(g, 'db_time_accumulator'):
        g.db_time_accumulator = 0.0
    g.db_time_accumulator += duration

    user = serialize_user(user)

    # Important security best practice: don't return password in response
    return jsonify({
        "user_id": user["_id"],
        "username": user["username"],
        "email": user.get("email", ""),
        "coins": user.get("coins", 0),
        "xp": user.get("xp", 0),
        "level": user.get("level", 1),
        "achievements": user.get("achievements", []),
        "xpBoost": user.get("xpBoost", 1.0),
        "currentAvatar": user.get("currentAvatar"),
        "nameColor": user.get("nameColor"),
        "purchasedItems": user.get("purchasedItems", []),
        "subscriptionActive": user.get("subscriptionActive", False),
        "oauth_provider": user.get("oauth_provider", None)
    }), 200
    
    
@api_bp.route('/user/<user_id>/add-xp', methods=['POST'])
def add_xp_route(user_id):
    data = request.json or {}
    xp_to_add = data.get("xp", 0)

    start_db = time.time()
    updated = update_user_xp(user_id, xp_to_add)
    duration = time.time() - start_db
    if not hasattr(g, 'db_time_accumulator'):
        g.db_time_accumulator = 0.0
    g.db_time_accumulator += duration

    if not updated:
        return jsonify({"error": "User not found"}), 404

    start_db = time.time()
    new_achievements = check_and_unlock_achievements(user_id)
    duration = time.time() - start_db
    if not hasattr(g, 'db_time_accumulator'):
        g.db_time_accumulator = 0.0
    g.db_time_accumulator += duration

    updated["newAchievements"] = new_achievements
    return jsonify(updated), 200

@api_bp.route('/user/<user_id>/add-coins', methods=['POST'])
def add_coins_route(user_id):
    data = request.json or {}
    coins_to_add = data.get("coins", 0)

    start_db = time.time()
    update_user_coins(user_id, coins_to_add)
    duration = time.time() - start_db
    if not hasattr(g, 'db_time_accumulator'):
        g.db_time_accumulator = 0.0
    g.db_time_accumulator += duration

    start_db = time.time()
    newly_unlocked = check_and_unlock_achievements(user_id)
    duration = time.time() - start_db
    if not hasattr(g, 'db_time_accumulator'):
        g.db_time_accumulator = 0.0
    g.db_time_accumulator += duration

    return jsonify({
        "message": "Coins updated",
        "newlyUnlocked": newly_unlocked
    }), 200

# -------------------------------------------------------------------
# SHOP ROUTES
# -------------------------------------------------------------------
@api_bp.route('/shop', methods=['GET'])
def fetch_shop():
    start_db = time.time()
    items = get_shop_items()
    duration = time.time() - start_db
    if not hasattr(g, 'db_time_accumulator'):
        g.db_time_accumulator = 0.0
    g.db_time_accumulator += duration

    for item in items:
        item["_id"] = str(item["_id"])
    return jsonify(items), 200

@api_bp.route('/shop/purchase/<item_id>', methods=['POST'])
def purchase_item_route(item_id):
    data = request.json or {}
    user_id = data.get("userId")
    if not user_id:
        return jsonify({"success": False, "message": "userId is required"}), 400

    start_db = time.time()
    result = purchase_item(user_id, item_id)
    duration = time.time() - start_db
    if not hasattr(g, 'db_time_accumulator'):
        g.db_time_accumulator = 0.0
    g.db_time_accumulator += duration

    if result["success"]:
        start_db = time.time()
        newly_unlocked = check_and_unlock_achievements(user_id)
        duration = time.time() - start_db
        if not hasattr(g, 'db_time_accumulator'):
            g.db_time_accumulator = 0.0
        g.db_time_accumulator += duration

        result["newly_unlocked"] = newly_unlocked
        return jsonify(result), 200
    else:
        return jsonify(result), 400

@api_bp.route('/shop/equip', methods=['POST'])
def equip_item_route():
    data = request.json or {}
    user_id = data.get("userId")
    item_id = data.get("itemId")

    if not user_id or not item_id:
        return jsonify({"success": False, "message": "userId and itemId are required"}), 400

    start_db = time.time()
    user = get_user_by_id(user_id)
    duration = time.time() - start_db
    if not hasattr(g, 'db_time_accumulator'):
        g.db_time_accumulator = 0.0
    g.db_time_accumulator += duration

    if not user:
        return jsonify({"success": False, "message": "User not found"}), 404

    try:
        oid = ObjectId(item_id)
    except Exception:
        return jsonify({"success": False, "message": "Invalid item ID"}), 400

    start_db = time.time()
    item_doc = shop_collection.find_one({"_id": oid})
    duration = time.time() - start_db
    if not hasattr(g, 'db_time_accumulator'):
        g.db_time_accumulator = 0.0
    g.db_time_accumulator += duration

    if not item_doc:
        return jsonify({"success": False, "message": "Item not found in shop"}), 404

    if oid not in user.get("purchasedItems", []):
        if user.get("level", 1) < item_doc.get("unlockLevel", 1):
            return jsonify({"success": False, "message": "Item not unlocked"}), 400

    start_db = time.time()
    mainusers_collection.update_one(
        {"_id": user["_id"]},
        {"$set": {"currentAvatar": oid}}
    )
    duration = time.time() - start_db
    if not hasattr(g, 'db_time_accumulator'):
        g.db_time_accumulator = 0.0
    g.db_time_accumulator += duration

    return jsonify({"success": True, "message": "Avatar equipped"}), 200

# -------------------------------------------------------------------
# TESTS ROUTES
# -------------------------------------------------------------------
@api_bp.route('/tests/<test_id>', methods=['GET'])
def fetch_test_by_id_route(test_id):
    start_db = time.time()
    test_doc = get_test_by_id_and_category(test_id, None)
    duration = time.time() - start_db
    if not hasattr(g, 'db_time_accumulator'):
        g.db_time_accumulator = 0.0
    g.db_time_accumulator += duration

    if not test_doc:
        return jsonify({"error": "Test not found"}), 404
    test_doc["_id"] = str(test_doc["_id"])
    return jsonify(test_doc), 200

@api_bp.route('/tests/<category>/<test_id>', methods=['GET'])
def fetch_test_by_category_and_id(category, test_id):
    try:
        test_id_int = int(test_id)
    except Exception:
        return jsonify({"error": "Invalid test ID"}), 400

    start_db = time.time()
    test_doc = tests_collection.find_one({
        "testId": test_id_int,
        "category": category
    })
    duration = time.time() - start_db
    if not hasattr(g, 'db_time_accumulator'):
        g.db_time_accumulator = 0.0
    g.db_time_accumulator += duration

    if not test_doc:
        return jsonify({"error": "Test not found"}), 404

    test_doc["_id"] = str(test_doc["_id"])
    return jsonify(test_doc), 200

# -------------------------------------------------------------------
# PROGRESS / ATTEMPTS ROUTES
# -------------------------------------------------------------------
@api_bp.route('/attempts/<user_id>/<test_id>', methods=['GET'])
def get_test_attempt(user_id, test_id):
    try:
        user_oid = ObjectId(user_id)
        try:
            test_id_int = int(test_id)
        except:
            test_id_int = None
    except:
        return jsonify({"error": "Invalid user ID or test ID"}), 400

    # IMPORTANT FIX: Handle status parameter to specifically query finished or unfinished
    status = request.args.get("status")
    
    # Build the query based on user ID and test ID
    base_query = {"userId": user_oid}
    if test_id_int is not None:
        base_query["$or"] = [{"testId": test_id_int}, {"testId": test_id}]
    else:
        base_query["testId"] = test_id

    # Add finished status filter if specified
    if status == "finished":
        base_query["finished"] = True
    elif status == "unfinished":
        base_query["finished"] = False
    else:
        # Default behavior (no status parameter): look for unfinished first, then finished
        try:
            unfinished_attempt = testAttempts_collection.find_one({**base_query, "finished": False})
            if unfinished_attempt:
                attempt = unfinished_attempt
            else:
                # If no unfinished attempt, look for most recent finished attempt
                attempt = testAttempts_collection.find_one(
                    {**base_query, "finished": True}, 
                    sort=[("finishedAt", -1)]
                )
            
            # Continue with existing code for handling attempt
            if not attempt:
                return jsonify({"attempt": None}), 200

            # IMPORTANT FIX: Ensure none of the arrays are null/None
            if attempt.get("answers") is None:
                attempt["answers"] = []
            if attempt.get("shuffleOrder") is None:
                attempt["shuffleOrder"] = []
            if attempt.get("answerOrder") is None:
                attempt["answerOrder"] = []

            attempt["_id"] = str(attempt["_id"])
            attempt["userId"] = str(attempt["userId"])
            return jsonify({"attempt": attempt}), 200
        except Exception as e:
            return jsonify({"error": f"Database error: {str(e)}"}), 500

    # If status was specified, execute the query
    start_db = time.time()
    attempt = testAttempts_collection.find_one(base_query)
    duration = time.time() - start_db
    if not hasattr(g, 'db_time_accumulator'):
        g.db_time_accumulator = 0.0
    g.db_time_accumulator += duration

    if not attempt:
        return jsonify({"attempt": None}), 200

    # IMPORTANT FIX: Ensure none of the arrays are null/None
    if attempt.get("answers") is None:
        attempt["answers"] = []
    if attempt.get("shuffleOrder") is None:
        attempt["shuffleOrder"] = []
    if attempt.get("answerOrder") is None:
        attempt["answerOrder"] = []

    attempt["_id"] = str(attempt["_id"])
    attempt["userId"] = str(attempt["userId"])
    return jsonify({"attempt": attempt}), 200

@api_bp.route('/attempts/<user_id>/<test_id>', methods=['POST'])
def update_test_attempt(user_id, test_id):
    data = request.json or {}
    try:
        user_oid = ObjectId(user_id)
        try:
            test_id_int = int(test_id)
        except:
            test_id_int = test_id
    except:
        return jsonify({"error": "Invalid user ID or test ID"}), 400

    exam_mode_val = data.get("examMode", False)
    selected_length = data.get("selectedLength", data.get("totalQuestions", 0))

    # IMPORTANT FIX: First check if an attempt already exists
    existing_attempt = testAttempts_collection.find_one({
        "userId": user_oid,
        "finished": False,
        "$or": [{"testId": test_id_int}, {"testId": test_id}]
    })

    # If updating an existing attempt but examMode isn't provided,
    # preserve the existing examMode value
    if existing_attempt and "examMode" not in data:
        exam_mode_val = existing_attempt.get("examMode", False)

    filter_ = {
        "userId": user_oid,
        "$or": [{"testId": test_id_int}, {"testId": test_id}]
    }
    
    # IMPORTANT FIX: Include examTimerSeconds in the update
    update_doc = {
        "$set": {
            "userId": user_oid,
            "testId": test_id_int if isinstance(test_id_int, int) else test_id,
            "category": data.get("category", "global"),
            "answers": data.get("answers", []),
            "score": data.get("score", 0),
            "totalQuestions": data.get("totalQuestions", 0),
            "selectedLength": selected_length,
            "currentQuestionIndex": data.get("currentQuestionIndex", 0),
            "shuffleOrder": data.get("shuffleOrder", []),
            "answerOrder": data.get("answerOrder", []),
            "finished": data.get("finished", False),
            "examMode": exam_mode_val,
            "examTimerSeconds": data.get("examTimerSeconds", 0)
        }
    }
    
    if update_doc["$set"]["finished"] is True:
        update_doc["$set"]["finishedAt"] = datetime.utcnow()

    start_db = time.time()
    testAttempts_collection.update_one(filter_, update_doc, upsert=True)
    duration = time.time() - start_db
    if not hasattr(g, 'db_time_accumulator'):
        g.db_time_accumulator = 0.0
    g.db_time_accumulator += duration

    return jsonify({
        "message": "Progress updated (examMode=%s, selectedLength=%s)" % (exam_mode_val, selected_length)
    }), 200

@api_bp.route('/attempts/<user_id>/<test_id>/finish', methods=['POST'])
def finish_test_attempt(user_id, test_id):
    data = request.json or {}
    try:
        user_oid = ObjectId(user_id)
        try:
            test_id_int = int(test_id)
        except:
            test_id_int = test_id
    except:
        return jsonify({"error": "Invalid user ID or test ID"}), 400

    # IMPORTANT FIX: Use more specific query to ensure we're updating the correct test
    category = data.get("category", "global")
    filter_ = {
        "userId": user_oid,
        "finished": False,
    }
    
    # Add testId to the filter
    if test_id_int is not None:
        filter_["$or"] = [{"testId": test_id_int}, {"testId": test_id}]
    else:
        filter_["testId"] = test_id
        
    # Add category to the filter if provided
    if category:
        filter_["category"] = category

    update_doc = {
        "$set": {
            "finished": True,
            "finishedAt": datetime.utcnow(),
            "score": data.get("score", 0),
            "totalQuestions": data.get("totalQuestions", 0),
            "examTimerSeconds": data.get("examTimerSeconds", 0)  # Save timer on finish
        }
    }

    start_db = time.time()
    result = testAttempts_collection.update_one(filter_, update_doc)
    duration = time.time() - start_db
    if not hasattr(g, 'db_time_accumulator'):
        g.db_time_accumulator = 0.0
    g.db_time_accumulator += duration

    # Log information about whether the update actually happened
    if result.matched_count == 0:
        print(f"Warning: No attempt matched the finish criteria for user={user_id}, test={test_id}")
    
    start_db = time.time()
    # Use same filter but set finished=True to fetch the attempt we just updated
    filter_["finished"] = True
    attempt_doc = testAttempts_collection.find_one(filter_)
    duration = time.time() - start_db
    if not hasattr(g, 'db_time_accumulator'):
        g.db_time_accumulator = 0.0
    g.db_time_accumulator += duration

    if not attempt_doc:
        return jsonify({"error": "Attempt not found after finishing."}), 404

    exam_mode = attempt_doc.get("examMode", False)
    selected_length = attempt_doc.get("selectedLength", attempt_doc.get("totalQuestions", 0))
    score = attempt_doc.get("score", 0)
    total_questions = attempt_doc.get("totalQuestions", 0)
    category = attempt_doc.get("category", "global")

    if exam_mode:
        start_db = time.time()
        award_correct_answers_in_bulk(
            user_id=user_id,
            attempt_doc=attempt_doc,
            xp_per_correct=10,
            coins_per_correct=5
        )
        duration = time.time() - start_db
        if not hasattr(g, 'db_time_accumulator'):
            g.db_time_accumulator = 0.0
        g.db_time_accumulator += duration

    start_db = time.time()
    user = get_user_by_id(user_id)
    duration = time.time() - start_db
    if not hasattr(g, 'db_time_accumulator'):
        g.db_time_accumulator = 0.0
    g.db_time_accumulator += duration

    if not user:
        return jsonify({"error": "User not found"}), 404

    counters = user.get("achievement_counters", {})
    percentage = 0
    if total_questions > 0:
        percentage = (score / total_questions) * 100

    update_ops = {"$inc": {"achievement_counters.total_tests_completed": 1}}

    if score == total_questions and total_questions > 0 and selected_length == 100:
        update_ops["$inc"]["achievement_counters.perfect_tests_count"] = 1
        catKey = f"achievement_counters.perfect_tests_by_category.{category}"
        update_ops["$inc"][catKey] = 1

    if selected_length == 100:
        highest_so_far = counters.get("highest_score_ever", 0.0)
        lowest_so_far = counters.get("lowest_score_ever", 100.0)
        set_ops = {}
        if percentage > highest_so_far:
            set_ops["achievement_counters.highest_score_ever"] = percentage
        if percentage < lowest_so_far:
            set_ops["achievement_counters.lowest_score_ever"] = percentage
        if set_ops:
            update_ops.setdefault("$set", {}).update(set_ops)

    actual_answered_count = sum(1 for ans in attempt_doc.get("answers", []) 
                              if ans.get("userAnswerIndex") is not None)
    update_ops["$inc"]["achievement_counters.total_questions_answered"] = actual_answered_count

    start_db = time.time()
    mainusers_collection.update_one({"_id": user_oid}, update_ops)
    duration = time.time() - start_db
    if not hasattr(g, 'db_time_accumulator'):
        g.db_time_accumulator = 0.0
    g.db_time_accumulator += duration

    start_db = time.time()
    newly_unlocked = check_and_unlock_achievements(user_id)
    duration = time.time() - start_db
    if not hasattr(g, 'db_time_accumulator'):
        g.db_time_accumulator = 0.0
    g.db_time_accumulator += duration

    start_db = time.time()
    updated_user = get_user_by_id(user_id)
    duration = time.time() - start_db
    if not hasattr(g, 'db_time_accumulator'):
        g.db_time_accumulator = 0.0
    g.db_time_accumulator += duration

    return jsonify({
        "message": "Test attempt finished",
        "examMode": exam_mode,
        "selectedLength": selected_length,
        "newlyUnlocked": newly_unlocked,
        "newXP": updated_user.get("xp", 0),
        "newCoins": updated_user.get("coins", 0)
    }), 200

@api_bp.route('/attempts/<user_id>/list', methods=['GET'])
def list_test_attempts(user_id):
    try:
        user_oid = ObjectId(user_id)
    except:
        return jsonify({"error": "Invalid user ID"}), 400

    page = request.args.get("page", default=1, type=int)
    page_size = request.args.get("page_size", default=50, type=int)
    skip_count = (page - 1) * page_size

    start_db = time.time()
    cursor = testAttempts_collection.find(
        {"userId": user_oid}
    ).sort("finishedAt", -1).skip(skip_count).limit(page_size)
    duration = time.time() - start_db
    if not hasattr(g, 'db_time_accumulator'):
        g.db_time_accumulator = 0.0
    g.db_time_accumulator += duration

    attempts = []
    for doc in cursor:
        doc["_id"] = str(doc["_id"])
        doc["userId"] = str(doc["userId"])
        attempts.append(doc)

    return jsonify({
        "page": page,
        "page_size": page_size,
        "attempts": attempts
    }), 200

# -------------------------------------------------------------------
# FIRST-TIME-CORRECT ANSWERS
# -------------------------------------------------------------------
@api_bp.route('/user/<user_id>/submit-answer', methods=['POST'])
def submit_answer(user_id):
    data = request.json or {}
    test_id = str(data.get("testId"))
    question_id = data.get("questionId")
    selected_index = data.get("selectedIndex")
    correct_index = data.get("correctAnswerIndex")
    xp_per_correct = data.get("xpPerCorrect", 10)
    coins_per_correct = data.get("coinsPerCorrect", 5)

    start_db = time.time()
    user = get_user_by_id(user_id)
    duration = time.time() - start_db
    if not hasattr(g, 'db_time_accumulator'):
        g.db_time_accumulator = 0.0
    g.db_time_accumulator += duration

    if not user:
        return jsonify({"error": "User not found"}), 404
        
    # Check if free user has remaining questions
    if not user.get("subscriptionActive", False):
        remaining = user.get("practiceQuestionsRemaining", 0)
        if remaining <= 0:
            return jsonify({
                "error": "Practice question limit reached", 
                "status": "limit_reached",
                "tier": "free_limit",
                "practiceQuestionsRemaining": 0
            }), 403
            
        # Decrement question count for free users
        start_db = time.time()
        mainusers_collection.update_one(
            {"_id": user["_id"]},
            {"$inc": {"practiceQuestionsRemaining": -1}}
        )
        duration = time.time() - start_db
        if not hasattr(g, 'db_time_accumulator'):
            g.db_time_accumulator = 0.0
        g.db_time_accumulator += duration
        
        # Update remaining count
        remaining -= 1

    start_db = time.time()
    attempt_doc = testAttempts_collection.find_one({
        "userId": user["_id"],
        "finished": False,
        "$or": [
            {"testId": int(test_id)} if test_id.isdigit() else {"testId": test_id},
            {"testId": test_id}
        ]
    })
    duration = time.time() - start_db
    if not hasattr(g, 'db_time_accumulator'):
        g.db_time_accumulator = 0.0
    g.db_time_accumulator += duration

    if not attempt_doc:
        return jsonify({"error": "No unfinished attempt doc found"}), 404

    exam_mode = attempt_doc.get("examMode", False)
    is_correct = (selected_index == correct_index)

    existing_answer_index = None
    for i, ans in enumerate(attempt_doc.get("answers", [])):
        if ans.get("questionId") == question_id:
            existing_answer_index = i
            break

    new_score = attempt_doc.get("score", 0)
    if existing_answer_index is not None:
        update_payload = {
            "answers.$.userAnswerIndex": selected_index,
            "answers.$.correctAnswerIndex": correct_index
        }
        if exam_mode is False and is_correct:
            new_score += 1
            update_payload["score"] = new_score

        start_db = time.time()
        testAttempts_collection.update_one(
            {
                "_id": attempt_doc["_id"],
                "answers.questionId": question_id
            },
            {"$set": update_payload}
        )
        duration = time.time() - start_db
        if not hasattr(g, 'db_time_accumulator'):
            g.db_time_accumulator = 0.0
        g.db_time_accumulator += duration

    else:
        new_answer_doc = {
            "questionId": question_id,
            "userAnswerIndex": selected_index,
            "correctAnswerIndex": correct_index
        }
        if exam_mode is False and is_correct:
            new_score += 1
        push_update = {"$push": {"answers": new_answer_doc}}
        if exam_mode is False and is_correct:
            push_update["$set"] = {"score": new_score}

        start_db = time.time()
        testAttempts_collection.update_one(
            {"_id": attempt_doc["_id"]},
            push_update
        )
        duration = time.time() - start_db
        if not hasattr(g, 'db_time_accumulator'):
            g.db_time_accumulator = 0.0
        g.db_time_accumulator += duration

    awarded_xp = 0
    awarded_coins = 0
    if exam_mode is False:
        start_db = time.time()
        already_correct = correctAnswers_collection.find_one({
            "userId": user["_id"],
            "testId": test_id,
            "questionId": question_id
        })
        duration = time.time() - start_db
        if not hasattr(g, 'db_time_accumulator'):
            g.db_time_accumulator = 0.0
        g.db_time_accumulator += duration

        if is_correct and not already_correct:
            start_db = time.time()
            correctAnswers_collection.insert_one({
                "userId": user["_id"],
                "testId": test_id,
                "questionId": question_id
            })
            duration = time.time() - start_db
            if not hasattr(g, 'db_time_accumulator'):
                g.db_time_accumulator = 0.0
            g.db_time_accumulator += duration

            start_db = time.time()
            update_user_xp(user_id, xp_per_correct)
            duration2 = time.time() - start_db
            if not hasattr(g, 'db_time_accumulator'):
                g.db_time_accumulator = 0.0
            g.db_time_accumulator += duration2

            start_db = time.time()
            update_user_coins(user_id, coins_per_correct)
            duration3 = time.time() - start_db
            if not hasattr(g, 'db_time_accumulator'):
                g.db_time_accumulator = 0.0
            g.db_time_accumulator += duration3

            awarded_xp = xp_per_correct
            awarded_coins = coins_per_correct

        start_db = time.time()
        updated_user = get_user_by_id(user_id)
        duration = time.time() - start_db
        if not hasattr(g, 'db_time_accumulator'):
            g.db_time_accumulator = 0.0
        g.db_time_accumulator += duration

        return jsonify({
            "examMode": False,
            "isCorrect": is_correct,
            "alreadyCorrect": bool(already_correct),
            "awardedXP": awarded_xp,
            "awardedCoins": awarded_coins,
            "newXP": updated_user.get("xp", 0),
            "newCoins": updated_user.get("coins", 0),
            "practiceQuestionsRemaining": updated_user.get("practiceQuestionsRemaining", 0),
            "subscriptionActive": updated_user.get("subscriptionActive", False),
            "subscriptionType": updated_user.get("subscriptionType", "free")
        }), 200
    else:
        return jsonify({
            "examMode": True,
            "message": "Answer stored. No immediate feedback in exam mode."
        }), 200

# -------------------------------------------------------------------
# ACHIEVEMENTS
# -------------------------------------------------------------------
@api_bp.route('/achievements', methods=['GET'])
def fetch_achievements_route():
    start_db = time.time()
    ach_list = list(achievements_collection.find({}))
    duration = time.time() - start_db
    if not hasattr(g, 'db_time_accumulator'):
        g.db_time_accumulator = 0.0
    g.db_time_accumulator += duration

    for ach in ach_list:
        ach["_id"] = str(ach["_id"])
    return jsonify(ach_list), 200

# -------------------------------------------------------------------
# Leaderboard Route with Lazy Loading & Pagination
# -------------------------------------------------------------------
@api_bp.route('/leaderboard', methods=['GET'])
def get_leaderboard():
    global leaderboard_cache
    global leaderboard_cache_timestamp

    now_ms = int(time.time() * 1000)
    if now_ms - leaderboard_cache_timestamp > LEADERBOARD_CACHE_DURATION_MS:
        start_db = time.time()
        cursor = mainusers_collection.find(
            {},
            {"username": 1, "level": 1, "xp": 1, "currentAvatar": 1}
        ).sort("level", -1).limit(1000)
        duration = time.time() - start_db
        if not hasattr(g, 'db_time_accumulator'):
            g.db_time_accumulator = 0.0
        g.db_time_accumulator += duration

        new_results = []
        rank = 1
        for user in cursor:
            user_data = {
                "username": user.get("username", "unknown"),
                "level": user.get("level", 1),
                "xp": user.get("xp", 0),
                "rank": rank,
                "avatarUrl": None
            }
            if user.get("currentAvatar"):
                start_db = time.time()
                avatar_item = shop_collection.find_one({"_id": user["currentAvatar"]})
                duration = time.time() - start_db
                if not hasattr(g, 'db_time_accumulator'):
                    g.db_time_accumulator = 0.0
                g.db_time_accumulator += duration

                if avatar_item and "imageUrl" in avatar_item:
                    user_data["avatarUrl"] = avatar_item["imageUrl"]
            new_results.append(user_data)
            rank += 1

        leaderboard_cache = new_results
        leaderboard_cache_timestamp = now_ms

    try:
        skip = int(request.args.get("skip", 0))
        limit = int(request.args.get("limit", 50))
    except:
        skip, limit = 0, 50

    total_entries = len(leaderboard_cache)
    end_index = skip + limit
    if skip > total_entries:
        sliced_data = []
    else:
        sliced_data = leaderboard_cache[skip:end_index]

    return jsonify({
        "data": sliced_data,
        "total": total_entries
    }), 200

# ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
# USERNAME/EMAIL/PASSWORD CHANGES
# ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
@api_bp.route('/user/change-username', methods=['POST'])
def change_username():
    data = request.json or {}
    user_id = data.get("userId")
    new_username = data.get("newUsername")
    if not user_id or not new_username:
        return jsonify({"error": "Missing userId or newUsername"}), 400

    valid, errors = validate_username(new_username)
    if not valid:
        return jsonify({"error": "Invalid new username", "details": errors}), 400

    start_db = time.time()
    existing = mainusers_collection.find_one({"username": new_username})
    duration = time.time() - start_db
    if not hasattr(g, 'db_time_accumulator'):
        g.db_time_accumulator = 0.0
    g.db_time_accumulator += duration

    if existing:
        return jsonify({"error": "Username already taken"}), 400

    start_db = time.time()
    doc = get_user_by_id(user_id)
    duration = time.time() - start_db
    if not hasattr(g, 'db_time_accumulator'):
        g.db_time_accumulator = 0.0
    g.db_time_accumulator += duration

    if not doc:
        return jsonify({"error": "User not found"}), 404

    start_db = time.time()
    update_user_fields(user_id, {
        "username": new_username,
        "needs_username": False
    })
    duration = time.time() - start_db
    if not hasattr(g, 'db_time_accumulator'):
        g.db_time_accumulator = 0.0
    g.db_time_accumulator += duration

    return jsonify({"message": "Username updated"}), 200

@api_bp.route('/user/change-email', methods=['POST'])
def change_email():
    data = request.json or {}
    user_id = data.get("userId")
    new_email = data.get("newEmail")
    if not user_id or not new_email:
        return jsonify({"error": "Missing userId or newEmail"}), 400

    valid, errors = validate_email(new_email)
    if not valid:
        return jsonify({"error": "Invalid email", "details": errors}), 400

    start_db = time.time()
    existing = mainusers_collection.find_one({"email": new_email})
    duration = time.time() - start_db
    if not hasattr(g, 'db_time_accumulator'):
        g.db_time_accumulator = 0.0
    g.db_time_accumulator += duration

    if existing:
        return jsonify({"error": "Email already in use"}), 400

    start_db = time.time()
    doc = get_user_by_id(user_id)
    duration = time.time() - start_db
    if not hasattr(g, 'db_time_accumulator'):
        g.db_time_accumulator = 0.0
    g.db_time_accumulator += duration

    if not doc:
        return jsonify({"error": "User not found"}), 404

    start_db = time.time()
    update_user_fields(user_id, {"email": new_email})
    duration = time.time() - start_db
    if not hasattr(g, 'db_time_accumulator'):
        g.db_time_accumulator = 0.0
    g.db_time_accumulator += duration

    return jsonify({"message": "Email updated"}), 200

@api_bp.route('/user/change-password', methods=['POST'])
def change_password():
    data = request.json or {}
    user_id = data.get("userId")
    old_password = data.get("oldPassword")
    new_password = data.get("newPassword")
    confirm = data.get("confirmPassword")

    if not user_id or not old_password or not new_password or not confirm:
        return jsonify({"error": "All fields are required"}), 400
    if new_password != confirm:
        return jsonify({"error": "New passwords do not match"}), 400

    valid, errors = validate_password(new_password)
    if not valid:
        return jsonify({"error": "Invalid new password", "details": errors}), 400

    start_db = time.time()
    user_doc = get_user_by_id(user_id)
    duration = time.time() - start_db
    if not hasattr(g, 'db_time_accumulator'):
        g.db_time_accumulator = 0.0
    g.db_time_accumulator += duration

    if not user_doc:
        return jsonify({"error": "User not found"}), 404

    if user_doc.get("password") != old_password:
        return jsonify({"error": "Old password is incorrect"}), 401

    start_db = time.time()
    update_user_fields(user_id, {"password": new_password})
    duration = time.time() - start_db
    if not hasattr(g, 'db_time_accumulator'):
        g.db_time_accumulator = 0.0
    g.db_time_accumulator += duration

    return jsonify({"message": "Password updated"}), 200

@api_bp.route('/subscription/cancel', methods=['POST'])
def cancel_subscription():
    return jsonify({"message": "Cancel subscription placeholder"}), 200

# For single answer updates
@api_bp.route('/attempts/<user_id>/<test_id>/answer', methods=['POST'])
def update_single_answer(user_id, test_id):
    data = request.json or {}
    question_id = data.get("questionId")
    user_answer_index = data.get("userAnswerIndex")
    correct_answer_index = data.get("correctAnswerIndex")

    try:
        user_oid = ObjectId(user_id)
        test_id_int = int(test_id) if test_id.isdigit() else test_id
    except:
        return jsonify({"error": "Invalid user ID or test ID"}), 400

    start_db = time.time()
    attempt = testAttempts_collection.find_one({
        "userId": user_oid,
        "finished": False,
        "$or": [{"testId": test_id_int}, {"testId": test_id}]
    })
    duration = time.time() - start_db
    if not hasattr(g, 'db_time_accumulator'):
        g.db_time_accumulator = 0.0
    g.db_time_accumulator += duration

    if not attempt:
        return jsonify({"error": "Attempt not found"}), 404

    # Check if this is an exam mode attempt
    exam_mode = attempt.get("examMode", False)
    
    existing_answer_index = None
    for i, ans in enumerate(attempt.get("answers", [])):
        if ans.get("questionId") == question_id:
            existing_answer_index = i
            break

    if existing_answer_index is not None:
        # IMPORTANT FIX: For both exam and non-exam mode, update answers
        update_fields = {
            "answers.$.userAnswerIndex": user_answer_index,
            "answers.$.correctAnswerIndex": correct_answer_index
        }
        
        # Only update score for non-exam mode
        if not exam_mode:
            update_fields["score"] = data.get("score", 0)
            
        start_db = time.time()
        testAttempts_collection.update_one(
            {
                "userId": user_oid,
                "finished": False,
                "$or": [{"testId": test_id_int}, {"testId": test_id}],
                "answers.questionId": question_id
            },
            {"$set": update_fields}
        )
        duration = time.time() - start_db
        if not hasattr(g, 'db_time_accumulator'):
            g.db_time_accumulator = 0.0
        g.db_time_accumulator += duration
    else:
        # IMPORTANT FIX: For both exam and non-exam mode, add answer
        update_doc = {
            "$push": {
                "answers": {
                    "questionId": question_id,
                    "userAnswerIndex": user_answer_index,
                    "correctAnswerIndex": correct_answer_index
                }
            }
        }
        
        # Only update score for non-exam mode
        if not exam_mode:
            update_doc["$set"] = {"score": data.get("score", 0)}
            
        start_db = time.time()
        testAttempts_collection.update_one(
            {
                "userId": user_oid,
                "finished": False,
                "$or": [{"testId": test_id_int}, {"testId": test_id}]
            },
            update_doc
        )
        duration = time.time() - start_db
        if not hasattr(g, 'db_time_accumulator'):
            g.db_time_accumulator = 0.0
        g.db_time_accumulator += duration

    return jsonify({"message": "Answer updated", "examMode": exam_mode}), 200

# For updating the current question position only
@api_bp.route('/attempts/<user_id>/<test_id>/position', methods=['POST'])
def update_position(user_id, test_id):
    data = request.json or {}
    current_index = data.get("currentQuestionIndex", 0)

    try:
        user_oid = ObjectId(user_id)
        test_id_int = int(test_id) if test_id.isdigit() else test_id
    except:
        return jsonify({"error": "Invalid user ID or test ID"}), 400

    # IMPORTANT FIX: Include examTimerSeconds in the update
    update_fields = {
        "currentQuestionIndex": current_index,
        "finished": data.get("finished", False)
    }
    
    # Add timer if provided
    if "examTimerSeconds" in data:
        update_fields["examTimerSeconds"] = data["examTimerSeconds"]

    start_db = time.time()
    testAttempts_collection.update_one(
        {
            "userId": user_oid,
            "finished": False,
            "$or": [{"testId": test_id_int}, {"testId": test_id}]
        },
        {"$set": update_fields}
    )
    duration = time.time() - start_db
    if not hasattr(g, 'db_time_accumulator'):
        g.db_time_accumulator = 0.0
    g.db_time_accumulator += duration

    return jsonify({"message": "Position updated"}), 200

##############################################
# DAILY QUESTION ENDPOINTS
##############################################
@api_bp.route('/user/<user_id>/daily-bonus', methods=['POST'])
def daily_bonus(user_id):
    user = None
    start_db = time.time()
    user = get_user_by_id(user_id)
    duration = time.time() - start_db
    if not hasattr(g, 'db_time_accumulator'):
        g.db_time_accumulator = 0.0
    g.db_time_accumulator += duration

    if not user:
        return jsonify({"error": "User not found"}), 404

    now = datetime.utcnow()
    last_claim = user.get("lastDailyClaim")
    if last_claim and (now - last_claim) < timedelta(hours=24):
        seconds_left = int(24 * 3600 - (now - last_claim).total_seconds())
        return jsonify({
            "success": False,
            "message": f"Already claimed. Next bonus in: {seconds_left} seconds",
            "newCoins": user.get("coins", 0),
            "newXP": user.get("xp", 0),
            "newLastDailyClaim": serialize_datetime(last_claim)
        }), 200
    else:
        start_db = time.time()
        update_user_coins(user_id, 250)
        duration = time.time() - start_db
        if not hasattr(g, 'db_time_accumulator'):
            g.db_time_accumulator = 0.0
        g.db_time_accumulator += duration

        start_db = time.time()
        mainusers_collection.update_one(
            {"_id": user["_id"]},
            {"$set": {"lastDailyClaim": now}}
        )
        duration = time.time() - start_db
        if not hasattr(g, 'db_time_accumulator'):
            g.db_time_accumulator = 0.0
        g.db_time_accumulator += duration

        start_db = time.time()
        updated_user = get_user_by_id(user_id)
        duration = time.time() - start_db
        if not hasattr(g, 'db_time_accumulator'):
            g.db_time_accumulator = 0.0
        g.db_time_accumulator += duration

        start_db = time.time()
        newly_unlocked = check_and_unlock_achievements(user_id)
        duration = time.time() - start_db
        if not hasattr(g, 'db_time_accumulator'):
            g.db_time_accumulator = 0.0
        g.db_time_accumulator += duration

        return jsonify({
            "success": True,
            "message": "Daily bonus applied",
            "newCoins": updated_user.get("coins", 0),
            "newXP": updated_user.get("xp", 0),
            "newLastDailyClaim": serialize_datetime(updated_user.get("lastDailyClaim")),
            "newlyUnlocked": newly_unlocked
        }), 200

@api_bp.route('/daily-question', methods=['GET'])
def get_daily_question():
    user_id = request.args.get("userId")
    if not user_id:
        return jsonify({"error": "No userId provided"}), 400

    try:
        user_oid = ObjectId(user_id)
    except Exception:
        return jsonify({"error": "Invalid user ID"}), 400

    current_date = datetime.utcnow()
    reference_date = datetime(2025, 3, 11)  # Or any starting date you prefer
    day_index = (current_date - reference_date).days % 300  # This will cycle through 0-29

    start_db = time.time()
    daily_doc = dailyQuestions_collection.find_one({"dayIndex": day_index})
    duration = time.time() - start_db
    if not hasattr(g, 'db_time_accumulator'):
        g.db_time_accumulator = 0.0
    g.db_time_accumulator += duration

    if not daily_doc:
        return jsonify({"error": f"No daily question for dayIndex={day_index}"}), 404

    start_db = time.time()
    existing_answer = dailyAnswers_collection.find_one({
        "userId": user_oid,
        "dayIndex": day_index
    })
    duration = time.time() - start_db
    if not hasattr(g, 'db_time_accumulator'):
        g.db_time_accumulator = 0.0
    g.db_time_accumulator += duration

    response = {
        "dayIndex": day_index,
        "prompt": daily_doc.get("prompt"),
        "options": daily_doc.get("options"),
        "explanation": daily_doc.get("explanation"),
        "alreadyAnswered": bool(existing_answer)
    }
    return jsonify(response), 200

@api_bp.route('/daily-question/answer', methods=['POST'])
def submit_daily_question():
    data = request.json or {}
    user_id = data.get("userId")
    current_date = datetime.utcnow()
    reference_date = datetime(2025, 3, 11)  # Keep your reference date consistent
    day_index = (current_date - reference_date).days % 300
    selected_index = data.get("selectedIndex")

    if not user_id or day_index is None or selected_index is None:
        return jsonify({"error": "Missing userId, dayIndex, or selectedIndex"}), 400

    try:
        user_oid = ObjectId(user_id)
    except Exception:
        return jsonify({"error": "Invalid user ID"}), 400
        
    # Check if user has premium subscription
    user = get_user_by_id(user_id)
    if not user:
        return jsonify({"error": "User not found"}), 404
        
    subscription_active = user.get("subscriptionActive", False)
    if not subscription_active:
        return jsonify({
            "error": "Premium subscription required to answer daily questions",
            "status": "subscription_required",
            "tier": "premium_required",
            "feature": "daily_questions"
        }), 403

    start_db = time.time()
    daily_doc = dailyQuestions_collection.find_one({"dayIndex": day_index})
    duration = time.time() - start_db
    if not hasattr(g, 'db_time_accumulator'):
        g.db_time_accumulator = 0.0
    g.db_time_accumulator += duration

    if not daily_doc:
        return jsonify({"error": f"No daily question for dayIndex={day_index}"}), 404

    start_db = time.time()
    existing = dailyAnswers_collection.find_one({
        "userId": user_oid,
        "dayIndex": day_index
    })
    duration = time.time() - start_db
    if not hasattr(g, 'db_time_accumulator'):
        g.db_time_accumulator = 0.0
    g.db_time_accumulator += duration

    if existing:
        return jsonify({"error": "You already answered today's question"}), 400

    correct_index = daily_doc.get("correctIndex", 0)
    is_correct = (selected_index == correct_index)
    awarded_coins = 250 if is_correct else 50

    start_db = time.time()
    dailyAnswers_collection.insert_one({
        "userId": user_oid,
        "dayIndex": day_index,
        "answeredAt": datetime.utcnow(),
        "userAnswerIndex": selected_index,
        "isCorrect": is_correct
    })
    duration = time.time() - start_db
    if not hasattr(g, 'db_time_accumulator'):
        g.db_time_accumulator = 0.0
    g.db_time_accumulator += duration

    start_db = time.time()
    update_user_coins(str(user_oid), awarded_coins)
    duration = time.time() - start_db
    if not hasattr(g, 'db_time_accumulator'):
        g.db_time_accumulator = 0.0
    g.db_time_accumulator += duration

    start_db = time.time()
    updated_user = get_user_by_id(user_id)
    duration = time.time() - start_db
    if not hasattr(g, 'db_time_accumulator'):
        g.db_time_accumulator = 0.0
    g.db_time_accumulator += duration

    start_db = time.time()
    newly_unlocked = check_and_unlock_achievements(user_id)
    duration = time.time() - start_db
    if not hasattr(g, 'db_time_accumulator'):
        g.db_time_accumulator = 0.0
    g.db_time_accumulator += duration

    return jsonify({
        "message": "Answer submitted",
        "correct": is_correct,
        "awardedCoins": awarded_coins,
        "newCoins": updated_user.get("coins", 0),
        "newXP": updated_user.get("xp", 0),
        "newLastDailyClaim": serialize_datetime(updated_user.get("lastDailyClaim")),
        "newlyUnlocked": newly_unlocked,
        "explanation": daily_doc.get("explanation")
    }), 200

#############################################
# Public Leaderboard Caching (30-minute TTL)
#############################################
public_leaderboard_cache = []
public_leaderboard_cache_timestamp = 0
PUBLIC_LEADERBOARD_CACHE_DURATION_MS = 1800000  # 30 minutes (1800 seconds)

@public_leaderboard_bp.route('/board', methods=['GET'])
def get_public_leaderboard():
    """
    Public leaderboard with a longer cache duration (30 minutes)
    This is for the marketing site, separate from the logged-in user leaderboard
    """
    global public_leaderboard_cache
    global public_leaderboard_cache_timestamp

    now_ms = int(time.time() * 1000)
    if now_ms - public_leaderboard_cache_timestamp > PUBLIC_LEADERBOARD_CACHE_DURATION_MS:
        start_db = time.time()
        cursor = mainusers_collection.find(
            {},
            {"username": 1, "level": 1, "xp": 1, "currentAvatar": 1}
        ).sort("level", -1).limit(1000)
        duration = time.time() - start_db
        if not hasattr(g, 'db_time_accumulator'):
            g.db_time_accumulator = 0.0
        g.db_time_accumulator += duration

        new_results = []
        rank = 1
        for user in cursor:
            user_data = {
                "username": user.get("username", "unknown"),
                "level": user.get("level", 1),
                "xp": user.get("xp", 0),
                "rank": rank,
                "avatarUrl": None
            }
            if user.get("currentAvatar"):
                start_db = time.time()
                avatar_item = shop_collection.find_one({"_id": user["currentAvatar"]})
                duration = time.time() - start_db
                if not hasattr(g, 'db_time_accumulator'):
                    g.db_time_accumulator = 0.0
                g.db_time_accumulator += duration

                if avatar_item and "imageUrl" in avatar_item:
                    user_data["avatarUrl"] = avatar_item["imageUrl"]
            new_results.append(user_data)
            rank += 1

        public_leaderboard_cache = new_results
        public_leaderboard_cache_timestamp = now_ms

    try:
        skip = int(request.args.get("skip", 0))
        limit = int(request.args.get("limit", 50))
        cache_param = request.args.get("cache", "1800")  # Default 30 minutes
    except:
        skip, limit = 0, 50

    total_entries = len(public_leaderboard_cache)
    end_index = skip + limit
    if skip > total_entries:
        sliced_data = []
    else:
        sliced_data = public_leaderboard_cache[skip:end_index]

    return jsonify({
        "data": sliced_data,
        "total": total_entries,
        "cached_at": public_leaderboard_cache_timestamp,
        "cache_duration_ms": PUBLIC_LEADERBOARD_CACHE_DURATION_MS
    }), 200
    
    

# IF NEEDED (CURRENLY THSI CANCEL ROUTE IS NOT IN USE)
@api_bp.route('/subscription/cancel', methods=['POST'])
def test_route_cancel_subscription():  # Renamed function to avoid conflict
    # Redirect to the proper subscription cancellation endpoint
    data = request.json or {}
    user_id = data.get("userId")
    
    if not user_id:
        return jsonify({"error": "userId is required"}), 400
    
    try:
        user = get_user_by_id(user_id)
        if not user:
            return jsonify({"error": "User not found"}), 404
        
        subscription_id = user.get('stripeSubscriptionId')
        if not subscription_id:
            return jsonify({"error": "No active subscription found"}), 400
        
        # Cancel the subscription in Stripe
        import stripe
        stripe.api_key = os.getenv('STRIPE_SECRET_KEY')
        
        stripe.Subscription.modify(
            subscription_id,
            cancel_at_period_end=True
        )
        
        # Update user's subscription status
        update_user_subscription(user_id, {
            'subscriptionStatus': 'canceling'
        })
        
        # Log this subscription event
        db.subscriptionEvents.insert_one({
            'userId': ObjectId(user_id),
            'event': 'subscription_cancellation_requested',
            'platform': 'stripe',
            'stripeSubscriptionId': subscription_id,
            'timestamp': datetime.utcnow()
        })
        
        return jsonify({'success': True, 'message': 'Subscription will be canceled at the end of the billing period'})
    
    except Exception as e:
        return jsonify({"error": f"Error canceling subscription: {str(e)}"}), 500




@api_bp.route('/user/<user_id>/delete', methods=['DELETE'])
def delete_user_account(user_id):
    try:
        user_oid = ObjectId(user_id)
    except Exception:
        return jsonify({"error": "Invalid user ID"}), 400

    try:
        # Optional: Add additional authentication checks here
        # For example, check if the user is deleting their own account

        # Delete user from mainusers collection
        result = mainusers_collection.delete_one({"_id": user_oid})
        
        # Optional: Delete related collections (test attempts, achievements, etc.)
        testAttempts_collection.delete_many({"userId": user_oid})
        achievements_collection.delete_many({"userId": user_oid})
        # Add more collection deletions as needed

        if result.deleted_count > 0:
            return jsonify({"message": "Account deleted successfully"}), 200
        else:
            return jsonify({"error": "User not found"}), 404

    except Exception as e:
        return jsonify({"error": f"Error deleting account: {str(e)}"}), 500
        
        
        
@api_bp.route('/user/<user_id>/usage-limits', methods=['GET'])
def get_usage_limits(user_id):
    """
    Get current usage limits for free tier users
    Returns remaining practice questions and subscription status
    """
    start_db = time.time()
    user = get_user_by_id(user_id)
    duration = time.time() - start_db
    if not hasattr(g, 'db_time_accumulator'):
        g.db_time_accumulator = 0.0
    g.db_time_accumulator += duration
    
    if not user:
        return jsonify({"error": "User not found"}), 404
        
    # Return usage stats and subscription info
    return jsonify({
        "practiceQuestionsRemaining": user.get("practiceQuestionsRemaining", 0),
        "subscriptionActive": user.get("subscriptionActive", False),
        "subscriptionType": user.get("subscriptionType", "free"),
        "freeUserCreatedAt": user.get("freeUserCreatedAt", None),
    }), 200

@api_bp.route('/user/<user_id>/decrement-questions', methods=['POST'])
def decrement_questions(user_id):
    """
    Decrement the practice question counter for free users
    """
    start_db = time.time()
    user = get_user_by_id(user_id)
    duration = time.time() - start_db
    if not hasattr(g, 'db_time_accumulator'):
        g.db_time_accumulator = 0.0
    g.db_time_accumulator += duration
    
    if not user:
        return jsonify({"error": "User not found"}), 404
        
    # Only decrement for free users
    if not user.get("subscriptionActive", False):
        remaining = user.get("practiceQuestionsRemaining", 0)
        if remaining > 0:
            start_db = time.time()
            mainusers_collection.update_one(
                {"_id": ObjectId(user_id)},
                {"$inc": {"practiceQuestionsRemaining": -1}}
            )
            duration = time.time() - start_db
            if not hasattr(g, 'db_time_accumulator'):
                g.db_time_accumulator = 0.0
            g.db_time_accumulator += duration
            
    # Get updated user
    start_db = time.time()
    updated_user = get_user_by_id(user_id)
    duration = time.time() - start_db
    if not hasattr(g, 'db_time_accumulator'):
        g.db_time_accumulator = 0.0
    g.db_time_accumulator += duration
    
    return jsonify({
        "practiceQuestionsRemaining": updated_user.get("practiceQuestionsRemaining", 0),
        "message": "Question count updated"
    }), 200
