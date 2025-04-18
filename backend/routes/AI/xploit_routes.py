from flask import Blueprint, request, jsonify, Response
from helpers.xploitcraft_helper import Xploits
from helpers.rate_limiter import rate_limit
import logging

logger = logging.getLogger(__name__)

xploit = Xploits()
xploit_bp = Blueprint('xploit_bp', __name__)

@xploit_bp.route('/generate_payload', methods=['POST'])
@rate_limit('xploit')  # Add rate limiting to protect API usage
def generate_payload_endpoint():
    data = request.get_json()
    logger.debug(f"Received data: {data}")

    if not data or (not data.get('vulnerability') and not data.get('evasion_technique')):
        logger.error("Invalid request payload - need at least one of vulnerability or evasion_technique")
        return jsonify({'error': 'Please provide at least one of vulnerability or evasion_technique'}), 400

    vulnerability = data.get('vulnerability', "")
    evasion_technique = data.get('evasion_technique', "")
    stream_requested = data.get('stream', False)

    try:
        if stream_requested:
            def generate():
                for chunk in xploit.generate_exploit_payload(vulnerability, evasion_technique, stream=True):
                    yield chunk

            return Response(generate(), mimetype='text/plain')
        else:
            payload = xploit.generate_exploit_payload(vulnerability, evasion_technique, stream=False)
            logger.debug(f"Generated payload: {payload}")
            return jsonify({'payload': payload})

    except Exception as e:
        logger.error(f"Error while generating payload: {str(e)}")
        return jsonify({'error': 'Failed to generate payload'}), 500

