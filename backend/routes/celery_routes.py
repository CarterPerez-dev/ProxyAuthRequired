from flask import Blueprint, request, jsonify
from functools import wraps
import os

from helpers.daily_newsletter_task import send_daily_newsletter

celery_bp = Blueprint('celery_routes', __name__)

def require_api_key(f):
    @wraps(f)
    def decorated(*args, **kwargs):
        api_key = request.headers.get('x-api-key')
        if not api_key or api_key != os.getenv("ADMIN_API_KEY"):
            return jsonify({"error": "Unauthorized"}), 401
        return f(*args, **kwargs)
    return decorated

@celery_bp.route('/trigger-task', methods=['POST'])
@require_api_key
def trigger_task():
    """
    POST /celery/trigger-task
    Headers: { "x-api-key": "<ADMIN_API_KEY>" }
    """
    try:
        task_result = send_daily_newsletter.delay()
        return jsonify({"message": "Task triggered", "task_id": task_result.id}), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500

