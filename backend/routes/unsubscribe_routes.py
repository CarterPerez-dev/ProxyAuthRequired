# routes/unsubscribe_routes.py

from flask import Blueprint, request, jsonify
from models.user_subscription import remove_subscription, find_subscription
import re

unsubscribe_bp = Blueprint('unsubscribe_routes', __name__)

def is_valid_email(email):
    regex = r'^\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,}\b'
    return re.match(regex, email)

@unsubscribe_bp.route('/', methods=['POST'])
def unsubscribe():
    """
    POST /unsubscribe
    Body: { "email": "user@example.com" }
    """
    try:
        data = request.get_json()
        email = data.get("email")
        if not email:
            return jsonify({"error": "Missing email"}), 400

        if not find_subscription(email):
            return jsonify({"error": "You are not subscribed."}), 404

        remove_subscription(email)
        return jsonify({"message": "Successfully unsubscribed"}), 200

    except Exception as e:
        return jsonify({"error": str(e)}), 500
