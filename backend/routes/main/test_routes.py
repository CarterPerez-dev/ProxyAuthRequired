from flask import request, jsonify, g
from mongodb.database import db, tests_collection
from models.test import get_test_by_id_and_category
import time
from .blueprint import api_bp

@api_bp.route('/tests/<test_id>', methods=['GET'])
def fetch_test_by_id_route(test_id):
    start_db = time.time()
    test_doc = get_test_by_id_and_category(test_id, None)
    duration = time.time() - start_db
    if not hasattr(g, 'db_time_accumulator'):
        g.db_time_accumulator = 0.0
    g.db_time_accumulator += duration

    if not test_doc:
        return jsonify({"error": "Test not found"}), 404
    test_doc["_id"] = str(test_doc["_id"])
    return jsonify(test_doc), 200

@api_bp.route('/tests/<category>/<test_id>', methods=['GET'])
def fetch_test_by_category_and_id(category, test_id):
    try:
        test_id_int = int(test_id)
    except Exception:
        return jsonify({"error": "Invalid test ID"}), 400

    start_db = time.time()
    test_doc = tests_collection.find_one({
        "testId": test_id_int,
        "category": category
    })
    duration = time.time() - start_db
    if not hasattr(g, 'db_time_accumulator'):
        g.db_time_accumulator = 0.0
    g.db_time_accumulator += duration

    if not test_doc:
        return jsonify({"error": "Test not found"}), 404

    test_doc["_id"] = str(test_doc["_id"])
    return jsonify(test_doc), 200
