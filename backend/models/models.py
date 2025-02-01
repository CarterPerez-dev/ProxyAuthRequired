# models.py
from bson.objectid import ObjectId
from datetime import datetime, timedelta
from database import (
    mainusers_collection,
    shop_collection,
    achievements_collection,
    tests_collection
)

def get_user_by_id(user_id):
    return mainusers_collection.find_one({"_id": ObjectId(user_id)})

def get_user_by_username(username):
    return mainusers_collection.find_one({"username": username})

def create_user(user_data):
    """
    Example user_data might be:
    {
        "username": "testuser",
        "password": "...",
        "coins": 0,
        "xp": 0,
        "level": 1,
        ...
    }
    """
    existing = get_user_by_username(user_data["username"])
    if existing:
        raise ValueError("Username is already taken")

    result = mainusers_collection.insert_one(user_data)
    return result.inserted_id

def update_user_coins(user_id, amount):
    mainusers_collection.update_one(
        {"_id": ObjectId(user_id)},
        {"$inc": {"coins": amount}}
    )

def update_user_xp(user_id, xp_to_add):
    user = get_user_by_id(user_id)
    if not user:
        return None

    new_xp = user.get("xp", 0) + xp_to_add
    new_level = user.get("level", 1)
    # Example: for every 100 XP, increment level by 1
    while new_xp >= 100 * new_level:
        new_level += 1

    mainusers_collection.update_one(
        {"_id": user["_id"]},
        {
            "$set": {
                "xp": new_xp,
                "level": new_level
            }
        }
    )
    return {"xp": new_xp, "level": new_level}

def apply_daily_bonus(user_id):
    user = get_user_by_id(user_id)
    if not user:
        return None

    last_claimed = user.get("lastDailyClaim")
    now = datetime.utcnow()

    # If not claimed in last 24h, apply bonus
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
    return list(shop_collection.find({}))

def purchase_item(user_id, item_id):
    user = get_user_by_id(user_id)
    from bson.objectid import ObjectId
    item = shop_collection.find_one({"_id": ObjectId(item_id)})
    if not user or not item:
        return {"success": False, "message": "User or item not found"}

    user_coins = user.get("coins", 0)
    if user_coins < item.get("cost", 0):
        return {"success": False, "message": "Not enough coins"}

    mainusers_collection.update_one(
        {"_id": user["_id"]},
        {"$inc": {"coins": -item["cost"]}}
    )
    # Optionally track purchased items
    mainusers_collection.update_one(
        {"_id": user["_id"]},
        {"$push": {"purchasedItems": item_id}}
    )
    return {"success": True, "message": "Purchase successful"}

def get_achievements():
    return list(achievements_collection.find({}))

def get_test_by_id(test_id):
    """
    'tests' collection doc example:
    {
      "testId": 1,
      "testName": "A+ Practice Test #1",
      "xpPerCorrect": 10,
      "questions": [
         { "id": 1, "question": "...", "options": [...], "correctAnswerIndex": 2, "explanation": "..." },
         ...
      ]
    }
    """
    return tests_collection.find_one({"testId": int(test_id)})

