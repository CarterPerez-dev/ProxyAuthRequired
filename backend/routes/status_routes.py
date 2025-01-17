from flask import Blueprint, jsonify, request
from functools import wraps
import os

from helpers.status_helper import get_system_info, get_application_status

status_bp = Blueprint('status_routes', __name__)

def require_api_key(f):
    @wraps(f)
    def decorated(*args, **kwargs):
        api_key = request.headers.get('x-api-key')
        if not api_key or api_key != os.getenv("ADMIN_API_KEY"):
            return jsonify({"error": "Unauthorized"}), 401
        return f(*args, **kwargs)
    return decorated

@status_bp.route('/status', methods=['GET'])
@require_api_key
def get_status():
    """
    GET /status/status
    Headers: { "x-api-key": "<ADMIN_API_KEY>" }
    """
    try:
        system_info = get_system_info()
        app_status = get_application_status()
        return jsonify({"system_info": system_info, "application_status": app_status}), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500

