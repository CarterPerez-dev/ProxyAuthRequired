from flask import Blueprint, request, jsonify, Response, g
import logging
from helpers.async_tasks import generate_grc_question_task
from helpers.grc_stream_helper import generate_grc_question, generate_grc_questions_stream
from helpers.rate_limiter import rate_limit

grc_bp = Blueprint('grc', __name__)
logger = logging.getLogger(__name__)

GRC_CATEGORIES = ["Regulation", "Risk Management", "Compliance", "Audit", "Governance", 
                  "Management", "Policy", "Ethics", "Threat Assessment", "Leadership", 
                  "Business Continuity", "Random"]
DIFFICULTY_LEVELS = ["Easy", "Medium", "Hard"]

@grc_bp.route('/generate_question', methods=['POST'])
@rate_limit('grc')
def generate_question():
    """
    Generate a GRC question (non-streaming version using Celery).
    This route is maintained for backward compatibility.
    """
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

@grc_bp.route('/stream_question', methods=['POST'])
@rate_limit('grc')
def stream_question():
    """
    New route that streams GRC question JSON chunk by chunk.
    The client can display partial JSON as it arrives.
    """
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

        def generate():
            # Get the streaming generator
            stream_gen = generate_grc_questions_stream(category, difficulty)
            for chunk in stream_gen:
                yield chunk

        response = Response(generate(), mimetype='application/json')
        # Add rate limit headers
        if hasattr(g, 'rate_limit_remaining'):
            response.headers['X-RateLimit-Remaining'] = g.rate_limit_remaining
        return response

    except Exception as e:
        logger.error(f"Error in /stream_question: {e}")
        return jsonify({"error": "An internal error occurred."}), 500
