# grc_routes.py

from flask import Blueprint, request, jsonify
import logging
from helpers.async_tasks import generate_grc_question_task

grc_bp = Blueprint('grc', __name__)
logger = logging.getLogger(__name__)

GRC_CATEGORIES = ["Regulation", "Risk Management", "Compliance", "Audit", "Governance", 
                  "Management", "Policy", "Ethics", "Threat Assessment", "Leadership", 
                  "Business Continuity", "Random"]
DIFFICULTY_LEVELS = ["Easy", "Medium", "Hard"]

@grc_bp.route('/generate_question', methods=['POST'])
def generate_question():
    try:
        data = request.get_json()
        if not data:
            return jsonify({"error": "Request must contain JSON data"}), 400

        category = data.get('category', 'Random')
        difficulty = data.get('difficulty', 'Easy')

        if category not in GRC_CATEGORIES:
            return jsonify({"error": "Invalid category"}), 400
        if difficulty not in DIFFICULTY_LEVELS:
            return jsonify({"error": "Invalid difficulty"}), 400

        # Celery call
        task_result = generate_grc_question_task.delay(category, difficulty)
        question_data = task_result.get(timeout=120)

        return jsonify(question_data), 200

    except Exception as e:
        logger.error(f"Error in /generate_question: {e}")
        return jsonify({"error": "An internal error occurred."}), 500

