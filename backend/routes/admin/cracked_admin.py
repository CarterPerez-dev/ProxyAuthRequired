# 2000 LINES OF CODE OF STRAIGHT-- IM WATCHING EVERY LAST REQUEST, INPUT, IP, AUTH ATTEMPT AND MORE. IM WATCHING EVERY MOVE WITH EVERY DEFENSE MECHANISM YOU CAN POSSIBLY FATHOMMMM
import csv
import io
import random
import string
import pytz
from datetime import datetime, timedelta
from bson import ObjectId
from flask import Blueprint, request, session, jsonify, make_response, current_app
from pymongo import ReturnDocument
import redis
import os
import time
import pickle
from dotenv import load_dotenv
import re
import subprocess
from collections import deque
import threading
import time
from mongodb.database import db
import psutil
import socket
cracked_bp = Blueprint('cracked', __name__, url_prefix='/cracked')
ADMIN_PASS = os.getenv('CRACKED_ADMIN_PASSWORD', 'authkey')

load_dotenv()

REDIS_PASSWORD = os.getenv("REDIS_PASSWORD")
cache_conn = redis.StrictRedis(host='redis', port=6379, db=1, password=REDIS_PASSWORD)

def cache_set(key, value, ttl=60):
    try:
        serialized = pickle.dumps(value)
        cache_conn.setex(key, ttl, serialized)
    except:
        pass

def cache_get(key):
    try:
        data = cache_conn.get(key)
        if data:
            return pickle.loads(data)
        return None
    except:
        return None

def require_cracked_admin(required_role=None):
    """
    Checks if user is authenticated as admin via password or OAuth.
    Optionally enforces roles: basic=1, supervisor=2, superadmin=3.
    
    Returns:
        bool: True if properly authenticated with sufficient role permissions
    """
    # First check if user is authenticated as admin
    is_authenticated = session.get('cracked_admin_logged_in', False)
    
    if not is_authenticated:
        return False
        
    # If no specific role is required, basic authentication is enough
    if not required_role:
        return True
        
    # Get the user's current role
    current_role = session.get('cracked_admin_role', 'basic')
    
    # Role priority mapping
    priority_map = {"basic": 1, "supervisor": 2, "superadmin": 3}
    
    # Get numeric values for required role and current role
    needed_priority = priority_map.get(required_role, 1)
    current_priority = priority_map.get(current_role, 1)
    
    # Check if current role has sufficient priority
    return current_priority >= needed_priority




class LogBuffer:
    def __init__(self, max_size):
        self.logs = deque(maxlen=max_size)
        self.lock = threading.Lock()
    
    def add(self, log):
        with self.lock:
            self.logs.append(log)
    
    def get_all(self):
        with self.lock:
            return list(self.logs)

# Create buffers: 30 minutes worth of nginx logs and 1 hour of API logs
# Assuming avg 10 req/min, that's 300 entries for nginx and 600 for API
nginx_logs = LogBuffer(300)
api_logs = LogBuffer(600)

# Function to read nginx logs from file
def read_nginx_logs():
    try:
        # Try multiple possible paths
        possible_paths = [
            "/var/log/nginx/access.log",
            "./nginx/logs/access.log",
            "../nginx/logs/access.log",
        ]
        
        lines = None
        error_msg = "Could not access any nginx log files"
        
        try:
            # Use subprocess directly instead of trying to open files
            output = subprocess.check_output(["sudo", "tail", "-n", "100", "nginx/logs/access.log"], text=True)
            lines = output.splitlines()
        except Exception as e:
            # If subprocess fails, fall back to the original method
            for path in possible_paths:
                try:
                    with open(path, "r") as f:
                        lines = f.readlines()[-100:]  # Get last 100 lines
                    if lines:
                        break
                except Exception as e:
                    continue
        
        if not lines:
            return {"success": False, "error": error_msg}
            
        # Parse the lines and create log entries
        log_entries = []
        for line in lines:
            if line:
                # Parse the line to extract relevant information
                # This regex pattern matches common nginx log format
                pattern = r'([\d\.]+) - - \[(.*?)\] "(.*?)" (\d+) (\d+) "(.*?)" "(.*?)" "(.*?)"'
                match = re.match(pattern, line)
                
                if match:
                    ip, timestamp, request, status, bytes_sent, referer, user_agent, extra = match.groups()
                    method, path = request.split(' ')[:2] if ' ' in request else (request, "")
                    
                    log_entry = {
                        "type": "nginx",
                        "timestamp": timestamp,
                        "ip": ip,
                        "method": method,
                        "path": path,
                        "status": status,
                        "bytes": bytes_sent,
                        "user_agent": user_agent
                    }
                    nginx_logs.add(log_entry)
                    
        return {"success": True, "count": len(lines)}
    except Exception as e:
        return {"success": False, "error": str(e)}

def filter_out_example_accounts(query=None):
    """
    Add a filter to exclude @example.com email addresses from MongoDB queries.
    If a query dict is provided, it adds the filter to it. Otherwise, creates a new query.
    
    Args:
        query (dict, optional): Existing MongoDB query. Defaults to None.
        
    Returns:
        dict: MongoDB query with @example.com filter added
    """
    if query is None:
        query = {}
    
    # Only add email filter if it doesn't already exist
    if "email" not in query:
        query["email"] = {"$not": {"$regex": "@example.com$"}}
        
    return query

# Example usage:
# users = db.mainusers.find(filter_out_example_accounts())
# user_count = db.mainusers.count_documents(filter_out_example_accounts())



@cracked_bp.route('/request-logs/nginx', methods=['GET'])
def admin_nginx_logs():
    if not require_cracked_admin():
        return jsonify({"error": "Not authenticated"}), 401
    
    # Optionally trigger a refresh of the logs
    if request.args.get('refresh', 'false').lower() == 'true':
        read_result = read_nginx_logs()
        if not read_result['success']:
            return jsonify({"error": f"Failed to read nginx logs: {read_result['error']}"}), 500
    
    # Apply filtering if provided
    filter_text = request.args.get('filter', '').lower()
    
    if filter_text:
        filtered_logs = [
            log for log in nginx_logs.get_all() 
            if filter_text in log.get('path', '').lower() or 
               filter_text in log.get('ip', '').lower() or
               filter_text in log.get('method', '').lower()
        ]
        return jsonify(filtered_logs), 200
    
    return jsonify(nginx_logs.get_all()), 200

@cracked_bp.route('/request-logs/api', methods=['GET'])
def admin_api_logs():
    if not require_cracked_admin():
        return jsonify({"error": "Not authenticated"}), 401
    
    # Apply filtering if provided
    filter_text = request.args.get('filter', '').lower()
    
    if filter_text:
        filtered_logs = [
            log for log in api_logs.get_all() 
            if filter_text in log.get('path', '').lower() or 
               filter_text in log.get('method', '').lower()
        ]
        return jsonify(filtered_logs), 200
    
    return jsonify(api_logs.get_all()), 200





##################################################################
# ADMIN LOGIN / LOGOUT
##################################################################
@cracked_bp.route('/login', methods=['POST'])
def cracked_admin_login():
    data = request.json or {}
    adminKey = data.get('adminKey', '')
    input_role = data.get('role', 'basic')
    if adminKey == ADMIN_PASS:
        session['cracked_admin_logged_in'] = True
        session['cracked_admin_role'] = input_role
        return jsonify({"message": "Authorization successful"}), 200
    else:
        return jsonify({"error": "Invalid admin password"}), 403

@cracked_bp.route('/logout', methods=['POST'])
def cracked_admin_logout():
    session.pop('cracked_admin_logged_in', None)
    session.pop('cracked_admin_role', None)
    return jsonify({"message": "admin logged out"}), 200


##################################################################
# ADMIN DASHBOARD
##################################################################
@cracked_bp.route('/dashboard', methods=['GET'])
def admin_dashboard():
    if not require_cracked_admin():
        return jsonify({"error": "Not authenticated as admin"}), 401

    cache_key = 'admin_dashboard_data'
    cached_data = cache_get(cache_key)
    now_utc = datetime.utcnow()

    if cached_data:
        return jsonify(cached_data), 200

    try:
  
        user_query = filter_out_example_accounts()
        user_count = db.mainusers.count_documents(user_query)
        
        # Only count test attempts by real users
        real_user_ids = [doc["_id"] for doc in db.mainusers.find(user_query, {"_id": 1})]
        test_attempts_count = db.testAttempts.count_documents({"userId": {"$in": real_user_ids}})

        start_of_day = now_utc.replace(hour=0, minute=0, second=0, microsecond=0)
        daily_bonus_claims = db.mainusers.count_documents({
            "lastDailyClaim": {"$gte": start_of_day},
            "email": {"$not": {"$regex": "@example.com$"}}
        })

        # Only consider real users for test score calculation
        pipeline = [
            {"$match": {
                "finished": True,
                "userId": {"$in": real_user_ids}
            }},
            {"$group": {
                "_id": None,
                "avgScorePercent": {
                    "$avg": {
                        "$multiply": [
                            {"$divide": ["$score", "$totalQuestions"]},
                            100
                        ]
                    }
                }
            }}
        ]
        result = list(db.testAttempts.aggregate(pipeline))
        avg_score = result[0]["avgScorePercent"] if result else 0.0

        # 2) Performance metrics (the latest doc)
        perf_metrics = db.performanceMetrics.find_one({}, sort=[("timestamp", -1)])
        if not perf_metrics:
            # Provide a fallback doc if none exist
            perf_metrics = {
                "avg_request_time": 0.123,
                "avg_db_query_time_ms": 45.0,
                "data_transfer_rate": "1.2MB/s",
                "throughput": 50,
                "error_rate": 0.02,
                "timestamp": now_utc
            }
        else:
            # Convert _id => str
            if '_id' in perf_metrics:
                perf_metrics['_id'] = str(perf_metrics['_id'])

            # If there's a numeric 'avg_db_query_time', convert to ms
            if 'avg_db_query_time' in perf_metrics:
                ms_val = round(perf_metrics['avg_db_query_time'] * 1000, 2)
                perf_metrics['avg_db_query_time_ms'] = ms_val
                del perf_metrics['avg_db_query_time']

            # Convert timestamp to EST
            if 'timestamp' in perf_metrics and isinstance(perf_metrics['timestamp'], datetime):
                import pytz
                est_tz = pytz.timezone('America/New_York')
                perf_metrics['timestamp'] = perf_metrics['timestamp'].astimezone(est_tz).isoformat()

        # 3) Build "recentStats" for the last 7 days - FILTERED
        import pytz
        est_tz = pytz.timezone('America/New_York')
        recentStats = []
        for i in range(7):
            day_start = start_of_day - timedelta(days=i)
            day_end = day_start + timedelta(days=1)
            label_str = day_start.strftime("%Y-%m-%d")

            # Filter out example.com accounts
            day_bonus_count = db.mainusers.count_documents({
                "lastDailyClaim": {"$gte": day_start, "$lt": day_end},
                "email": {"$not": {"$regex": "@example.com$"}}
            })
            
            # Only count test attempts by real users
            day_test_attempts = db.testAttempts.count_documents({
                "finished": True,
                "finishedAt": {"$gte": day_start, "$lt": day_end},
                "userId": {"$in": real_user_ids}
            })
            
            recentStats.append({
                "label": label_str,
                "dailyBonus": day_bonus_count,
                "testAttempts": day_test_attempts
            })
        # Reverse so oldest is first
        recentStats.reverse()

        now_est = now_utc.astimezone(est_tz).isoformat()

        dashboard_data = {
            "user_count": user_count,
            "test_attempts_count": test_attempts_count,
            "daily_bonus_claims": daily_bonus_claims,
            "average_test_score_percent": round(avg_score, 2),
            "timestamp_est": now_est,
            "performance_metrics": perf_metrics,
            "recentStats": recentStats
        }

        cache_set(cache_key, dashboard_data, ttl=60)
        return jsonify(dashboard_data), 200

    except Exception as e:
        return jsonify({"error": "Failed to retrieve dashboard metrics", "details": str(e)}), 500

##################################################################
# USERS
##################################################################
@cracked_bp.route('/users', methods=['GET'])
def admin_list_users():
    if not require_cracked_admin():
        return jsonify({"error": "Not authenticated"}), 401

    search = request.args.get('search', '').strip()
    page = int(request.args.get('page', 1))
    limit = int(request.args.get('limit', 20))
    
    # Get the value of a new "include_example" query parameter (default: False)
    include_example = request.args.get('include_example', 'false').lower() == 'true'

    # Optional: Cache page1 limit20 w/no search
    if not search and page == 1 and limit == 20 and not include_example:
        cache_key = "admin_users_list_page1_limit20"
        cached_data = cache_get(cache_key)
        if cached_data:
            return jsonify(cached_data), 200

    # Enhanced query - search across more fields
    query = {}
    if search:
        query = {
            "$or": [
                {"username": {"$regex": search, "$options": "i"}},
                {"email": {"$regex": search, "$options": "i"}},
                {"ip": {"$regex": search, "$options": "i"}},
                {"subscriptionPlatform": {"$regex": search, "$options": "i"}},
                {"oauth_provider": {"$regex": search, "$options": "i"}},
                {"_id": {"$regex": search, "$options": "i"} if search.isalnum() else {"$exists": True}}
            ]
        }
    
    # Unless explicitly included, exclude @example.com accounts
    if not include_example:
        # Add condition to filter out example.com emails
        # We need to add this to the query differently depending on
        # whether it already has conditions
        if query and "$or" in query:
            # There's an $or condition, need to wrap it with $and to add email filter
            query = {
                "$and": [
                    {"email": {"$not": {"$regex": "@example.com$"}}},
                    query
                ]
            }
        else:
            # Just add the email filter directly
            query["email"] = {"$not": {"$regex": "@example.com$"}}
    
    skip_count = (page - 1) * limit

    # Enhanced projection with more user information
    projection = {
        "_id": 1,
        "username": 1,
        "email": 1,
        "coins": 1,
        "xp": 1,
        "level": 1,
        "achievements": 1,
        "subscriptionActive": 1,
        "subscriptionStatus": 1,
        "subscriptionPlatform": 1,
        "subscriptionStartDate": 1,
        "subscriptionEndDate": 1,
        "subscriptionCanceledAt": 1,
        "oauth_provider": 1,
        "suspended": 1,
        "achievement_counters": 1,
        "currentAvatar": 1,
        "ip": 1,
        "lastLoginAt": 1,
    }

    cursor = db.mainusers.find(query, projection).skip(skip_count).limit(limit)
    results = []
    
    # Current timestamp for active session calculation
    now = datetime.utcnow()
    active_threshold = now - timedelta(minutes=15)  # Consider users active in last 15 min
    
    for u in cursor:
        u['_id'] = str(u['_id'])
        
        # Format as short ID for display purposes
        u['shortId'] = u['_id'][-5:] 
        
        if 'currentAvatar' in u and isinstance(u['currentAvatar'], ObjectId):
            u['currentAvatar'] = str(u['currentAvatar'])
        if 'achievements' in u and isinstance(u['achievements'], list):
            u['achievements'] = [str(a) for a in u['achievements']]

        # Get test statistics
        counters = u.get('achievement_counters', {})
        u['totalQuestionsAnswered'] = counters.get('total_questions_answered', 0)
        u['perfectTestsCount'] = counters.get('perfect_tests_count', 0)
        
        # Check if currently active
        recent_activity = db.auditLogs.find_one({
            "userId": ObjectId(u['_id']),
            "timestamp": {"$gte": active_threshold}
        })
        u['isActive'] = True if recent_activity else False
        
        # Get additional information
        test_attempts = db.testAttempts_collection.count_documents({
            "userId": ObjectId(u['_id'])
        })
        u['testAttempts'] = test_attempts
        
        # Format timestamps
        if 'subscriptionStartDate' in u and u['subscriptionStartDate']:
            u['subscriptionStartDate'] = u['subscriptionStartDate'].isoformat()
        if 'subscriptionEndDate' in u and u['subscriptionEndDate']:
            u['subscriptionEndDate'] = u['subscriptionEndDate'].isoformat()
        if 'subscriptionCanceledAt' in u and u['subscriptionCanceledAt']:
            u['subscriptionCanceledAt'] = u['subscriptionCanceledAt'].isoformat()
        if 'lastLoginAt' in u and u['lastLoginAt']:
            u['lastLoginAt'] = u['lastLoginAt'].isoformat()
            
        # Identify signup source (iOS or Web)
        if u.get('appleTransactionId'):
            u['signupSource'] = 'iOS'
        elif u.get('stripeSubscriptionId'):
            u['signupSource'] = 'Web'
        else:
            u['signupSource'] = 'Unknown'
            
        # Add flag to indicate if this is an example account
        u['isExampleAccount'] = '@example.com' in u.get('email', '')
            
        results.append(u)

    # Get total count (also respecting the example.com filter)
    total_count = db.mainusers.count_documents(query)
    
    resp_data = {
        "users": results,
        "total": total_count,
        "page": page,
        "limit": limit,
        "includeExample": include_example
    }

    if not search and page == 1 and limit == 20 and not include_example:
        cache_set("admin_users_list_page1_limit20", resp_data, 60)

    return jsonify(resp_data), 200


@cracked_bp.route('/users/<user_id>/toggle-subscription', methods=['POST'])
def admin_toggle_subscription(user_id):
    if not require_cracked_admin(required_role="supervisor"):
        return jsonify({"error": "Insufficient admin privileges"}), 403

    try:
        obj_id = ObjectId(user_id)
    except:
        return jsonify({"error": "Invalid user id"}), 400

    data = request.json or {}
    active = data.get("active", False)  # Whether to activate or deactivate

    user = db.mainusers.find_one({"_id": obj_id})
    if not user:
        return jsonify({"error": "User not found"}), 404

    update_fields = {
        "subscriptionActive": active
    }
    
    # If activating, set status to active
    if active:
        update_fields["subscriptionStatus"] = "active"
    else:
        update_fields["subscriptionStatus"] = "inactive"
        
    result = db.mainusers.update_one(
        {"_id": obj_id},
        {"$set": update_fields}
    )
    
    # Log this subscription event
    db.subscriptionEvents.insert_one({
        'userId': obj_id,
        'event': 'subscription_toggled_by_admin',
        'platform': user.get('subscriptionPlatform', 'unknown'),
        'action': 'activated' if active else 'deactivated',
        'timestamp': datetime.utcnow()
    })
    
    return jsonify({
        "message": f"User subscription {'activated' if active else 'deactivated'} successfully",
        "subscriptionActive": active
    }), 200    
    
     
    
@cracked_bp.route('/users/<user_id>', methods=['PUT'])
def admin_update_user(user_id):
    if not require_cracked_admin():
        return jsonify({"error": "Not authenticated"}), 401
    data = request.json or {}

    try:
        obj_id = ObjectId(user_id)
    except:
        return jsonify({"error": "Invalid user id"}), 400

    # We only allow editing certain fields
    update_fields = {}
    for field in ["username", "coins", "xp", "level", "subscriptionActive", "suspended"]:
        if field in data:
            update_fields[field] = data[field]
    if update_fields:
        db.mainusers.update_one({"_id": obj_id}, {"$set": update_fields})
        return jsonify({"message": "User updated"}), 200
    else:
        return jsonify({"message": "No valid fields to update"}), 200

@cracked_bp.route('/users/<user_id>', methods=['DELETE'])
def admin_delete_user(user_id):
    if not require_cracked_admin(required_role="supervisor"):
        return jsonify({"error": "Insufficient admin privileges"}), 403

    try:
        obj_id = ObjectId(user_id)
    except:
        return jsonify({"error": "Invalid user id"}), 400

    db.mainusers.delete_one({"_id": obj_id})
    return jsonify({"message": "User deleted"}), 200

@cracked_bp.route('/users/<user_id>/reset-password', methods=['POST'])
def admin_reset_password(user_id):
    if not require_cracked_admin(required_role="supervisor"):
        return jsonify({"error": "Insufficient admin privileges"}), 403

    try:
        obj_id = ObjectId(user_id)
    except:
        return jsonify({"error": "Invalid user id"}), 400

    import string, random
    new_pass = ''.join(random.choices(string.ascii_letters + string.digits, k=12))
    result = db.mainusers.find_one_and_update(
        {"_id": obj_id},
        {"$set": {"password": new_pass}},
        return_document=ReturnDocument.AFTER
    )
    if not result:
        return jsonify({"error": "User not found"}), 404
    return jsonify({"message": "Password reset", "newPassword": new_pass}), 200


##################################################################
# SUPPORT THREADS (Admin)
##################################################################
@cracked_bp.route('/supportThreads', methods=['GET'])
def admin_list_support_threads():
    if not require_cracked_admin():
        return jsonify({"error": "Not authenticated"}), 401

    status_filter = request.args.get('status', '')
    query = {}
    if status_filter:
        query["status"] = status_filter

    threads = db.supportThreads.find(query).sort("updatedAt", -1)
    results = []
    for t in threads:
        t['_id'] = str(t['_id'])
        t['userId'] = str(t['userId'])
        for m in t.get('messages', []):
            if isinstance(m.get('timestamp'), datetime):
                m['timestamp'] = m['timestamp'].isoformat()
        results.append(t)
    return jsonify(results), 200

@cracked_bp.route('/supportThreads/<thread_id>', methods=['GET'])
def admin_get_support_thread(thread_id):
    if not require_cracked_admin():
        return jsonify({"error": "Not authenticated"}), 401

    try:
        obj_id = ObjectId(thread_id)
    except:
        return jsonify({"error": "Invalid thread id"}), 400

    thread = db.supportThreads.find_one({"_id": obj_id})
    if not thread:
        return jsonify({"error": "Thread not found"}), 404

    thread['_id'] = str(thread['_id'])
    thread['userId'] = str(thread['userId'])
    for m in thread.get('messages', []):
        if isinstance(m.get('timestamp'), datetime):
            m['timestamp'] = m['timestamp'].isoformat()

    return jsonify(thread), 200

@cracked_bp.route('/supportThreads/<thread_id>/reply', methods=['POST'])
def admin_reply_to_thread(thread_id):
    """
    Admin replies to an existing thread. 
    Emits 'new_message' to that thread's room => room = thread_id
    """
    if not require_cracked_admin():
        return jsonify({"error": "Not authenticated"}), 401

    try:
        obj_id = ObjectId(thread_id)
    except:
        return jsonify({"error": "Invalid thread id"}), 400

    data = request.json or {}
    content = data.get('content', '').strip()
    if not content:
        return jsonify({"error": "No content provided"}), 400

    now = datetime.utcnow()
    update_result = db.supportThreads.update_one(
        {"_id": obj_id},
        {
            "$push": {
                "messages": {
                    "sender": "admin",
                    "content": content,
                    "timestamp": now
                }
            },
            "$set": {"updatedAt": now}
        }
    )
    if update_result.matched_count == 0:
        return jsonify({"error": "Thread not found"}), 404

    socketio = current_app.extensions['socketio']
    thread_id_str = str(thread_id)

    socketio.emit('new_message', {
        "threadId": thread_id_str,
        "message": {
            "sender": "admin",
            "content": content,
            "timestamp": now.isoformat()
        }
    }, room=thread_id_str)

    return jsonify({"message": "Reply sent"}), 200

@cracked_bp.route('/supportThreads/<thread_id>/close', methods=['POST'])
def admin_close_thread(thread_id):
    """
    Admin closes a thread. Also pushes a "Thread closed" message
    into 'messages' array and emits 'new_message'
    so the user sees it in real time.
    """
    if not require_cracked_admin():
        return jsonify({"error": "Not authenticated"}), 401

    try:
        obj_id = ObjectId(thread_id)
    except:
        return jsonify({"error": "Invalid thread id"}), 400

    data = request.json or {}
    resolution = data.get('resolution', 'closed by admin')
    now = datetime.utcnow()

    # Update DB: set status to 'closed', push a closure message
    update_result = db.supportThreads.update_one(
        {"_id": obj_id},
        {
            "$push": {"messages": {
                "sender": "admin",
                "content": f"Thread closed. Reason: {resolution}",
                "timestamp": now
            }},
            "$set": {
                "status": "closed",
                "updatedAt": now
            }
        }
    )
    if update_result.matched_count == 0:
        return jsonify({"error": "Thread not found"}), 404

    # Emit a 'new_message' event so the user sees
    # "Thread closed..." message in real time
    from flask import current_app
    socketio = current_app.extensions['socketio']
    socketio.emit(
        'new_message',
        {
            "threadId": str(obj_id),
            "message": {
                "sender": "admin",
                "content": f"Thread closed. Reason: {resolution}",
                "timestamp": now.isoformat()
            }
        },
        room=str(obj_id)  # The Socket.IO room is the thread's string ID
    )

    return jsonify({"message": "Thread closed"}), 200


@cracked_bp.route('/supportThreads/clear-closed', methods=['DELETE'])
def admin_clear_closed_threads():
    if not require_cracked_admin(required_role="supervisor"):
        return jsonify({"error": "Insufficient admin privileges"}), 403

    result = db.supportThreads.delete_many({"status": "closed"})
    return jsonify({"message": f"Deleted {result.deleted_count} closed threads"}), 200

@cracked_bp.route('/supportThreads/createFromAdmin', methods=['POST'])
def admin_create_thread_for_user():
    """
    JSON: { "userId": "...", "initialMessage": "Hello from admin" }
    Creates a new support thread for the user with an admin-sent message.
    Emits 'new_thread' to the user's personal room => "user_<userId>"
    Returns the thread data in the response.
    """
    if not require_cracked_admin():
        return jsonify({"error": "Not authenticated"}), 401

    data = request.json or {}
    user_id = data.get("userId")
    initial_message = data.get("initialMessage", "").strip()
    if not user_id:
        return jsonify({"error": "Missing userId"}), 400

    try:
        user_oid = ObjectId(user_id)
    except:
        return jsonify({"error": "Invalid userId"}), 400

    now = datetime.utcnow()
    thread_doc = {
        "userId": user_oid,
        "subject": "Admin-initiated conversation",
        "messages": [],
        "status": "open",
        "createdAt": now,
        "updatedAt": now
    }
    if initial_message:
        thread_doc["messages"].append({
            "sender": "admin",
            "content": initial_message,
            "timestamp": now
        })

    insert_result = db.supportThreads.insert_one(thread_doc)
    if insert_result.inserted_id:
        socketio = current_app.extensions['socketio']

        thread_data = {
            "_id": str(insert_result.inserted_id),
            "userId": user_id,
            "subject": "Admin-initiated conversation",
            "status": "open",
            "createdAt": now.isoformat(),
            "updatedAt": now.isoformat(),
            "messages": ([
                {
                    "sender": "admin",
                    "content": initial_message,
                    "timestamp": now.isoformat()
                }
            ] if initial_message else [])
        }

        # Emit to just that user's room => "user_<userId>"
        socketio.emit('new_thread', thread_data, room=f"user_{user_id}")

        return jsonify({"message": "Thread created", "thread": thread_data}), 201
    else:
        return jsonify({"error": "Failed to create thread"}), 500


##################################################################
# TESTS
##################################################################
@cracked_bp.route('/tests', methods=['GET'])
def admin_list_tests():
    if not require_cracked_admin():
        return jsonify({"error": "Not authenticated"}), 401

    category = request.args.get('category', '').strip()
    query = {}
    if category:
        query["category"] = category

    tests_cursor = db.tests.find(query)
    results = []
    for t in tests_cursor:
        t['_id'] = str(t['_id'])
        results.append(t)
    return jsonify(results), 200


@cracked_bp.route('/tests', methods=['POST'])
def admin_create_test():
    if not require_cracked_admin(required_role="supervisor"):
        return jsonify({"error": "Insufficient admin privileges"}), 403

    data = request.json or {}
    # Must have "category", "testId", "questions"
    if "category" not in data or "testId" not in data or "questions" not in data:
        return jsonify({"error": "Missing required fields"}), 400

    result = db.tests.insert_one(data)
    return jsonify({"message": "Test created", "insertedId": str(result.inserted_id)}), 201


@cracked_bp.route('/tests/<test_id>', methods=['PUT'])
def admin_update_test(test_id):
    if not require_cracked_admin(required_role="supervisor"):
        return jsonify({"error": "Insufficient admin privileges"}), 403

    data = request.json or {}
    try:
        obj_id = ObjectId(test_id)
    except:
        return jsonify({"error": "Invalid test id"}), 400

    update_result = db.tests.update_one({"_id": obj_id}, {"$set": data})
    if update_result.matched_count == 0:
        return jsonify({"error": "Test not found"}), 404
    return jsonify({"message": "Test updated"}), 200


@cracked_bp.route('/tests/<test_id>', methods=['DELETE'])
def admin_delete_test(test_id):
    if not require_cracked_admin(required_role="supervisor"):
        return jsonify({"error": "Insufficient admin privileges"}), 403

    try:
        obj_id = ObjectId(test_id)
    except:
        return jsonify({"error": "Invalid test id"}), 400

    delete_result = db.tests.delete_one({"_id": obj_id})
    if delete_result.deleted_count == 0:
        return jsonify({"error": "Test not found"}), 404
    return jsonify({"message": "Test deleted"}), 200


##################################################################
# DAILY PBQs
##################################################################
@cracked_bp.route('/daily', methods=['GET'])
def admin_list_daily_questions():
    if not require_cracked_admin():
        return jsonify({"error": "Not authenticated"}), 401

    docs = list(db.dailyQuestions.find({}))
    for d in docs:
        d['_id'] = str(d['_id'])
    return jsonify(docs), 200

# In backend/routes/cracked_admin.py - Update the admin_create_daily_question function

@cracked_bp.route('/daily', methods=['POST'])
def admin_create_daily_question():
    if not require_cracked_admin(required_role="supervisor"):
        return jsonify({"error": "Insufficient admin privileges"}), 403

    data = request.json or {}
    if "prompt" not in data:
        return jsonify({"error": "Missing prompt"}), 400

    # Add the exam tip field to the data being stored
    data["createdAt"] = datetime.utcnow()
    # Make sure options and examTip fields exist in the database
    if "options" not in data:
        data["options"] = ["", "", "", ""]
    if "examTip" not in data:
        data["examTip"] = ""
        
    db.dailyQuestions.insert_one(data)
    return jsonify({"message": "Daily PBQ created"}), 201
    

@cracked_bp.route('/daily/<obj_id>', methods=['PUT'])
def admin_update_daily_question(obj_id):
    if not require_cracked_admin(required_role="supervisor"):
        return jsonify({"error": "Insufficient admin privileges"}), 403

    data = request.json or {}
    try:
        doc_id = ObjectId(obj_id)
    except:
        return jsonify({"error": "Invalid daily PBQ id"}), 400

    update_result = db.dailyQuestions.update_one({"_id": doc_id}, {"$set": data})
    if update_result.matched_count == 0:
        return jsonify({"error": "Daily PBQ not found"}), 404
    return jsonify({"message": "Daily PBQ updated"}), 200

@cracked_bp.route('/daily/<obj_id>', methods=['DELETE'])
def admin_delete_daily_question(obj_id):
    if not require_cracked_admin(required_role="supervisor"):
        return jsonify({"error": "Insufficient admin privileges"}), 403

    try:
        doc_id = ObjectId(obj_id)
    except:
        return jsonify({"error": "Invalid daily PBQ id"}), 400

    delete_result = db.dailyQuestions.delete_one({"_id": doc_id})
    if delete_result.deleted_count == 0:
        return jsonify({"error": "Not found"}), 404
    return jsonify({"message": "Daily PBQ deleted"}), 200





##################################################################
# PERFORMANCE
##################################################################
@cracked_bp.route('/performance', methods=['GET'])
def admin_performance_metrics():
    if not require_cracked_admin():
        return jsonify({"error": "Not authenticated"}), 401

    try:
        # Get the latest performance metrics
        perf_metrics = db.performanceMetrics.find_one({}, sort=[("timestamp", -1)])
        if not perf_metrics:
            # Return a dummy doc so front end won't break
            perf_metrics = {
                "_id": None,
                "avg_request_time": 0.123,
                "avg_db_query_time_ms": 45.0,
                "data_transfer_rate": "1.2MB/s",
                "throughput": 50,
                "error_rate": 0.02,
                "timestamp": datetime.utcnow()
            }
        else:
            perf_metrics['_id'] = str(perf_metrics.get('_id', ''))

            # Convert any 'avg_db_query_time' => ms
            if 'avg_db_query_time' in perf_metrics:
                ms_val = round(perf_metrics['avg_db_query_time'] * 1000, 2)
                perf_metrics['avg_db_query_time_ms'] = ms_val
                del perf_metrics['avg_db_query_time']

        # Convert timestamp to EST
        if 'timestamp' in perf_metrics and isinstance(perf_metrics['timestamp'], datetime):
            est_tz = pytz.timezone('America/New_York')
            perf_metrics['timestamp'] = perf_metrics['timestamp'].astimezone(est_tz).isoformat()

        # Get history for charts (last 60 records)
        history_cursor = db.performanceMetrics.find().sort("timestamp", -1).limit(60)
        history_list = []
        est_tz = pytz.timezone('America/New_York')
        
        for doc in history_cursor:
            doc_id = str(doc['_id'])
            doc_time = doc['timestamp'].astimezone(est_tz).isoformat() if isinstance(doc['timestamp'], datetime) else None
            
            # Convert numeric to ms
            db_time_ms = None
            if 'avg_db_query_time' in doc:
                db_time_ms = round(doc['avg_db_query_time'] * 1000, 2)
            elif 'avg_db_query_time_ms' in doc:
                db_time_ms = doc['avg_db_query_time_ms']
                
            request_time_ms = None
            if 'avg_request_time' in doc:
                request_time_ms = round(doc['avg_request_time'] * 1000, 2)

            history_list.append({
                "_id": doc_id,
                "timestamp": doc_time,
                "requestTime": request_time_ms,
                "dbTime": db_time_ms,
                "throughput": doc.get("throughput", 0),
                "errorRate": doc.get("error_rate", 0)
            })
            
        # Reverse the list so it's chronological
        perf_metrics['history'] = list(reversed(history_list))
        
        # Get route statistics for the database section
        # Sample the last 100 entries from perfSamples to see which routes are most commonly used
        recent_samples = list(db.perfSamples.find({}, 
                                               {"route": 1, "method": 1, "duration_sec": 1, "response_bytes": 1})
                                       .sort("timestamp", -1)
                                       .limit(100))
        
        # Count request by route
        route_stats = {}
        requests_data = []
        
        for sample in recent_samples:
            route = sample.get("route", "/unknown")
            route_stats[route] = route_stats.get(route, 0) + 1
            
            # Also collect data for the scatter plot
            if "duration_sec" in sample and "response_bytes" in sample:
                requests_data.append({
                    "route": route,
                    "requestTime": round(sample["duration_sec"] * 1000, 2),
                    "responseBytes": sample.get("response_bytes", 0)
                })
        
        # Convert to list for the chart
        route_stats_list = [{"route": k, "count": v} for k, v in route_stats.items()]
        # Sort by count descending and take top 10
        route_stats_list = sorted(route_stats_list, key=lambda x: x["count"], reverse=True)[:10]
        
        perf_metrics['routeStats'] = route_stats_list
        perf_metrics['requests'] = requests_data
        
        # Add mock cache hit rate (you can replace with real data if available)
        perf_metrics['cache_hit_rate'] = 0.75  # 75% cache hit rate
        
        # Add mock active connections (you can replace with real data if available)
        perf_metrics['active_connections'] = 8  # 8 active DB connections

        return jsonify(perf_metrics), 200

    except Exception as e:
        return jsonify({"error": "Failed to retrieve performance metrics", "details": str(e)}), 500


@cracked_bp.route('/web-vitals', methods=['GET'])
def admin_web_vitals():
    if not require_cracked_admin():
        return jsonify({"error": "Not authenticated"}), 401
        
    try:
        # Get the latest web vitals from the database
        # We'll mock this data for now, but you can replace with actual DB queries
        web_vitals = {
            "lcp": {"value": 2800, "status": "needs-improvement"},
            "fcp": {"value": 1500, "status": "good"},
            "cls": {"value": 0.08, "status": "good"},
            "ttfb": {"value": 850, "status": "needs-improvement"},
            "inp": {"value": 180, "status": "good"},
            "history": []
        }
        
        # Generate some mock history data
        now = datetime.utcnow()
        est_tz = pytz.timezone('America/New_York')
        
        history = []
        for i in range(24):  # Last 24 hours
            timestamp = now - timedelta(hours=i)
            timestamp_str = timestamp.astimezone(est_tz).isoformat()
            
            # Add some variation to the metrics
            lcp_variation = random.uniform(0.9, 1.1)
            fcp_variation = random.uniform(0.9, 1.1)
            cls_variation = random.uniform(0.9, 1.1)
            ttfb_variation = random.uniform(0.9, 1.1)
            inp_variation = random.uniform(0.9, 1.1)
            
            history.append({
                "timestamp": timestamp_str,
                "lcp": round(web_vitals["lcp"]["value"] * lcp_variation),
                "fcp": round(web_vitals["fcp"]["value"] * fcp_variation),
                "cls": round(web_vitals["cls"]["value"] * cls_variation, 3),
                "ttfb": round(web_vitals["ttfb"]["value"] * ttfb_variation),
                "inp": round(web_vitals["inp"]["value"] * inp_variation)
            })
        
        # Sort by timestamp (oldest first)
        history = sorted(history, key=lambda x: x["timestamp"])
        web_vitals["history"] = history
        
        return jsonify(web_vitals), 200
        
    except Exception as e:
        return jsonify({"error": "Failed to retrieve web vitals metrics", "details": str(e)}), 500


@cracked_bp.route('/recent-errors', methods=['GET'])
def admin_recent_errors():
    if not require_cracked_admin():
        return jsonify({"error": "Not authenticated"}), 401
        
    try:
        # Get recent errors from perfSamples (HTTP status >= 400)
        one_hour_ago = datetime.utcnow() - timedelta(hours=1)
        error_samples = list(db.perfSamples.find({
                "http_status": {"$gte": 400},
                "timestamp": {"$gte": one_hour_ago}
            })
            .sort("timestamp", -1)
            .limit(50))
            
        errors = []
        est_tz = pytz.timezone('America/New_York')
        
        for error in error_samples:
            timestamp = error.get("timestamp")
            if isinstance(timestamp, datetime):
                timestamp = timestamp.astimezone(est_tz).isoformat()
                
            errors.append({
                "timestamp": timestamp,
                "path": error.get("route", "/unknown"),
                "method": error.get("method", "GET"),
                "status": error.get("http_status", 500),
                "message": get_status_message(error.get("http_status", 500))
            })
            
        return jsonify({"errors": errors}), 200
        
    except Exception as e:
        return jsonify({"error": "Failed to retrieve recent errors", "details": str(e)}), 500

# Helper function to get status message for HTTP status codes
def get_status_message(status_code):
    status_messages = {
        400: "Bad Request",
        401: "Unauthorized",
        403: "Forbidden",
        404: "Not Found",
        405: "Method Not Allowed",
        408: "Request Timeout",
        429: "Too Many Requests",
        500: "Internal Server Error",
        502: "Bad Gateway",
        503: "Service Unavailable",
        504: "Gateway Timeout"
    }
    return status_messages.get(status_code, "Unknown Error")




##################################################################
# REPORT WEB VITALS
##################################################################
@cracked_bp.route('/report-web-vitals', methods=['POST'])
def report_web_vitals():
    data = request.json or {}
    
    # Extract metrics
    metrics = data.get('metrics', {})
    page = data.get('page', 'unknown')
    user_id = data.get('userId')
    timestamp = data.get('timestamp')
    
    # Convert to datetime if string
    if isinstance(timestamp, str):
        try:
            timestamp = datetime.fromisoformat(timestamp.replace('Z', '+00:00'))
        except:
            timestamp = datetime.utcnow()
    else:
        timestamp = datetime.utcnow()
    
    # Store in database
    db.webVitals.insert_one({
        'metrics': metrics,
        'page': page,
        'userId': user_id,
        'timestamp': timestamp,
        'userAgent': request.headers.get('User-Agent', 'unknown')
    })
    
    return jsonify({"success": True}), 200


##################################################################
# ACTIVITY / AUDIT LOGS
##################################################################
@cracked_bp.route('/activity-logs', methods=['GET'])
def admin_activity_logs():
    if not require_cracked_admin():
        return jsonify({"error": "Not authenticated"}), 401

    # Filter to only get unsuccessful login attempts (success: false)
    logs = db.auditLogs.find({"success": False}).sort("timestamp", -1).limit(200)
    results = []
    est_tz = pytz.timezone('America/New_York')

    for l in logs:
        # Convert _id => str
        l['_id'] = str(l['_id'])

        # Also convert userId => str if it's an ObjectId and only keep last 5 digits
        if 'userId' in l and l['userId']:
            user_id_str = str(l['userId'])
            l['userId'] = user_id_str[-5:] if len(user_id_str) >= 5 else user_id_str

        # Format timestamp to MM-DD HH:MM:SS
        if isinstance(l.get('timestamp'), datetime):
            timestamp_est = l['timestamp'].astimezone(est_tz)
            l['timestamp'] = timestamp_est.strftime("%m-%d %H:%M:%S")

        results.append(l)

    return jsonify({"logs": results}), 200
    
##################################################################
# DB QUERY LOGS (Reading perfSamples)
##################################################################
@cracked_bp.route('/db-logs', methods=['GET'])
def admin_db_logs():
    if not require_cracked_admin():
        return jsonify({"error": "Not authenticated"}), 401

    limit = int(request.args.get("limit", 100))
    try:
        samples = db.perfSamples.find().sort("timestamp", -1).limit(limit)
        data = []
        est_tz = pytz.timezone('America/New_York')

        for s in samples:
            s['_id'] = str(s['_id'])
            # convert db_time_sec -> ms
            if 'db_time_sec' in s:
                s['db_time_ms'] = round(s['db_time_sec'] * 1000.0, 2)
                del s['db_time_sec']

            # convert duration_sec -> ms
            if 'duration_sec' in s:
                s['duration_ms'] = round(s['duration_sec'] * 1000.0, 2)
                del s['duration_sec']

            if isinstance(s.get('timestamp'), datetime):
                s['timestamp'] = s['timestamp'].astimezone(est_tz).isoformat()

            data.append(s)

        return jsonify(data), 200

    except Exception as e:
        return jsonify({"error": "Error retrieving DB logs", "details": str(e)}), 500


##################################################################
# READ-ONLY DB SHELL
##################################################################
@cracked_bp.route('/db-shell/read', methods=['POST'])
def admin_db_shell_read():
    """
    Body: { "collection": "mainusers", "filterText": "username:john", "limit": 5 }
    Only performs a find() with a limit, returns JSON docs.
    
    filterText format:
    - field:value -> performs "field": {"$regex": value, "$options": "i"}
    - empty/null -> {}
    """
    if not require_cracked_admin(required_role="superadmin"):
        return jsonify({"error": "Insufficient admin privileges"}), 403

    body = request.json or {}
    coll_name = body.get("collection")
    if not coll_name:
        return jsonify({"error": "No collection specified"}), 400

    if coll_name not in db.list_collection_names():
        return jsonify({"error": f"Invalid or unknown collection: {coll_name}"}), 400

    # Handle the new filter text format
    filter_text = body.get("filterText", "").strip()
    filter_query = {}
    
    # Parse simple filter format: field:value
    if filter_text:
        if ":" in filter_text:
            field, value = filter_text.split(":", 1)
            # Create a regex search (case-insensitive)
            filter_query = {field.strip(): {"$regex": value.strip(), "$options": "i"}}
        else:
            # If no colon, search common fields
            common_fields = ["username", "email", "_id", "name", "title"]
            or_conditions = []
            for field in common_fields:
                or_conditions.append({field: {"$regex": filter_text, "$options": "i"}})
            filter_query = {"$or": or_conditions}

    # If there was a filter parameter in JSON format (legacy support)
    if "filter" in body and isinstance(body["filter"], dict):
        filter_query = body["filter"]

    limit_val = int(body.get("limit", 10))

    try:
        cursor = db[coll_name].find(filter_query).limit(limit_val)
        results = []
        for c in cursor:
            c['_id'] = str(c['_id'])
            results.append(c)
        return jsonify(results), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 400
        
        
@cracked_bp.route('/health-checks', methods=['GET'])
def admin_health_checks():
    """
    Returns the last ~50 health checks from the 'apiHealth' collection.
    Celery 'check_api_endpoints' task inserts these docs:
        { checkedAt: <datetime>, results: [ { endpoint, status, ok, ... } ] }
    """
    if not require_cracked_admin():
        return jsonify({"error": "Not authenticated"}), 401

    try:
        docs = db.apiHealth.find().sort("checkedAt", -1).limit(50)
        results = []
        est_tz = pytz.timezone('America/New_York')

        for d in docs:
            # Convert _id => str
            d['_id'] = str(d['_id'])
            # Convert checkedAt => EST
            if 'checkedAt' in d and isinstance(d['checkedAt'], datetime):
                d['checkedAt'] = d['checkedAt'].astimezone(est_tz).isoformat()
            # d['results'] is typically an array of endpoint checks
            # Each item is {endpoint, status, ok, error?}
            # No special serialization is needed if they’re just strings/integers.
            results.append(d)

        return jsonify(results), 200
    except Exception as e:
        return jsonify({"error": "Error retrieving health checks", "details": str(e)}), 500
        

##################################################################
# REVENUE & SUBSCRIPTION ANALYTICS
##################################################################
@cracked_bp.route('/revenue/overview', methods=['GET'])
def admin_revenue_overview():
    """
    Returns revenue overview data including:
    - Total revenue to date
    - Revenue in past 7 days
    - Revenue in past 30 days
    - Stripe vs Apple breakdown
    
    All calculations exclude @example.com accounts
    """
    if not require_cracked_admin():
        return jsonify({"error": "Not authenticated"}), 401
        
    try:
        # Subscription price - $9.99 per month
        SUBSCRIPTION_PRICE = 9.99
        
        # Filter to exclude example.com accounts
        real_user_query = {"email": {"$not": {"$regex": "@example.com$"}}}
        
        # Get all active subscribers (excluding example.com accounts)
        active_subscribers = db.mainusers.count_documents({
            "subscriptionActive": True, 
            "email": {"$not": {"$regex": "@example.com$"}}
        })
        
        total_active_revenue = active_subscribers * SUBSCRIPTION_PRICE
        
        # Calculate active subscribers by platform (excluding example.com accounts)
        stripe_subscribers = db.mainusers.count_documents({
            "subscriptionActive": True, 
            "subscriptionPlatform": "stripe",
            "email": {"$not": {"$regex": "@example.com$"}}
        })
        
        apple_subscribers = db.mainusers.count_documents({
            "subscriptionActive": True, 
            "subscriptionPlatform": "apple",
            "email": {"$not": {"$regex": "@example.com$"}}
        })
        
        # Get revenue from past 7 days and 30 days
        now = datetime.utcnow()
        seven_days_ago = now - timedelta(days=7)
        thirty_days_ago = now - timedelta(days=30)
        
        # Count subscribers who started in the last 7 days (excluding example.com accounts)
        new_subs_7_days = db.mainusers.count_documents({
            "subscriptionStartDate": {"$gte": seven_days_ago},
            "subscriptionActive": True,
            "email": {"$not": {"$regex": "@example.com$"}}
        })
        
        # Count subscribers who started in the last 30 days (excluding example.com accounts)
        new_subs_30_days = db.mainusers.count_documents({
            "subscriptionStartDate": {"$gte": thirty_days_ago},
            "subscriptionActive": True,
            "email": {"$not": {"$regex": "@example.com$"}}
        })
        
        # Revenue from new subscribers
        new_revenue_7_days = new_subs_7_days * SUBSCRIPTION_PRICE
        new_revenue_30_days = new_subs_30_days * SUBSCRIPTION_PRICE
        
        # Get all-time subscription count (including canceled, excluding example.com accounts)
        all_time_subs = db.mainusers.count_documents({
            "$or": [
                {"subscriptionActive": True},
                {"subscriptionStatus": {"$in": ["expired", "canceling", "canceled"]}}
            ],
            "email": {"$not": {"$regex": "@example.com$"}}
        })
        
        # Calculate estimated total lifetime revenue
        all_time_revenue = all_time_subs * SUBSCRIPTION_PRICE
        
        return jsonify({
            "active_subscribers": active_subscribers,
            "total_active_revenue": round(total_active_revenue, 2),
            "stripe_subscribers": stripe_subscribers,
            "apple_subscribers": apple_subscribers,
            "stripe_revenue": round(stripe_subscribers * SUBSCRIPTION_PRICE, 2),
            "apple_revenue": round(apple_subscribers * SUBSCRIPTION_PRICE, 2),
            "new_subscribers_7d": new_subs_7_days,
            "new_revenue_7d": round(new_revenue_7_days, 2),
            "new_subscribers_30d": new_subs_30_days,
            "new_revenue_30d": round(new_revenue_30_days, 2),
            "all_time_subscribers": all_time_subs,
            "all_time_revenue": round(all_time_revenue, 2)
        }), 200
        
    except Exception as e:
        return jsonify({"error": str(e)}), 500

@cracked_bp.route('/revenue/signups', methods=['GET'])
def admin_signup_metrics():
    """
    Returns daily signups for the past 7 days, broken down by platform (Stripe/Apple)
    Excludes @example.com accounts by default
    """
    if not require_cracked_admin():
        return jsonify({"error": "Not authenticated"}), 401
        
    # Get the value of "include_example" query parameter (default: False)
    include_example = request.args.get('include_example', 'false').lower() == 'true'
        
    try:
        now = datetime.utcnow()
        daily_data = []
        
        # Create email filter query
        email_filter = {} if include_example else {"email": {"$not": {"$regex": "@example.com$"}}}
        
        # Get signups for each of the past 7 days
        for i in range(7):
            day_start = (now - timedelta(days=i)).replace(hour=0, minute=0, second=0, microsecond=0)
            day_end = day_start + timedelta(days=1)
            day_label = day_start.strftime("%a %b %d")  # e.g. "Mon Apr 05"
            
            # Base query for this day's timeframe
            base_query = {
                "subscriptionStartDate": {"$gte": day_start, "$lt": day_end}
            }
            
            # Add example.com filter if not including them
            if not include_example:
                base_query["email"] = {"$not": {"$regex": "@example.com$"}}
            
            # Count total signups for this day
            total_signups = db.mainusers.count_documents(base_query)
            
            # Count Stripe signups
            stripe_query = base_query.copy()
            stripe_query["subscriptionPlatform"] = "stripe"
            stripe_signups = db.mainusers.count_documents(stripe_query)
            
            # Count Apple signups
            apple_query = base_query.copy()
            apple_query["subscriptionPlatform"] = "apple"
            apple_signups = db.mainusers.count_documents(apple_query)
            
            daily_data.append({
                "date": day_label,
                "timestamp": day_start.isoformat(),
                "total": total_signups,
                "stripe": stripe_signups,
                "apple": apple_signups
            })
        
        # Reverse so oldest is first
        daily_data.reverse()
        
        return jsonify(daily_data), 200
        
    except Exception as e:
        return jsonify({"error": str(e)}), 500
        
        

@cracked_bp.route('/revenue/cancellation', methods=['GET'])
def admin_cancellation_metrics():
    """
    Returns metrics about subscription cancellations and retention
    """
    if not require_cracked_admin():
        return jsonify({"error": "Not authenticated"}), 401
        
    try:
        # Find users with canceled or expired subscriptions
        canceled_users = list(db.mainusers.find({
            "subscriptionStatus": {"$in": ["expired", "canceling", "canceled"]},
            "email": {"$not": {"$regex": "@example.com$"}}
        }))
        
        total_cancellations = len(canceled_users)
        
        # Calculate durations directly in Python
        durations = []
        cancellations_by_platform = {}
        recent_cancellations = []
        
        for user in canceled_users:
            platform = user.get("subscriptionPlatform", "unknown")
            # Count by platform
            cancellations_by_platform[platform] = cancellations_by_platform.get(platform, 0) + 1
            
            # Calculate duration if dates exist
            start_date = user.get("subscriptionStartDate")
            end_date = user.get("subscriptionEndDate")
            
            if start_date and end_date and isinstance(start_date, datetime) and isinstance(end_date, datetime):
                duration_days = (end_date - start_date).total_seconds() / (24 * 3600)
                durations.append(duration_days)
                
                # Add to recent cancellations
                recent_cancellations.append({
                    "username": user.get("username", "Unknown"),
                    "platform": platform,
                    "timestamp": user.get("subscriptionCanceledAt", end_date).isoformat() 
                        if isinstance(user.get("subscriptionCanceledAt", end_date), datetime) 
                        else str(user.get("subscriptionCanceledAt", end_date))
                })
        
        # Calculate average duration
        avg_duration = sum(durations) / len(durations) if durations else 0
        
        # Calculate cancellation rate
        total_subscribers = db.mainusers.count_documents({
            "$or": [
                {"subscriptionActive": True},
                {"subscriptionStatus": {"$in": ["expired", "canceling", "canceled"]}}
            ],
            "email": {"$not": {"$regex": "@example.com$"}}
        })
        
        cancellation_rate = (total_cancellations / total_subscribers) if total_subscribers > 0 else 0
        
        # Sort recent cancellations by timestamp descending and get top 10
        recent_cancellations.sort(key=lambda x: x.get("timestamp", ""), reverse=True)
        recent_cancellations = recent_cancellations[:10]
        
        return jsonify({
            "total_cancellations": total_cancellations,
            "average_duration_days": round(avg_duration, 1),
            "cancellation_rate": round(cancellation_rate * 100, 1),  # As percentage
            "cancellations_by_platform": cancellations_by_platform,
            "recent_cancellations": recent_cancellations
        }), 200
        
    except Exception as e:
        import traceback
        error_details = traceback.format_exc()
        print(f"Error in cancellation metrics: {error_details}")
        return jsonify({"error": str(e)}), 500

@cracked_bp.route('/revenue/recent-signups', methods=['GET'])
def admin_recent_signups():
    """
    Returns the most recent user signups with subscription data
    """
    if not require_cracked_admin():
        return jsonify({"error": "Not authenticated"}), 401
        
    try:
        limit = int(request.args.get("limit", 10))
        
        # Get recent subscribers
        recent_subscribers = db.mainusers.find(
            {"subscriptionStartDate": {"$exists": True}},
            {
                "username": 1, 
                "email": 1,
                "subscriptionStartDate": 1,
                "subscriptionPlatform": 1,
                "subscriptionStatus": 1
            }
        ).sort("subscriptionStartDate", -1).limit(limit)
        
        result = []
        for user in recent_subscribers:
            result.append({
                "userId": str(user["_id"]),
                "username": user.get("username", "Unknown"),
                "email": user.get("email", ""),
                "platform": user.get("subscriptionPlatform", "unknown"),
                "status": user.get("subscriptionStatus", "unknown"),
                "signupDate": user.get("subscriptionStartDate").isoformat() if isinstance(user.get("subscriptionStartDate"), datetime) else str(user.get("subscriptionStartDate"))
            })
            
        return jsonify(result), 200
        
    except Exception as e:
        return jsonify({"error": str(e)}), 500



@cracked_bp.route('/tests/<test_id>/update-name', methods=['PUT'])
def admin_update_test_name(test_id):
    if not require_cracked_admin(required_role="supervisor"):
        return jsonify({"error": "Insufficient admin privileges"}), 403

    data = request.json or {}
    test_name = data.get("testName")
    
    if not test_name:
        return jsonify({"error": "Missing testName field"}), 400
        
    try:
        obj_id = ObjectId(test_id)
    except:
        return jsonify({"error": "Invalid test id"}), 400

    update_result = db.tests.update_one(
        {"_id": obj_id}, 
        {"$set": {"testName": test_name}}
    )
    
    if update_result.matched_count == 0:
        return jsonify({"error": "Test not found"}), 404
        
    return jsonify({"message": "Test name updated successfully"}), 200




@cracked_bp.route('/api-health-check', methods=['GET'])
def admin_api_health_check():
    """
    Simple health check that verifies:
    1. API is responding (implicit)
    2. Database is connected (by performing a simple query)
    """
    if not require_cracked_admin():
        return jsonify({"error": "Not authenticated"}), 401
        
    try:
        # Check database connectivity
        db_health = True
        try:
            # Just try to get one document from any collection
            db.mainusers.find_one({}, {"_id": 1})
        except Exception:
            db_health = False
            
        # Overall health status
        health_status = db_health
        
        # Add health check to the database
        db.apiHealth.insert_one({
            "checkedAt": datetime.utcnow(),
            "healthy": health_status
        })
        
        return jsonify({
            "healthy": health_status,
            "timestamp": datetime.utcnow().isoformat()
        }), 200
    except Exception as e:
        return jsonify({
            "healthy": False,
            "error": str(e),
            "timestamp": datetime.utcnow().isoformat()
        }), 500
        
       

@cracked_bp.route('/server-metrics', methods=['GET'])
def admin_server_metrics():
    if not require_cracked_admin():
        return jsonify({"error": "Not authenticated"}), 401
        
    try:
        # Get CPU metrics
        cpu_percent = psutil.cpu_percent(interval=1)
        cpu_count = psutil.cpu_count(logical=True)
        cpu_stats = psutil.cpu_stats()
        
        # Get memory metrics
        memory = psutil.virtual_memory()
        memory_total_gb = round(memory.total / (1024**3), 2)
        memory_used_gb = round(memory.used / (1024**3), 2)
        memory_percent = memory.percent
        
        # Get disk metrics
        disk = psutil.disk_usage('/')
        disk_total_gb = round(disk.total / (1024**3), 2)
        disk_used_gb = round(disk.used / (1024**3), 2)
        disk_percent = disk.percent
        
        # Get network metrics
        net_io = psutil.net_io_counters()
        net_bytes_sent = net_io.bytes_sent
        net_bytes_recv = net_io.bytes_recv
        
        # Get hostname and uptime
        hostname = socket.gethostname()
        boot_time = datetime.fromtimestamp(psutil.boot_time())
        uptime = datetime.utcnow() - boot_time
        uptime_days = uptime.days
        uptime_hours, remainder = divmod(uptime.seconds, 3600)
        uptime_minutes, uptime_seconds = divmod(remainder, 60)
        
        # Get top processes by CPU usage
        top_processes = []
        for proc in sorted(psutil.process_iter(['pid', 'name', 'username', 'cpu_percent', 'memory_percent']), 
                          key=lambda p: p.info['cpu_percent'] or 0, reverse=True)[:10]:
            try:
                proc_info = proc.info
                top_processes.append({
                    'pid': proc_info['pid'],
                    'name': proc_info['name'],
                    'username': proc_info['username'],
                    'cpu_percent': proc_info['cpu_percent'],
                    'memory_percent': proc_info['memory_percent']
                })
            except (psutil.NoSuchProcess, psutil.AccessDenied, psutil.ZombieProcess):
                pass
        
        return jsonify({
            'cpu': {
                'percent': cpu_percent,
                'count': cpu_count,
                'ctx_switches': cpu_stats.ctx_switches,
                'interrupts': cpu_stats.interrupts,
                'soft_interrupts': cpu_stats.soft_interrupts
            },
            'memory': {
                'total_gb': memory_total_gb,
                'used_gb': memory_used_gb,
                'percent': memory_percent,
                'available_gb': round((memory.total - memory.used) / (1024**3), 2)
            },
            'disk': {
                'total_gb': disk_total_gb,
                'used_gb': disk_used_gb,
                'percent': disk_percent,
                'free_gb': round((disk.total - disk.used) / (1024**3), 2)
            },
            'network': {
                'bytes_sent': net_bytes_sent,
                'bytes_recv': net_bytes_recv,
                'packets_sent': net_io.packets_sent,
                'packets_recv': net_io.packets_recv
            },
            'system': {
                'hostname': hostname,
                'uptime_days': uptime_days,
                'uptime_hours': uptime_hours,
                'uptime_minutes': uptime_minutes,
                'uptime_seconds': uptime_seconds,
                'boot_time': boot_time.isoformat()
            },
            'top_processes': top_processes,
            'timestamp': datetime.utcnow().isoformat()
        }), 200
        
    except Exception as e:
        return jsonify({"error": f"Failed to retrieve server metrics: {str(e)}"}), 500 
       



@cracked_bp.route('/rate-limits', methods=['GET'])
def admin_rate_limits():
    if not require_cracked_admin():
        return jsonify({"error": "Not authenticated"}), 401
        
    try:
        # Get all rate limit records from the database
        rate_limits = list(db.rateLimits.find({}, {
            "userId": 1, 
            "endpoint": 1, 
            "calls": 1, 
            "updatedAt": 1
        }).sort("updatedAt", -1).limit(200))
        
        # Process rate limits
        processed_limits = []
        for limit in rate_limits:
            # Convert ObjectId to string
            limit["_id"] = str(limit["_id"])
            
            # Count calls within the last hour
            calls = limit.get("calls", [])
            now = datetime.utcnow()
            hour_ago = now - timedelta(hours=1)
            recent_calls = [call for call in calls if call >= hour_ago]
            
            # Get endpoint type limits
            endpoint = limit.get("endpoint")
            from helpers.rate_limiter import RateLimiter
            limiter = RateLimiter(endpoint)
            max_calls = limiter.limits.get("calls", 0)
            period_sec = limiter.limits.get("period", 3600)
            
            # Format user ID (could be IP or actual user ID)
            user_id = limit.get("userId", "unknown")
            user_display = user_id
            if user_id.startswith("ip_"):
                user_display = user_id  # It's an IP address
            else:
                # Try to get username if it's a user ID
                try:
                    user_obj = db.mainusers.find_one({"_id": ObjectId(user_id)})
                    if user_obj:
                        user_display = f"{user_obj.get('username', 'unknown')} ({str(user_id)[-5:]})"
                except:
                    # If conversion fails, just use the ID as is
                    user_display = str(user_id)
            
            processed_limits.append({
                "userId": user_display,
                "endpoint": endpoint,
                "total_calls": len(calls),
                "recent_calls": len(recent_calls),
                "limit": max_calls,
                "period_minutes": period_sec / 60,
                "usage_percent": (len(recent_calls) / max_calls * 100) if max_calls > 0 else 0,
                "last_used": limit.get("updatedAt").isoformat() if isinstance(limit.get("updatedAt"), datetime) else None
            })
        
        # Get summary stats
        endpoint_stats = {}
        for limit in processed_limits:
            endpoint = limit.get("endpoint")
            if endpoint not in endpoint_stats:
                endpoint_stats[endpoint] = {
                    "total_users": 0,
                    "total_calls": 0,
                    "recent_calls": 0,
                    "max_calls": limit.get("limit", 0)
                }
            
            endpoint_stats[endpoint]["total_users"] += 1
            endpoint_stats[endpoint]["total_calls"] += limit.get("total_calls", 0)
            endpoint_stats[endpoint]["recent_calls"] += limit.get("recent_calls", 0)
        
        # Convert to list for response
        endpoint_summary = [
            {
                "endpoint": endpoint,
                "total_users": stats["total_users"],
                "total_calls": stats["total_calls"],
                "recent_calls": stats["recent_calls"],
                "max_calls": stats["max_calls"],
                "usage_percent": (stats["recent_calls"] / (stats["total_users"] * stats["max_calls"]) * 100) 
                                if stats["total_users"] * stats["max_calls"] > 0 else 0
            }
            for endpoint, stats in endpoint_stats.items()
        ]
        
        return jsonify({
            "rate_limits": processed_limits,
            "endpoint_summary": endpoint_summary
        }), 200
        
    except Exception as e:
        return jsonify({"error": f"Failed to retrieve rate limits: {str(e)}"}), 500
