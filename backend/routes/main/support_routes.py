import pytz
from datetime import datetime
from bson import ObjectId
from flask import Blueprint, request, session, jsonify, g, current_app
import time

from mongodb.database import db

support_bp = Blueprint('support', __name__, url_prefix='/support')

################################################################
# HELPER: Get userId from session or fallback "X-User-Id"
################################################################
def get_user_id_fallback():
    """
    Returns the userId from Flask session if available,
    otherwise falls back to the 'X-User-Id' header (or JSON).
    """
    user_id = session.get("userId")
    if not user_id:
        # ## ADDED: Fallback to X-User-Id
        alt_id = request.headers.get("X-User-Id")
        # If you also want to check JSON body, uncomment:
        # alt_id = alt_id or (request.json or {}).get("userId")

        if alt_id:
            user_id = alt_id
    return user_id

################################################################
# LIST THREADS: GET /support/my-chat
################################################################
@support_bp.route('/my-chat', methods=['GET'])
def list_user_threads():
    user_id = get_user_id_fallback()  # NEW function
    if not user_id:
        return jsonify([]), 200  # No recognized user => empty list

    try:
        user_obj_id = ObjectId(user_id)
    except:
        return jsonify([]), 200

    # Query threads
    threads_cursor = db.supportThreads.find({"userId": user_obj_id}).sort("updatedAt", -1)
    threads = []
    for t in threads_cursor:
        t_id = str(t['_id'])
        subject = t.get("subject", "")
        status = t.get("status", "open")
        updated_at = t.get("updatedAt")

        threads.append({
            "_id": t_id,
            "subject": subject if subject else "Untitled Thread",
            "status": status,
            "lastUpdated": updated_at.isoformat() if updated_at else None
        })
    return jsonify(threads), 200

################################################################
# CREATE THREAD: POST /support/my-chat
################################################################
@support_bp.route('/my-chat', methods=['POST'])
def create_user_thread():
    user_id = get_user_id_fallback()  # fallback
    if not user_id:
        # If you allow anonymous creation, handle it. Otherwise:
        return jsonify({"error": "Not authenticated"}), 401

    data = request.json or {}
    subject = data.get('subject', '').strip()
    if not subject:
        subject = "Untitled Thread"

    try:
        user_obj_id = ObjectId(user_id)
    except:
        return jsonify({"error": "Invalid user ID"}), 400

    now = datetime.utcnow()
    new_thread = {
        "userId": user_obj_id,
        "subject": subject,
        "messages": [],
        "status": "open",
        "createdAt": now,
        "updatedAt": now
    }

    result = db.supportThreads.insert_one(new_thread)
    if not result.inserted_id:
        return jsonify({"error": "Failed to create thread"}), 500

    # Prepare response
    inserted_id_str = str(result.inserted_id)
    thread_data = {
        "_id": inserted_id_str,
        "userId": user_id,
        "subject": subject,
        "status": "open",
        "createdAt": now.isoformat(),
        "updatedAt": now.isoformat(),
        "messages": []
    }

    # Emit 'new_thread' to admin room, or wherever your admin listens
    socketio = current_app.extensions['socketio']
    socketio.emit('new_thread', thread_data, room='admin')

    return jsonify(thread_data), 201


################################################################
# GET THREAD MESSAGES: GET /support/my-chat/<thread_id>
################################################################
@support_bp.route('/my-chat/<thread_id>', methods=['GET'])
def get_single_thread(thread_id):
    user_id = get_user_id_fallback()
    if not user_id:
        return jsonify({"error": "Not authenticated"}), 401

    try:
        obj_id = ObjectId(thread_id)
        user_obj_id = ObjectId(user_id)
    except:
        return jsonify({"error": "Invalid ID"}), 400

    # Find thread belonging to user
    thread = db.supportThreads.find_one({"_id": obj_id, "userId": user_obj_id})
    if not thread:
        return jsonify({"error": "Thread not found"}), 404

    # Convert timestamps to iso
    thread['_id'] = str(thread['_id'])
    if thread.get('userId'):
        thread['userId'] = str(thread['userId'])
    for m in thread.get("messages", []):
        if "timestamp" in m:
            if isinstance(m["timestamp"], datetime):
                m["timestamp"] = m["timestamp"].isoformat()

    return jsonify(thread), 200


################################################################
# SEND MESSAGE: POST /support/my-chat/<thread_id>
################################################################
@support_bp.route('/my-chat/<thread_id>', methods=['POST'])
def post_message_to_thread(thread_id):
    user_id = get_user_id_fallback()
    if not user_id:
        return jsonify({"error": "Not authenticated"}), 401

    data = request.json or {}
    content = data.get('content', '').strip()
    if not content:
        return jsonify({"error": "No content"}), 400

    now = datetime.utcnow()
    try:
        obj_id = ObjectId(thread_id)
        user_obj_id = ObjectId(user_id)
    except:
        return jsonify({"error": "Invalid ID"}), 400

    thread = db.supportThreads.find_one({"_id": obj_id, "userId": user_obj_id})
    if not thread:
        return jsonify({"error": "Thread not found"}), 404

    updated_status = thread.get("status", "open")
    if updated_status == "closed":
        # Re-open if user posts again
        db.supportThreads.update_one(
            {"_id": thread["_id"]},
            {
                "$push": {
                    "messages": {
                        "sender": "user",
                        "content": content,
                        "timestamp": now
                    }
                },
                "$set": {
                    "status": "open",
                    "updatedAt": now
                }
            }
        )
        msg_response = "Thread was closed. Reopened with new message"
    else:
        db.supportThreads.update_one(
            {"_id": thread["_id"]},
            {
                "$push": {
                    "messages": {
                        "sender": "user",
                        "content": content,
                        "timestamp": now
                    }
                },
                "$set": {"updatedAt": now}
            }
        )
        msg_response = "Message posted"

    # Emit to the thread's room
    socketio = current_app.extensions['socketio']
    socketio.emit('new_message', {
        "threadId": str(thread["_id"]),
        "message": {
            "sender": "user",
            "content": content,
            "timestamp": now.isoformat()
        }
    }, room=str(thread["_id"]))

    return jsonify({"message": msg_response}), 200


################################################################
# CLOSE THREAD: POST /support/my-chat/<thread_id>/close
################################################################
@support_bp.route('/my-chat/<thread_id>/close', methods=['POST'])
def user_close_specific_thread(thread_id):
    user_id = get_user_id_fallback()
    if not user_id:
        return jsonify({"error": "Not authenticated"}), 401

    data = request.json or {}
    content = data.get("content", "User closed the thread")
    now = datetime.utcnow()

    try:
        obj_id = ObjectId(thread_id)
        user_obj_id = ObjectId(user_id)
    except:
        return jsonify({"error": "Invalid thread ID"}), 400

    thread = db.supportThreads.find_one({"_id": obj_id, "userId": user_obj_id})
    if not thread:
        return jsonify({"error": "Thread not found"}), 404

    if thread.get("status") == "closed":
        return jsonify({"message": "Thread is already closed"}), 200

    db.supportThreads.update_one(
        {"_id": thread["_id"]},
        {
            "$push": {
                "messages": {
                    "sender": "user",
                    "content": content,
                    "timestamp": now
                }
            },
            "$set": {
                "status": "closed",
                "updatedAt": now
            }
        }
    )

    socketio = current_app.extensions['socketio']
    socketio.emit('new_message', {
        "threadId": str(thread["_id"]),
        "message": {
            "sender": "system",
            "content": "Thread closed by user",
            "timestamp": now.isoformat()
        }
    }, room=str(thread["_id"]))

    return jsonify({"message": "Thread closed"}), 200


