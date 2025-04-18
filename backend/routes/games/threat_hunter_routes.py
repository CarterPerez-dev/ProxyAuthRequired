# backend/routes/games/threat_hunter_routes.py
from flask import Blueprint, request, jsonify, g
from bson.objectid import ObjectId
import time
from datetime import datetime
import random

from mongodb.database import db
from models.test import get_user_by_id, update_user_coins, update_user_xp
from utils.utils import check_and_unlock_achievements

# Initialize the blueprint
threat_hunter_bp = Blueprint('threat_hunter', __name__)

# Database collections
log_scenarios_collection = db.logScenarios
log_analysis_collection = db.logAnalysis

@threat_hunter_bp.route('/scenarios', methods=['GET'])
def get_log_scenarios():
    """
    Get all log analysis scenarios with metadata.
    Returns a list of scenario objects with IDs, titles, descriptions, etc.
    """
    start_db = time.time()
    scenarios = list(log_scenarios_collection.find({}, {
        '_id': 0,
        'logs.content': 0  # Exclude the actual log content for efficiency
    }))
    duration = time.time() - start_db
    if hasattr(g, 'db_time_accumulator'):
        g.db_time_accumulator += duration
    
    # If there are no scenarios in the database, generate some defaults
    if not scenarios:
        scenarios = generate_default_scenarios()
        
        # Store these scenarios in the database for future use
        if scenarios:
            # Remove log content before storing scenarios metadata
            scenarios_meta = []
            for scenario in scenarios:
                scenario_meta = scenario.copy()
                for log in scenario_meta.get('logs', []):
                    if 'content' in log:
                        log['content'] = []  # Clear content for metadata storage
                scenario_meta['logCount'] = len(scenario_meta.get('logs', []))
                scenarios_meta.append(scenario_meta)
                
            start_db = time.time()
            log_scenarios_collection.insert_many(scenarios_meta)
            duration = time.time() - start_db
            if hasattr(g, 'db_time_accumulator'):
                g.db_time_accumulator += duration
    
    return jsonify(scenarios)

@threat_hunter_bp.route('/start-scenario', methods=['POST'])
def start_scenario():
    """
    Start a log analysis scenario and get the full scenario data including logs.
    """
    data = request.json
    scenario_id = data.get('scenarioId')
    user_id = data.get('userId')
    difficulty = data.get('difficulty', 'medium')
    
    if not scenario_id:
        return jsonify({"error": "scenarioId is required"}), 400
    
    # Get the full scenario with log content
    start_db = time.time()
    scenario = log_scenarios_collection.find_one({"id": scenario_id})
    duration = time.time() - start_db
    if hasattr(g, 'db_time_accumulator'):
        g.db_time_accumulator += duration
    
    if not scenario:
        # If scenario not found in the database, use the default scenarios
        default_scenarios = generate_default_scenarios()
        scenario = next((s for s in default_scenarios if s['id'] == scenario_id), None)
        
        if not scenario:
            return jsonify({"error": "Scenario not found"}), 404
    
    # Apply difficulty modifier to time limit
    time_modifiers = {
        'easy': 1.5,
        'medium': 1.0,
        'hard': 0.7
    }
    base_time_limit = scenario.get('timeLimit', 300)  # Default: 5 minutes
    modified_time_limit = int(base_time_limit * time_modifiers.get(difficulty, 1.0))
    
    # If user_id is provided, record the start of this scenario
    if user_id:
        try:
            user_oid = ObjectId(user_id)
            
            # Get user data
            start_db = time.time()
            user = get_user_by_id(user_id)
            duration = time.time() - start_db
            if hasattr(g, 'db_time_accumulator'):
                g.db_time_accumulator += duration
            
            if user:
                # Record the start of this attempt
                attempt_data = {
                    "userId": user_oid,
                    "scenarioId": scenario_id,
                    "startTime": datetime.utcnow(),
                    "completed": False,
                    "difficulty": difficulty,
                    "timeLimit": modified_time_limit
                }
                
                start_db = time.time()
                log_analysis_collection.insert_one(attempt_data)
                duration = time.time() - start_db
                if hasattr(g, 'db_time_accumulator'):
                    g.db_time_accumulator += duration
        except Exception as e:
            print(f"Error recording scenario start: {e}")
    
    # Convert the MongoDB ObjectId to string for JSON
    if '_id' in scenario:
        scenario['_id'] = str(scenario['_id'])
    
    return jsonify({
        "scenario": scenario,
        "timeLimit": modified_time_limit
    })

@threat_hunter_bp.route('/submit-analysis', methods=['POST'])
def submit_analysis():
    """
    Submit a log analysis for scoring and evaluation.
    """
    data = request.json
    user_id = data.get('userId')
    scenario_id = data.get('scenarioId')
    flagged_lines = data.get('flaggedLines', [])
    detected_threats = data.get('detectedThreats', [])
    time_left = data.get('timeLeft', 0)
    
    if not user_id or not scenario_id:
        return jsonify({"error": "userId and scenarioId are required"}), 400
    
    try:
        user_oid = ObjectId(user_id)
    except:
        return jsonify({"error": "Invalid user ID"}), 400
    
    # Get user data
    start_db = time.time()
    user = get_user_by_id(user_id)
    duration = time.time() - start_db
    if hasattr(g, 'db_time_accumulator'):
        g.db_time_accumulator += duration
    
    if not user:
        return jsonify({"error": "User not found"}), 404
    
    # Get scenario data
    start_db = time.time()
    scenario = log_scenarios_collection.find_one({"id": scenario_id})
    duration = time.time() - start_db
    if hasattr(g, 'db_time_accumulator'):
        g.db_time_accumulator += duration
    
    if not scenario:
        # If scenario not found in the database, use the default scenarios
        default_scenarios = generate_default_scenarios()
        scenario = next((s for s in default_scenarios if s['id'] == scenario_id), None)
        
        if not scenario:
            return jsonify({"error": "Scenario not found"}), 404
    
    # Evaluate the submission
    actual_threats = scenario.get('threats', [])
    suspicious_lines = scenario.get('suspiciousLines', [])
    
    # Calculate score
    max_score = 100
    base_score = 0
    time_bonus = 0
    
    # Check for correctly identified threats
    correct_threats = []
    missed_threats = []
    false_positives = []
    
    # Evaluate threats detected
    for actual_threat in actual_threats:
        found = False
        for detected_threat in detected_threats:
            # Simple matching for now - could be more sophisticated
            if detected_threat.get('type') == actual_threat.get('type'):
                correct_threats.append(actual_threat)
                found = True
                break
        
        if not found:
            missed_threats.append(actual_threat)
    
    # Check for false positives
    for detected_threat in detected_threats:
        found = False
        for actual_threat in actual_threats:
            if detected_threat.get('type') == actual_threat.get('type'):
                found = True
                break
        
        if not found:
            false_positives.append(detected_threat)
    
    # Calculate base score
    if len(actual_threats) > 0:
        threat_score = (len(correct_threats) / len(actual_threats)) * 70  # 70% of score from threats
    else:
        threat_score = 70  # Full score if there are no actual threats to find
    
    # Check for correctly flagged suspicious lines
    flagged_correct = sum(1 for line in flagged_lines if line in suspicious_lines)
    flagged_incorrect = len(flagged_lines) - flagged_correct
    
    if len(suspicious_lines) > 0:
        # 20% of score from correctly flagging suspicious lines
        flagging_score = min(20, (flagged_correct / len(suspicious_lines)) * 20)
    else:
        flagging_score = 20  # Full score if there are no suspicious lines
    
    # Penalize for false positives
    false_positive_penalty = min(30, len(false_positives) * 5 + flagged_incorrect * 2)
    
    # Calculate base score
    base_score = threat_score + flagging_score - false_positive_penalty
    base_score = max(0, base_score)  # Ensure score isn't negative
    
    # Add time bonus (up to 10 points)
    time_bonus = min(10, int(time_left / 10))
    
    # Final score
    total_score = min(max_score, base_score + time_bonus)
    
    # Award XP and coins based on score
    xp_awarded = int(total_score / 2)  # 1 XP for every 2 points
    coins_awarded = int(total_score / 5)  # 1 coin for every 5 points
    
    # Add bonuses for difficulty
    if data.get('difficulty') == 'hard':
        xp_awarded = int(xp_awarded * 1.5)
        coins_awarded = int(coins_awarded * 1.5)
    
    # Update user stats
    update_user_xp(user_id, xp_awarded)
    update_user_coins(user_id, coins_awarded)
    
    # Generate feedback based on performance
    feedback = generate_feedback(total_score, len(correct_threats), len(missed_threats), len(false_positives))
    
    # Record the completed analysis
    completion_data = {
        "userId": user_oid,
        "scenarioId": scenario_id,
        "completionTime": datetime.utcnow(),
        "score": total_score,
        "detectedThreats": detected_threats,
        "flaggedLines": flagged_lines,
        "correctThreats": len(correct_threats),
        "missedThreats": len(missed_threats),
        "falsePositives": len(false_positives)
    }
    
    start_db = time.time()
    log_analysis_collection.update_one(
        {"userId": user_oid, "scenarioId": scenario_id, "completed": False},
        {"$set": {
            "completed": True,
            "score": total_score,
            "detectedThreats": detected_threats,
            "flaggedLines": flagged_lines,
            "correctThreats": len(correct_threats),
            "missedThreats": len(missed_threats),
            "falsePositives": len(false_positives),
            "completionTime": datetime.utcnow()
        }}
    )
    duration = time.time() - start_db
    if hasattr(g, 'db_time_accumulator'):
        g.db_time_accumulator += duration
    
    # Check for achievements
    new_achievements = check_for_threat_hunter_achievements(user_id, total_score)
    
    # Prepare the response
    result = {
        "score": total_score,
        "maxScore": max_score,
        "correctThreats": [{"name": t.get("name", "Unknown Threat"), "description": t.get("description", "")} for t in correct_threats],
        "missedThreats": [{"name": t.get("name", "Unknown Threat"), "description": t.get("description", "")} for t in missed_threats],
        "falsePositives": [{"type": t.get("type", "unknown"), "description": t.get("description", "")} for t in false_positives],
        "timeBonus": time_bonus,
        "xpAwarded": xp_awarded,
        "coinsAwarded": coins_awarded,
        "feedback": feedback,
        "newAchievements": new_achievements
    }
    
    return jsonify(result)

def check_for_threat_hunter_achievements(user_id, score):
    """
    Check for any Threat Hunter game achievements unlocked by this submission.
    """
    # Here we'd implement specific achievement logic
    # For now, just return some sample achievements based on score
    achievements = []
    
    if score >= 90:
        achievements.append({
            "name": "Master Threat Hunter",
            "description": "Score 90+ in a Threat Hunter scenario"
        })
    elif score >= 75:
        achievements.append({
            "name": "Senior Analyst",
            "description": "Score 75+ in a Threat Hunter scenario"
        })
    
    # We can also check the database for other achievement conditions
    # like number of scenarios completed, etc.
    
    return achievements

def generate_feedback(score, correct_threats, missed_threats, false_positives):
    """
    Generate personalized feedback based on performance metrics.
    """
    if score >= 90:
        return "Outstanding analysis! You correctly identified almost all threats with minimal false positives. Your log analysis skills are exceptional."
    elif score >= 75:
        return f"Great work! You found {correct_threats} threats, though you missed {missed_threats}. Your attention to detail is strong, but continue practicing to reduce the {false_positives} false positives."
    elif score >= 60:
        return f"Good analysis. You identified {correct_threats} threats but missed {missed_threats}. Work on reducing your {false_positives} false positives by carefully validating your suspicions before escalating."
    elif score >= 40:
        return f"Decent effort. You found {correct_threats} threats but missed {missed_threats} and had {false_positives} false positives. Focus on recognizing threat patterns in logs and improving your accuracy."
    else:
        return f"You have room for improvement. You missed {missed_threats} threats and had {false_positives} false positives. Study common attack patterns and indicators of compromise to build your threat hunting skills."

def generate_default_scenarios():
    """
    Generate default log analysis scenarios if none exist in the database.
    """
    scenarios = [
        {
            "id": "scenario1",
            "title": "Unusual Login Activity",
            "description": "Analyze authentication logs for suspicious login patterns that may indicate credential theft.",
            "threatType": "credential_theft",
            "difficulty": 1,
            "timeLimit": 300,  # 5 minutes
            "logs": [
                {
                    "id": "auth_log",
                    "name": "Authentication Log",
                    "type": "auth",
                    "timestamp": "2025-04-15",
                    "source": "auth-server",
                    "content": [
                        {"text": "2025-04-15T08:12:45Z INFO [auth.service] User admin logged in from 192.168.1.50"},
                        {"text": "2025-04-15T08:45:22Z INFO [auth.service] User jsmith logged in from 192.168.1.55"},
                        {"text": "2025-04-15T09:15:30Z INFO [auth.service] User admin logged in from 10.0.0.5"},
                        {"text": "2025-04-15T09:30:15Z INFO [auth.service] Failed login attempt for user admin from 45.23.125.87"},
                        {"text": "2025-04-15T09:30:25Z INFO [auth.service] Failed login attempt for user admin from 45.23.125.87"},
                        {"text": "2025-04-15T09:30:35Z INFO [auth.service] Failed login attempt for user admin from 45.23.125.87"},
                        {"text": "2025-04-15T09:30:45Z INFO [auth.service] User admin logged in from 45.23.125.87"},
                        {"text": "2025-04-15T09:31:12Z INFO [auth.service] User admin changed password"},
                        {"text": "2025-04-15T09:31:45Z INFO [auth.service] User admin created new admin user 'backup_admin'"},
                        {"text": "2025-04-15T09:32:30Z INFO [auth.service] User backup_admin logged in from 45.23.125.87"},
                        {"text": "2025-04-15T10:15:22Z INFO [auth.service] User jsmith logged in from 192.168.1.55"},
                        {"text": "2025-04-15T11:45:32Z INFO [auth.service] User backup_admin logged in from 45.23.125.87"},
                        {"text": "2025-04-15T12:05:15Z INFO [auth.service] User admin logged in from 192.168.1.50"},
                    ]
                },
                {
                    "id": "system_log",
                    "name": "System Log",
                    "type": "system",
                    "timestamp": "2025-04-15",
                    "source": "main-server",
                    "content": [
                        {"text": "2025-04-15T09:31:55Z INFO [system.service] New user account created: backup_admin"},
                        {"text": "2025-04-15T09:33:12Z INFO [system.service] User backup_admin accessed /etc/shadow"},
                        {"text": "2025-04-15T09:34:05Z INFO [system.service] User backup_admin started SSH service"},
                        {"text": "2025-04-15T09:36:22Z WARNING [system.service] Unexpected outbound connection to 45.23.125.87:4444"},
                        {"text": "2025-04-15T09:40:15Z INFO [system.service] User backup_admin accessed financial_records.db"},
                        {"text": "2025-04-15T09:45:30Z WARNING [system.service] Large file transfer (25MB) to external IP 45.23.125.87"},
                        {"text": "2025-04-15T11:50:12Z INFO [system.service] User backup_admin accessed customer_data.csv"},
                        {"text": "2025-04-15T11:55:45Z WARNING [system.service] Large file transfer (50MB) to external IP 45.23.125.87"},
                    ]
                }
            ],
            "threats": [
                {
                    "type": "credential_theft",
                    "name": "Brute Force Login Attack",
                    "description": "Multiple failed login attempts followed by successful login from an unusual IP address."
                },
                {
                    "type": "data_exfiltration",
                    "name": "Unauthorized Data Exfiltration",
                    "description": "Large file transfers to external IP after suspicious user creation and access to sensitive files."
                }
            ],
            "suspiciousLines": [4, 5, 6, 7, 8, 9, 10, 12, 15, 16, 17, 18, 20, 21],
            "knownEntities": {
                "ips": [
                    {"address": "192.168.1.50", "info": "Office IP - Admin's workstation"},
                    {"address": "192.168.1.55", "info": "Office IP - John Smith's workstation"},
                    {"address": "10.0.0.5", "info": "VPN server"},
                    {"address": "45.23.125.87", "info": "Unknown external IP"}
                ],
                "users": [
                    {"username": "admin", "role": "System Administrator"},
                    {"username": "jsmith", "role": "Finance Department"},
                    {"username": "backup_admin", "role": "Unknown - Recently created"}
                ]
            }
        },
        {
            "id": "scenario2",
            "title": "Potential Malware Infection",
            "description": "Examine system and network logs for signs of malware activity on a workstation.",
            "threatType": "malware",
            "difficulty": 2,
            "timeLimit": 360,  # 6 minutes
            "logs": [
                {
                    "id": "process_log",
                    "name": "Process Log",
                    "type": "process",
                    "timestamp": "2025-04-16",
                    "source": "workstation-023",
                    "content": [
                        {"text": "2025-04-16T10:12:33Z INFO [process.monitor] User launched outlook.exe (PID: 4123)"},
                        {"text": "2025-04-16T10:15:45Z INFO [process.monitor] User opened attachment report_q1_2025.xlsx (PID: 4156)"},
                        {"text": "2025-04-16T10:15:48Z INFO [process.monitor] excel.exe spawned cmd.exe (PID: 4189)"},
                        {"text": "2025-04-16T10:15:49Z WARNING [process.monitor] cmd.exe executed with high privileges (PID: 4189)"},
                        {"text": "2025-04-16T10:15:52Z INFO [process.monitor] cmd.exe spawned powershell.exe (PID: 4202)"},
                        {"text": "2025-04-16T10:15:55Z WARNING [process.monitor] powershell.exe executed encoded command (PID: 4202)"},
                        {"text": "2025-04-16T10:16:05Z INFO [process.monitor] New process created: svchost32.exe (PID: 4238)"},
                        {"text": "2025-04-16T10:16:10Z WARNING [process.monitor] Unusual location for svchost32.exe: C:\\Users\\asmith\\AppData\\Local\\Temp\\"},
                        {"text": "2025-04-16T10:20:33Z INFO [process.monitor] User launched chrome.exe (PID: 4256)"},
                        {"text": "2025-04-16T11:05:22Z INFO [process.monitor] svchost32.exe still running (PID: 4238)"},
                        {"text": "2025-04-16T12:30:45Z INFO [process.monitor] svchost32.exe still running (PID: 4238)"},
                    ]
                },
                {
                    "id": "network_log",
                    "name": "Network Log",
                    "type": "network",
                    "timestamp": "2025-04-16",
                    "source": "workstation-023",
                    "content": [
                        {"text": "2025-04-16T10:14:22Z INFO [network.monitor] Established connection to mail.company.com:993 (IMAPS)"},
                        {"text": "2025-04-16T10:16:15Z WARNING [network.monitor] Outbound connection to 185.123.100.45:8080"},
                        {"text": "2025-04-16T10:16:20Z INFO [network.monitor] DNS query for c2.malicious-domain.ru"},
                        {"text": "2025-04-16T10:16:25Z WARNING [network.monitor] Outbound connection to 103.45.67.89:443 (c2.malicious-domain.ru)"},
                        {"text": "2025-04-16T10:17:05Z INFO [network.monitor] Periodic beacon to 103.45.67.89:443 (30s intervals)"},
                        {"text": "2025-04-16T10:45:22Z INFO [network.monitor] Outbound connection to update.microsoft.com:443"},
                        {"text": "2025-04-16T11:30:15Z WARNING [network.monitor] Unusual data transfer pattern to 103.45.67.89:443 (1KB out, 15KB in)"},
                        {"text": "2025-04-16T12:15:30Z WARNING [network.monitor] Unusual data transfer pattern to 103.45.67.89:443 (2KB out, 150KB in)"},
                    ]
                },
                {
                    "id": "file_log",
                    "name": "File System Log",
                    "type": "filesystem",
                    "timestamp": "2025-04-16",
                    "source": "workstation-023",
                    "content": [
                        {"text": "2025-04-16T10:15:46Z INFO [file.monitor] Created: C:\\Users\\asmith\\Downloads\\report_q1_2025.xlsx"},
                        {"text": "2025-04-16T10:15:50Z INFO [file.monitor] Created: C:\\Users\\asmith\\AppData\\Local\\Temp\\macro3212.tmp"},
                        {"text": "2025-04-16T10:15:56Z INFO [file.monitor] Created: C:\\Users\\asmith\\AppData\\Local\\Temp\\ps_script.ps1"},
                        {"text": "2025-04-16T10:16:02Z INFO [file.monitor] Created: C:\\Users\\asmith\\AppData\\Local\\Temp\\svchost32.exe"},
                        {"text": "2025-04-16T10:16:12Z WARNING [file.monitor] Modified: C:\\Windows\\System32\\drivers\\etc\\hosts"},
                        {"text": "2025-04-16T10:18:30Z INFO [file.monitor] Created: C:\\ProgramData\\Microsoft\\Windows\\Start Menu\\Programs\\Startup\\updater.lnk"},
                        {"text": "2025-04-16T11:45:22Z WARNING [file.monitor] Multiple files encrypted in C:\\Users\\asmith\\Documents\\"},
                        {"text": "2025-04-16T11:45:25Z INFO [file.monitor] Created: C:\\Users\\asmith\\Documents\\README-ENCRYPTED.txt"},
                    ]
                }
            ],
            "threats": [
                {
                    "type": "malware",
                    "name": "Malicious Macro Execution",
                    "description": "Excel document with macro spawned command processes with high privileges."
                },
                {
                    "type": "intrusion",
                    "name": "Command and Control Communication",
                    "description": "Regular beaconing to suspicious domain and unusual data transfer patterns."
                },
                {
                    "type": "malware",
                    "name": "Ransomware Activity",
                    "description": "Multiple files encrypted and ransom note created."
                }
            ],
            "suspiciousLines": [2, 3, 4, 5, 6, 7, 12, 13, 14, 15, 16, 19, 20, 22, 23, 24, 25, 26, 27, 28],
            "knownEntities": {
                "ips": [
                    {"address": "185.123.100.45", "info": "Unknown external IP"},
                    {"address": "103.45.67.89", "info": "Unknown external IP"}
                ],
                "users": [
                    {"username": "asmith", "role": "Finance Department"}
                ]
            }
        },
        {
            "id": "scenario3",
            "title": "Web Server Intrusion Attempt",
            "description": "Investigate web server logs for potential security breaches or exploitation attempts.",
            "threatType": "intrusion",
            "difficulty": 3,
            "timeLimit": 420,  # 7 minutes
            "logs": [
                {
                    "id": "web_access_log",
                    "name": "Web Access Log",
                    "type": "web",
                    "timestamp": "2025-04-17",
                    "source": "web-server-01",
                    "content": [
                        {"text": "192.168.1.100 - - [17/Apr/2025:08:12:15 +0000] \"GET / HTTP/1.1\" 200 2048 \"-\" \"Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36\""},
                        {"text": "185.176.43.89 - - [17/Apr/2025:08:35:22 +0000] \"GET / HTTP/1.1\" 200 2048 \"-\" \"Mozilla/5.0 (Linux; Android 10; SM-A505F)\""},
                        {"text": "185.176.43.89 - - [17/Apr/2025:08:35:45 +0000] \"GET /admin HTTP/1.1\" 302 345 \"-\" \"Mozilla/5.0 (Linux; Android 10; SM-A505F)\""},
                        {"text": "185.176.43.89 - - [17/Apr/2025:08:35:48 +0000] \"GET /login HTTP/1.1\" 200 1587 \"-\" \"Mozilla/5.0 (Linux; Android 10; SM-A505F)\""},
                        {"text": "185.176.43.89 - - [17/Apr/2025:08:36:02 +0000] \"POST /login HTTP/1.1\" 401 257 \"-\" \"Mozilla/5.0 (Linux; Android 10; SM-A505F)\""},
                        {"text": "185.176.43.89 - - [17/Apr/2025:08:36:15 +0000] \"POST /login HTTP/1.1\" 401 257 \"-\" \"Mozilla/5.0 (Linux; Android 10; SM-A505F)\""},
                        {"text": "185.176.43.89 - - [17/Apr/2025:08:37:02 +0000] \"GET /login?username=admin' OR 1=1-- HTTP/1.1\" 500 1842 \"-\" \"Mozilla/5.0 (Linux; Android 10; SM-A505F)\""},
                        {"text": "185.176.43.89 - - [17/Apr/2025:08:37:45 +0000] \"POST /login HTTP/1.1\" 302 345 \"-\" \"Mozilla/5.0 (Linux; Android 10; SM-A505F)\""},
                        {"text": "185.176.43.89 - - [17/Apr/2025:08:37:48 +0000] \"GET /admin HTTP/1.1\" 200 3546 \"-\" \"Mozilla/5.0 (Linux; Android 10; SM-A505F)\""},
                        {"text": "185.176.43.89 - - [17/Apr/2025:08:38:12 +0000] \"GET /admin/users HTTP/1.1\" 200 4215 \"-\" \"Mozilla/5.0 (Linux; Android 10; SM-A505F)\""},
                        {"text": "185.176.43.89 - - [17/Apr/2025:08:38:45 +0000] \"GET /admin/settings HTTP/1.1\" 200 2546 \"-\" \"Mozilla/5.0 (Linux; Android 10; SM-A505F)\""},
                        {"text": "185.176.43.89 - - [17/Apr/2025:08:39:22 +0000] \"POST /admin/users/new HTTP/1.1\" 302 345 \"-\" \"Mozilla/5.0 (Linux; Android 10; SM-A505F)\""},
                        {"text": "185.176.43.89 - - [17/Apr/2025:08:39:25 +0000] \"GET /admin/users HTTP/1.1\" 200 4512 \"-\" \"Mozilla/5.0 (Linux; Android 10; SM-A505F)\""},
                        {"text": "192.168.1.105 - - [17/Apr/2025:09:15:33 +0000] \"GET / HTTP/1.1\" 200 2048 \"-\" \"Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36\""},
                        {"text": "192.168.1.100 - - [17/Apr/2025:09:45:12 +0000] \"GET /products HTTP/1.1\" 200 8742 \"-\" \"Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36\""},
                        {"text": "185.176.43.89 - - [17/Apr/2025:10:12:33 +0000] \"GET /admin/settings?backup=true HTTP/1.1\" 200 1258 \"-\" \"Mozilla/5.0 (Linux; Android 10; SM-A505F)\""},
                        {"text": "185.176.43.89 - - [17/Apr/2025:10:12:45 +0000] \"GET /admin/backup/download?file=../../../etc/passwd HTTP/1.1\" 200 4825 \"-\" \"Mozilla/5.0 (Linux; Android 10; SM-A505F)\""},
                        {"text": "185.176.43.89 - - [17/Apr/2025:10:15:22 +0000] \"GET /admin/backup/download?file=../../../etc/shadow HTTP/1.1\" 403 278 \"-\" \"Mozilla/5.0 (Linux; Android 10; SM-A505F)\""},
                        {"text": "185.176.43.89 - - [17/Apr/2025:10:17:15 +0000] \"POST /admin/settings/update HTTP/1.1\" 200 875 \"-\" \"Mozilla/5.0 (Linux; Android 10; SM-A505F)\""},
                        {"text": "192.168.1.110 - - [17/Apr/2025:11:05:45 +0000] \"GET /products/search?q=laptops HTTP/1.1\" 200 6542 \"-\" \"Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7)\""},
                    ]
                },
                {
                    "id": "error_log",
                    "name": "Web Error Log",
                    "type": "error",
                    "timestamp": "2025-04-17",
                    "source": "web-server-01",
                    "content": [
                        {"text": "[Thu Apr 17 08:37:02 2025] [error] [client 185.176.43.89] PHP Fatal error: Uncaught PDOException: SQLSTATE[42000]: Syntax error or access violation in /var/www/html/login.php:45"},
                        {"text": "[Thu Apr 17 08:37:02 2025] [error] [client 185.176.43.89] PHP Stack trace:"},
                        {"text": "[Thu Apr 17 08:37:02 2025] [error] [client 185.176.43.89] #0 /var/www/html/login.php(45): PDO->query('SELECT * FROM users WHERE username=\\'admin\\' OR 1=1-- AND password=\\'password\\'')"},
                        {"text": "[Thu Apr 17 08:37:02 2025] [error] [client 185.176.43.89] #1 {main}"},
                        {"text": "[Thu Apr 17 10:12:45 2025] [warning] [client 185.176.43.89] Path traversal attempt: '../../../etc/passwd'"},
                        {"text": "[Thu Apr 17 10:15:22 2025] [warning] [client 185.176.43.89] Path traversal attempt: '../../../etc/shadow'"},
                        {"text": "[Thu Apr 17 10:15:22 2025] [error] [client 185.176.43.89] Access to restricted file denied: /etc/shadow"},
                        {"text": "[Thu Apr 17 10:17:15 2025] [notice] [client 185.176.43.89] File upload: shell.php disguised as settings-backup.xml"},
                        {"text": "[Thu Apr 17 10:17:15 2025] [warning] [client 185.176.43.89] Potentially malicious file uploaded: shell.php"},
                    ]
                },
                {
                    "id": "auth_log",
                    "name": "Authentication Log",
                    "type": "auth",
                    "timestamp": "2025-04-17",
                    "source": "web-server-01",
                    "content": [
                        {"text": "[2025-04-17T08:36:02Z] Authentication failure for user 'admin' from 185.176.43.89"},
                        {"text": "[2025-04-17T08:36:15Z] Authentication failure for user 'admin' from 185.176.43.89"},
                        {"text": "[2025-04-17T08:37:45Z] Authentication success for user 'admin' from 185.176.43.89"},
                        {"text": "[2025-04-17T08:39:22Z] New user 'backdoor_admin' created by user 'admin' from 185.176.43.89"},
                        {"text": "[2025-04-17T10:10:15Z] Authentication success for user 'backdoor_admin' from 185.176.43.89"},
                        {"text": "[2025-04-17T10:17:15Z] User 'backdoor_admin' updated system settings from 185.176.43.89"},
                    ]
                }
            ],
            "threats": [
                {
                    "type": "intrusion",
                    "name": "SQL Injection Attack",
                    "description": "Attacker used SQL injection techniques to bypass authentication."
                },
                {
                    "type": "data_exfiltration",
                    "name": "Path Traversal Attack",
                    "description": "Attacker attempted to access system files using path traversal vulnerabilities."
                },
                {
                    "type": "intrusion",
                    "name": "Malicious File Upload",
                    "description": "Attacker uploaded a web shell disguised as a legitimate file."
                }
            ],
            "suspiciousLines": [2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 16, 17, 18, 19, 21, 22, 23, 24, 28, 29, 30, 31, 32, 33, 34, 35, 36],
            "knownEntities": {
                "ips": [
                    {"address": "192.168.1.100", "info": "Office IP - Marketing Department"},
                    {"address": "192.168.1.105", "info": "Office IP - Dev Department"},
                    {"address": "192.168.1.110", "info": "Office IP - Sales Department"},
                    {"address": "185.176.43.89", "info": "Unknown external IP"}
                ],
                "users": [
                    {"username": "admin", "role": "Web Administrator"},
                    {"username": "backdoor_admin", "role": "Unknown - Recently created"}
                ]
            }
        }
    ]
    
    return scenarios

if __name__ == '__main__':
    pass
