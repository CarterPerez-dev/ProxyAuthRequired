# test_routes.py

from flask import Blueprint, request, jsonify
from bson.objectid import ObjectId
from datetime import datetime


from models.database import (
    mainusers_collection,
    shop_collection,
    achievements_collection,
    tests_collection,
    testAttempts_collection,
    correctAnswers_collection
)
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
    get_test_by_id,
    check_and_unlock_achievements
)

api_bp = Blueprint('test', __name__)

def serialize_user(user):
    """Helper function to convert _id and other fields to strings if needed."""
    if not user:
        return None
    user['_id'] = str(user['_id'])
    if 'currentAvatar' in user and user['currentAvatar']:
        user['currentAvatar'] = str(user['currentAvatar'])
    if 'purchasedItems' in user and isinstance(user['purchasedItems'], list):
        user['purchasedItems'] = [str(item) for item in user['purchasedItems']]
    return user

# -----------------------------
# USER ROUTES
# -----------------------------

@api_bp.route('/user/<user_id>', methods=['GET'])
def get_user(user_id):
    # NOTE: Exclude large fields with projection if needed:
    # user = mainusers_collection.find_one({"_id": ObjectId(user_id)}, {"testsProgress": 0, "perTestCorrect": 0})
    user = get_user_by_id(user_id)
    if not user:
        return jsonify({"error": "User not found"}), 404
    user = serialize_user(user)
    return jsonify(user), 200

@api_bp.route('/user', methods=['POST'])
def register_user():
    user_data = request.json
    try:
        user_id = create_user(user_data)
        return jsonify({"message": "User created", "user_id": str(user_id)}), 201
    except ValueError as ve:
        return jsonify({"error": str(ve)}), 400
    except Exception as e:
        return jsonify({"error": "Internal server error", "details": str(e)}), 500

@api_bp.route('/login', methods=['POST'])
def login():
    data = request.json
    if not data:
        return jsonify({"error": "No JSON data provided"}), 400

    identifier = data.get("usernameOrEmail")
    password = data.get("password")
    if not identifier or not password:
        return jsonify({"error": "Username (or Email) and password are required"}), 400

    user = get_user_by_identifier(identifier)
    if not user or user.get("password") != password:
        return jsonify({"error": "Invalid username or password"}), 401

    user = serialize_user(user)
    return jsonify({
        "user_id": user["_id"],
        "username": user["username"],
        "coins": user.get("coins", 0),
        "xp": user.get("xp", 0),
        "level": user.get("level", 1),
        "achievements": user.get("achievements", []),
        "xpBoost": user.get("xpBoost", 1.0),
        "currentAvatar": user.get("currentAvatar"),
        "nameColor": user.get("nameColor"),
        # if you want, fetch purchasedItems with a separate projection or store it here
        "purchasedItems": user.get("purchasedItems", [])
    }), 200

@api_bp.route('/user/<user_id>/daily-bonus', methods=['POST'])
def daily_bonus(user_id):
    result = apply_daily_bonus(user_id)
    if not result:
        return jsonify({"error": "User not found"}), 404
    return jsonify(result), 200

@api_bp.route('/user/<user_id>/add-xp', methods=['POST'])
def add_xp_route(user_id):
    data = request.json
    xp_to_add = data.get("xp", 0)
    updated = update_user_xp(user_id, xp_to_add)
    if not updated:
        return jsonify({"error": "User not found"}), 404
    new_achievements = check_and_unlock_achievements(user_id)
    updated["newAchievements"] = new_achievements
    return jsonify(updated), 200

@api_bp.route('/user/<user_id>/add-coins', methods=['POST'])
def add_coins_route(user_id):
    data = request.json
    coins_to_add = data.get("coins", 0)
    update_user_coins(user_id, coins_to_add)
    return jsonify({"message": "Coins updated"}), 200

# -----------------------------
# SHOP ROUTES
# -----------------------------

@api_bp.route('/shop', methods=['GET'])
def fetch_shop():
    items = get_shop_items()
    for item in items:
        item["_id"] = str(item["_id"])
    return jsonify(items), 200

@api_bp.route('/shop/purchase/<item_id>', methods=['POST'])
def purchase_item_route(item_id):
    data = request.json or {}
    user_id = data.get("userId")
    if not user_id:
        return jsonify({"success": False, "message": "userId is required"}), 400

    result = purchase_item(user_id, item_id)
    if result["success"]:
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

    user = get_user_by_id(user_id)
    if not user:
        return jsonify({"success": False, "message": "User not found"}), 404

    try:
        oid = ObjectId(item_id)
    except Exception:
        return jsonify({"success": False, "message": "Invalid item ID"}), 400

    # Make sure user purchased it or meets unlock level
    from models.test import shop_collection
    item_doc = shop_collection.find_one({"_id": oid})
    if not item_doc:
        return jsonify({"success": False, "message": "Item not found in shop"}), 404

    if oid not in user.get("purchasedItems", []):
        # Check if user is high enough level to equip
        if user.get("level", 1) < item_doc.get("unlockLevel", 1):
            return jsonify({"success": False, "message": "Item not unlocked"}), 400

    # Equip
    mainusers_collection.update_one(
        {"_id": user["_id"]},
        {"$set": {"currentAvatar": oid}}
    )
    return jsonify({"success": True, "message": "Avatar equipped"}), 200

# -----------------------------
# TESTS ROUTES
# -----------------------------

@api_bp.route('/tests/<test_id>', methods=['GET'])
def fetch_test_by_id_route(test_id):
    test_doc = get_test_by_id(test_id)
    if not test_doc:
        return jsonify({"error": "Test not found"}), 404
    test_doc["_id"] = str(test_doc["_id"])
    return jsonify(test_doc), 200

# -----------------------------
# PROGRESS / ATTEMPTS ROUTES
# -----------------------------

@api_bp.route('/attempts/<user_id>/<test_id>', methods=['GET'])
def get_test_attempt(user_id, test_id):
    """
    Fetch the user's test attempt data from testAttempts_collection,
    if any (or create a partial doc if you want).
    """
    try:
        user_oid = ObjectId(user_id)
    except:
        return jsonify({"error": "Invalid user ID"}), 400

    attempt = testAttempts_collection.find_one({"userId": user_oid, "testId": test_id, "finished": False})
    if not attempt:
        # Optionally create a new doc if none found
        return jsonify({"attempt": None}), 200
    
    # Convert _id to string
    attempt["_id"] = str(attempt["_id"])
    return jsonify({"attempt": attempt}), 200

@api_bp.route('/attempts/<user_id>/<test_id>', methods=['POST'])
def update_test_attempt(user_id, test_id):
    """
    Store partial progress (answers, currentQuestionIndex, etc.) in testAttempts_collection.
    Example request body:
      {
        "answers": [...],
        "score": <number>,
        "totalQuestions": 20,
        "category": "aplus",
        "finished": false
      }
    """
    data = request.json or {}
    try:
        user_oid = ObjectId(user_id)
    except:
        return jsonify({"error": "Invalid user ID"}), 400

    # Upsert attempt
    filter_ = {"userId": user_oid, "testId": test_id, "finished": False}
    update_doc = {
        "$set": {
            "userId": user_oid,
            "testId": test_id,
            "category": data.get("category", "aplus"),
            "answers": data.get("answers", []),
            "score": data.get("score", 0),
            "totalQuestions": data.get("totalQuestions", 0),
            "finished": data.get("finished", False)
        }
    }
    testAttempts_collection.update_one(filter_, update_doc, upsert=True)
    return jsonify({"message": "Progress updated"}), 200

@api_bp.route('/attempts/<user_id>/<test_id>/finish', methods=['POST'])
def finish_test_attempt(user_id, test_id):
    """
    Mark the attempt as finished, set finishedAt, trigger achievements, etc.
    Example request body might contain final score, answers, etc.
    """
    data = request.json or {}
    try:
        user_oid = ObjectId(user_id)
    except:
        return jsonify({"error": "Invalid user ID"}), 400

    # Mark attempt as finished
    filter_ = {"userId": user_oid, "testId": test_id, "finished": False}
    update_doc = {
        "$set": {
            "finished": True,
            "finishedAt": datetime.utcnow(),
            "score": data.get("score", 0),
            "totalQuestions": data.get("totalQuestions", 0),
        }
    }
    testAttempts_collection.update_one(filter_, update_doc)

    newly_unlocked = check_and_unlock_achievements(user_id)
    return jsonify({
        "message": "Test attempt finished",
        "newlyUnlocked": newly_unlocked
    }), 200

# -----------------------------
# PAGINATION ROUTE (NEW)
# -----------------------------
@api_bp.route('/attempts/<user_id>/list', methods=['GET'])
def list_test_attempts(user_id):
    """
    Returns a paginated list of attempts for the given user.
    Optional query params: ?page=1&page_size=50
    Example usage: GET /attempts/<user_id>/list?page=2&page_size=10
    """
    try:
        user_oid = ObjectId(user_id)
    except:
        return jsonify({"error": "Invalid user ID"}), 400

    page = request.args.get("page", default=1, type=int)
    page_size = request.args.get("page_size", default=50, type=int)
    skip_count = (page - 1) * page_size

    # We can sort by finishedAt descending to show most recent attempts first
    cursor = testAttempts_collection.find(
        {"userId": user_oid}
    ).sort("finishedAt", -1).skip(skip_count).limit(page_size)

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

# -----------------------------
# FIRST-TIME-CORRECT ANSWERS
# -----------------------------
@api_bp.route('/user/<user_id>/submit-answer', methods=['POST'])
def submit_answer(user_id):
    """
    Expects JSON:
      {
        "testId": <str>,
        "questionId": <str>,
        "correctAnswerIndex": <int>,
        "selectedIndex": <int>,
        "xpPerCorrect": <int>,
        "coinsPerCorrect": <int>
      }
    Awards XP/coins only the first time user gets that Q correct, 
    stored in correctAnswers_collection.
    """
    data = request.json or {}
    test_id = str(data.get("testId"))
    question_id = data.get("questionId")
    selected_index = data.get("selectedIndex")
    correct_index = data.get("correctAnswerIndex")
    xp_per_correct = data.get("xpPerCorrect", 10)
    coins_per_correct = data.get("coinsPerCorrect", 5)

    user = get_user_by_id(user_id)
    if not user:
        return jsonify({"error": "User not found"}), 404

    # Determine if correct
    is_correct = (selected_index == correct_index)

    # Check if user previously answered this question correct
    already_correct = correctAnswers_collection.find_one({
        "userId": user["_id"],
        "testId": test_id,
        "questionId": question_id
    })

    awarded_xp = 0
    awarded_coins = 0

    if is_correct and not already_correct:
        # Insert record so we know user has gotten it correct once
        correctAnswers_collection.insert_one({
            "userId": user["_id"],
            "testId": test_id,
            "questionId": question_id
        })
        # Award XP and coins
        update_user_xp(user_id, xp_per_correct)
        update_user_coins(user_id, coins_per_correct)
        awarded_xp = xp_per_correct
        awarded_coins = coins_per_correct

    # Optionally also update the testAttempts doc with the user’s chosen answer
    # to keep the answers array in sync. It's optional, but typically you'd do:
    #   testAttempts_collection.update_one(...)

    # Return updated user coins, xp
    updated_user = get_user_by_id(user_id)
    new_xp = updated_user.get("xp", 0)
    new_coins = updated_user.get("coins", 0)

    return jsonify({
        "isCorrect": is_correct,
        "alreadyCorrect": True if already_correct else False,
        "awardedXP": awarded_xp,
        "awardedCoins": awarded_coins,
        "newXP": new_xp,
        "newCoins": new_coins
    }), 200

#A cheivement route

@api_bp.route('/achievements', methods=['GET'])
def fetch_achievements_route():
    """
    Returns the full list of achievements from the DB.
    The frontend uses this to display locked/unlocked achievements.
    """
    ach_list = get_achievements()
    for ach in ach_list:
        ach["_id"] = str(ach["_id"])
    return jsonify(ach_list), 200
    
    
    
    
@api_bp.route('/leaderboard', methods=['GET'])
def get_leaderboard():
    """
    Returns the top 100 users by level (descending).
    Embeds avatarUrl from shop_collection if the user
    has a currentAvatar set.
    """
    top_users_cursor = mainusers_collection.find(
        {},
        {"username": 1, "level": 1, "xp": 1, "currentAvatar": 1}
    ).sort("level", -1).limit(100)

    results = []
    rank = 1
    for user in top_users_cursor:
        # Basic fields
        user_data = {
            "username": user.get("username", "unknown"),
            "level": user.get("level", 1),
            "xp": user.get("xp", 0),
            "rank": rank,
            "avatarUrl": None
        }

        # Lookup avatar image if exists
        if user.get("currentAvatar"):
            avatar_item = shop_collection.find_one({"_id": user["currentAvatar"]})
            if avatar_item and "imageUrl" in avatar_item:
                user_data["avatarUrl"] = avatar_item["imageUrl"]

        results.append(user_data)
        rank += 1

    return jsonify(results), 200
