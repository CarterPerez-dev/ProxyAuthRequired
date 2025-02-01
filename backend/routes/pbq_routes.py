import logging
import json
import traceback
from flask import Blueprint, request, jsonify, Response
from flask_cors import CORS

# Import your PBQ AI helper methods
from helpers.pbq_ai_helper import (
    generate_advanced_pbq,
    generate_advanced_pbq_stream,
    simulate_nmap_command_openai
)

pbq_bp = Blueprint('pbq_bp', __name__)
CORS(pbq_bp, resources={r"/api/*": {"origins": "*"}})  # Allow cross-origin for debugging or different front-end

logger = logging.getLogger(__name__)

@pbq_bp.route('/generate_pbq', methods=['POST'])
def generate_pbq():
    """
    Non-streaming route to generate a complete PBQ JSON.
    Expects JSON payload:
    {
      "category": "Network Security",
      "difficulty": "Intermediate",
      "performance_level": "average"
    }
    Returns:
      - 200: complete PBQ JSON
      - 500: error
    """
    data = request.get_json(silent=True) or {}
    category = data.get("category", "Network Security")
    difficulty = data.get("difficulty", "Intermediate")
    performance_level = data.get("performance_level", "average")

    logger.info("generate_pbq called: category=%s, difficulty=%s, performance_level=%s",
                category, difficulty, performance_level)

    try:
        pbq_json_str = generate_advanced_pbq(category, difficulty, performance_level)
        # Validate JSON structure
        pbq_data = json.loads(pbq_json_str)
        return jsonify(pbq_data), 200
    except json.JSONDecodeError as jde:
        logger.error("JSON decode error in generate_pbq: %s", jde)
        return jsonify({"error": "Invalid JSON structure generated."}), 500
    except Exception as exc:
        logger.error("Error in generate_pbq: %s\n%s", exc, traceback.format_exc())
        return jsonify({"error": str(exc)}), 500


@pbq_bp.route('/generate_pbq_stream', methods=['POST'])
def generate_pbq_stream():
    """
    Streaming route (SSE) to generate PBQ JSON chunk by chunk.
    Expects JSON payload:
    {
      "category": "Network Security",
      "difficulty": "Intermediate",
      "performance_level": "average"
    }
    Returns:
      - SSE data lines in the form "data: <partial JSON>"
    """
    data = request.get_json(silent=True) or {}
    category = data.get("category", "Network Security")
    difficulty = data.get("difficulty", "Intermediate")
    performance_level = data.get("performance_level", "average")

    logger.info("generate_pbq_stream: category=%s, difficulty=%s, performance_level=%s",
                category, difficulty, performance_level)

    def sse_stream():
        try:
            for chunk in generate_advanced_pbq_stream(category, difficulty, performance_level):
                if isinstance(chunk, str):
                    # strip out newline chars to avoid confusion
                    safe_chunk = chunk.replace('\n', '').replace('\r', '')
                    yield f"data: {safe_chunk}\n\n"
                else:
                    logger.warning("Received non-string chunk from generator: %s", chunk)
        except Exception as e:
            logger.error("Error streaming PBQ: %s\n%s", e, traceback.format_exc())
            error_msg = json.dumps({"error": f"Failed to stream PBQ: {str(e)}"})
            yield f"data: {error_msg}\n\n"

    return Response(sse_stream(), mimetype='text/event-stream')


@pbq_bp.route('/simulate_cmd', methods=['POST'])
def simulate_cmd():
    """
    Route to simulate Nmap output from a user-typed command.
    Expects JSON: {"command": "nmap -sV -p 80,443 192.168.1.10"}
    Returns: { "output": "<Simulated Nmap output text>" }
    """
    data = request.get_json(silent=True) or {}
    user_command = data.get("command", "").strip()

    logger.info("simulate_cmd called with command: %s", user_command)

    if not user_command:
        return jsonify({"error": "No command provided."}), 400

    try:
        simulated_output = simulate_nmap_command_openai(user_command)
        return jsonify({"output": simulated_output}), 200
    except Exception as exc:
        logger.error("Error in simulate_cmd: %s\n%s", exc, traceback.format_exc())
        return jsonify({"error": str(exc)}), 500

