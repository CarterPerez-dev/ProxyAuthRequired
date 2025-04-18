from celery import shared_task
from datetime import datetime, timedelta
import math
import logging
import requests
from helpers.celery_app import app
from mongodb.database import db

# ---------  AI Generation Imports -----------
# Update imports for any route functions you call directly
from routes.AI.analogy_stream_helper import generate_analogy_stream
from routes.AI.scenario_helper import (
    generate_scenario,
    break_down_scenario,
    generate_interactive_questions
)
from routes.AI.xploitcraft_helper import Xploits
from routes.AI.grc_stream_helper import generate_grc_question, generate_grc_questions_stream

logger = logging.getLogger(__name__)
logger.setLevel(logging.DEBUG)

# Initialize Xploits
_xploit = Xploits()

# -----------------------------
# Celery tasks for analogy
# -----------------------------

@app.task(bind=True, max_retries=3, default_retry_delay=10)
def generate_single_analogy_task(self, concept, category):
    """
    Generate a single analogy for the given concept and category.
    Uses the unified analogy_stream_helper for generation.
    """
    try:
        # Use the streaming generator but join the results into a single string
        stream_gen = generate_analogy_stream("single", concept, category=category)
        analogy_text = "".join(stream_gen)
        return analogy_text
    except Exception as e:
        logger.error(f"Celery generate_single_analogy_task error: {e}")
        self.retry(exc=e)


@app.task(bind=True, max_retries=3, default_retry_delay=10)
def generate_comparison_analogy_task(self, concept1, concept2, category):
    """
    Generate a comparison analogy between two concepts using the given category.
    Uses the unified analogy_stream_helper for generation.
    """
    try:
        stream_gen = generate_analogy_stream("comparison", concept1, concept2, category=category)
        analogy_text = "".join(stream_gen)
        return analogy_text
    except Exception as e:
        logger.error(f"Celery generate_comparison_analogy_task error: {e}")
        self.retry(exc=e)


@app.task(bind=True, max_retries=3, default_retry_delay=10)
def generate_triple_comparison_analogy_task(self, concept1, concept2, concept3, category):
    """
    Generate a triple comparison analogy among three concepts using the given category.
    Uses the unified analogy_stream_helper for generation.
    """
    try:
        stream_gen = generate_analogy_stream("triple", concept1, concept2, concept3, category=category)
        analogy_text = "".join(stream_gen)
        return analogy_text
    except Exception as e:
        logger.error(f"Celery generate_triple_comparison_analogy_task error: {e}")
        self.retry(exc=e)


# -----------------------------
# Celery tasks for Scenario
# -----------------------------

@app.task(bind=True, max_retries=3, default_retry_delay=10)
def generate_scenario_task(self, industry, attack_type, skill_level, threat_intensity):
    """
    If generate_scenario returns a streaming generator, we join it into one string 
    so that Celery can store/return that as the task result.
    """
    try:
        scenario_gen = generate_scenario(industry, attack_type, skill_level, threat_intensity)
        scenario_text = "".join(scenario_gen)  # Convert generator of strings into a single string
        return scenario_text
    except Exception as e:
        logger.error(f"Celery generate_scenario_task error: {e}")
        self.retry(exc=e)


@app.task(bind=True, max_retries=3, default_retry_delay=10)
def break_down_scenario_task(self, scenario_text):
    """
    Takes a scenario and 'breaks it down' into context, actors, timeline, etc.
    """
    try:
        return break_down_scenario(scenario_text)
    except Exception as e:
        logger.error(f"Celery break_down_scenario_task error: {e}")
        self.retry(exc=e)


@app.task(bind=True, max_retries=3, default_retry_delay=10)
def generate_interactive_questions_task(self, scenario_text):
    """
    Gathers the chunked question output into a final string or JSON object.
    """
    try:
        questions_gen = generate_interactive_questions(scenario_text)
        questions_text = "".join(questions_gen)
        return questions_text
    except Exception as e:
        logger.error(f"Celery generate_interactive_questions_task error: {e}")
        self.retry(exc=e)


# -----------------------------
# Celery tasks for Xploitcraft
# -----------------------------
@app.task(bind=True, max_retries=3, default_retry_delay=10)
def generate_exploit_payload_task(self, vulnerability, evasion_technique):
    try:
        return _xploit.generate_exploit_payload(vulnerability, evasion_technique)
    except Exception as e:
        logger.error(f"Celery generate_exploit_payload_task error: {e}")
        self.retry(exc=e)


# -----------------------------
# Celery tasks for GRC
# -----------------------------
@app.task(bind=True, max_retries=3, default_retry_delay=10)
def generate_grc_question_task(self, category, difficulty):
    try:
        return generate_grc_question(category, difficulty)
    except Exception as e:
        logger.error(f"Celery generate_grc_question_task error: {e}")
        self.retry(exc=e)


# -----------------------------
# Performance Metrics Aggregator
# -----------------------------
@shared_task
def aggregate_performance_metrics():
    """
    Runs every 3 minutes to gather perfSamples from the past 5 minutes,
    compute average request time, DB query time, data transfer rate, throughput, etc.
    Then store in 'performanceMetrics'. We'll keep the last 20 records in the front end.
    """

    now = datetime.utcnow()
    three_min_ago = now - timedelta(minutes=5)

    samples = list(db.perfSamples.find({"timestamp": {"$gte": three_min_ago}}))
    total_requests = len(samples)
    if total_requests == 0:
        return  # No aggregator doc if no data baby

    total_duration = 0.0
    total_db_time = 0.0
    total_bytes = 0
    errors = 0

    for s in samples:
        total_duration += s.get("duration_sec", 0.0)
        total_db_time += s.get("db_time_sec", 0.0)
        total_bytes += s.get("response_bytes", 0)
        if s.get("http_status", 200) >= 400:
            errors += 1

    avg_request_time = (total_duration / total_requests) if total_requests else 0
    avg_db_query_time = (total_db_time / total_requests) if total_requests else 0
    error_rate = (errors / total_requests) if total_requests else 0.0

    # data_transfer_rate in MB/s (numeric float)
    data_transfer_rate_mb_s = 0.0
    if total_duration > 0:
        data_transfer_rate_mb_s = (total_bytes / (1024.0 * 1024.0)) / total_duration

    # throughput => requests / 3min => convert to requests/min
    # total_requests / 3.0 => requests per minute if I polled 3-min block.
    throughput = (total_requests / 3.0)

    doc = {
        "avg_request_time": round(avg_request_time, 4),         # in seconds
        "avg_db_query_time": round(avg_db_query_time, 4),       # also in seconds, store raw for now
        "data_transfer_rate": round(data_transfer_rate_mb_s, 3),# float in MB/s, no label text
        "throughput": round(throughput, 2),                     # requests/min
        "error_rate": round(error_rate, 4),                     # fraction: 0.0 -> 1.0
        "timestamp": now
    }
    db.performanceMetrics.insert_one(doc)

    # SPACE
    sixty_min_ago = now - timedelta(minutes=60)
    db.perfSamples.delete_many({"timestamp": {"$lt": sixty_min_ago}})

    # SPACE
    two_hours_ago = now - timedelta(hours=2)
    db.performanceMetrics.delete_many({"timestamp": {"$lt": two_hours_ago}})

    return f"Aggregated {total_requests} samples into performanceMetrics."

@app.task(bind=True, max_retries=3, default_retry_delay=10)
def check_api_health(self):
    """
    Simple check if the API is up by calling the health endpoint.
    Runs every 10 minutes.
    """
    try:
        response = requests.get("http://backend:5000/health", timeout=5)
        status = response.status_code
        healthy = status < 400
        
        # Log DB
        db.apiHealth.insert_one({
            "checkedAt": datetime.utcnow(),
            "healthy": healthy,
            "status": status
        })
        
        return True
    except Exception as e:
        # Log the failure and still save to DB
        db.apiHealth.insert_one({
            "checkedAt": datetime.utcnow(),
            "healthy": False,
            "error": str(e)
        })
        return False

# -----------------------------
# Cleanup logs for auditLogs & apiHealth
# -----------------------------
@shared_task
def cleanup_logs():
    """
    Removes old audit logs, apiHealth docs, and NGINX logs.
    - Mongo collections: Removes docs older than 3 days.
    - NGINX logs: Truncates logs to keep file size manageable.
    Runs daily (per the schedule in celery_app).
    """
    now = datetime.utcnow()
    cutoff = now - timedelta(days=1)

    # Cleanup DB collections
    deleted_audit = db.auditLogs.delete_many({"timestamp": {"$lt": cutoff}})
    deleted_health = db.apiHealth.delete_many({"checkedAt": {"$lt": cutoff}})

    # Clean up NGINX logs
    nginx_cleanup_message = "No NGINX log cleanup attempted"
    try:
        # Try multiple possible paths
        possible_paths = [
            "/var/log/nginx/access.log",
            "./nginx/logs/access.log",
            "../nginx/logs/access.log",
        ]
        
        for access_path in possible_paths:
            error_path = access_path.replace("access.log", "error.log")
            try:
                # Truncate the logs instead of deleting them
                result_access = subprocess.run(["truncate", "-s", "0", access_path], 
                                              capture_output=True, text=True, timeout=5)
                result_error = subprocess.run(["truncate", "-s", "0", error_path], 
                                             capture_output=True, text=True, timeout=5)
                
                if result_access.returncode == 0 and result_error.returncode == 0:
                    nginx_cleanup_message = f"NGINX logs truncated successfully at {access_path} and {error_path}"
                    break
            except Exception as e:
                continue
        
    except Exception as e:
        nginx_cleanup_message = f"Error cleaning up NGINX logs: {str(e)}"
    
    logger.info(f"Cleaned logs older than 3 days => auditLogs: {deleted_audit.deleted_count}, "
                f"apiHealth: {deleted_health.deleted_count}. {nginx_cleanup_message}")

    return f"Cleanup complete: auditLogs={deleted_audit.deleted_count}, apiHealth={deleted_health.deleted_count}, {nginx_cleanup_message}"


@shared_task
def update_expired_subscriptions():
    """
    Daily task to find and update subscriptions that have reached their end date.
    """
    now = datetime.utcnow()
    
    # Find users with "canceling" status whose end date has passed
    expired_users = db.mainusers_collection.find({
        "subscriptionStatus": "canceling",
        "subscriptionEndDate": {"$lt": now},
        "subscriptionActive": True
    })
    
    updated_count = 0
    for user in expired_users:
        user_id = str(user["_id"])
        
        # Update subscription status to expired and set active to false
        db.mainusers_collection.update_one(
            {"_id": user["_id"]},
            {"$set": {
                "subscriptionActive": False,
                "subscriptionStatus": "expired"
            }}
        )
        
        # Log 
        db.subscriptionEvents.insert_one({
            "userId": user["_id"],
            "event": "subscription_expired",
            "platform": user.get("subscriptionPlatform", "unknown"),
            "timestamp": now
        })
        
        updated_count += 1
    
    logger.info(f"Updated {updated_count} expired subscriptions")
    return f"Updated {updated_count} expired subscriptions"
