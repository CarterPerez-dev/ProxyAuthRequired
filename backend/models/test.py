# models/test.py
from bson.objectid import ObjectId
from datetime import datetime, timedelta
from collections import defaultdict
import math
import re
import unicodedata
import time
from flask import g
from functools import wraps


from mongodb.database import (
    mainusers_collection,
    shop_collection,
    achievements_collection,
    tests_collection,
    testAttempts_collection,
    correctAnswers_collection
)

##############################################
# INPUT SANITIZAION FOR PUBLIC ROUTES- I DARE YOU TO TRY AN FUCK MY SHIT, CUZ LIEK I SAID.....IM UNHACKABLE!!!
##############################################

import re
import unicodedata

# Example small dictionary of very common passwords
COMMON_PASSWORDS = {
    "password", "123456", "12345678", "qwerty", "letmein", "welcome"
}

def has_forbidden_unicode_scripts(s):
    """
    Disallow characters from certain Unicode blocks 
    (private use areas, surrogates, etc.).
    """
    private_use_ranges = [
        (0xE000, 0xF8FF),
        (0xF0000, 0xFFFFD),
        (0x100000, 0x10FFFD)
    ]
    surrogates_range = (0xD800, 0xDFFF)

    for ch in s:
        code_point = ord(ch)
        # Surrogates
        if surrogates_range[0] <= code_point <= surrogates_range[1]:
            return True
        # Private use ranges
        for start, end in private_use_ranges:
            if start <= code_point <= end:
                return True
    return False

def disallow_mixed_scripts(s):
    """
    Example check for mixing major scripts (Latin + Cyrillic, etc.).
    Returns True if it detects more than one script in the string.
    """
    script_sets = set()

    for ch in s:
        cp = ord(ch)
        # Basic Latin and extended ranges:
        if 0x0041 <= cp <= 0x024F:
            script_sets.add("Latin")
        # Greek
        elif 0x0370 <= cp <= 0x03FF:
            script_sets.add("Greek")
        # Cyrillic
        elif 0x0400 <= cp <= 0x04FF:
            script_sets.add("Cyrillic")

        # If more than one distinct script is found
        if len(script_sets) > 1:
            return True

    return False

def validate_username(username):
    """
    Validates a username with very strict rules:
      1. Normalize (NFC).
      2. Length 3..30.
      3. No control chars, no private-use/surrogates, no mixing scripts.
      4. Only [A-Za-z0-9._-], no triple repeats, no leading/trailing punctuation.
    Returns: (True, []) if valid, else (False, [list of error messages]).
    """
    errors = []
    username_nfc = unicodedata.normalize("NFC", username)

    # 1) Check length
    if not (3 <= len(username_nfc) <= 30):
        errors.append("Username must be between 3 and 30 characters long.")

    # 2) Forbidden Unicode script checks
    if has_forbidden_unicode_scripts(username_nfc):
        errors.append("Username contains forbidden Unicode blocks (private use or surrogates).")

    # 3) Disallow mixing multiple major scripts
    if disallow_mixed_scripts(username_nfc):
        errors.append("Username cannot mix multiple Unicode scripts (e.g., Latin & Cyrillic).")

    # 4) Forbid control chars [0..31, 127] + suspicious punctuation
    forbidden_ranges = [(0, 31), (127, 127)]
    forbidden_chars = set(['<', '>', '\\', '/', '"', "'", ';', '`',
                           ' ', '\t', '\r', '\n'])
    for ch in username_nfc:
        cp = ord(ch)
        if any(start <= cp <= end for (start, end) in forbidden_ranges):
            errors.append("Username contains forbidden control characters (ASCII 0-31 or 127).")
            break
        if ch in forbidden_chars:
            errors.append("Username contains forbidden characters like <, >, or whitespace.")
            break

    # 5) Strict allowlist pattern
    pattern = r'^[A-Za-z0-9._-]+$'
    if not re.match(pattern, username_nfc):
        errors.append("Username can only contain letters, digits, underscores, dashes, or dots.")

    # 6) Disallow triple identical consecutive characters
    if re.search(r'(.)\1{2,}', username_nfc):
        errors.append("Username cannot contain three identical consecutive characters.")

    # 7) Disallow leading or trailing punctuation
    if re.match(r'^[._-]|[._-]$', username_nfc):
        errors.append("Username cannot start or end with . - or _.")

    if errors:
        return False, errors
    return True, []

def validate_password(password, username=None, email=None):
    """
    Validates a password with very strict rules:
      1. 12..128 length.
      2. Disallow whitespace, <, >.
      3. Require uppercase, lowercase, digit, special char.
      4. Disallow triple repeats.
      5. Check common/breached password list.
      6. Disallow 'password', 'qwerty', etc.
      7. Disallow if username or email local part is in the password.
    Returns: (True, []) if valid, else (False, [list of error messages]).
    """
    errors = []
    length = len(password)

    # 1) Length
    if not (6 <= length <= 69):
        errors.append("Password must be between 6 and 69 characters long.")

    # 2) Disallowed whitespace or < >
    if any(ch in password for ch in [' ', '<', '>', '\t', '\r', '\n']):
        errors.append("Password cannot contain whitespace or < or > characters.")

    # 3) Complexity checks
    if not re.search(r'[A-Z]', password):
        errors.append("Password must contain at least one uppercase letter.")
    if not re.search(r'[a-z]', password):
        errors.append("Password must contain at least one lowercase letter.")
    if not re.search(r'\d', password):
        errors.append("Password must contain at least one digit.")

    # We define a broad set of allowed special chars
    special_pattern = r'[!@#$%^&*()\-_=+\[\]{}|;:\'",<.>/?`~\\]'
    if not re.search(special_pattern, password):
        errors.append("Password must contain at least one special character.")

    # 4) Disallow triple identical consecutive characters
    if re.search(r'(.)\1{2,}', password):
        errors.append("Password must not contain three identical consecutive characters.")

    # 5) Convert to lowercase for simplified checks
    password_lower = password.lower()

    # Check against common password list
    if password_lower in COMMON_PASSWORDS:
        errors.append("Password is too common. Please choose a stronger password.")

    # 6) Disallow certain dictionary words
    dictionary_patterns = ['password', 'qwerty', 'abcdef', 'letmein', 'welcome', 'admin']
    for pat in dictionary_patterns:
        if pat in password_lower:
            errors.append(f"Password must not contain the word '{pat}'.")

    # 7) Disallow if password contains username or email local-part
    if username:
        if username.lower() in password_lower:
            errors.append("Password must not contain your username.")

    if email:
        email_local_part = email.split('@')[0].lower()
        if email_local_part in password_lower:
            errors.append("Password must not contain the local part of your email address.")

    if errors:
        return False, errors
    return True, []

def validate_email(email):
    """
    Validates an email with strict rules:
      1. Normalize (NFC), strip whitespace.
      2. 5..69 length.
      3. No control chars, <, >, etc.
      4. Exactly one @.
    Returns: (True, []) if valid, else (False, [list of error messages]).
    """
    errors = []
    email_nfc = unicodedata.normalize("NFC", email.strip())

    # 1) Length check
    if not (5 <= len(email_nfc) <= 69):
        errors.append("Email length must be between 6 and 69 characters.")

    # 3) Forbid suspicious ASCII
    forbidden_ascii = set(['<','>','`',';',' ', '\t','\r','\n','"',"'", '\\'])
    for ch in email_nfc:
        if ch in forbidden_ascii:
            errors.append("Email contains forbidden characters like <, >, or whitespace.")
            break

    # 4) Must have exactly one @
    if email_nfc.count('@') != 1:
        errors.append("Email must contain exactly one '@' symbol.")

    if errors:
        return False, errors
    return True, []

##############################################
# User Retrieval Helpers
##############################################

def get_user_by_username(username):
    return mainusers_collection.find_one({"username": username})

def get_user_by_identifier(identifier):
    if "@" in identifier:
        return mainusers_collection.find_one({"email": identifier})
    else:
        return get_user_by_username(identifier)

def get_user_by_id(user_id):
    """
    Retrieves a user by ID. Returns None if invalid or not found.
    """
    try:
        oid = ObjectId(user_id)
    except Exception:
        return None
    return mainusers_collection.find_one({"_id": oid})

##############################################
# Create User
##############################################

def create_user(user_data):
    existing_user = mainusers_collection.find_one({
        "$or": [
            {"username": user_data["username"]},
            {"email": user_data["email"]}
        ]
    })
    if existing_user:
        raise ValueError("Username or email is already taken")

    if "password" in user_data:
        user_data["password"] = hash_password(user_data["password"])

    # Default fields
    user_data.setdefault("coins", 0)
    user_data.setdefault("xp", 0)
    user_data.setdefault("level", 1)
    user_data.setdefault("achievements", [])
    
    # Set subscription to false by default (free tier)
    user_data.setdefault("subscriptionActive", False)
    user_data.setdefault("subscriptionPlan", "premium")
    
    # Add freemium-specific fields
    user_data.setdefault("subscriptionType", "free")  # "free" or "premium"
    user_data.setdefault("practiceQuestionsRemaining", 100)  # Free tier limit
    user_data.setdefault("freeUserCreatedAt", datetime.utcnow())
    
    # Existing fields
    user_data.setdefault("lastDailyClaim", None)
    user_data.setdefault("purchasedItems", [])
    user_data.setdefault("xpBoost", 1.0)
    user_data.setdefault("currentAvatar", None)
    user_data.setdefault("nameColor", None)
    
    # Subscription fields
    user_data.setdefault("subscriptionStatus", None)
    user_data.setdefault("subscriptionPlatform", None)
    user_data.setdefault("stripeCustomerId", None)
    user_data.setdefault("stripeSubscriptionId", None)
    user_data.setdefault("appleTransactionId", None)
    user_data.setdefault("subscriptionStartDate", None)
    user_data.setdefault("subscriptionEndDate", None)
    user_data.setdefault("subscriptionCanceledAt", None)

    # Achievement counters
    user_data.setdefault("achievement_counters", {
        "total_tests_completed": 0,
        "perfect_tests_count": 0,
        "perfect_tests_by_category": {},
        "highest_score_ever": 0.0,
        "lowest_score_ever": 100.0,
        "total_questions_answered": 0,
    })

    # Auto-equip default avatar if cost=None
    default_avatar = shop_collection.find_one({"type": "avatar", "cost": None})
    if default_avatar:
        user_data["currentAvatar"] = default_avatar["_id"]
        if default_avatar["_id"] not in user_data["purchasedItems"]:
            user_data["purchasedItems"].append(default_avatar["_id"])

    result = mainusers_collection.insert_one(user_data)
    return result.inserted_id

##############################################
# Update User Fields (CRITICAL)
##############################################

def update_user_fields(user_id, fields):
    """
    Generic helper to update given `fields` (dict) in mainusers_collection.
    """
    try:
        oid = ObjectId(user_id)
    except:
        return None
    mainusers_collection.update_one(
        {"_id": oid},
        {"$set": fields}
    )
    return True

##############################################
# Update User Coins
##############################################

def update_user_coins(user_id, amount):
    try:
        oid = ObjectId(user_id)
    except Exception:
        return None
        
    result = mainusers_collection.find_one_and_update(
        {"_id": oid},
        {"$inc": {"coins": amount}},
        return_document=True
    )
    
    if result:
        return result.get("coins")
    return None

##############################################
# Leveling System
##############################################
# Levels 2–30: +500 XP each
# Levels 31–60: +750 XP each
# Levels 61–100: +1000 XP each
# Above 100: +1500 XP each

def xp_required_for_level(level):
    """
    Returns total XP required to be at `level`.
    Level 1 starts at 0 XP.
    """
    if level < 1:
        return 0
    if level == 1:
        return 0
    if level <= 30:
        return 500 * (level - 1)
    elif level <= 60:
        base = 500 * 29  # up to level 30
        return base + 750 * (level - 30)
    elif level <= 100:
        base = 500 * 29 + 750 * 30  # up to level 60
        return base + 1000 * (level - 60)
    else:
        base = 500 * 29 + 750 * 30 + 1000 * 40  # up to level 100
        return base + 1500 * (level - 100)

def update_user_xp(user_id, xp_to_add):
    """
    Uses atomic operations to safely add XP and handle level ups.
    """
    try:
        oid = ObjectId(user_id)
    except Exception:
        return None
    
    # Get current user state to calculate level
    user = get_user_by_id(user_id)
    if not user:
        return None
    
    # Calculate the current level and the potential new level
    old_level = user.get("level", 1)
    old_xp = user.get("xp", 0)
    new_xp = old_xp + xp_to_add
    
    # Determine what level the user should be at with new XP
    new_level = old_level
    while new_xp >= xp_required_for_level(new_level + 1):
        new_level += 1
    
    # Atomic update using $inc and $set
    result = mainusers_collection.find_one_and_update(
        {"_id": oid},
        {
            "$inc": {"xp": xp_to_add},
            "$set": {"level": new_level}
        },
        return_document=True
    )
    
    if result:
        return {"xp": result.get("xp"), "level": result.get("level")}
    return None



##############################################
# Shop Logic
##############################################

def get_shop_items():
    """
    Returns all shop items from shop_collection,
    in ascending order by title (or another field),
    to ensure stable ordering.
    """
    return list(shop_collection.find({}).sort("title", 1))

def purchase_item(user_id, item_id):
    """
    Purchase an item from the shop:
      1) Check user has enough coins
      2) Ensure item not already purchased
      3) Deduct cost, add to purchasedItems
      4) If xpBoost, set user's xpBoost
      5) If avatar or nameColor, optionally set that field
    """
    user = get_user_by_id(user_id)
    if not user:
        return {"success": False, "message": "User not found"}

    try:
        oid = ObjectId(item_id)
    except Exception:
        return {"success": False, "message": "Invalid item ID"}

    item = shop_collection.find_one({"_id": oid})
    if not item:
        return {"success": False, "message": "Item not found"}

    user_coins = user.get("coins", 0)
    cost = item.get("cost", 0) if item.get("cost") is not None else 0
    if user_coins < cost:
        return {"success": False, "message": "Not enough coins"}

    purchased = user.get("purchasedItems", [])
    if oid in purchased:
        return {"success": False, "message": "Item already purchased"}

    mainusers_collection.update_one(
        {"_id": user["_id"]},
        {"$inc": {"coins": -cost}}
    )
    mainusers_collection.update_one(
        {"_id": user["_id"]},
        {"$addToSet": {"purchasedItems": oid}}
    )

    item_type = item.get("type")
    if item_type == "xpBoost":
        new_boost = item.get("effectValue", 1.0)
        mainusers_collection.update_one(
            {"_id": user["_id"]},
            {"$set": {"xpBoost": new_boost}}
        )
    elif item_type == "avatar":
        pass
    elif item_type == "nameColor":
        new_color = item.get("effectValue", None)
        mainusers_collection.update_one(
            {"_id": user["_id"]},
            {"$set": {"nameColor": new_color}}
        )

    return {"success": True, "message": "Purchase successful"}

##############################################
# Achievements
##############################################

def get_achievements():
    return list(achievements_collection.find({}))
    

    
    

def get_test_by_id_and_category(test_id, category):
    """
    Fetch a single test doc by integer testId field and category field.
    """
    try:
        test_id_int = int(test_id)
    except:
        return None
    return tests_collection.find_one({
        "testId": test_id_int,
        "category": category
    })


    
   

def apply_daily_bonus(user_id):
    user = get_user_by_id(user_id)
    if not user:
        return None

    now = datetime.utcnow()
    last_claim = user.get("lastDailyClaim")
    if not last_claim or (now - last_claim) > timedelta(hours=24):
        mainusers_collection.update_one(
            {"_id": user["_id"]},
            {
                "$inc": {"coins": 250},
                "$set": {"lastDailyClaim": now}
            }
        )
        return {"success": True, "message": "Daily bonus applied"}
    else:
        return {"success": False, "message": "Already claimed daily bonus."}

def award_correct_answers_in_bulk(user_id, attempt_doc, xp_per_correct=10, coins_per_correct=5):
    """
    For examMode attempts, no XP was awarded during question-by-question.
    So at 'finish', we do the awarding for each newly-correct question that
    the user has never gotten correct before (per correctAnswers_collection).
    """
    user = get_user_by_id(user_id)
    if not user:
        return

    test_id = attempt_doc.get("testId")
    answers = attempt_doc.get("answers", [])

    # Tally how many new first-time correct answers the user got in this attempt
    newly_correct_count = 0
    for ans in answers:
        if ans.get("userAnswerIndex") == ans.get("correctAnswerIndex"):
            # it's correct
            qid = ans.get("questionId")
            already_correct = correctAnswers_collection.find_one({
                "userId": user["_id"],
                "testId": str(test_id),
                "questionId": qid
            })
            if not already_correct:
                # Insert it and increment counters
                correctAnswers_collection.insert_one({
                    "userId": user["_id"],
                    "testId": str(test_id),
                    "questionId": qid
                })
                newly_correct_count += 1

    if newly_correct_count > 0:
        # apply xp, coins
        total_xp = xp_per_correct * newly_correct_count
        total_coins = coins_per_correct * newly_correct_count
        update_user_xp(user_id, total_xp)
        update_user_coins(user_id, total_coins)    




# helpers/db_timing.py


def measure_db_operation(func):
    """
    Decorator to measure time of a single DB operation.
    Usage: decorate your typical DB calls or your function that does the operation.
    """
    @wraps(func)
    def wrapper(*args, **kwargs):
        start = time.time()
        result = func(*args, **kwargs)
        duration = time.time() - start

        # If we have a 'db_time_accumulator' in Flask g, accumulate:
        if not hasattr(g, "db_time_accumulator"):
            g.db_time_accumulator = 0.0
        g.db_time_accumulator += duration

        return result
    return wrapper



def hash_password(password):
    """Hash a password using bcrypt."""
    import bcrypt
    salt = bcrypt.gensalt()
    hashed = bcrypt.hashpw(password.encode('utf-8'), salt)
    return hashed.decode('utf-8')

def check_password(plain_password, hashed_password):
    """
    Verify a password against its hash or plain text (for legacy users).
    Also handles the transition from plain text to hashed passwords.
    """
    import bcrypt
    
    # First, check if this looks like a bcrypt hash (starts with $2b$ or $2a$)
    if hashed_password.startswith(('$2b$', '$2a$')):
        # It's a bcrypt hash, use bcrypt to check
        return bcrypt.checkpw(plain_password.encode('utf-8'), hashed_password.encode('utf-8'))
    else:
        # It's a legacy plain text password, do direct comparison
        # This is for backward compatibility with existing accounts
        return plain_password == hashed_password
        

def update_user_subscription(user_id, subscription_data):
    """
    Update a user's subscription information:
    - subscriptionActive: Boolean
    - subscriptionStatus: String
    - subscriptionPlatform: String
    - stripeCustomerId: String 
    - stripeSubscriptionId: String
    - appleTransactionId: String
    - appleOriginalTransactionId: String
    - appleProductId: String
    - subscriptionStartDate: DateTime
    - subscriptionEndDate: DateTime
    - subscriptionCanceledAt: DateTime
    """
    try:
        oid = ObjectId(user_id)
    except:
        return None
        
    # Filter out None values to avoid overwriting existing values with None
    update_fields = {k: v for k, v in subscription_data.items() if v is not None}
    
    result = mainusers_collection.update_one(
        {"_id": oid},
        {"$set": update_fields}
    )
    
    if result.modified_count > 0:
        return get_user_by_id(user_id)
    return None
