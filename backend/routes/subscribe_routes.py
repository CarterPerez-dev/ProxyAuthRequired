# routes/subscribe_routes.py

from flask import Blueprint, request, jsonify
from models.user_subscription import add_subscription, find_subscription, get_all_subscribers
from functools import wraps
import os
import re

subscribe_bp = Blueprint('subscribe_routes', __name__)

def is_valid_email(email):
    """
    Validates the email format using regex.
    """
    regex = r'^\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,}\b'
    return re.match(regex, email)

def require_api_key(f):
    """
    Decorator to require API key for certain routes.
    """
    @wraps(f)
    def decorated(*args, **kwargs):
        api_key = request.headers.get('x-api-key')
        if not api_key or api_key != os.getenv("ADMIN_API_KEY"):
            return jsonify({"error": "Unauthorized"}), 401
        return f(*args, **kwargs)
    return decorated

@subscribe_bp.route('/', methods=['POST'])
def subscribe():
    """
    Public route to subscribe a user.
    POST /subscribe
    Body: { "email": "user@example.com" }
    """
    try:
        data = request.get_json()
        email = data.get("email")
        if not email:
            return jsonify({"error": "Missing email"}), 400

        if not is_valid_email(email):
            return jsonify({"error": "Invalid email format."}), 400

        if find_subscription(email):
            return jsonify({"message": "You are already subscribed."}), 400

        add_subscription(email)
        return jsonify({"message": "Subscription successful!"}), 200

    except Exception as e:
        return jsonify({"error": str(e)}), 500

@subscribe_bp.route('/all', methods=['GET'])
@require_api_key
def get_subscribers():
    """
    Admin route to retrieve all subscribers.
    GET /subscribe/all
    Headers: { "x-api-key": "<ADMIN_API_KEY>" }
    """
    try:
        subscribers = get_all_subscribers()
        emails = [sub["email"] for sub in subscribers]
        return jsonify({"subscribers": emails}), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500

