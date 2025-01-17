# backend/routes/admin_newsletter_routes.py

from flask import Blueprint, request, jsonify
from helpers.daily_newsletter_helper import set_current_newsletter_db
from functools import wraps
import os
from dotenv import load_dotenv

load_dotenv()

admin_newsletter_bp = Blueprint('admin_newsletter_routes', __name__)

def require_api_key(f):
    @wraps(f)
    def decorated(*args, **kwargs):
        api_key = request.headers.get('x-api-key')
        if not api_key or api_key != os.getenv("ADMIN_API_KEY"):
            return jsonify({"error": "Unauthorized"}), 401
        return f(*args, **kwargs)
    return decorated

@admin_newsletter_bp.route('/', methods=['POST'])
@require_api_key
def update_newsletter():
    """
    POST /admin/newsletter
    Headers: { "x-api-key": "your_admin_api_key" }
    JSON Body: { "content": "<html or text of new newsletter>" }
    """
    try:
        data = request.get_json()
        new_content = data.get("content", "")

        if not new_content:
            return jsonify({"error": "Newsletter content cannot be empty."}), 400

        set_current_newsletter_db(new_content)
        return jsonify({"message": "Newsletter updated successfully"}), 200

    except Exception as e:
        return jsonify({"error": str(e)}), 500

