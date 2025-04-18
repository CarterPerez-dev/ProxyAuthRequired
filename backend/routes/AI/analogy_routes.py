from flask import Blueprint, request, jsonify, Response, g
import logging
from helpers.async_tasks import (
    generate_single_analogy_task,
    generate_comparison_analogy_task,
    generate_triple_comparison_analogy_task
)
# New streaming helper
from helpers.analogy_stream_helper import generate_analogy_stream
# Import rate limiter
from helpers.rate_limiter import rate_limit

analogy_bp = Blueprint('analogy_bp', __name__)
logger = logging.getLogger(__name__)
logger.setLevel(logging.DEBUG)

@analogy_bp.route('/generate_analogy', methods=['POST'])
@rate_limit('analogy')
def generate_analogy():
    """
    OLD route that uses Celery tasks. We keep it so async_tasks or older code won't break,
    but the new front end won't use this route anymore.
    """
    data = request.get_json()
    if not data:
        return jsonify({"error": "Request must contain data"}), 400

    analogy_type = data.get("analogy_type")
    category = data.get("category")
    concept1 = data.get("concept1")
    concept2 = data.get("concept2")
    concept3 = data.get("concept3")

    try:
        if analogy_type == "single" and concept1:
            async_result = generate_single_analogy_task.delay(concept1, category)
            analogy_text = async_result.get(timeout=120)
            return jsonify({"analogy": analogy_text}), 200

        elif analogy_type == "comparison" and concept1 and concept2:
            async_result = generate_comparison_analogy_task.delay(concept1, concept2, category)
            analogy_text = async_result.get(timeout=120)
            return jsonify({"analogy": analogy_text}), 200

        elif analogy_type == "triple" and concept1 and concept2 and concept3:
            async_result = generate_triple_comparison_analogy_task.delay(concept1, concept2, concept3, category)
            analogy_text = async_result.get(timeout=180)
            return jsonify({"analogy": analogy_text}), 200

        else:
            logger.error("Invalid parameters provided to /generate_analogy")
            return jsonify({"error": "Invalid parameters"}), 400

    except Exception as e:
        logger.error(f"Error generating analogy (Celery route): {e}")
        return jsonify({"error": "An internal error occurred while generating the analogy."}), 500


@analogy_bp.route('/stream_analogy', methods=['POST'])
@rate_limit('analogy')
def stream_analogy():
    """
    NEW route that streams analogy text. Only used by front-end now.
    """
    data = request.get_json() or {}
    analogy_type = data.get("analogy_type", "single")
    category = data.get("category", "real-world")
    concept1 = data.get("concept1", "")
    concept2 = data.get("concept2", "")
    concept3 = data.get("concept3", "")

    try:
        def generate():
            stream_gen = generate_analogy_stream(analogy_type, concept1, concept2, concept3, category)
            for chunk in stream_gen:
                yield chunk

        response = Response(generate(), mimetype='text/plain')
        # Add rate limit headers
        if hasattr(g, 'rate_limit_remaining'):
            response.headers['X-RateLimit-Remaining'] = g.rate_limit_remaining
        return response

    except Exception as e:
        logger.error(f"Error streaming analogy: {e}")
        return jsonify({"error": "An internal error occurred while streaming the analogy."}), 500
