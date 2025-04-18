import logging
import json  
from flask import Blueprint, request, Response, jsonify, g
from helpers.scenario_helper import (
    generate_scenario,
    generate_interactive_questions
)
from helpers.rate_limiter import rate_limit

scenario_bp = Blueprint('scenario_bp', __name__)
logger = logging.getLogger(__name__)
logger.setLevel(logging.DEBUG)

@scenario_bp.route('/stream_scenario', methods=['POST'])
@rate_limit('scenario')
def stream_scenario_endpoint():
    data = request.get_json() or {}
    required_fields = ["industry", "attack_type", "skill_level", "threat_intensity"]
    missing = [f for f in required_fields if f not in data]
    if missing:
        logger.error(f"Missing required fields: {missing}")
        return jsonify({"error": f"Missing required fields: {missing}"}), 400

    industry = data["industry"]
    attack_type = data["attack_type"]
    skill_level = data["skill_level"]
    threat_intensity = data["threat_intensity"]

    try:
        threat_intensity = int(threat_intensity)
    except ValueError:
        logger.error("Invalid threat_intensity value; must be an integer.")
        return jsonify({"error": "threat_intensity must be an integer"}), 400

    def generate_chunks():
        scenario_generator = generate_scenario(industry, attack_type, skill_level, threat_intensity)
        for chunk in scenario_generator:
            yield chunk

    response = Response(generate_chunks(), mimetype='text/plain')
    if hasattr(g, 'rate_limit_remaining'):
        response.headers['X-RateLimit-Remaining'] = g.rate_limit_remaining
    return response

@scenario_bp.route('/stream_questions', methods=['POST'])
@rate_limit('scenario')
def stream_questions_endpoint():
    data = request.get_json() or {}
    scenario_text = data.get("scenario_text", "")
    if not scenario_text:
        logger.error("Missing scenario_text in the request.")
        return jsonify({"error": "Missing scenario_text"}), 400

    logger.debug(f"Received scenario_text: {scenario_text[:100]}...")

    def generate_json_chunks():
        # The function below returns a streaming generator
        # that yields partial JSON text
        questions = generate_interactive_questions(scenario_text)
        # If 'questions' is already a list, we yield one chunk,
        # but typically it's a generator
        if isinstance(questions, list):
            logger.debug("Questions are a list. Serializing to JSON.")
            yield json.dumps(questions)
        else:
            logger.debug("Questions are being streamed.")
            for chunk in questions:
                yield chunk

    response = Response(generate_json_chunks(), mimetype='application/json')
    if hasattr(g, 'rate_limit_remaining'):
        response.headers['X-RateLimit-Remaining'] = g.rate_limit_remaining
    return response

