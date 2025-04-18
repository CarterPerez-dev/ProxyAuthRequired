from flask import g
from mongodb.database import db, mainusers_collection, achievements_collection, shop_collection
from bson.objectid import ObjectId
import time
from datetime import datetime

def serialize_user(user):
    """Helper to convert _id, etc. to strings if needed."""
    if not user:
        return None
    user['_id'] = str(user['_id'])
    if 'currentAvatar' in user and user['currentAvatar']:
        user['currentAvatar'] = str(user['currentAvatar'])
    if 'purchasedItems' in user and isinstance(user['purchasedItems'], list):
        user['purchasedItems'] = [str(item) for item in user['purchasedItems']]
    return user

def serialize_datetime(dt):
    """Helper: convert a datetime to an ISO string (or return None)."""
    return dt.isoformat() if dt else None

def check_and_unlock_achievements(user_id):
    """
    Check and unlock achievements for a user.
    Returns a list of newly unlocked achievement IDs.
    """
    start_db = time.time()
    user = mainusers_collection.find_one({"_id": ObjectId(user_id)})
    duration = time.time() - start_db
    if not hasattr(g, 'db_time_accumulator'):
        g.db_time_accumulator = 0.0
    g.db_time_accumulator += duration

    if not user:
        return []

    counters = user.get("achievement_counters", {})
    unlocked = set(user.get("achievements", []))
    newly_unlocked = []

    start_db = time.time()
    all_ach = list(achievements_collection.find({}))
    duration = time.time() - start_db
    if not hasattr(g, 'db_time_accumulator'):
        g.db_time_accumulator = 0.0
    g.db_time_accumulator += duration

    for ach in all_ach:
        aid = ach["achievementId"]
        # If already unlocked, skip
        if aid in unlocked:
            continue

        crit = ach.get("criteria", {})

        # 1) testCount => total_tests_completed
        test_count_req = crit.get("testCount")
        if test_count_req is not None:
            if counters.get("total_tests_completed", 0) >= test_count_req:
                unlocked.add(aid)
                newly_unlocked.append(aid)
                continue

        # 2) minScore => e.g. "accuracy_king" with 90
        min_score_req = crit.get("minScore")
        if min_score_req is not None:
            if counters.get("highest_score_ever", 0) >= min_score_req:
                unlocked.add(aid)
                newly_unlocked.append(aid)
                continue

        # 3) perfectTests => e.g. "perfectionist_1", "double_trouble_2", etc.
        perfect_req = crit.get("perfectTests")
        if perfect_req is not None:
            if counters.get("perfect_tests_count", 0) >= perfect_req:
                unlocked.add(aid)
                newly_unlocked.append(aid)
                continue

        # 4) coins => coin achievements
        coin_req = crit.get("coins")
        if coin_req is not None:
            if user.get("coins", 0) >= coin_req:
                unlocked.add(aid)
                newly_unlocked.append(aid)
                continue

        # 5) level => e.g. "level_up_5", "mid_tier_grinder_25", etc.
        level_req = crit.get("level")
        if level_req is not None:
            if user.get("level", 1) >= level_req:
                unlocked.add(aid)
                newly_unlocked.append(aid)
                continue

        # 6) totalQuestions => e.g. "answer_machine_1000"
        total_q_req = crit.get("totalQuestions")
        if total_q_req is not None:
            if counters.get("total_questions_answered", 0) >= total_q_req:
                unlocked.add(aid)
                newly_unlocked.append(aid)
                continue

        # 7) perfectTestsInCategory => "category_perfectionist"
        perfect_in_cat_req = crit.get("perfectTestsInCategory")
        if perfect_in_cat_req is not None:
            perfect_by_cat = counters.get("perfect_tests_by_category", {})
            for cat_name, cat_count in perfect_by_cat.items():
                if cat_count >= perfect_in_cat_req:
                    unlocked.add(aid)
                    newly_unlocked.append(aid)
                    break
            continue

        # 8) redemption_arc => minScoreBefore + minScoreAfter
        min_before = crit.get("minScoreBefore")
        min_after = crit.get("minScoreAfter")
        if min_before is not None and min_after is not None:
            if (counters.get("lowest_score_ever", 100) <= min_before and
                counters.get("highest_score_ever", 0) >= min_after):
                unlocked.add(aid)
                newly_unlocked.append(aid)
                continue

        # 9) testsCompletedInCategory => "subject_finisher"
        cat_required = crit.get("testsCompletedInCategory")
        if cat_required is not None:
            tcbc = counters.get("tests_completed_by_category", {})
            for cat_name, test_set in tcbc.items():
                if len(test_set) >= cat_required:
                    unlocked.add(aid)
                    newly_unlocked.append(aid)
                    break
            continue

        # 10) allTestsCompleted => "test_finisher"
        if crit.get("allTestsCompleted"):
            user_completed_tests = counters.get("tests_completed_set", set())
            TOTAL_TESTS = 130
            if len(user_completed_tests) >= TOTAL_TESTS:
                unlocked.add(aid)
                newly_unlocked.append(aid)
                continue

    if newly_unlocked:
        start_db = time.time()
        mainusers_collection.update_one(
            {"_id": user["_id"]},
            {"$set": {"achievements": list(unlocked)}}
        )
        duration = time.time() - start_db
        if not hasattr(g, 'db_time_accumulator'):
            g.db_time_accumulator = 0.0
        g.db_time_accumulator += duration

    return newly_unlocked
