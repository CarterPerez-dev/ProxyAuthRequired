# models.py
from bson.objectid import ObjectId
from datetime import datetime, timedelta

# Import collections from database.py
from models.database import (
    mainusers_collection,
    shop_collection,
    achievements_collection,
    tests_collection
)

def get_user_by_username(username):
    """
    Fetch a user document from the mainusers_collection by username.
    Returns None if not found.
    """
    return mainusers_collection.find_one({"username": username})

def get_user_by_identifier(identifier):
    """
    Fetch a user document using the given identifier.
    If the identifier contains an '@' symbol, assume it is an email;
    otherwise, treat it as a username.
    Returns None if not found.
    """
    if "@" in identifier:
        return mainusers_collection.find_one({"email": identifier})
    else:
        return get_user_by_username(identifier)

def create_user(user_data):
    """
    Create a new user document in mainusers_collection.
    user_data should include keys like:
      - username (str)
      - email (str)
      - password (str) or passwordHash if hashed
      - subscriptionActive (bool) - default False
      - subscriptionPlan (str) or None
      - coins (int) - default 0
      - xp (int) - default 0
      - level (int) - default 1
      - achievements (list) - default []
      - lastDailyClaim (datetime) - default None
      - purchasedItems (list) - default []
      - testsProgress (dict) - default {}
    """

    # Example check if username/email already exists:
    existing_user = mainusers_collection.find_one({
        "$or": [
            {"username": user_data["username"]},
            {"email": user_data["email"]}
        ]
    })
    if existing_user:
        raise ValueError("Username or email is already taken")

    # Set defaults if not provided
    user_data.setdefault("coins", 0)
    user_data.setdefault("xp", 0)
    user_data.setdefault("level", 1)
    user_data.setdefault("achievements", [])
    user_data.setdefault("subscriptionActive", False)
    user_data.setdefault("subscriptionPlan", None)
    user_data.setdefault("lastDailyClaim", None)
    user_data.setdefault("purchasedItems", [])
    user_data.setdefault("testsProgress", {})

    # Insert into Mongo
    result = mainusers_collection.insert_one(user_data)
    return result.inserted_id

def get_user_by_id(user_id):
    """
    Fetch a user document by its ObjectId (as string).
    Returns None if user not found.
    """
    try:
        oid = ObjectId(user_id)
    except:
        return None
    return mainusers_collection.find_one({"_id": oid})

def update_user_coins(user_id, amount):
    """
    Increment a user's 'coins' field by 'amount' (can be positive or negative).
    """
    try:
        oid = ObjectId(user_id)
    except:
        return None
    mainusers_collection.update_one({"_id": oid}, {"$inc": {"coins": amount}})

def update_user_xp(user_id, xp_to_add):
    """
    Add xp_to_add to the user's xp, and handle level-up logic if xp exceeds threshold.
    Returns a dict { "xp": new_xp, "level": new_level } or None if user not found.
    """
    user = get_user_by_id(user_id)
    if not user:
        return None

    new_xp = user.get("xp", 0) + xp_to_add
    new_level = user.get("level", 1)

    # Example level-up logic: each level requires 100 * current_level XP
    while new_xp >= 100 * new_level:
        new_level += 1

    mainusers_collection.update_one(
        {"_id": user["_id"]},
        {"$set": {"xp": new_xp, "level": new_level}}
    )

    return {"xp": new_xp, "level": new_level}

def apply_daily_bonus(user_id):
    """
    Grants a daily coin bonus if lastDailyClaim is older than 24 hours.
    Returns dict with { "success": bool, "message": str } or None if user not found.
    """
    user = get_user_by_id(user_id)
    if not user:
        return None

    now = datetime.utcnow()
    last_claimed = user.get("lastDailyClaim")

    if not last_claimed or (now - last_claimed) > timedelta(hours=24):
        mainusers_collection.update_one(
            {"_id": user["_id"]},
            {
                "$inc": {"coins": 50},
                "$set": {"lastDailyClaim": now}
            }
        )
        return {"success": True, "message": "Daily bonus applied"}
    else:
        return {"success": False, "message": "Already claimed daily bonus"}

def get_shop_items():
    """
    Returns a list of all shop items from shop_collection.
    """
    return list(shop_collection.find({}))

def purchase_item(user_id, item_id):
    """
    Deduct cost from user, add item to user's purchasedItems if user has enough coins.
    Returns { "success": bool, "message": str }.
    """
    user = get_user_by_id(user_id)
    if not user:
        return {"success": False, "message": "User not found"}

    try:
        oid = ObjectId(item_id)
    except:
        return {"success": False, "message": "Invalid item ID"}

    item = shop_collection.find_one({"_id": oid})
    if not item:
        return {"success": False, "message": "Item not found"}

    user_coins = user.get("coins", 0)
    cost = item.get("cost", 0)

    if user_coins < cost:
        return {"success": False, "message": "Not enough coins"}

    # Deduct the cost
    mainusers_collection.update_one({"_id": user["_id"]}, {"$inc": {"coins": -cost}})

    # Mark the item as purchased
    mainusers_collection.update_one(
        {"_id": user["_id"]},
        {"$addToSet": {"purchasedItems": item["_id"]}}
    )

    return {"success": True, "message": "Purchase successful"}

def get_achievements():
    """
    Returns a list of all achievements from achievements_collection.
    """
    return list(achievements_collection.find({}))

def get_test_by_id(test_id):
    """
    Fetches a single test document by its integer testId.
    Typical doc:
      {
        "category": "aplus",
        "testId": 1,
        "testName": "A+ Practice Test #1",
        "xpPerCorrect": 10,
        "questions": [ ... ]
      }
    Returns None if not found.
    """
    try:
        test_id_int = int(test_id)
    except:
        return None

    return tests_collection.find_one({"testId": test_id_int})

