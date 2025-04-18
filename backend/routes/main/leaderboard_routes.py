from flask import request, jsonify, g, Blueprint
from mongodb.database import db, mainusers_collection, shop_collection
import time
from .blueprint import api_bp

# Leaderboard caching variables
leaderboard_cache = []
leaderboard_cache_timestamp = 0
LEADERBOARD_CACHE_DURATION_MS = 15000  # 15 seconds

# Public leaderboard caching variables
public_leaderboard_cache = []
public_leaderboard_cache_timestamp = 0
PUBLIC_LEADERBOARD_CACHE_DURATION_MS = 1800000  # 30 minutes

# Create a separate blueprint for public leaderboard
public_leaderboard_bp = Blueprint('public_leaderboard', __name__)

@api_bp.route('/leaderboard', methods=['GET'])
def get_leaderboard():
    global leaderboard_cache
    global leaderboard_cache_timestamp

    now_ms = int(time.time() * 1000)
    if now_ms - leaderboard_cache_timestamp > LEADERBOARD_CACHE_DURATION_MS:
        start_db = time.time()
        cursor = mainusers_collection.find(
            {},
            {"username": 1, "level": 1, "xp": 1, "currentAvatar": 1}
        ).sort("level", -1).limit(1000)
        duration = time.time() - start_db
        if not hasattr(g, 'db_time_accumulator'):
            g.db_time_accumulator = 0.0
        g.db_time_accumulator += duration

        new_results = []
        rank = 1
        for user in cursor:
            user_data = {
                "username": user.get("username", "unknown"),
                "level": user.get("level", 1),
                "xp": user.get("xp", 0),
                "rank": rank,
                "avatarUrl": None
            }
            if user.get("currentAvatar"):
                start_db = time.time()
                avatar_item = shop_collection.find_one({"_id": user["currentAvatar"]})
                duration = time.time() - start_db
                if not hasattr(g, 'db_time_accumulator'):
                    g.db_time_accumulator = 0.0
                g.db_time_accumulator += duration

                if avatar_item and "imageUrl" in avatar_item:
                    user_data["avatarUrl"] = avatar_item["imageUrl"]
            new_results.append(user_data)
            rank += 1

        leaderboard_cache = new_results
        leaderboard_cache_timestamp = now_ms

    try:
        skip = int(request.args.get("skip", 0))
        limit = int(request.args.get("limit", 50))
    except:
        skip, limit = 0, 50

    total_entries = len(leaderboard_cache)
    end_index = skip + limit
    if skip > total_entries:
        sliced_data = []
    else:
        sliced_data = leaderboard_cache[skip:end_index]

    return jsonify({
        "data": sliced_data,
        "total": total_entries
    }), 200

@public_leaderboard_bp.route('/board', methods=['GET'])
def get_public_leaderboard():
    """
    Public leaderboard with a longer cache duration (30 minutes)
    This is for the marketing site, separate from the logged-in user leaderboard
    """
    global public_leaderboard_cache
    global public_leaderboard_cache_timestamp

    now_ms = int(time.time() * 1000)
    if now_ms - public_leaderboard_cache_timestamp > PUBLIC_LEADERBOARD_CACHE_DURATION_MS:
        start_db = time.time()
        cursor = mainusers_collection.find(
            {},
            {"username": 1, "level": 1, "xp": 1, "currentAvatar": 1}
        ).sort("level", -1).limit(1000)
        duration = time.time() - start_db
        if not hasattr(g, 'db_time_accumulator'):
            g.db_time_accumulator = 0.0
        g.db_time_accumulator += duration

        new_results = []
        rank = 1
        for user in cursor:
            user_data = {
                "username": user.get("username", "unknown"),
                "level": user.get("level", 1),
                "xp": user.get("xp", 0),
                "rank": rank,
                "avatarUrl": None
            }
            if user.get("currentAvatar"):
                start_db = time.time()
                avatar_item = shop_collection.find_one({"_id": user["currentAvatar"]})
                duration = time.time() - start_db
                if not hasattr(g, 'db_time_accumulator'):
                    g.db_time_accumulator = 0.0
                g.db_time_accumulator += duration

                if avatar_item and "imageUrl" in avatar_item:
                    user_data["avatarUrl"] = avatar_item["imageUrl"]
            new_results.append(user_data)
            rank += 1

        public_leaderboard_cache = new_results
        public_leaderboard_cache_timestamp = now_ms

    try:
        skip = int(request.args.get("skip", 0))
        limit = int(request.args.get("limit", 50))
        cache_param = request.args.get("cache", "1800")  # Default 30 minutes
    except:
        skip, limit = 0, 50

    total_entries = len(public_leaderboard_cache)
    end_index = skip + limit
    if skip > total_entries:
        sliced_data = []
    else:
        sliced_data = public_leaderboard_cache[skip:end_index]

    return jsonify({
        "data": sliced_data,
        "total": total_entries,
        "cached_at": public_leaderboard_cache_timestamp,
        "cache_duration_ms": PUBLIC_LEADERBOARD_CACHE_DURATION_MS
    }), 200
