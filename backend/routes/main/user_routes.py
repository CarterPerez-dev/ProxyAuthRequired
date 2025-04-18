from flask import request, jsonify, session, g
from mongodb.database import db, mainusers_collection
from bson.objectid import ObjectId
from datetime import datetime
import time
from models.test import (
    get_user_by_identifier, create_user, get_user_by_id,
    update_user_fields, validate_username, validate_email,
    validate_password, check_password, hash_password,
    update_user_xp, update_user_coins
)
from .utils import serialize_user, check_and_unlock_achievements
from .blueprint import api_bp

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
