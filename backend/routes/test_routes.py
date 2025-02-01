# test_routes.py
from flask import Blueprint, request, jsonify
# Import all the necessary model functions from models.py
from models.test import (
    get_user_by_username,   # We still import this, but we will use get_user_by_identifier instead.
    get_user_by_identifier, # Make sure this function is available via models.py (or use our new one if you wish).
    create_user,
    get_user_by_id,
    update_user_coins,
    update_user_xp,
    apply_daily_bonus,
    get_shop_items,
    purchase_item,
    get_achievements,
    get_test_by_id
)

api_bp = Blueprint('test', __name__)

# -----------------------------------------------------------------------------
#  USER ROUTES
# -----------------------------------------------------------------------------

@api_bp.route('/user/<user_id>', methods=['GET'])
def get_user(user_id):
    """
    GET /api/test/user/<user_id>
    Fetches a user's document by their ID.
    """
    user = get_user_by_id(user_id)
    if not user:
        return jsonify({"error": "User not found"}), 404

    # Convert ObjectId to string for JSON serialization
    user["_id"] = str(user["_id"])
    return jsonify(user), 200

@api_bp.route('/user', methods=['POST'])
def register_user():
    """
    POST /api/test/user
    Creates a new user document.
    Expects JSON body with fields: username, email, password (to be hashed), etc.
    """
    user_data = request.json
    try:
        user_id = create_user(user_data)
        return jsonify({"message": "User created", "user_id": str(user_id)}), 201
    except ValueError as ve:
        # Likely a duplicate username/email
        return jsonify({"error": str(ve)}), 400
    except Exception as e:
        return jsonify({"error": "Internal server error", "details": str(e)}), 500

@api_bp.route('/login', methods=['POST'])
def login():
    """
    POST /api/test/login
    Login a user using a username or email along with password.
    Expects JSON: { "usernameOrEmail": "...", "password": "..." }
    """
    data = request.json
    if not data:
        return jsonify({"error": "No JSON data provided"}), 400

    # Use the field 'usernameOrEmail' for login
    identifier = data.get("usernameOrEmail")
    password = data.get("password")

    if not identifier or not password:
        return jsonify({"error": "Username (or Email) and password are required"}), 400

    # Use get_user_by_identifier from models.py:
    user = None
    if "@" in identifier:
        # Assume email login
        user =  mainusers_collection.find_one({"email": identifier})
        # Alternatively, if you prefer to use the helper:
        # user = get_user_by_identifier(identifier)
    else:
        user = get_user_by_username(identifier)
    # Alternatively, you could call get_user_by_identifier(identifier) if available.

    if not user:
        return jsonify({"error": "Invalid username or password"}), 401

    # Check password. In production, do hashed check with e.g. bcrypt.
    if user.get("password") != password:
        return jsonify({"error": "Invalid username or password"}), 401

    return jsonify({
        "user_id": str(user["_id"]),
        "username": user["username"],
        "coins": user.get("coins", 0),
        "xp": user.get("xp", 0),
        "level": user.get("level", 1),
    }), 200

@api_bp.route('/user/<user_id>/daily-bonus', methods=['POST'])
def daily_bonus(user_id):
    """
    POST /api/test/user/<user_id>/daily-bonus
    Grants daily bonus coins if not claimed in past 24 hours.
    """
    result = apply_daily_bonus(user_id)
    if not result:
        return jsonify({"error": "User not found"}), 404
    return jsonify(result), 200

@api_bp.route('/user/<user_id>/add-xp', methods=['POST'])
def add_xp_route(user_id):
    """
    POST /api/test/user/<user_id>/add-xp
    Add XP and update level.
    Expects JSON: { "xp": <amount> }
    """
    data = request.json
    xp_to_add = data.get("xp", 0)
    updated = update_user_xp(user_id, xp_to_add)
    if not updated:
        return jsonify({"error": "User not found"}), 404
    return jsonify(updated), 200

@api_bp.route('/user/<user_id>/add-coins', methods=['POST'])
def add_coins_route(user_id):
    """
    POST /api/test/user/<user_id>/add-coins
    Add or subtract coins.
    Expects JSON: { "coins": <amount> }
    """
    data = request.json
    coins_to_add = data.get("coins", 0)
    update_user_coins(user_id, coins_to_add)
    return jsonify({"message": "Coins updated"}), 200

# -----------------------------------------------------------------------------
#  SHOP ROUTES
# -----------------------------------------------------------------------------
@api_bp.route('/shop', methods=['GET'])
def fetch_shop():
    """
    GET /api/test/shop
    Returns all shop items.
    """
    items = get_shop_items()
    for item in items:
        item["_id"] = str(item["_id"])
    return jsonify(items), 200

@api_bp.route('/shop/purchase/<item_id>', methods=['POST'])
def purchase_item_route(item_id):
    """
    POST /api/test/shop/purchase/<item_id>
    Purchases an item.
    Expects JSON: { "userId": <user_id> }
    """
    data = request.json or {}
    user_id = data.get("userId")
    if not user_id:
        return jsonify({"success": False, "message": "userId is required"}), 400

    result = purchase_item(user_id, item_id)
    if result["success"]:
        return jsonify(result), 200
    return jsonify(result), 400

# -----------------------------------------------------------------------------
#  ACHIEVEMENTS ROUTES
# -----------------------------------------------------------------------------
@api_bp.route('/achievements', methods=['GET'])
def fetch_achievements():
    """
    GET /api/test/achievements
    Returns all achievements.
    """
    ach_list = get_achievements()
    for ach in ach_list:
        ach["_id"] = str(ach["_id"])
    return jsonify(ach_list), 200

# -----------------------------------------------------------------------------
#  TESTS ROUTES
# -----------------------------------------------------------------------------
@api_bp.route('/tests/<test_id>', methods=['GET'])
def fetch_test_by_id_route(test_id):
    """
    GET /api/test/tests/<test_id>
    Retrieves a single test document by its integer testId.
    """
    test_doc = get_test_by_id(test_id)
    if not test_doc:
        return jsonify({"error": "Test not found"}), 404

    test_doc["_id"] = str(test_doc["_id"])
    return jsonify(test_doc), 200

