So right now my current info page is basically the home page whic is essentially right now the brief overview of evrything we offer and all out features. so id liek to keep it relativly the same, however, i woudl ike to add a nice sidebar with a few tabs, so theres gonna be 6 more tbs- 7 total inclduing the "home" which is the info page we have now.

so the home which will be at teh top, (ill start saying home instea dof info but the paeg is actually the page page we have now- ill keep it the saem js file name but in the sidebar it will be home) 

So then a Register tab below it - which literally just functions the same as those buttons we have that say register it’s just another register link that takes them to the register page we already have

Then there will be a demo tab where we have demos for each things shown in the home/overiew, so each kinda feature i have that i show in the overvirewe ill have some sort of link to the demo video of said feature So in the home/overview I’ll I’ll make the demos a link for the tab where it has “demos” and have a short video for each. So the demo tab will have all the demos but in the home/overview the link tor each specific demo with go directly to the demo specific to that link not just the whole demo tab/page. so liek as an example if i have liek analogy hub in the home page ther eshoufl be some osrt of link- but make it more seamless or cooler/better UI of how we should link the demo video

so liek i explained htat bad- but as ean example take teh anaolgy hub box we have in teh hoem page- so it will epxlain it breifly and mayeb if you clciok taht box or soemhting (subtly/seamlessly making it know that its clickable/theres a demo video) then it directs you to the demo tab- but sepcially the demo video of the anaolgy bub demo (not just the whoel demo tasb) liek it directs you tot the exact secxtion *in* my demo tab of ist respeive demo- and this appleis to all my features yah know- so somehwo figure out teh ebst wya to do that both how the link/diretcion will work- and how it directs theme actaly top teh respeiove demo


ok so after that there will eb a tab for  “all exams” tab where it has more details of all the exams we have with a picture of each certification and a description of each- but at the top make sure it’s know that they get access to all the exams this page just outlines all the ones we have and liek i sadi t will jst haev a picture of the certfictaion logo maybe or soemthing iwtha s hort desvcription of teh exam and liek also hwo many questiosn i have for it or something. teh exams i have are CompTIA A+ core 1 and core 2, Security+, Network+, CySa+, Pentest+, SecurityX (fromerly know as teh Casp+), Linux+, Data+, Server+, and Cloud+, then i have teh AWS cloud practitioner certification, and ISC2 CISSP.

so i have a leaderbaord page in my actual weppaghe (after signing up) but it owudl be cool to also have a leaderboard tab  where we basically have my leaderboard page but styled differently and cached longer. so like 30 mins prolly specially for this page only tho and styled similar the info page  (it loos different for the actual in game page tho) so bacially it owudl be a toatlly idfferent page and might even use a difffertn backend route (because we need ot chache it longer) but it would still have teh correct users and liek actual leaderbaord but styled/designed differently becasue its for my home page (when i say home page i am inclduing like all the tabs- liek i just mena my whoel marketing/front page/public page)



then we need a contact page/tab so its gonna be liek A contact us where it has a contact us  box and has enter email- then message box, so its just teh "enetr email" and then message box so idk how that works hwo it sends the amil fro the user or whatever or if it sends an eamil to me or hwoweev rthat weorks idk but if your wondeirng what my email is just in case it would be support@certagmes.com if you need taht information. Then like in smaller text below the whole box it will have have fine print sorta like “business injuries email inquiry@certgames.com and our social mdeia accounts aswell so have a logo for each social asqwell which will have linkiden, X.com(twitter), instagram, reddit, and facebook- have placeholder links for now. and also put these links at the bottom opf my hoem page liek below teh app store thing i guess idk you fighure it out, or mayeb at teh top of osmrthing idk whatever is sbest.

and lastly- we will have the the login tab which is teh same idea as teh resgietr paeg its simply just another button/link to teh existing login paeg we have.


so it these extra pages shoudl be simialr design to my existing info page (home), and when i was making it i wanted it realy cool and stuff, so liek my midnset was i want soemoen to subsribe just off hwo aswesome and seamless and aswesome/fucntiolal teh UI is dn design. lieka gamified, cybersecurtyty/hacker type of vibes yah know so keep that up while making teh sidebar/navbar hwoeve ryou will do it- like do a coolw ay to do teh navbar whiel also being obvious to the user (not too obvious but dotn make it so cool and unique taht teh user doesnt even know we have a navbar/sidebar) it deosnt hav to be a navabr/sidebar liek just wahtevr you think i best becasue you have full creative control- its all up tot you do do whatver you want- thin in perspective of teh user and you are trying to get them to subsribe to my webiste/resgiser. and needs cxool unique aswesome, clool looking features that helsp teh user want to subsribe/resgietr and tsuff- also maake sure when amking the css class/block names the the .xyz trhey need to be unique so we dont overide othert pages in my web app, and also ensure its compabalitle for all devices liek iphones/small devices/tablets/pc yah know- alrigth too much instructiosn becasue i knwo you knmow what your doinga nd if you have full creative control (just try not to alte rmy existing hoem page too much)


ok now addiotnally- with my existing home/ifno page i want the oauth's i have at the bottom wher eit says easy sign in- lets make that say easy sign up insetad and have teh google adn apple buttons/logos be embedded links to directly regsiter. so like it acts as the actual button to oauth sign uip from th resgiter page

so for conext realtign to ther leaderbaord (becasue we need to make a leaderbaord route specially for the info page leaderbaord becadsue liek i sadi we cwill cahce it longer than teh existing one adn styek it dfiferntly), aswell as teh app.js because you need to know my paths, aswell as mayeb a few pictures of my website and also liek random hacker temedm pictures for maybe theme refferences (But you have full creative and design control do whatev ryou want for best outcome) adn ill provide you my regsiter.js page (for th oauth links on how it does it) and also ofcourse my existing info page will be all teh context i will provide you. pciture provided aswell


so here is teh leaderbaordroutes we have fro my existing leaderbaor dpaeg insidfe my website-- there are addiotnal routes in here but teh leaderbaor droute is also in this route file so im giving you the whoel thing
# ================================
# test_routes.py
# ================================

from flask import Blueprint, request, jsonify, session, g  # <-- Added g here for DB time measurement
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
    award_correct_answers_in_bulk
)

api_bp = Blueprint('test', __name__)

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

    if not user or user.get("password") != password:
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
        "password": user.get("password")
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

    query = {"userId": user_oid, "finished": False}
    if test_id_int is not None:
        query["$or"] = [{"testId": test_id_int}, {"testId": test_id}]
    else:
        query["testId"] = test_id

    start_db = time.time()
    attempt = testAttempts_collection.find_one(query)
    duration = time.time() - start_db
    if not hasattr(g, 'db_time_accumulator'):
        g.db_time_accumulator = 0.0
    g.db_time_accumulator += duration

    if not attempt:
        query_finished = {"userId": user_oid, "finished": True}
        if test_id_int is not None:
            query_finished["$or"] = [{"testId": test_id_int}, {"testId": test_id}]
        else:
            query_finished["testId"] = test_id

        start_db = time.time()
        attempt = testAttempts_collection.find_one(query_finished, sort=[("finishedAt", -1)])
        duration = time.time() - start_db
        if not hasattr(g, 'db_time_accumulator'):
            g.db_time_accumulator = 0.0
        g.db_time_accumulator += duration

    if not attempt:
        return jsonify({"attempt": None}), 200

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

    filter_ = {
        "userId": user_oid,
        "$or": [{"testId": test_id_int}, {"testId": test_id}]
    }
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
            "examMode": exam_mode_val
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

    filter_ = {
        "userId": user_oid,
        "finished": False,
        "$or": [{"testId": test_id_int}, {"testId": test_id}]
    }
    update_doc = {
        "$set": {
            "finished": True,
            "finishedAt": datetime.utcnow(),
            "score": data.get("score", 0),
            "totalQuestions": data.get("totalQuestions", 0)
        }
    }

    start_db = time.time()
    testAttempts_collection.update_one(filter_, update_doc)
    duration = time.time() - start_db
    if not hasattr(g, 'db_time_accumulator'):
        g.db_time_accumulator = 0.0
    g.db_time_accumulator += duration

    start_db = time.time()
    attempt_doc = testAttempts_collection.find_one({
        "userId": user_oid,
        "$or": [{"testId": test_id_int}, {"testId": test_id}],
        "finished": True
    })
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

    update_ops["$inc"]["achievement_counters.total_questions_answered"] = selected_length

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
            "newCoins": updated_user.get("coins", 0)
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
    update_user_fields(user_id, {"username": new_username})
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

    existing_answer_index = None
    for i, ans in enumerate(attempt.get("answers", [])):
        if ans.get("questionId") == question_id:
            existing_answer_index = i
            break

    if existing_answer_index is not None:
        start_db = time.time()
        testAttempts_collection.update_one(
            {
                "userId": user_oid,
                "finished": False,
                "$or": [{"testId": test_id_int}, {"testId": test_id}],
                "answers.questionId": question_id
            },
            {"$set": {
                "answers.$.userAnswerIndex": user_answer_index,
                "answers.$.correctAnswerIndex": correct_answer_index,
                "score": data.get("score", 0)
            }}
        )
        duration = time.time() - start_db
        if not hasattr(g, 'db_time_accumulator'):
            g.db_time_accumulator = 0.0
        g.db_time_accumulator += duration

    else:
        start_db = time.time()
        testAttempts_collection.update_one(
            {
                "userId": user_oid,
                "finished": False,
                "$or": [{"testId": test_id_int}, {"testId": test_id}]
            },
            {
                "$push": {
                    "answers": {
                        "questionId": question_id,
                        "userAnswerIndex": user_answer_index,
                        "correctAnswerIndex": correct_answer_index
                    }
                },
                "$set": {"score": data.get("score", 0)}
            }
        )
        duration = time.time() - start_db
        if not hasattr(g, 'db_time_accumulator'):
            g.db_time_accumulator = 0.0
        g.db_time_accumulator += duration

    return jsonify({"message": "Answer updated"}), 200

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

    start_db = time.time()
    testAttempts_collection.update_one(
        {
            "userId": user_oid,
            "finished": False,
            "$or": [{"testId": test_id_int}, {"testId": test_id}]
        },
        {"$set": {
            "currentQuestionIndex": current_index,
            "finished": data.get("finished", False)
        }}
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
        update_user_coins(user_id, 1000)
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

    day_index = 0

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
        "alreadyAnswered": bool(existing_answer)
    }
    return jsonify(response), 200

@api_bp.route('/daily-question/answer', methods=['POST'])
def submit_daily_question():
    data = request.json or {}
    user_id = data.get("userId")
    day_index = data.get("dayIndex")
    selected_index = data.get("selectedIndex")

    if not user_id or day_index is None or selected_index is None:
        return jsonify({"error": "Missing userId, dayIndex, or selectedIndex"}), 400

    try:
        user_oid = ObjectId(user_id)
    except Exception:
        return jsonify({"error": "Invalid user ID"}), 400

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
        "newlyUnlocked": newly_unlocked
    }), 200




ok now next is the App.js
// src/App.js
import React, { useEffect } from 'react';
import { Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUserData } from './components/pages/store/userSlice';

// Import ToastContainer from react-toastify
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// Public pages
import InfoPage from './components/pages/Info/InfoPage';
import Login from './components/pages/auth/Login';
import Register from './components/pages/auth/Register';
import ForgotPassword from './components/pages/auth/ForgotPassword';
import ResetPassword from './components/pages/auth/ResetPassword';
import PrivacyPolicy from './components/pages/PrivacyPolicy';
import TermsOfService from './components/pages/TermsOfService';
import CreateUsernameForm from './components/pages/auth/CreateUsernameForm'; // Add this line

// Admin 
import CrackedAdminLoginPage from './components/cracked/CrackedAdminLoginPage';
import CrackedAdminDashboard from './components/cracked/CrackedAdminDashboard'; 

// Protected pages
import ProtectedRoute from './components/ProtectedRoute';
import Sidebar from './components/Sidebar/Sidebar';

import Xploitcraft from './components/pages/XploitcraftPage/Xploitcraft';
import ScenarioSphere from './components/pages/ScenarioPage/ScenarioSphere';
import AnalogyHub from './components/pages/AnalogyPage/AnalogyHub';
import GRC from './components/pages/GRCpage/GRC';
import DailyCyberBrief from './components/pages/DailyPage/DailyCyberBrief';
import Resources from './components/pages/ResourcesPage/Resources';

// Gamified components and userprofile
import DailyStationPage from './components/pages/store/DailyStationPage';
import ShopPage from './components/pages/store/ShopPage';
import UserProfile from './components/pages/store/UserProfile';
import LeaderboardPage from './components/pages/store/LeaderboardPage';
import AchievementPage from './components/pages/store/AchievementPage';
import SupportAskAnythingPage from './components/pages/store/SupportAskAnythingPage';

// Unique Test Pages
import APlusTestPage from './components/pages/aplus/APlusTestPage';
import APlusCore2TestPage from './components/pages/aplus2/APlusCore2TestPage';
import NetworkPlusTestPage from './components/pages/nplus/NetworkPlusTestPage';
import SecurityPlusTestPage from './components/pages/secplus/SecurityPlusTestPage';
import CySAPlusTestPage from './components/pages/cysa/CySAPlusTestPage';
import PenPlusTestPage from './components/pages/penplus/PenPlusTestPage';
import CaspPlusTestPage from './components/pages/casp/CaspPlusTestPage';
import LinuxPlusTestPage from './components/pages/linuxplus/LinuxPlusTestPage';
import CloudPlusTestPage from './components/pages/cloudplus/CloudPlusTestPage';
import DataPlusTestPage from './components/pages/dataplus/DataPlusTestPage';
import ServerPlusTestPage from './components/pages/serverplus/ServerPlusTestPage';
import CisspTestPage from './components/pages/cissp/CisspTestPage';
import AWSCloudTestPage from './components/pages/awscloud/AWSCloudTestPage';

// Global Test Page
import GlobalTestPage from './components/GlobalTestPage';

// OAuth Success Page
import OAuthSuccess from './components/pages/auth/OAuthSuccess';

// Global CSS import
import './global.css';


/* 
  - If user data is still loading, shows a loading message.
  - If user is logged in, redirects to /profile.
  - Otherwise, renders the public InfoPage.
*/

function HomeOrProfile() {
  const { userId, status } = useSelector((state) => state.user);
  if (status === 'loading') {
    return <div>Loading...</div>;
  }
  if (userId) {
    return <Navigate to="/profile" replace />;
  }
  return <InfoPage />;
}

function App() {
  const dispatch = useDispatch();
  const { userId } = useSelector((state) => state.user);


  useEffect(() => {
    const initializeTheme = () => {
      const savedTheme = localStorage.getItem('selectedTheme') || 'default';
      document.documentElement.setAttribute('data-theme', savedTheme);
    };


    initializeTheme();
  }, []); 
  
  
  useEffect(() => {
    if (userId) {
      dispatch(fetchUserData(userId));
    }
  }, [dispatch, userId]);

  return (
    <div className="App">
      {userId && <Sidebar />}
      {/* React Toastify container for notifications */}
      <ToastContainer 
        position="top-right"
        autoClose={7000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
      <div className="main-content">
        <Routes>
          {/* The default route depends on whether the user is logged in */}
          <Route path="/" element={<HomeOrProfile />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/reset-password/:token" element={<ResetPassword />} />
          <Route path="/create-username" element={<CreateUsernameForm />} />
          <Route path="/oauth/success" element={<OAuthSuccess />} />
          <Route path="/cracked/login" element={<CrackedAdminLoginPage />} />
          <Route path="/cracked/dashboard" element={<CrackedAdminDashboard />} />
          <Route path="/my-support" element={<SupportAskAnythingPage />} />
          <Route path="/privacy" element={<PrivacyPolicy />} />
          <Route path="/terms" element={<TermsOfService />} />
          <Route path="/profile" element={
            <ProtectedRoute>
              <UserProfile />
            </ProtectedRoute>
          }/>
          <Route path="/achievements" element={
            <ProtectedRoute>
              <AchievementPage />
            </ProtectedRoute>
          }/>
          <Route path="/shop" element={
            <ProtectedRoute>
              <ShopPage />
            </ProtectedRoute>
          }/>
          <Route path="/daily" element={
            <ProtectedRoute>
              <DailyStationPage />
            </ProtectedRoute>
          }/>
          <Route path="/leaderboard" element={
            <ProtectedRoute>
              <LeaderboardPage />
            </ProtectedRoute>
          }/>
          <Route path="/xploitcraft" element={
            <ProtectedRoute>
              <Xploitcraft />
            </ProtectedRoute>
          }/>
          <Route path="/scenariosphere" element={
            <ProtectedRoute>
              <ScenarioSphere />
            </ProtectedRoute>
          }/>
          <Route path="/analogyhub" element={
            <ProtectedRoute>
              <AnalogyHub />
            </ProtectedRoute>
          }/>
          <Route path="/grc" element={
            <ProtectedRoute>
              <GRC />
            </ProtectedRoute>
          }/>
          <Route path="/dailycyberbrief" element={<DailyCyberBrief />} />
          <Route path="/resources" element={<Resources />} />
          
          <Route path="/practice-tests/a-plus" element={
            <ProtectedRoute>
              <APlusTestPage />
            </ProtectedRoute>
          }/>
          <Route path="/practice-tests/a-plus/:testId" element={
            <ProtectedRoute>
              <APlusTestPage />
            </ProtectedRoute>
          }/>
          <Route path="/practice-tests/aplus-core2" element={
            <ProtectedRoute>
              <APlusCore2TestPage />
            </ProtectedRoute>
          }/>
          <Route path="/practice-tests/aplus-core2/:testId" element={
            <ProtectedRoute>
              <APlusCore2TestPage />
            </ProtectedRoute>
          }/>
          <Route path="/practice-tests/network-plus" element={
            <ProtectedRoute>
              <NetworkPlusTestPage />
            </ProtectedRoute>
          }/>
          <Route path="/practice-tests/network-plus/:testId" element={
            <ProtectedRoute>
              <NetworkPlusTestPage />
            </ProtectedRoute>
          }/>
          <Route path="/practice-tests/security-plus" element={
            <ProtectedRoute>
              <SecurityPlusTestPage />
            </ProtectedRoute>
          }/>
          <Route path="/practice-tests/security-plus/:testId" element={
            <ProtectedRoute>
              <SecurityPlusTestPage />
            </ProtectedRoute>
          }/>
          <Route path="/practice-tests/cysa-plus" element={
            <ProtectedRoute>
              <CySAPlusTestPage />
            </ProtectedRoute>
          }/>
          <Route path="/practice-tests/cysa-plus/:testId" element={
            <ProtectedRoute>
              <CySAPlusTestPage />
            </ProtectedRoute>
          }/>
          <Route path="/practice-tests/pen-plus" element={
            <ProtectedRoute>
              <PenPlusTestPage />
            </ProtectedRoute>
          }/>
          <Route path="/practice-tests/pen-plus/:testId" element={
            <ProtectedRoute>
              <PenPlusTestPage />
            </ProtectedRoute>
          }/>
          <Route path="/practice-tests/casp-plus" element={
            <ProtectedRoute>
              <CaspPlusTestPage />
            </ProtectedRoute>
          }/>
          <Route path="/practice-tests/casp-plus/:testId" element={
            <ProtectedRoute>
              <CaspPlusTestPage />
            </ProtectedRoute>
          }/>
          <Route path="/practice-tests/linux-plus" element={
            <ProtectedRoute>
              <LinuxPlusTestPage />
            </ProtectedRoute>
          }/>
          <Route path="/practice-tests/linux-plus/:testId" element={
            <ProtectedRoute>
              <LinuxPlusTestPage />
            </ProtectedRoute>
          }/>
          <Route path="/practice-tests/cloud-plus" element={
            <ProtectedRoute>
              <CloudPlusTestPage />
            </ProtectedRoute>
          }/>
          <Route path="/practice-tests/cloud-plus/:testId" element={
            <ProtectedRoute>
              <CloudPlusTestPage />
            </ProtectedRoute>
          }/>
          <Route path="/practice-tests/data-plus" element={
            <ProtectedRoute>
              <DataPlusTestPage />
            </ProtectedRoute>
          }/>
          <Route path="/practice-tests/data-plus/:testId" element={
            <ProtectedRoute>
              <DataPlusTestPage />
            </ProtectedRoute>
          }/>
          <Route path="/practice-tests/server-plus" element={
            <ProtectedRoute>
              <ServerPlusTestPage />
            </ProtectedRoute>
          }/>
          <Route path="/practice-tests/server-plus/:testId" element={
            <ProtectedRoute>
              <ServerPlusTestPage />
            </ProtectedRoute>
          }/>
          <Route path="/practice-tests/cissp" element={
            <ProtectedRoute>
              <CisspTestPage />
            </ProtectedRoute>
          }/>
          <Route path="/practice-tests/cissp/:testId" element={
            <ProtectedRoute>
              <CisspTestPage />
            </ProtectedRoute>
          }/>
          <Route path="/practice-tests/aws-cloud" element={
            <ProtectedRoute>
              <AWSCloudTestPage />
            </ProtectedRoute>
          }/>
          <Route path="/practice-tests/aws-cloud/:testId" element={
            <ProtectedRoute>
              <AWSCloudTestPage />
            </ProtectedRoute>
          }/>

          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;

ok now here is teh resgiter js file
// src/components/auth/Register.js
import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, Link } from 'react-router-dom';
import { registerUser, clearAuthErrors } from '../store/userSlice';
import {
  FaUser,
  FaLock,
  FaGoogle,
  FaApple,
  FaEnvelope,
  FaChevronRight,
  FaEye,
  FaEyeSlash,
  FaExclamationCircle,
  FaShieldAlt,
  FaCheck,
  FaInfoCircle,
  FaTimes
} from 'react-icons/fa';
import PasswordRequirements from './PasswordRequirements';
import Footer from '../../Footer';
import './Register.css';

const Register = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [agreeTerms, setAgreeTerms] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [formError, setFormError] = useState('');
  const [showPasswordRequirements, setShowPasswordRequirements] = useState(false);
  const [passwordValidation, setPasswordValidation] = useState({
    hasMinimumLength: false,
    hasUpperCase: false,
    hasLowerCase: false,
    hasNumber: false,
    hasSpecialChar: false
  });
  
  const dispatch = useDispatch();
  const navigate = useNavigate();
  
  const { loading, error, userId } = useSelector((state) => state.user);
  
  // Clear errors when component mounts or unmounts
  useEffect(() => {
    dispatch(clearAuthErrors());
    
    return () => {
      dispatch(clearAuthErrors());
    };
  }, [dispatch]);
  
  useEffect(() => {
    // If already logged in, redirect to profile
    if (userId) {
      navigate('/profile');
    }
  }, [userId, navigate]);
  
  // Update password validation whenever password changes
  useEffect(() => {
    setPasswordValidation({
      hasMinimumLength: password.length >= 6,
      hasUpperCase: /[A-Z]/.test(password),
      hasLowerCase: /[a-z]/.test(password),
      hasNumber: /[0-9]/.test(password),
      hasSpecialChar: /[!@#$%^&*()\-_=+[\]{}|;:'",<.>/?`~\\]/.test(password)
    });
  }, [password]);

  const passwordIsValid = () => {
    return Object.values(passwordValidation).every(val => val === true);
  };
  
  const validateForm = () => {
    // Check if all fields are filled
    if (!username || !email || !password || !confirmPassword) {
      setFormError('All fields are required');
      return false;
    }
    
    // Check if password meets requirements
    if (!passwordIsValid()) {
      setFormError('Password does not meet all requirements');
      setShowPasswordRequirements(true);
      return false;
    }
    
    // Check if passwords match
    if (password !== confirmPassword) {
      setFormError('Passwords do not match');
      return false;
    }
    
    // Check if terms are agreed to
    if (!agreeTerms) {
      setFormError('You must agree to the Terms and Conditions');
      return false;
    }
    
    return true;
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormError('');
    
    if (!validateForm()) {
      return;
    }
    
    try {
      const resultAction = await dispatch(registerUser({
        username,
        email,
        password,
        confirmPassword: confirmPassword
      }));
      
      if (registerUser.fulfilled.match(resultAction)) {
        // Registration successful, now login
        navigate('/login', { state: { message: 'Registration successful! Please log in.' } });
      } else {
        // Handle error from the action
        const errorMessage = resultAction.payload || resultAction.error?.message;
        
        // Check for email already taken message
        if (errorMessage && (
            errorMessage.includes("Email is already taken") || 
            errorMessage.includes("Username or email is already taken") ||
            errorMessage.includes("already taken")
        )) {
          setFormError('Email address is already registered. Please use a different email or login.');
        } else {
          setFormError(errorMessage || 'Registration failed. Please try again.');
        }
      }
    } catch (err) {
      // Handle other errors
      if (err.message && (
          err.message.includes("Email is already taken") ||
          err.message.includes("Username or email is already taken") ||
          err.message.includes("already taken")
      )) {
        setFormError('Email address is already registered. Please use a different email or login.');
      } else {
        setFormError('An error occurred. Please try again.');
      }
    }
  };
  
  const handleSocialSignUp = (provider) => {
    setFormError('');
    
    try {
      // Redirect to the backend OAuth route
      window.location.href = `/api/oauth/login/${provider.toLowerCase()}`;
    } catch (err) {
      setFormError(`${provider} sign up failed. Please try again.`);
    }
  };
  
  return (
    <div className="register-container">
      <div className="register-background">
        <div className="register-grid"></div>
        <div className="register-glow"></div>
      </div>
      
      <div className="register-content">
        <div className="register-card">
          <div className="register-header">
            <div className="register-logo">
              <FaShieldAlt className="register-logo-icon" />
            </div>
            <h1 className="register-title">Create Account</h1>
            <p className="register-subtitle">Join and start your learning journey</p>
          </div>
          
          {(formError || error) && (
            <div className="register-error-message">
              <FaExclamationCircle />
              <span>{formError || error}</span>
            </div>
          )}
          
          <form className="register-form" onSubmit={handleSubmit}>
            <div className="register-input-group">
              <label htmlFor="username">Username</label>
              <div className="register-input-wrapper">
                <FaUser className="register-input-icon" />
                <input
                  type="text"
                  id="username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="Choose a unique username"
                  disabled={loading}
                />
              </div>
              <div className="register-input-hint">
                <FaInfoCircle className="register-hint-icon" />
                <span>3-30 characters, letters, numbers, dots, underscores, dashes</span>
              </div>
            </div>
            
            <div className="register-input-group">
              <label htmlFor="email">Email Address</label>
              <div className="register-input-wrapper">
                <FaEnvelope className="register-input-icon" />
                <input
                  type="email"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email address"
                  disabled={loading}
                />
              </div>
            </div>
            
            <div className="register-input-group">
              <label htmlFor="password">Password</label>
              <div className="register-input-wrapper">
                <FaLock className="register-input-icon" />
                <input
                  type={showPassword ? "text" : "password"}
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  onFocus={() => setShowPasswordRequirements(true)}
                  onBlur={() => {
                    // Keep requirements visible if there's text or error
                    if (!password) {
                      setShowPasswordRequirements(false);
                    }
                  }}
                  placeholder="Create a strong password"
                  disabled={loading}
                  className={password && !passwordIsValid() ? "register-input-error" : ""}
                />
                <button
                  type="button"
                  className="register-toggle-password"
                  onClick={() => setShowPassword(!showPassword)}
                  tabIndex="-1"
                >
                  {showPassword ? <FaEyeSlash /> : <FaEye />}
                </button>
              </div>
              
              {showPasswordRequirements && (
                <div className="register-password-requirements">
                  <div className="register-requirements-header">
                    <h4>Password Requirements:</h4>
                    {passwordIsValid() ? (
                      <div className="register-requirements-status valid">
                        <FaCheck /> Valid
                      </div>
                    ) : (
                      <div className="register-requirements-status invalid">
                        <FaTimes /> Invalid
                      </div>
                    )}
                  </div>
                  <ul className="register-requirements-list">
                    <li className={passwordValidation.hasMinimumLength ? 'valid' : 'invalid'}>
                      {passwordValidation.hasMinimumLength ? 
                        <FaCheck className="icon-check" /> : 
                        <FaTimes className="icon-times" />}
                      <span>At least 6 characters long</span>
                    </li>
                    
                    <li className={passwordValidation.hasUpperCase ? 'valid' : 'invalid'}>
                      {passwordValidation.hasUpperCase ? 
                        <FaCheck className="icon-check" /> : 
                        <FaTimes className="icon-times" />}
                      <span>At least one uppercase letter</span>
                    </li>
                    
                    <li className={passwordValidation.hasLowerCase ? 'valid' : 'invalid'}>
                      {passwordValidation.hasLowerCase ? 
                        <FaCheck className="icon-check" /> : 
                        <FaTimes className="icon-times" />}
                      <span>At least one lowercase letter</span>
                    </li>
                    
                    <li className={passwordValidation.hasNumber ? 'valid' : 'invalid'}>
                      {passwordValidation.hasNumber ? 
                        <FaCheck className="icon-check" /> : 
                        <FaTimes className="icon-times" />}
                      <span>At least one number</span>
                    </li>
                    
                    <li className={passwordValidation.hasSpecialChar ? 'valid' : 'invalid'}>
                      {passwordValidation.hasSpecialChar ? 
                        <FaCheck className="icon-check" /> : 
                        <FaTimes className="icon-times" />}
                      <span>At least one special character</span>
                    </li>
                  </ul>
                </div>
              )}
            </div>
            
            <div className="register-input-group">
              <label htmlFor="confirmPassword">Confirm Password</label>
              <div className="register-input-wrapper">
                <FaLock className="register-input-icon" />
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  id="confirmPassword"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="Confirm your password"
                  disabled={loading}
                />
                <button
                  type="button"
                  className="register-toggle-password"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  tabIndex="-1"
                >
                  {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
                </button>
              </div>
              
              {password && confirmPassword && (
                <div className={`register-password-match ${password === confirmPassword ? 'match' : 'no-match'}`}>
                  {password === confirmPassword ? (
                    <>
                      <FaCheck className="register-match-icon" />
                      <span>Passwords match</span>
                    </>
                  ) : (
                    <>
                      <FaExclamationCircle className="register-match-icon" />
                      <span>Passwords don't match</span>
                    </>
                  )}
                </div>
              )}
            </div>
            
            <div className="register-terms">
              <input
                type="checkbox"
                id="agreeTerms"
                checked={agreeTerms}
                onChange={(e) => setAgreeTerms(e.target.checked)}
                disabled={loading}
              />
              <label htmlFor="agreeTerms">
                I agree to the <Link to="/terms">Terms and Conditions</Link>
              </label>
            </div>
            
            <button
              type="submit"
              className="register-button"
              disabled={loading}
            >
              {loading ? (
                <span className="register-button-loading">
                  <span className="register-spinner"></span>
                  Creating Account...
                </span>
              ) : (
                <span className="register-button-text">
                  Create Account
                  <FaChevronRight className="register-button-icon" />
                </span>
              )}
            </button>
          </form>
          
          <div className="register-separator">
            <span>or sign up with</span>
          </div>
          
          <div className="register-social-buttons">
            <button
              type="button"
              className="register-social-button register-google"
              onClick={() => handleSocialSignUp('Google')}
              disabled={loading}
            >
              <FaGoogle />
              <span>Google</span>
            </button>
            
            <button
              type="button"
              className="register-social-button register-apple"
              onClick={() => handleSocialSignUp('Apple')}
              disabled={loading}
            >
              <FaApple />
              <span>Apple</span>
            </button>
          </div>
          
          <div className="register-login-link">
            <span>Already have an account?</span>
            <Link to="/login">Sign In</Link>
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default Register;


ok ill also provide you my existing leaderbaor dpage for conext- becasue were nto usiong thsi exact apge ist simply just fro good context
// src/components/pages/store/LeaderboardPage.js
import React, { useEffect, useState, useRef, useCallback } from 'react';
import './LeaderboardPage.css';
import { 
  FaTrophy, 
  FaMedal, 
  FaStar, 
  FaCrown, 
  FaUserAlt,
  FaSearch,
  FaSyncAlt,
  FaChevronDown,
  FaAngleDoubleDown,
  FaExclamationTriangle,
  FaChevronUp,
  FaSpinner
} from 'react-icons/fa';

// Skeleton component for loading state
const SkeletonItem = ({ index }) => {
  return (
    <div className="leaderboard-item skeleton">
      <div className="leaderboard-rank">
        <div className="skeleton-pulse rank-number"></div>
      </div>
      <div className="leaderboard-avatar-container">
        <div className="skeleton-pulse avatar-circle"></div>
      </div>
      <div className="leaderboard-user-info">
        <div className="skeleton-pulse username-line"></div>
        <div className="leaderboard-user-stats">
          <div className="skeleton-pulse stat-line"></div>
          <div className="skeleton-pulse stat-line shorter"></div>
        </div>
      </div>
    </div>
  );
};

const LeaderboardPage = () => {
  const [leaders, setLeaders] = useState([]);
  const [total, setTotal] = useState(0);
  const [skip, setSkip] = useState(0);
  const [limit, setLimit] = useState(50); // Load 50 at a time
  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [showScrollToTop, setShowScrollToTop] = useState(false);
  
  // Reference to the leaderboard container for scrolling functionality
  const leaderboardRef = useRef(null);
  
  // Function to fetch leaderboard data
  const fetchLeaderboard = useCallback(async (skipCount = 0, replace = true) => {
    try {
      const url = `/api/test/leaderboard?skip=${skipCount}&limit=${limit}`;
      const response = await fetch(url);
      
      if (!response.ok) {
        throw new Error('Failed to load leaderboard data');
      }
      
      const data = await response.json();
      
      if (replace) {
        setLeaders(data.data);
      } else {
        setLeaders(prev => [...prev, ...data.data]);
      }
      
      setTotal(data.total);
      return data;
    } catch (err) {
      setError(err.message);
      return null;
    }
  }, [limit]);

  // Initial data fetch
  useEffect(() => {
    const loadInitialData = async () => {
      setLoading(true);
      setError(null);
      await fetchLeaderboard(skip);
      setLoading(false);
    };
    
    loadInitialData();
  }, [fetchLeaderboard, skip]);

  // Handle scroll event to show/hide scroll-to-top button
  useEffect(() => {
    const handleScroll = () => {
      if (leaderboardRef.current) {
        const { scrollTop } = leaderboardRef.current;
        setShowScrollToTop(scrollTop > 300);
      }
    };
    
    const currentRef = leaderboardRef.current;
    if (currentRef) {
      currentRef.addEventListener('scroll', handleScroll);
    }
    
    return () => {
      if (currentRef) {
        currentRef.removeEventListener('scroll', handleScroll);
      }
    };
  }, []);

  // Load more data
  const handleLoadMore = async () => {
    if (loadingMore) return;
    
    setLoadingMore(true);
    const newSkip = leaders.length;
    const data = await fetchLeaderboard(newSkip, false);
    setLoadingMore(false);
  };

  // Filter leaders by username
  const filteredLeaders = searchTerm.trim() === '' 
    ? leaders 
    : leaders.filter(user => 
        user.username.toLowerCase().includes(searchTerm.toLowerCase())
      );

  // Scroll to top function
  const scrollToTop = () => {
    if (leaderboardRef.current) {
      leaderboardRef.current.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    }
  };

  // Determine if we should show more results
  const hasMoreResults = leaders.length < total;

  // Render trophy icon based on rank
  const renderRankIcon = (rank) => {
    if (rank === 1) return <FaTrophy className="rank-icon gold" />;
    if (rank === 2) return <FaTrophy className="rank-icon silver" />;
    if (rank === 3) return <FaTrophy className="rank-icon bronze" />;
    if (rank <= 10) return <FaStar className="rank-icon top-ten" />;
    return null;
  };

  // Loading state with skeletons
  if (loading) {
    return (
      <div className="leaderboard-container">
        <div className="leaderboard-header">
          <div className="leaderboard-title">
            <h1>Leaderboard</h1>
            <p>See where you rank against other players!</p>
          </div>
        </div>
        
        <div className="leaderboard-content">
          <div className="leaderboard-loading">
            <FaSpinner className="loading-spinner" />
            <p>Loading leaderboard data...</p>
          </div>
          
          <div className="leaderboard-list">
            {Array.from({ length: 5 }).map((_, idx) => (
              <SkeletonItem key={idx} index={idx} />
            ))}
          </div>
        </div>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="leaderboard-container">
        <div className="leaderboard-header">
          <div className="leaderboard-title">
            <h1>Leaderboard</h1>
            <p>See where you rank against other players!</p>
          </div>
        </div>
        
        <div className="leaderboard-error">
          <FaExclamationTriangle className="error-icon" />
          <p>Error loading leaderboard: {error}</p>
          <button 
            className="leaderboard-retry-btn"
            onClick={() => {
              setLoading(true);
              setError(null);
              fetchLeaderboard(0)
                .then(() => setLoading(false))
                .catch(() => setLoading(false));
            }}
          >
            <FaSyncAlt /> Try Again
          </button>
        </div>
      </div>
    );
  }

  // Main render - the leaderboard
  return (
    <div className="leaderboard-container">
      <div className="leaderboard-header">
        <div className="leaderboard-title">
          <h1>Leaderboard</h1>
          <p>See where you rank against other players!</p>
        </div>
        
        <div className="leaderboard-stats">
          <div className="leaderboard-stat">
            <FaCrown className="leaderboard-stat-icon" />
            <div className="leaderboard-stat-text">
              <span className="leaderboard-stat-value">{total}</span>
              <span className="leaderboard-stat-label">Players</span>
            </div>
          </div>
        </div>
      </div>
      
      <div className="leaderboard-controls">
        <div className="leaderboard-search">
          <FaSearch className="search-icon" />
          <input 
            type="text"
            placeholder="Search by username..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="leaderboard-search-input"
          />
          {searchTerm && (
            <button 
              className="leaderboard-search-clear"
              onClick={() => setSearchTerm('')}
            >
              &times;
            </button>
          )}
        </div>
      </div>
      
      <div className="leaderboard-content" ref={leaderboardRef}>
        {filteredLeaders.length === 0 ? (
          <div className="leaderboard-empty">
            <FaUserAlt className="empty-icon" />
            <p>No players found matching "{searchTerm}"</p>
            <button 
              className="leaderboard-reset-btn"
              onClick={() => setSearchTerm('')}
            >
              Clear Search
            </button>
          </div>
        ) : (
          <div className="leaderboard-list">
            {filteredLeaders.map((user) => {
              const rankClass = 
                user.rank === 1 ? 'gold-rank' : 
                user.rank === 2 ? 'silver-rank' : 
                user.rank === 3 ? 'bronze-rank' : 
                user.rank <= 10 ? 'top-rank' : '';
              
              return (
                <div key={user.rank} className={`leaderboard-item ${rankClass}`}>
                  <div className="leaderboard-rank">
                    <span className="rank-number">{user.rank}</span>
                    {renderRankIcon(user.rank)}
                  </div>
                  
                  <div className="leaderboard-avatar-container">
                    {user.avatarUrl ? (
                      <img
                        src={user.avatarUrl}
                        alt={`${user.username}'s avatar`}
                        className="leaderboard-avatar"
                      />
                    ) : (
                      <div className="leaderboard-avatar default">
                        <FaUserAlt />
                      </div>
                    )}
                  </div>
                  
                  <div className="leaderboard-user-info">
                    <h3 className="leaderboard-username">{user.username}</h3>
                    <div className="leaderboard-user-stats">
                      <div className="leaderboard-user-level">
                        <span className="level-label">Level</span>
                        <span className="level-value">{user.level}</span>
                      </div>
                      <div className="leaderboard-user-xp">
                        <span className="xp-label">XP</span>
                        <span className="xp-value">{user.xp.toLocaleString()}</span>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
            
            {hasMoreResults && !searchTerm && (
              <div className="leaderboard-load-more">
                <button 
                  className="load-more-btn"
                  onClick={handleLoadMore}
                  disabled={loadingMore}
                >
                  {loadingMore ? (
                    <>
                      <FaSpinner className="loading-spinner" />
                      <span>Loading...</span>
                    </>
                  ) : (
                    <>
                      <FaAngleDoubleDown />
                      <span>Load More</span>
                    </>
                  )}
                </button>
              </div>
            )}
          </div>
        )}
        
        {showScrollToTop && (
          <button 
            className="scroll-to-top"
            onClick={scrollToTop}
            aria-label="Scroll to top"
          >
            <FaChevronUp />
          </button>
        )}
      </div>
    </div>
  );
};

export default LeaderboardPage;

ok also ill provide you my footer.js an css files for conetxt becasue each paeg will need the footer at teh bottom, 
// src/components/Footer.js
import React from 'react';
import { Link } from 'react-router-dom';
import './footer.css'

const Footer = () => {
  return (
    <footer className="site-footer">
      <div className="footer-content">
        <div className="footer-links">
          <Link to="/">Home</Link>
          <Link to="/privacy">Privacy Policy</Link>
          <Link to="/terms">Terms of Service</Link>
        </div>
        <p className="footer-copyright">© {new Date().getFullYear()} Certgames.com. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
/* Add to global.css */

/* Footer Styles - Updated */
.site-footer {
  width: 100%;
  background-color: rgba(20, 20, 30, 0.7);
  backdrop-filter: blur(8px);
  border-top: 1px solid rgba(128, 128, 255, 0.15);
  padding: 0.8rem 0;
  margin-top: auto;
  position: relative;
  z-index: 10;
}

.footer-content {
  max-width: 1200px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;
}

.footer-links {
  display: flex;
  justify-content: center;
  gap: 1.5rem;
}

.footer-links a {
  color: rgba(255, 255, 255, 0.7);
  font-size: 0.85rem;
  text-decoration: none;
  transition: all 0.2s ease;
  position: relative;
}

.footer-links a:hover {
  color: rgba(128, 128, 255, 0.9);
}

.footer-links a:after {
  content: "";
  position: absolute;
  width: 0;
  height: 1px;
  bottom: -2px;
  left: 0;
  background-color: rgba(128, 128, 255, 0.7);
  transition: width 0.2s ease;
}

.footer-links a:hover:after {
  width: 100%;
}

.footer-copyright {
  font-size: 0.75rem;
  color: rgba(255, 255, 255, 0.5);
  margin: 0;
}

/* Make sure these container elements have flex column and min-height 100vh */
.info-container,
.login-container,
.register-container,
.policy-container {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}

Ok now the current INFO page (Home)

// src/components/pages/Info/InfoPage.js
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Footer from '../../Footer';
import { FaApple, FaGoogle, FaAppStore } from 'react-icons/fa';
import './InfoPage.css';

const InfoPage = () => {
  // For tab switching functionality
  const [activeTab, setActiveTab] = useState('comptia');
  
  // Functions to handle card flipping
  const handleCardClick = (event) => {
    const card = event.currentTarget;
    card.classList.toggle('info-flipped');
    
    // Reset other flipped cards
    document.querySelectorAll('.info-flipped').forEach(flippedCard => {
      if (flippedCard !== card) {
        flippedCard.classList.remove('info-flipped');
      }
    });
  };
  // For the typing animation effect in hero section
  const [displayText, setDisplayText] = useState('');
  const fullText = 'Level up your cybersecurity skills';
  
  // For counting animation
  const [questionCount, setQuestionCount] = useState(0);
  const [certCount, setCertCount] = useState(0);
  const [resourceCount, setResourceCount] = useState(0);
  
  // For parallax effect on scroll
  useEffect(() => {
    const handleScroll = () => {
      const elements = document.querySelectorAll('.info-animate-on-scroll');
      
      elements.forEach(el => {
        const position = el.getBoundingClientRect();
        
        // If element is in viewport
        if(position.top < window.innerHeight && position.bottom >= 0) {
          el.classList.add('info-visible');
        }
      });
    };
    
    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Check on initial load
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);
  
  // Typing effect
  useEffect(() => {
    if (displayText.length < fullText.length) {
      const timer = setTimeout(() => {
        setDisplayText(fullText.slice(0, displayText.length + 1));
      }, 100);
      
      return () => clearTimeout(timer);
    }
  }, [displayText]);
  
  // Counting animation
  useEffect(() => {
    const questionsTarget = 13000;
    const certsTarget = 13;
    const resourcesTarget = 600;
    const duration = 2000; // ms
    const steps = 50;
    
    const questionsIncrement = questionsTarget / steps;
    const certsIncrement = certsTarget / steps;
    const resourcesIncrement = resourcesTarget / steps;
    const interval = duration / steps;
    
    let currentStep = 0;
    
    const timer = setInterval(() => {
      currentStep++;
      
      if (currentStep <= steps) {
        setQuestionCount(Math.floor(questionsIncrement * currentStep));
        setCertCount(Math.floor(certsIncrement * currentStep));
        setResourceCount(Math.floor(resourcesIncrement * currentStep));
      } else {
        setQuestionCount(questionsTarget);
        setCertCount(certsTarget);
        setResourceCount(resourcesTarget);
        clearInterval(timer);
      }
    }, interval);
    
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="info-container">
      {/* Hero Section */}
      <section className="info-hero-section">
        <div className="info-overlay"></div>
        <div className="info-hero-content">
          <div className="info-hero-text">
            <h1 className="info-hero-title">
              <span className="info-logo-text">Cert<span className="info-highlight">Games</span></span>
            </h1>
            <h2 className="info-hero-subtitle">{displayText}<span className="info-cursor"></span></h2>
            <p className="info-hero-description">
              The ultimate gamified cybersecurity training platform that makes learning fun, effective, and addictive.
            </p>
            <div className="info-hero-cta">
              <Link to="/register" className="info-button info-primary-button">
                Start Your Journey <i className="info-icon">→</i>
              </Link>
              <Link to="/login" className="info-button info-secondary-button">
                Log In
              </Link>
            </div>
          </div>

          <div className="info-hero-stats">
            <div className="info-stat-card">
              <div className="info-stat-value">{questionCount.toLocaleString()}</div>
              <div className="info-stat-label">Practice Questions</div>
            </div>
            <div className="info-stat-card">
              <div className="info-stat-value">{certCount}</div>
              <div className="info-stat-label">Certifications</div>
            </div>
            <div className="info-stat-card">
              <div className="info-stat-value">{resourceCount}+</div>
              <div className="info-stat-label">Learning Resources</div>
            </div>
          </div>
        </div>
        <div className="info-scroll-indicator">
          <div className="info-mouse"></div>
          <p>Scroll to explore</p>
        </div>
      </section>

      {/* Gamified Experience Section */}
      <section className="info-feature-section info-gamified-section">
        <div className="info-section-header info-animate-on-scroll">
          <h2>
            <span className="info-section-icon">🎮</span>
            Gamified Learning Experience
          </h2>
          <p>Level up your skills while having fun</p>
        </div>
        <div className="info-feature-grid">
          <div 
            className="info-feature-card info-animate-on-scroll info-clickable-card"
            onClick={handleCardClick}
          >
            <div className="info-feature-icon">
              <i className="info-exp-icon">XP</i>
            </div>
            <h3>Earn XP & Level Up</h3>
            <p>Answer questions correctly to gain experience points and climb the ranks from rookie to elite hacker.</p>
            <div className="info-card-flip">
              <div className="info-video-placeholder">
                <p>XP System Demo</p>
              </div>
            </div>
          </div>
          <div 
            className="info-feature-card info-animate-on-scroll info-clickable-card" 
            onClick={handleCardClick}
          >
            <div className="info-feature-icon">
              <i className="info-coins-icon">💰</i>
            </div>
            <h3>Collect Coins</h3>
            <p>Earn virtual currency by completing tests and daily challenges to unlock exclusive avatars and bonuses.</p>
            <div className="info-card-flip">
              <div className="info-video-placeholder">
                <p>Coins System Demo</p>
              </div>
            </div>
          </div>
          <div 
            className="info-feature-card info-animate-on-scroll info-clickable-card"
            onClick={handleCardClick}
          >
            <div className="info-feature-icon">
              <i className="info-trophy-icon">🏆</i>
            </div>
            <h3>Unlock Achievements</h3>
            <p>Complete special tasks to earn badges and trophies that showcase your growing expertise.</p>
            <div className="info-card-flip">
              <div className="info-video-placeholder">
                <p>Achievements Demo</p>
              </div>
            </div>
          </div>
          <div 
            className="info-feature-card info-animate-on-scroll info-clickable-card"
            onClick={handleCardClick}
          >
            <div className="info-feature-icon">
              <i className="info-leaderboard-icon">📊</i>
            </div>
            <h3>Compete on Leaderboards</h3>
            <p>See how you rank against other cybersecurity enthusiasts and strive to climb to the top.</p>
            <div className="info-card-flip">
              <div className="info-video-placeholder">
                <p>Leaderboard Demo</p>
              </div>
            </div>
          </div>
          <div 
            className="info-feature-card info-animate-on-scroll info-clickable-card"
            onClick={handleCardClick}
          >
            <div className="info-feature-icon">
              <i className="info-theme-icon">🎨</i>
            </div>
            <h3>Customize Your Experience</h3>
            <p>Choose from multiple themes and personalize your learning environment to suit your style.</p>
            <div className="info-card-flip">
              <div className="info-video-placeholder">
                <p>Theme Customization Demo</p>
              </div>
            </div>
          </div>
          <div 
            className="info-feature-card info-animate-on-scroll info-clickable-card"
            onClick={handleCardClick}
          >
            <div className="info-feature-icon">
              <i className="info-mobile-icon">📱</i>
            </div>
            <h3>Learn Anywhere</h3>
            <p>Access all features on desktop, mobile browsers, and our dedicated iOS app for learning on the go.</p>
            <div className="info-card-flip">
              <div className="info-video-placeholder">
                <p>Mobile App Demo</p>
              </div>
            </div>
          </div>
        </div>
        <div className="info-preview-placeholder info-animate-on-scroll">
          <div className="info-preview-overlay">
            <p>Leaderboard & Achievement Preview</p>
          </div>
        </div>
      </section>

      {/* Certification Tests Section */}
      <section className="info-feature-section info-tests-section">
        <div className="info-section-header info-animate-on-scroll">
          <h2>
            <span className="info-section-icon">📝</span>
            Master 13 Certification Paths
          </h2>
          <p>13,000 practice questions across the most in-demand certifications</p>
        </div>
        <div className="info-test-features info-animate-on-scroll">
          <div className="info-test-features-list">
            <div className="info-test-feature">
              <span className="info-check-icon">✓</span>
              <span>Performance-Based Questions (PBQs)</span>
            </div>
            <div className="info-test-feature">
              <span className="info-check-icon">✓</span>
              <span>Realistic Exam Simulations</span>
            </div>
            <div className="info-test-feature">
              <span className="info-check-icon">✓</span>
              <span>Detailed Explanations</span>
            </div>
            <div className="info-test-feature">
              <span className="info-check-icon">✓</span>
              <span>Difficulty Progression System</span>
            </div>
            <div className="info-test-feature">
              <span className="info-check-icon">✓</span>
              <span>Customizable Test Lengths</span>
            </div>
            <div className="info-test-feature">
              <span className="info-check-icon">✓</span>
              <span>Memorable Exam Tips</span>
            </div>
            <div className="info-test-feature">
              <span className="info-check-icon">✓</span>
              <span>Progress Tracking & Analytics</span>
            </div>
            <div className="info-test-feature">
              <span className="info-check-icon">✓</span>
              <span>Exam Mode with Timed Sessions</span>
            </div>
          </div>
          <div className="info-test-selector">
            <div className="info-test-tabs">
              <button 
                className={`info-test-tab ${activeTab === 'comptia' ? 'info-active' : ''}`} 
                onClick={() => setActiveTab('comptia')}
              >
                CompTIA
              </button>
              <button 
                className={`info-test-tab ${activeTab === 'isc2' ? 'info-active' : ''}`} 
                onClick={() => setActiveTab('isc2')}
              >
                ISC2
              </button>
              <button 
                className={`info-test-tab ${activeTab === 'aws' ? 'info-active' : ''}`} 
                onClick={() => setActiveTab('aws')}
              >
                AWS
              </button>
            </div>
            
            {/* CompTIA Tab Content */}
            <div className={`info-cert-list ${activeTab !== 'comptia' ? 'info-hidden' : ''}`}>
              <div className="info-cert-item">
                <span className="info-cert-badge">A+</span>
                <span className="info-cert-name">A+ Core 1 & Core 2</span>
                <span className="info-cert-count">2,000 questions</span>
              </div>
              <div className="info-cert-item">
                <span className="info-cert-badge">N+</span>
                <span className="info-cert-name">Network+</span>
                <span className="info-cert-count">1,000 questions</span>
              </div>
              <div className="info-cert-item">
                <span className="info-cert-badge">S+</span>
                <span className="info-cert-name">Security+</span>
                <span className="info-cert-count">1,000 questions</span>
              </div>
              <div className="info-cert-item">
                <span className="info-cert-badge">CySA+</span>
                <span className="info-cert-name">CySA+</span>
                <span className="info-cert-count">1,000 questions</span>
              </div>
              <div className="info-cert-item">
                <span className="info-cert-badge">PenTest+</span>
                <span className="info-cert-name">PenTest+</span>
                <span className="info-cert-count">1,000 questions</span>
              </div>
              <div className="info-cert-dropdown">
                <div className="info-show-more">
                  <span>+7 more certifications</span>
                </div>
                <div className="info-dropdown-content">
                  <div className="info-cert-item">
                    <span className="info-cert-badge">CASP+</span>
                    <span className="info-cert-name">CASP+</span>
                    <span className="info-cert-count">1,000 questions</span>
                  </div>
                  <div className="info-cert-item">
                    <span className="info-cert-badge">Linux+</span>
                    <span className="info-cert-name">Linux+</span>
                    <span className="info-cert-count">1,000 questions</span>
                  </div>
                  <div className="info-cert-item">
                    <span className="info-cert-badge">Data+</span>
                    <span className="info-cert-name">Data+</span>
                    <span className="info-cert-count">1,000 questions</span>
                  </div>
                  <div className="info-cert-item">
                    <span className="info-cert-badge">Server+</span>
                    <span className="info-cert-name">Server+</span>
                    <span className="info-cert-count">1,000 questions</span>
                  </div>
                  <div className="info-cert-item">
                    <span className="info-cert-badge">Cloud+</span>
                    <span className="info-cert-name">Cloud+</span>
                    <span className="info-cert-count">1,000 questions</span>
                  </div>
                </div>
              </div>
            </div>
            
            {/* ISC2 Tab Content */}
            <div className={`info-cert-list ${activeTab !== 'isc2' ? 'info-hidden' : ''}`}>
              <div className="info-cert-item">
                <span className="info-cert-badge">CISSP</span>
                <span className="info-cert-name">CISSP</span>
                <span className="info-cert-count">1,000 questions</span>
              </div>
            </div>
            
            {/* AWS Tab Content */}
            <div className={`info-cert-list ${activeTab !== 'aws' ? 'info-hidden' : ''}`}>
              <div className="info-cert-item">
                <span className="info-cert-badge">CCP</span>
                <span className="info-cert-name">Cloud Practitioner</span>
                <span className="info-cert-count">1,000 questions</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Interactive Tools Section */}
      <section className="info-feature-section info-tools-section">
        <div className="info-section-header info-animate-on-scroll">
          <h2>
            <span className="info-section-icon">🛠️</span>
            Cutting-Edge Learning Tools
          </h2>
          <p>Unique tools to boost your cybersecurity understanding</p>
        </div>
        <div className="info-tools-grid">
          <div 
            className="info-tool-card info-animate-on-scroll info-clickable-card"
            onClick={handleCardClick}
          >
            <h3>
              <span className="info-tool-icon">🔎</span>
              ScenarioSphere
            </h3>
            <p>Immerse yourself in realistic security scenarios with detailed storylines. Tackle simulated cyberattacks to build your incident response skills.</p>
            <div className="info-card-flip">
              <div className="info-video-placeholder">
                <p>ScenarioSphere Demo</p>
              </div>
            </div>
          </div>
          <div 
            className="info-tool-card info-animate-on-scroll info-clickable-card"
            onClick={handleCardClick}
          >
            <h3>
              <span className="info-tool-icon">🔄</span>
              Analogy Hub
            </h3>
            <p>Complex concepts made simple through custom analogies. Compare security concepts using memorable examples to reinforce your learning.</p>
            <div className="info-card-flip">
              <div className="info-video-placeholder">
                <p>Analogy Hub Demo</p>
              </div>
            </div>
          </div>
          <div 
            className="info-tool-card info-animate-on-scroll info-clickable-card"
            onClick={handleCardClick}
          >
            <h3>
              <span className="info-tool-icon">📋</span>
              GRC Wizard
            </h3>
            <p>Master governance, risk, and compliance topics with custom generated questions across multiple categories and difficulty levels.</p>
            <div className="info-card-flip">
              <div className="info-video-placeholder">
                <p>GRC Wizard Demo</p>
              </div>
            </div>
          </div>
          <div 
            className="info-tool-card info-animate-on-scroll info-clickable-card"
            onClick={handleCardClick}
          >
            <h3>
              <span className="info-tool-icon">⚔️</span>
              XploitCraft
            </h3>
            <p>Learn about exploitation techniques through educational code examples with detailed explanations for ethical understanding.</p>
            <div className="info-card-flip">
              <div className="info-video-placeholder">
                <p>XploitCraft Demo</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Resources Section */}
      <section className="info-feature-section info-resources-section">
        <div className="info-section-header info-animate-on-scroll">
          <h2>
            <span className="info-section-icon">📚</span>
            Comprehensive Resource Library
          </h2>
          <p>600+ curated resources to accelerate your learning</p>
        </div>
        <div className="info-resources-preview info-animate-on-scroll">
          <div className="info-resources-categories">
            <div className="info-resource-category">
              <span className="info-category-icon">🔧</span>
              <span>Security Tools</span>
            </div>
            <div className="info-resource-category">
              <span className="info-category-icon">🎓</span>
              <span>Courses</span>
            </div>
            <div className="info-resource-category">
              <span className="info-category-icon">📹</span>
              <span>YouTube Resources</span>
            </div>
            <div className="info-resource-category">
              <span className="info-category-icon">📜</span>
              <span>Certification Guides</span>
            </div>
            <div className="info-resource-category">
              <span className="info-category-icon">🛡️</span>
              <span>Security Frameworks</span>
            </div>
            <div className="info-resource-category">
              <span className="info-resource-more">+400 more</span>
            </div>
          </div>
        </div>
      </section>

      {/* Support Section */}
      <section className="info-feature-section info-support-section">
        <div className="info-section-header info-animate-on-scroll">
          <h2>
            <span className="info-section-icon">🤝</span>
            24/7 Expert Support
          </h2>
          <p>Get help whenever you need it</p>
        </div>
        <div className="info-support-content info-animate-on-scroll">
          <div 
            className="info-support-preview info-clickable-card"
            onClick={handleCardClick}
          >
            <div className="info-support-chat">
              <div className="info-chat-header">
                <h4>Support / Ask Anything</h4>
              </div>
              <div className="info-chat-message info-user-message">
                <p>How do I know I am prepared for the Security+ exam?</p>
                <span className="info-message-time">09:38 AM</span>
              </div>
              <div className="info-chat-message info-support-message">
                <div className="info-support-avatar"></div>
                <div className="info-message-content">
                  <p>Take a quick self check: grab the exam objectives PDF, skim each bullet point, and try to explain each one in your own words. If you can do that for most of them, go ahead and schedule the exam!</p>
                  <p>Would you like some tips on how to be confident during your exam?</p>
                </div>
                <span className="info-message-time">09:44 AM</span>
              </div>
              <div className="info-chat-input">
                <input type="text" placeholder="Type your message here..." disabled />
                <button className="info-send-button" disabled></button>
              </div>
            </div>
            <div className="info-card-flip">
              <div className="info-video-placeholder">
                <p>Support System Demo</p>
              </div>
            </div>
          </div>
          <div className="info-support-details">
            <h3>Your Personal Cybersecurity Tutor</h3>
            <ul className="info-support-features">
              <li>
                <span className="info-check-icon">✓</span>
                <span>Ask questions about any certification topic</span>
              </li>
              <li>
                <span className="info-check-icon">✓</span>
                <span>Get help with difficult concepts</span>
              </li>
              <li>
                <span className="info-check-icon">✓</span>
                <span>Receive customized study advice</span>
              </li>
              <li>
                <span className="info-check-icon">✓</span>
                <span>Average response time: 3 hours</span>
              </li>
              <li>
                <span className="info-check-icon">✓</span>
                <span>Technical assistance with platform features</span>
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* Daily Rewards Section */}
      <section className="info-feature-section info-daily-section">
        <div className="info-section-header info-animate-on-scroll">
          <h2>
            <span className="info-section-icon">🎁</span>
            Daily Rewards & Challenges
          </h2>
          <p>Keep the momentum going with daily incentives</p>
        </div>
        <div className="info-daily-content info-animate-on-scroll">
          <div 
            className="info-daily-card info-clickable-card"
            onClick={handleCardClick}
          >
            <div className="info-daily-icon">🪙</div>
            <h3>Daily Bonus</h3>
            <p>Claim free coins every 24 hours to spend in the shop</p>
            <div className="info-card-flip">
              <div className="info-video-placeholder">
                <p>Daily Bonus Demo</p>
              </div>
            </div>
          </div>
          <div 
            className="info-daily-card info-clickable-card"
            onClick={handleCardClick}
          >
            <div className="info-daily-icon">🧩</div>
            <h3>Daily PBQ Challenge</h3>
            <p>Tackle a new performance-based question each day to earn bonus coins</p>
            <div className="info-card-flip">
              <div className="info-video-placeholder">
                <p>Daily PBQ Demo</p>
              </div>
            </div>
          </div>
          <div 
            className="info-daily-card info-clickable-card"
            onClick={handleCardClick}
          >
            <div className="info-daily-icon">📰</div>
            <h3>Cyber Brief</h3>
            <p>Stay informed with curated cybersecurity news and study tips</p>
            <div className="info-card-flip">
              <div className="info-video-placeholder">
                <p>Cyber Brief Demo</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="info-pricing-section">
        <div className="info-section-header info-animate-on-scroll">
          <h2>
            <span className="info-section-icon">💎</span>
            Unlock Your Full Potential
          </h2>
          <p>Affordable access to premium cybersecurity training</p>
        </div>
        
        <div className="info-pricing-card info-animate-on-scroll">
          <h3 className="info-plan-name">Access</h3>
          <div className="info-price">
            <span className="info-currency">$</span>
            <span className="info-amount">14</span>
            <span className="info-decimal">.99</span>
            <span className="info-period">/month</span>
          </div>
          
          <ul className="info-pricing-features">
            <li>
              <span className="info-check-icon">✓</span>
              <span>13,000+ Practice Questions</span>
            </li>
            <li>
              <span className="info-check-icon">✓</span>
              <span>13 Certification Paths</span>
            </li>
            <li>
              <span className="info-check-icon">✓</span>
              <span>All Interactive Learning Tools</span>
            </li>
            <li>
              <span className="info-check-icon">✓</span>
              <span>Complete Resource Library</span>
            </li>
            <li>
              <span className="info-check-icon">✓</span>
              <span>24/7 Support / Ask Anything</span>
            </li>
            <li>
              <span className="info-check-icon">✓</span>
              <span>Gamified Learning Experience</span>
            </li>
            <li>
              <span className="info-check-icon">✓</span>
              <span>Daily Rewards & Challenges</span>
            </li>
          </ul>
          
          <Link to="/register" className="info-button info-cta-button">
            Get Started Now
          </Link>
          <p className="info-pricing-note">Cancel anytime. No long-term commitment.</p>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="info-testimonials-section">
        <div className="info-section-header info-animate-on-scroll">
          <h2>
            <span className="info-section-icon">💬</span>
            Success Stories
          </h2>
          <p>Join thousands who have leveled up their careers</p>
        </div>
        
        <div className="info-testimonials-grid">
          <div className="info-testimonial-card info-animate-on-scroll">
            <div className="info-testimonial-content">
              <p>"I passed my Security+ on the first try after using CertGames for just two months. The gamification made studying actually enjoyable for once!"</p>
            </div>
            <div className="info-testimonial-author">
              <div className="info-author-avatar" style={{ backgroundColor: '#4e54c8' }}></div>
              <div className="info-author-info">
                <p className="info-author-name">Alex T.</p>
                <p className="info-author-title">Security Analyst</p>
              </div>
            </div>
          </div>
          
          <div className="info-testimonial-card info-animate-on-scroll">
            <div className="info-testimonial-content">
              <p>"The interactive scenarios and analogies helped me understand complex concepts that I'd been struggling with for weeks. I'm now CISSP certified!"</p>
            </div>
            <div className="info-testimonial-author">
              <div className="info-author-avatar" style={{ backgroundColor: '#43cea2' }}></div>
              <div className="info-author-info">
                <p className="info-author-name">Samantha K.</p>
                <p className="info-author-title">Cybersecurity Manager</p>
              </div>
            </div>
          </div>
          
          <div className="info-testimonial-card info-animate-on-scroll">
            <div className="info-testimonial-content">
              <p>"The 24/7 support feature is amazing! Whenever I get stuck on a concept, I get personalized help within hours. Worth every penny."</p>
            </div>
            <div className="info-testimonial-author">
              <div className="info-author-avatar" style={{ backgroundColor: '#ff9966' }}></div>
              <div className="info-author-info">
                <p className="info-author-name">Marcus J.</p>
                <p className="info-author-title">IT Student</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="info-faq-section">
        <div className="info-section-header info-animate-on-scroll">
          <h2>
            <span className="info-section-icon">❓</span>
            Frequently Asked Questions
          </h2>
          <p>Everything you need to know</p>
        </div>
        
        <div className="info-faq-content">
          <div className="info-faq-item info-animate-on-scroll">
            <h3 className="info-faq-question">How up-to-date are the practice questions?</h3>
            <p className="info-faq-answer">Our team of certified experts regularly updates all questions to match the latest exam objectives and industry changes. We ensure our content remains current with all certification requirements.</p>
          </div>
          
          <div className="info-faq-item info-animate-on-scroll">
            <h3 className="info-faq-question">Can I access CertGames on my mobile device?</h3>
            <p className="info-faq-answer">Absolutely! CertGames is fully responsive and works on all devices including desktop, tablet, and mobile phones. Your progress syncs across all platforms automatically.</p>
          </div>
          
          <div className="info-faq-item info-animate-on-scroll">
            <h3 className="info-faq-question">How does the subscription work?</h3>
            <p className="info-faq-answer">For $14.99 per month, you gain unlimited access to all practice tests, tools, resources, and features. You can cancel your subscription at any time with no questions asked.</p>
          </div>
          
          <div className="info-faq-item info-animate-on-scroll">
            <h3 className="info-faq-question">Is there a guarantee I'll pass my certification exam?</h3>
            <p className="info-faq-answer">While we can't guarantee passing (no one ethically can), our success rates are extremely high. Users who complete all practice tests for their target certification and maintain a score of 85% or higher have a passing rate of over 95% on their actual exams.</p>
          </div>
          
          <div className="info-faq-item info-animate-on-scroll">
            <h3 className="info-faq-question">What if I need help with a specific concept?</h3>
            <p className="info-faq-answer">Our 24/7 "Ask Anything" support feature allows you to ask any certification-related question and receive a thorough, personalized answer from our expert team, typically within 3 hours.</p>
          </div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="info-final-cta">
        <div className="info-cta-content info-animate-on-scroll">
          <h2>Ready to Begin Your Cybersecurity Journey?</h2>
          <p>Join thousands of security professionals who've transformed their careers with CertGames</p>
          <div className="info-cta-buttons">
            <Link to="/register" className="info-button info-primary-button">
              Create Free Account
            </Link>
            <Link to="/login" className="info-button info-secondary-button">
              Log In
            </Link>
          </div>
          <div className="info-oauth-options">
            <span>Quick sign-in with:</span>
            <div className="info-oauth-buttons">
              <button className="info-oauth-button info-google">
                <FaGoogle className="info-oauth-icon" /> Google
              </button>
              <button className="info-oauth-button info-apple">
                <FaApple className="info-oauth-icon" /> Apple ID
              </button>
            </div>
          </div>
          <div className="info-app-download">
            <a href="#" className="info-app-link">
              <FaAppStore className="info-app-icon" />
              <span>Download on the App Store</span>
            </a>
          </div>
        </div>
        <div className="info-cta-graphic">
          <div className="info-glow"></div>
        </div>
      </section>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default InfoPage;

/* src/components/pages/Info/InfoPage.css */

/* Main container styles */
.info-container {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  overflow-x: hidden;
  background-color: #0a0a14;
  color: rgba(255, 255, 255, 0.9);
  font-family: 'Chakra Petch', 'Roboto', sans-serif;
}

/* Global animation for scroll reveal */
.info-animate-on-scroll {
  opacity: 0;
  transform: translateY(30px);
  transition: opacity 0.8s ease-out, transform 0.8s ease-out;
}

.info-animate-on-scroll.info-visible {
  opacity: 1;
  transform: translateY(0);
}

/* Main containers with padding to ensure consistent margins */
.info-feature-section, 
.info-pricing-section, 
.info-testimonials-section, 
.info-faq-section, 
.info-final-cta {
  padding: 5rem 2rem;
  position: relative;
  z-index: 1;
}

.info-section-header {
  text-align: center;
  margin-bottom: 3rem;
}

.info-section-header h2 {
  font-size: 2.5rem;
  margin-bottom: 1rem;
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 600;
}

.info-section-icon {
  margin-right: 0.75rem;
  font-size: 2rem;
}

.info-section-header p {
  font-size: 1.25rem;
  opacity: 0.8;
  max-width: 600px;
  margin: 0 auto;
}

/* Button styles */
.info-button {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 0.8rem 1.6rem;
  border-radius: 8px;
  font-weight: 500;
  transition: all 0.3s ease;
  text-decoration: none;
  font-size: 1.05rem;
  cursor: pointer;
  letter-spacing: 0.5px;
  border: none;
}

.info-primary-button {
  background: linear-gradient(135deg, #00d084, #00b8d4);
  color: #0a0a14;
  box-shadow: 0 0 15px rgba(0, 208, 132, 0.5);
}

.info-primary-button:hover {
  box-shadow: 0 0 25px rgba(0, 208, 132, 0.7);
  transform: translateY(-2px);
}

.info-secondary-button {
  background: rgba(100, 100, 255, 0.15);
  border: 1px solid rgba(100, 100, 255, 0.4);
  color: white;
}

.info-secondary-button:hover {
  background: rgba(100, 100, 255, 0.25);
}

.info-cta-button {
  background: linear-gradient(135deg, #6e48aa, #9d50bb);
  color: white;
  padding: 1rem 2rem;
  font-size: 1.1rem;
  box-shadow: 0 0 20px rgba(109, 72, 170, 0.5);
  width: 100%;
  max-width: 300px;
  margin: 1.5rem auto;
  display: block;
}

.info-cta-button:hover {
  box-shadow: 0 0 30px rgba(109, 72, 170, 0.7);
  transform: translateY(-3px);
}

.info-icon {
  margin-left: 8px;
  font-size: 1.1em;
}

/* Hero Section */
.info-hero-section {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  overflow: hidden;
  padding: 2rem;
}

.info-overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: radial-gradient(circle at center, rgba(25, 25, 50, 0.6) 0%, rgba(10, 10, 20, 0.9) 100%);
  z-index: -1;
}

.info-hero-section::before {
  content: " ";
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: url('https://via.placeholder.com/1920x1080?text=Cyber+Background') no-repeat center center;
  background-size: cover;
  filter: blur(3px) brightness(0.3);
  z-index: -2;
}

.info-hero-content {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  max-width: 1200px;
  width: 100%;
  z-index: 1;
}

.info-hero-text {
  margin-bottom: 4rem;
}

.info-hero-title {
  font-size: 4rem;
  font-weight: 700;
  margin-bottom: 0.5rem;
  color: white;
}

.info-logo-text {
  color: white;
  font-family: 'Orbitron', 'Chakra Petch', sans-serif;
  letter-spacing: 1px;
}

.info-highlight {
  background: linear-gradient(135deg, #00d084, #00b8d4);
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
}

.info-hero-subtitle {
  font-size: 2.5rem;
  margin-bottom: 1.5rem;
  color: white;
  min-height: 3.5rem;
  display: flex;
  justify-content: center;
  align-items: center;
  white-space: nowrap;
}

.info-cursor {
  display: inline-block;
  width: 3px;
  height: 1.5em;
  background-color: #00d084;
  margin-left: 0;
  animation: blink 1s infinite;
}

@keyframes blink {
  0%, 100% { opacity: 1; }
  50% { opacity: 0; }
}

.info-hero-description {
  font-size: 1.25rem;
  max-width: 700px;
  margin: 0 auto 2rem auto;
  opacity: 0.9;
  line-height: 1.6;
}

.info-hero-cta {
  display: flex;
  gap: 1rem;
  justify-content: center;
  margin-top: 2rem;
}

.info-hero-stats {
  display: flex;
  justify-content: center;
  gap: 2rem;
  flex-wrap: wrap;
  margin-top: 1rem;
}

.info-stat-card {
  background: rgba(20, 20, 40, 0.5);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(100, 100, 255, 0.2);
  border-radius: 12px;
  padding: 1.5rem;
  width: 200px;
  text-align: center;
}

.info-stat-value {
  font-size: 2.5rem;
  font-weight: 700;
  margin-bottom: 0.5rem;
  background: linear-gradient(135deg, #00d084, #00b8d4);
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
}

.info-stat-label {
  font-size: 1rem;
  opacity: 0.9;
}

.info-scroll-indicator {
  position: absolute;
  bottom: 2rem;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  flex-direction: column;
  align-items: center;
  opacity: 0.7;
  animation: bounce 2s infinite;
}

.info-mouse {
  width: 30px;
  height: 50px;
  border: 2px solid rgba(255, 255, 255, 0.8);
  border-radius: 20px;
  position: relative;
}

.info-mouse::before {
  content: " ";
  position: absolute;
  top: 10px;
  left: 50%;
  transform: translateX(-50%);
  width: 6px;
  height: 6px;
  background: white;
  border-radius: 50%;
  animation: mouse-scroll 2s infinite;
}

@keyframes mouse-scroll {
  0%, 100% { opacity: 0; transform: translate(-50%, 0); }
  50% { opacity: 1; transform: translate(-50%, 15px); }
}

@keyframes bounce {
  0%, 20%, 50%, 80%, 100% { transform: translateY(0) translateX(-50%); }
  40% { transform: translateY(-10px) translateX(-50%); }
  60% { transform: translateY(-5px) translateX(-50%); }
}

/* Gamified Section */
.info-gamified-section {
  background: linear-gradient(to bottom, #0a0a14, #0f102a);
  position: relative;
}

.info-gamified-section::before {
  content: " ";
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: 
    radial-gradient(circle at 20% 30%, rgba(0, 208, 132, 0.05) 0%, transparent 50%),
    radial-gradient(circle at 80% 70%, rgba(0, 184, 212, 0.05) 0%, transparent 50%);
  z-index: -1;
}

.info-feature-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 2rem;
  margin-bottom: 3rem;
}

.info-feature-card {
  background: rgba(25, 25, 50, 0.3);
  border: 1px solid rgba(100, 100, 255, 0.15);
  border-radius: 12px;
  padding: 2rem;
  transition: all 0.3s ease;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
}

.info-feature-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 5px 25px rgba(100, 100, 255, 0.2);
  border-color: rgba(100, 100, 255, 0.3);
}

.info-feature-icon {
  width: 60px;
  height: 60px;
  border-radius: 30px;
  background: rgba(100, 100, 255, 0.15);
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 1.5rem;
}

.info-exp-icon, 
.info-coins-icon, 
.info-trophy-icon, 
.info-leaderboard-icon {
  font-size: 1.5rem;
  font-weight: 600;
}

.info-exp-icon {
  color: #6dffb8;
}

.info-coins-icon {
  color: #ffd700;
}

.info-trophy-icon {
  color: #ff9d00;
}

.info-leaderboard-icon {
  color: #00b8d4;
}

.info-feature-card h3 {
  font-size: 1.4rem;
  margin-bottom: 1rem;
  color: white;
}

.info-feature-card p {
  font-size: 1rem;
  opacity: 0.8;
  line-height: 1.5;
}

.info-preview-placeholder {
  width: 100%;
  max-width: 900px;
  height: 400px;
  background: rgba(30, 30, 60, 0.3);
  border: 1px solid rgba(100, 100, 255, 0.2);
  border-radius: 12px;
  margin: 3rem auto 0;
  position: relative;
  overflow: hidden;
}

.info-preview-placeholder::before {
  content: " ";
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: url('https://via.placeholder.com/900x400?text=Game+Interface') no-repeat center center;
  background-size: cover;
  filter: brightness(0.7) blur(1px);
  z-index: -1;
}

.info-preview-overlay {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background: rgba(15, 15, 30, 0.85);
  backdrop-filter: blur(5px);
  padding: 1rem 2rem;
  border-radius: 8px;
  border: 1px solid rgba(100, 100, 255, 0.3);
}

.info-preview-overlay p {
  margin: 0;
  font-size: 1.2rem;
  color: white;
}

/* Tests Section */
.info-tests-section {
  background: linear-gradient(to bottom, #0f102a, #131428);
  position: relative;
}

.info-tests-section::before {
  content: " ";
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: 
    radial-gradient(circle at 80% 20%, rgba(109, 72, 170, 0.05) 0%, transparent 50%),
    radial-gradient(circle at 20% 80%, rgba(157, 80, 187, 0.05) 0%, transparent 50%);
  z-index: -1;
}

.info-test-features {
  display: flex;
  flex-wrap: wrap;
  gap: 2rem;
  justify-content: center;
  align-items: stretch;
}

.info-test-features-list {
  flex: 1;
  min-width: 300px;
  max-width: 500px;
  padding: 2rem;
  background: rgba(25, 25, 50, 0.3);
  border: 1px solid rgba(100, 100, 255, 0.15);
  border-radius: 12px;
}

.info-test-feature {
  margin-bottom: 1.5rem;
  display: flex;
  align-items: center;
}

.info-check-icon {
  color: #00d084;
  font-size: 1.3rem;
  margin-right: 1rem;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 25px;
  height: 25px;
  background: rgba(0, 208, 132, 0.1);
  border-radius: 50%;
}

.info-test-selector {
  flex: 1;
  min-width: 300px;
  max-width: 500px;
}

.info-test-tabs {
  display: flex;
  margin-bottom: 1.5rem;
  border-bottom: 1px solid rgba(100, 100, 255, 0.15);
}

.info-test-tab {
  padding: 0.8rem 1.5rem;
  cursor: pointer;
  background: none;
  border: none;
  color: rgba(255, 255, 255, 0.7);
  font-size: 1rem;
  transition: all 0.3s ease;
  position: relative;
}

.info-test-tab.info-active {
  color: white;
  font-weight: 500;
}

.info-test-tab.info-active::after {
  content: "";
  position: absolute;
  bottom: -1px;
  left: 0;
  width: 100%;
  height: 2px;
  background: linear-gradient(135deg, #6e48aa, #9d50bb);
}

.info-cert-list {
  background: rgba(25, 25, 50, 0.3);
  border: 1px solid rgba(100, 100, 255, 0.15);
  border-radius: 12px;
  overflow: hidden;
}

.info-cert-item {
  display: flex;
  align-items: center;
  padding: 1rem 1.5rem;
  border-bottom: 1px solid rgba(100, 100, 255, 0.1);
  transition: background 0.3s ease;
}

.info-cert-item:hover {
  background: rgba(100, 100, 255, 0.05);
}

.info-cert-badge {
  background: linear-gradient(135deg, #6e48aa, #9d50bb);
  color: white;
  padding: 0.4rem 0.7rem;
  border-radius: 6px;
  font-weight: 500;
  margin-right: 1rem;
  min-width: 60px;
  text-align: center;
}

.info-cert-name {
  flex: 1;
  font-size: 1rem;
}

.info-cert-count {
  font-size: 0.85rem;
  opacity: 0.7;
}

.info-show-more {
  text-align: center;
  padding: 1rem;
  background: rgba(100, 100, 255, 0.05);
  cursor: pointer;
  transition: background 0.3s ease;
}

.info-show-more:hover {
  background: rgba(100, 100, 255, 0.15);
}

.info-hidden {
  display: none;
}

.info-cert-dropdown {
  position: relative;
}

.info-dropdown-content {
  display: none;
  position: absolute;
  left: 0;
  right: 0;
  top: 100%;
  background: rgba(25, 25, 50, 0.95);
  border: 1px solid rgba(100, 100, 255, 0.2);
  border-top: none;
  border-radius: 0 0 12px 12px;
  z-index: 10;
  overflow: hidden;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.3);
}

.info-cert-dropdown:hover .info-dropdown-content,
.info-show-more:hover + .info-dropdown-content,
.info-show-more:focus + .info-dropdown-content {
  display: block;
  animation: slideDown 0.3s ease-out;
}

@keyframes slideDown {
  from { opacity: 0; transform: translateY(-10px); }
  to { opacity: 1; transform: translateY(0); }
}

/* Tools Section */
.info-tools-section {
  background: linear-gradient(to bottom, #131428, #161635);
  position: relative;
}

.info-tools-section::before {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: 
    radial-gradient(circle at 30% 30%, rgba(255, 99, 71, 0.05) 0%, transparent 50%),
    radial-gradient(circle at 70% 70%, rgba(255, 157, 0, 0.05) 0%, transparent 50%);
  z-index: -1;
}

.info-tools-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 2rem;
}

.info-tool-card {
  background: rgba(25, 25, 50, 0.3);
  border: 1px solid rgba(100, 100, 255, 0.15);
  border-radius: 12px;
  padding: 2rem;
  transition: all 0.3s ease;
}

.info-tool-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 5px 25px rgba(100, 100, 255, 0.2);
  border-color: rgba(100, 100, 255, 0.3);
}

.info-tool-card h3 {
  display: flex;
  align-items: center;
  font-size: 1.4rem;
  margin-bottom: 1.5rem;
  color: white;
}

.info-tool-icon {
  margin-right: 0.8rem;
  font-size: 1.4rem;
}

.info-tool-card p {
  font-size: 1rem;
  opacity: 0.8;
  line-height: 1.5;
}

/* Resources Section */
.info-resources-section {
  background: linear-gradient(to bottom, #161635, #181842);
  position: relative;
}

.info-resources-section::before {
  content: " ";
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: 
    radial-gradient(circle at 20% 20%, rgba(0, 184, 212, 0.05) 0%, transparent 50%),
    radial-gradient(circle at 80% 80%, rgba(0, 208, 132, 0.05) 0%, transparent 50%);
  z-index: -1;
}

.info-resources-preview {
  max-width: 900px;
  margin: 0 auto;
}

.info-resources-categories {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 1.5rem;
}

.info-resource-category {
  background: rgba(25, 25, 50, 0.3);
  border: 1px solid rgba(100, 100, 255, 0.15);
  border-radius: 12px;
  padding: 1.5rem;
  display: flex;
  align-items: center;
  transition: all 0.3s ease;
}

.info-resource-category:hover {
  transform: translateY(-5px);
  box-shadow: 0 5px 25px rgba(100, 100, 255, 0.2);
  border-color: rgba(100, 100, 255, 0.3);
}

.info-category-icon {
  font-size: 1.5rem;
  margin-right: 1rem;
}

.info-category-count {
  margin-left: auto;
  background: rgba(100, 100, 255, 0.15);
  padding: 0.3rem 0.7rem;
  border-radius: 20px;
  font-size: 0.85rem;
}

.info-resource-more {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 500;
  color: rgba(255, 255, 255, 0.8);
}

/* Support Section */
.info-support-section {
  background: linear-gradient(to bottom, #181842, #1a1a4a);
  position: relative;
}

.info-support-section::before {
  content: " ";
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: 
    radial-gradient(circle at 70% 30%, rgba(255, 99, 71, 0.05) 0%, transparent 50%),
    radial-gradient(circle at 30% 70%, rgba(255, 157, 0, 0.05) 0%, transparent 50%);
  z-index: -1;
}

.info-support-content {
  display: flex;
  flex-wrap: wrap;
  gap: 3rem;
  align-items: center;
  justify-content: center;
}

.info-support-preview {
  flex: 1;
  min-width: 320px;
  max-width: 500px;
}

.info-support-chat {
  background: rgba(25, 25, 50, 0.3);
  border: 1px solid rgba(100, 100, 255, 0.15);
  border-radius: 12px;
  overflow: hidden;
  height: 400px;
  display: flex;
  flex-direction: column;
}

.info-chat-header {
  padding: 1rem;
  background: rgba(25, 25, 70, 0.5);
  border-bottom: 1px solid rgba(100, 100, 255, 0.2);
}

.info-chat-header h4 {
  margin: 0;
  color: white;
  font-size: 1.1rem;
}

.info-chat-message {
  padding: 1rem;
  margin: 1rem;
  border-radius: 8px;
  position: relative;
  max-width: 80%;
}

.info-user-message {
  background: rgba(100, 100, 255, 0.15);
  align-self: flex-end;
  margin-left: auto;
}

.info-support-message {
  background: rgba(157, 80, 187, 0.15);
  display: flex;
  gap: 1rem;
}

.info-support-avatar {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: linear-gradient(135deg, #6e48aa, #9d50bb);
  flex-shrink: 0;
}

.info-message-content {
  flex: 1;
}

.info-message-content p {
  margin: 0 0 0.8rem;
  line-height: 1.5;
  font-size: 0.95rem;
}

.info-message-content p:last-child {
  margin-bottom: 0;
}

.info-message-time {
  position: absolute;
  bottom: -1.2rem;
  right: 0.5rem;
  font-size: 0.75rem;
  opacity: 0.6;
}

.info-chat-input {
  margin-top: auto;
  padding: 1rem;
  display: flex;
  gap: 1rem;
  border-top: 1px solid rgba(100, 100, 255, 0.15);
}

.info-chat-input input {
  flex: 1;
  padding: 0.8rem 1rem;
  border-radius: 8px;
  border: 1px solid rgba(100, 100, 255, 0.3);
  background: rgba(15, 15, 35, 0.5);
  color: white;
}

.info-send-button {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: linear-gradient(135deg, #6e48aa, #9d50bb);
  border: none;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
}

.info-send-button::before {
  content: "→";
  color: white;
  font-size: 1.2rem;
}

.info-support-details {
  flex: 1;
  min-width: 300px;
  max-width: 500px;
}

.info-support-details h3 {
  font-size: 1.8rem;
  margin-bottom: 1.5rem;
  color: white;
}

.info-support-features {
  list-style: none;
  padding: 0;
  margin: 0;
}

.info-support-features li {
  margin-bottom: 1rem;
  display: flex;
  align-items: center;
}

/* Daily Section */
.info-daily-section {
  background: linear-gradient(to bottom, #1a1a4a, #1c1c52);
  position: relative;
}

.info-daily-section::before {
  content: " ";
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: 
    radial-gradient(circle at 20% 70%, rgba(255, 215, 0, 0.05) 0%, transparent 50%),
    radial-gradient(circle at 80% 30%, rgba(255, 157, 0, 0.05) 0%, transparent 50%);
  z-index: -1;
}

.info-daily-content {
  display: flex;
  flex-wrap: wrap;
  gap: 2rem;
  justify-content: center;
}

.info-daily-card {
  background: rgba(25, 25, 50, 0.3);
  border: 1px solid rgba(100, 100, 255, 0.15);
  border-radius: 12px;
  padding: 2rem;
  text-align: center;
  flex: 1;
  min-width: 250px;
  max-width: 350px;
  transition: all 0.3s ease;
}

.info-daily-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 5px 25px rgba(100, 100, 255, 0.2);
  border-color: rgba(100, 100, 255, 0.3);
}

.info-daily-icon {
  font-size: 2.5rem;
  margin-bottom: 1.5rem;
}

.info-daily-card h3 {
  font-size: 1.4rem;
  margin-bottom: 1rem;
  color: white;
}

.info-daily-card p {
  font-size: 1rem;
  opacity: 0.8;
  line-height: 1.5;
}

/* Pricing Section */
.info-pricing-section {
  background: linear-gradient(to bottom, #1c1c52, #1e1e5a);
  position: relative;
}

.info-pricing-section::before {
  content: " ";
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: 
    radial-gradient(circle at 30% 30%, rgba(100, 208, 255, 0.05) 0%, transparent 50%),
    radial-gradient(circle at 70% 70%, rgba(157, 80, 187, 0.05) 0%, transparent 50%);
  z-index: -1;
}

.info-pricing-card {
  background: rgba(25, 25, 50, 0.3);
  border: 1px solid rgba(100, 100, 255, 0.15);
  border-radius: 12px;
  padding: 3rem 2rem;
  max-width: 500px;
  margin: 0 auto;
  text-align: center;
  position: relative;
  overflow: hidden;
}

/* Removed pricing badge */

.info-plan-name {
  font-size: 2rem;
  margin-bottom: 1rem;
  color: white;
}

.info-price {
  font-size: 1.5rem;
  margin-bottom: 2rem;
  color: white;
  display: flex;
  align-items: baseline;
  justify-content: center;
}

.info-currency {
  font-size: 1.8rem;
  margin-right: 0.2rem;
  vertical-align: top;
}

.info-amount {
  font-size: 4rem;
  font-weight: 700;
  line-height: 1;
}

.info-decimal {
  font-size: 1.8rem;
  margin-right: 0.5rem;
}

.info-period {
  font-size: 1.2rem;
  opacity: 0.7;
}

.info-pricing-features {
  list-style: none;
  padding: 0;
  margin: 0 0 2rem;
  text-align: left;
}

.info-pricing-features li {
  margin-bottom: 1rem;
  display: flex;
  align-items: center;
}

.info-pricing-note {
  font-size: 0.9rem;
  opacity: 0.7;
  margin-top: 1rem;
}

/* Testimonials Section */
.info-testimonials-section {
  background: linear-gradient(to bottom, #1e1e5a, #202062);
  position: relative;
}

.info-testimonials-section::before {
  content: " ";
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: 
    radial-gradient(circle at 70% 30%, rgba(0, 208, 132, 0.05) 0%, transparent 50%),
    radial-gradient(circle at 30% 70%, rgba(0, 184, 212, 0.05) 0%, transparent 50%);
  z-index: -1;
}

.info-testimonials-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
}

.info-testimonial-card {
  background: rgba(25, 25, 50, 0.3);
  border: 1px solid rgba(100, 100, 255, 0.15);
  border-radius: 12px;
  padding: 2rem;
  position: relative;
  overflow: visible;
}

.info-testimonial-card::before {
  content: " ";
  position: absolute;
  top: 1rem;
  left: 1rem;
  font-size: 4rem;
  color: rgba(100, 100, 255, 0.15);
  line-height: 1;
}

.info-testimonial-content {
  position: relative;
  z-index: 1;
  margin-bottom: 1.5rem;
}

.info-testimonial-content p {
  font-size: 1rem;
  line-height: 1.6;
}

.info-testimonial-author {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.info-author-avatar {
  width: 50px;
  height: 50px;
  border-radius: 50%;
  flex-shrink: 0;
}

.info-author-name {
  margin: 0 0 0.3rem;
  color: white;
  font-weight: 500;
}

.info-author-title {
  margin: 0;
  font-size: 0.9rem;
  opacity: 0.7;
}

/* FAQ Section */
.info-faq-section {
  background: linear-gradient(to bottom, #202062, #22226a);
  position: relative;
}

.info-faq-section::before {
  content: " ";
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: 
    radial-gradient(circle at 40% 40%, rgba(109, 72, 170, 0.05) 0%, transparent 50%),
    radial-gradient(circle at 60% 60%, rgba(157, 80, 187, 0.05) 0%, transparent 50%);
  z-index: -1;
}

.info-faq-content {
  max-width: 800px;
  margin: 0 auto;
}

.info-faq-item {
  background: rgba(25, 25, 50, 0.3);
  border: 1px solid rgba(100, 100, 255, 0.15);
  border-radius: 12px;
  padding: 1.5rem 2rem;
  margin-bottom: 1.5rem;
  transition: all 0.3s ease;
}

.info-faq-item:hover {
  border-color: rgba(100, 100, 255, 0.3);
}

.info-faq-question {
  font-size: 1.3rem;
  margin: 0 0 1rem;
  color: white;
}

.info-faq-answer {
  font-size: 1rem;
  line-height: 1.6;
  opacity: 0.8;
  margin: 0;
}

/* Final CTA Section */
.info-final-cta {
  background: linear-gradient(to bottom, #22226a, #242472);
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
}

.info-final-cta::before {
  content: " ";
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: 
    radial-gradient(circle at 30% 50%, rgba(109, 72, 170, 0.1) 0%, transparent 50%),
    radial-gradient(circle at 70% 50%, rgba(157, 80, 187, 0.1) 0%, transparent 50%);
  z-index: -1;
}

.info-cta-content {
  text-align: center;
  max-width: 700px;
  padding: 2rem;
  position: relative;
  z-index: 1;
}

.info-cta-content h2 {
  font-size: 2.5rem;
  margin-bottom: 1.5rem;
  color: white;
}

.info-cta-content p {
  font-size: 1.25rem;
  margin-bottom: 2rem;
  opacity: 0.9;
}

.info-cta-buttons {
  display: flex;
  gap: 1.5rem;
  justify-content: center;
  flex-wrap: wrap;
}

.info-cta-graphic {
  position: absolute;
  width: 100%;
  height: 100%;
  z-index: 0;
  overflow: hidden;
}

.info-glow {
  position: absolute;
  width: 600px;
  height: 600px;
  border-radius: 50%;
  background: radial-gradient(circle, rgba(109, 72, 170, 0.2) 0%, transparent 70%);
  animation: float 8s infinite ease-in-out;
}

@keyframes float {
  0%, 100% { transform: translate(-50%, -50%) scale(1); }
  50% { transform: translate(-50%, -50%) scale(1.2); }
}

/* OAuth and App Download styles */
.info-oauth-options {
  margin-top: 2rem;
  text-align: center;
}

.info-oauth-options > span {
  display: block;
  margin-bottom: 1rem;
  opacity: 0.7;
  font-size: 0.9rem;
}

.info-oauth-buttons {
  display: flex;
  gap: 1rem;
  justify-content: center;
}

.info-oauth-button {
  padding: 0.6rem 1.2rem;
  border-radius: 8px;
  border: none;
  background: rgba(30, 30, 60, 0.7);
  color: white;
  font-size: 0.9rem;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.info-oauth-button::before {
  content: " ";
  display: inline-block;
  width: 18px;
  height: 18px;
  margin-right: 8px;
}

.info-google::before {
  background-color: #4285F4;
  border-radius: 50%;
}

.info-apple::before {
  background-color: white;
  border-radius: 0;
}

.info-oauth-button:hover {
  background: rgba(60, 60, 100, 0.7);
  transform: translateY(-2px);
}

.info-app-download {
  margin-top: 2rem;
  text-align: center;
}

.info-app-link {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.8rem 1.5rem;
  background: rgba(0, 0, 0, 0.8);
  border-radius: 8px;
  text-decoration: none;
  color: white;
  font-size: 0.9rem;
  transition: all 0.3s ease;
}

.info-app-link:hover {
  transform: translateY(-2px);
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.3);
}

.info-app-icon {
  font-size: 1.2rem;
}

/* Extra styles for other elements */
.info-theme-icon, .info-mobile-icon {
  color: #43cea2;
}

/* Media Queries for Responsiveness */
@media (max-width: 768px) {
  .info-hero-title {
    font-size: 3rem;
  }
  
  .info-hero-subtitle {
    font-size: 1.8rem;
  }
  
  .info-section-header h2 {
    font-size: 2rem;
  }
  
  .info-hero-stats {
    gap: 1rem;
  }
  
  .info-stat-card {
    width: 150px;
    padding: 1rem;
  }
  
  .info-hero-cta {
    flex-direction: column;
    gap: 1rem;
  }
  
  .info-button {
    width: 100%;
  }
  
  .info-feature-section, 
  .info-pricing-section, 
  .info-testimonials-section, 
  .info-faq-section, 
  .info-final-cta {
    padding: 3rem 1.5rem;
  }
  
  .info-test-features {
    flex-direction: column;
  }
  
  .info-support-content {
    flex-direction: column;
  }
  
  .info-pricing-card {
    padding: 2rem 1.5rem;
  }
  
  .info-cta-content h2 {
    font-size: 2rem;
  }
}

@media (max-width: 480px) {
  .info-hero-title {
    font-size: 2.5rem;
  }
  
  .info-hero-subtitle {
    font-size: 1.5rem;
  }
  
  .info-hero-description {
    font-size: 1rem;
  }
  
  .info-section-header h2 {
    font-size: 1.8rem;
  }
  
  .info-section-header p {
    font-size: 1rem;
  }
  
  .info-pricing-badge {
    font-size: 0.8rem;
    padding: 0.3rem 2rem;
    top: 1rem;
    right: -2.5rem;
  }
  
  .info-plan-name {
    font-size: 1.8rem;
  }
  
  .info-amount {
    font-size: 3rem;
  }
  
  .info-currency, .info-decimal {
    font-size: 1.5rem;
  }
  
  .info-period {
    font-size: 1rem;
  }
  
  .info-cta-content h2 {
    font-size: 1.8rem;
  }
  
  .info-cta-content p {
    font-size: 1rem;
  }
}




so we dont nesscisarly wanna chaneg this too much other than what i mentioned, and fro the new tabs/ navbar/siebar(howev ryou want to do it as aswesoem as possiblly and uniquly) lets make seperpate js and css files for each one just becasue teh home/fino kmight get really long liens if we did them all in taht js file it woudl eb really long fo sa file (keep in midn im open to realy relly long fils and complex code adn alot of code to esnure throurness, fucntionlity, and aswesomeness looking UI but its just mroe logicalk to have seprate js and css yha know) but i guess have the info page sorta as teh main one mayeb where we interlink everything or soemthing- liek that yah know- ok so with all taht said hoepfully i agve you enough conext- adn liek is aid you have full creatuive conbrtol to make it as coola dn aswesoem and convinging as possibel (dont nessicarly alter my existing poage too much tho but obviosly full cretaiuev conrtol for teh new additons) and do whatevr you think is best with every compelx codde to have an aweseome sleek cool/ hacker/cybersecurity/learning type of UI and coolness and fucntionlity and stuff taht convices teh suer to sign up/subscrive. 


also for all images (becvause you shoudl have images for liek t4eh alle xams and stuff liek that or whatver just make them obvious palceholder (in tyeh code) and i will repalce them) saame thing goes for the demo tab just pretedn liek you have demo videos for them and maske them obviosly commented ort soemthing in the code (to me) so i can replace them- the  pcitures i provided are more so for conetxt rather then putting them in there-- also my current info page  has plaeh9lder for images and stuff right now becasue im gonan repalce all palceholder aall at once at the edn once we compleet evrything. ok cool?? nice i trust you adn full faith in you, you got this. ok go
