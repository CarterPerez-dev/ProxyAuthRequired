# log_routes.py

from flask import Blueprint, request, jsonify
from helpers.log_generator import generate_logs
from helpers.log_helper import analyze_log, serialize_log  
import logging
from models.log_models import (
    Log, SecurityLog, FirewallLog, VulnerabilityLog, IntrusionLog, AccessControlLog,
    EventLog, SystemEvent, ApplicationEvent, AuthenticationEvent, NetworkEvent,
    ErrorLog, DatabaseErrorLog, FileSystemErrorLog, NetworkErrorLog, ApplicationErrorLog,
    DebugLog, QueryDebugLog, ApiDebugLog, ConfigDebugLog, ProcessDebugLog,
    InfoLog, SystemInfoLog, UserActivityLog, DeploymentLog, ServiceStatusLog
)
from datetime import datetime


log_bp = Blueprint("logs", __name__)
logger = logging.getLogger(__name__)


if not logger.handlers:
    handler = logging.StreamHandler()
    formatter = logging.Formatter(
        '%(asctime)s - %(name)s - %(levelname)s - %(message)s'
    )
    handler.setFormatter(formatter)
    logger.addHandler(handler)
    logger.setLevel(logging.DEBUG)


@log_bp.route("/generate", methods=["POST"])
def generate_logs_route():
    """
    Endpoint to generate logs based on category and count.
    """
    try:
       
        data = request.get_json()
        category = data.get("category", "security").lower()
        count = int(data.get("count", 5))
        
        
        logs = generate_logs(category, count)
        if not logs:
            logger.warning(f"No logs generated for category: {category}")
            return jsonify({"error": "Invalid log category."}), 400
        
        
        serialized_logs = [serialize_log(log) for log in logs]

        logger.info(f"Generated {count} logs for category: {category}")
        return jsonify({
            "status": "success",
            "category": category,
            "logs": serialized_logs,
            "count": len(serialized_logs),
        }), 200

    except Exception as e:
        logger.error(f"Error generating logs: {e}")
        return jsonify({"error": str(e)}), 500



@log_bp.route("/analyze", methods=["POST"])
def analyze_log_route():
    """
    Endpoint to analyze a manually provided single log.
    """
    try:
        
        data = request.get_json()
        log = data.get("log", None)
        
        if not log:
            logger.warning("No log provided for analysis.")
            return jsonify({"error": "No log provided."}), 400
        
        # Deserializing logs back into model object
        log_type = log.get("type")
        source = log.get("source", "").lower()
        log_obj = None

        if log_type == "security":
            if source == "firewall":
                log_obj = FirewallLog(**log)
            elif source == "vulnerability scanner":
                log_obj = VulnerabilityLog(**log)
            elif source == "ids":
                log_obj = IntrusionLog(**log)
            elif source == "access control":
                log_obj = AccessControlLog(**log)
            else:
                logger.warning(f"Unknown security log source: {source}")
        elif log_type == "event":
            if source == "system monitor":
                log_obj = SystemEvent(**log)
            elif source == "appmanager":
                log_obj = ApplicationEvent(**log)
            elif source == "authservice":
                log_obj = AuthenticationEvent(**log)
            elif source == "network manager":
                log_obj = NetworkEvent(**log)
            else:
                logger.warning(f"Unknown event log source: {source}")
        elif log_type == "error":
            if source == "database":
                log_obj = DatabaseErrorLog(**log)
            elif source == "filesystem":
                log_obj = FileSystemErrorLog(**log)
            elif source == "network interface":
                log_obj = NetworkErrorLog(**log)
            elif source == "application service":
                log_obj = ApplicationErrorLog(**log)
            else:
                logger.warning(f"Unknown error log source: {source}")
        elif log_type == "debug":
            if source == "query executor":
                log_obj = QueryDebugLog(**log)
            elif source == "api gateway":
                log_obj = ApiDebugLog(**log)
            elif source == "config manager":
                log_obj = ConfigDebugLog(**log)
            elif source == "process manager":
                log_obj = ProcessDebugLog(**log)
            else:
                logger.warning(f"Unknown debug log source: {source}")
        elif log_type == "info":
            if source == "system monitor":
                log_obj = SystemInfoLog(**log)
            elif source == "activity tracker":
                log_obj = UserActivityLog(**log)
            elif source == "deployment manager":
                log_obj = DeploymentLog(**log)
            elif source == "service monitor":
                log_obj = ServiceStatusLog(**log)
            else:
                logger.warning(f"Unknown info log source: {source}")
        else:
            logger.warning(f"Unknown log type: {log_type}")
        
        if not log_obj:
            logger.warning("Invalid log data provided.")
            return jsonify({"error": "Invalid log data provided."}), 400

       
        analysis = analyze_log(log_obj)

       
        serialized_log = serialize_log(log_obj)

        logger.info(f"Analyzed log: {serialized_log.get('id', 'N/A')}")
        return jsonify({
            "status": "success",
            "log": serialized_log,
            "analysis": analysis
        }), 200

    except Exception as e:
        logger.error(f"Error analyzing log: {e}")
        return jsonify({"error": str(e)}), 500



@log_bp.route("/healthcheck", methods=["GET"])
def health_check():
    """
    Health check endpoint to ensure the service is running.
    """
    return jsonify({"status": "running", "service": "Log Analysis API"}), 200



def init_log_routes(db):
    """
    Initialize routes with database integration for log history.
    """
    @log_bp.route("/history/save", methods=["POST"])
    def save_log_history():
        try:
            data = request.get_json()
            db.log_history.insert_one(data)
            return jsonify({"status": "success", "message": "Log history saved."}), 200
        except Exception as e:
            logger.error(f"Error saving log history: {e}")
            return jsonify({"error": str(e)}), 500

    @log_bp.route("/history/fetch", methods=["GET"])
    def fetch_log_history():
        try:
            history = list(db.log_history.find().sort("timestamp", -1))
            serialized_history = [serialize_log(entry) for entry in history]
            return jsonify({
                "status": "success",
                "history": serialized_history,
                "count": len(serialized_history),
            }), 200
        except Exception as e:
            logger.error(f"Error fetching log history: {e}")
            return jsonify({"error": str(e)}), 500

