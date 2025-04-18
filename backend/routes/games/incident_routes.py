# backend/routes/incident_routes.py
from flask import Blueprint, request, jsonify, g
from bson.objectid import ObjectId
import time
from datetime import datetime
import random

from mongodb.database import db
from models.test import get_user_by_id, update_user_coins, update_user_xp

# Initialize the blueprint
incident_bp = Blueprint('incident', __name__)

# Collections
incident_scenarios_collection = db.incidentScenarios
incident_progress_collection = db.incidentProgress

@incident_bp.route('/scenarios', methods=['GET'])
def get_scenarios():
    """
    Get all incident response scenarios.
    """
    start_db = time.time()
    scenarios = list(incident_scenarios_collection.find({}, {'_id': 0}))
    duration = time.time() - start_db
    if hasattr(g, 'db_time_accumulator'):
        g.db_time_accumulator += duration
    
    # If there are no scenarios in the database, generate some defaults
    if not scenarios:
        scenarios = generate_default_scenarios()
        
        # Store these scenarios in the database for future use
        if scenarios:
            start_db = time.time()
            incident_scenarios_collection.insert_many(scenarios)
            duration = time.time() - start_db
            if hasattr(g, 'db_time_accumulator'):
                g.db_time_accumulator += duration
    
    return jsonify(scenarios)

@incident_bp.route('/start', methods=['POST'])
def start_scenario():
    """
    Start a scenario and return its details.
    """
    data = request.json
    scenario_id = data.get('scenarioId')
    user_id = data.get('userId')
    difficulty = data.get('difficulty', 'medium')
    
    if not scenario_id:
        return jsonify({"error": "scenarioId is required"}), 400
    
    start_db = time.time()
    scenario = incident_scenarios_collection.find_one({"id": scenario_id}, {'_id': 0})
    duration = time.time() - start_db
    if hasattr(g, 'db_time_accumulator'):
        g.db_time_accumulator += duration
    
    if not scenario:
        return jsonify({"error": "Scenario not found"}), 404
    
    # Apply difficulty modifications
    apply_difficulty(scenario, difficulty)
    
    # Record that the user started this scenario
    if user_id:
        try:
            user_oid = ObjectId(user_id)
            
            start_db = time.time()
            incident_progress_collection.update_one(
                {"userId": user_oid, "scenarioId": scenario_id},
                {
                    "$set": {
                        "userId": user_oid,
                        "scenarioId": scenario_id,
                        "startedAt": datetime.utcnow(),
                        "difficulty": difficulty,
                        "status": "in_progress"
                    }
                },
                upsert=True
            )
            duration = time.time() - start_db
            if hasattr(g, 'db_time_accumulator'):
                g.db_time_accumulator += duration
        except Exception as e:
            print(f"Error recording scenario start: {e}")
    
    return jsonify(scenario)

@incident_bp.route('/action', methods=['POST'])
def process_action():
    """
    Process a user action in a scenario stage.
    """
    data = request.json
    user_id = data.get('userId')
    scenario_id = data.get('scenarioId')
    stage_id = data.get('stageId')
    action_id = data.get('actionId')
    
    if not all([user_id, scenario_id, stage_id, action_id]):
        return jsonify({"error": "userId, scenarioId, stageId, and actionId are required"}), 400
    
    start_db = time.time()
    scenario = incident_scenarios_collection.find_one({"id": scenario_id}, {'_id': 0})
    duration = time.time() - start_db
    if hasattr(g, 'db_time_accumulator'):
        g.db_time_accumulator += duration
    
    if not scenario:
        return jsonify({"error": "Scenario not found"}), 404
    
    # Find the stage
    stage = next((s for s in scenario.get('stages', []) if s.get('id') == stage_id), None)
    if not stage:
        return jsonify({"error": "Stage not found"}), 404
    
    # Find the action
    action = next((a for a in stage.get('actions', []) if a.get('id') == action_id), None)
    if not action:
        return jsonify({"error": "Action not found"}), 404
    
    # Record the action
    if user_id:
        try:
            user_oid = ObjectId(user_id)
            
            start_db = time.time()
            incident_progress_collection.update_one(
                {"userId": user_oid, "scenarioId": scenario_id},
                {
                    "$set": {
                        f"actions.{stage_id}": action_id,
                        "lastActionAt": datetime.utcnow()
                    }
                }
            )
            duration = time.time() - start_db
            if hasattr(g, 'db_time_accumulator'):
                g.db_time_accumulator += duration
        except Exception as e:
            print(f"Error recording action: {e}")
    
    return jsonify({
        "action": action,
        "points": action.get('points', 0),
        "nextStage": None  # The frontend will handle stage transitions
    })

@incident_bp.route('/complete', methods=['POST'])
def complete_scenario():
    """
    Complete a scenario and calculate results.
    """
    data = request.json
    user_id = data.get('userId')
    scenario_id = data.get('scenarioId')
    selected_actions = data.get('selectedActions', {})
    score = data.get('score', 0)
    
    if not all([user_id, scenario_id]):
        return jsonify({"error": "userId and scenarioId are required"}), 400
    
    try:
        user_oid = ObjectId(user_id)
    except:
        return jsonify({"error": "Invalid user ID"}), 400
    
    # Get user
    start_db = time.time()
    user = get_user_by_id(user_id)
    duration = time.time() - start_db
    if hasattr(g, 'db_time_accumulator'):
        g.db_time_accumulator += duration
    
    if not user:
        return jsonify({"error": "User not found"}), 404
    
    # Get scenario
    start_db = time.time()
    scenario = incident_scenarios_collection.find_one({"id": scenario_id}, {'_id': 0})
    duration = time.time() - start_db
    if hasattr(g, 'db_time_accumulator'):
        g.db_time_accumulator += duration
    
    if not scenario:
        return jsonify({"error": "Scenario not found"}), 404
    
    # Get user progress
    start_db = time.time()
    progress = incident_progress_collection.find_one({"userId": user_oid, "scenarioId": scenario_id})
    duration = time.time() - start_db
    if hasattr(g, 'db_time_accumulator'):
        g.db_time_accumulator += duration
    
    # Calculate time spent
    time_spent = 0
    if progress and progress.get('startedAt'):
        started_at = progress.get('startedAt')
        completed_at = datetime.utcnow()
        time_spent = (completed_at - started_at).total_seconds()
    
    # Calculate response rating (0-100)
    max_possible_points = sum(max(action.get('points', 0) for action in stage.get('actions', [])) for stage in scenario.get('stages', []))
    response_rating = round((score / max_possible_points) * 100) if max_possible_points > 0 else 0
    
    # Calculate time bonus
    time_bonus = 0
    if time_spent > 0 and time_spent < 300:  # Less than 5 minutes
        time_bonus = 20
    elif time_spent < 600:  # Less than 10 minutes
        time_bonus = 10
    
    # Calculate rewards
    xp_awarded = score + time_bonus
    coins_awarded = score // 2 + time_bonus
    
    # Check if scenario was already completed
    is_first_completion = True
    if progress and progress.get('completedAt'):
        is_first_completion = False
        # Reduce rewards for replays
        xp_awarded = max(10, xp_awarded // 4)
        coins_awarded = max(5, coins_awarded // 4)
    
    # Award XP and coins
    if xp_awarded > 0:
        update_user_xp(user_id, xp_awarded)
    
    if coins_awarded > 0:
        update_user_coins(user_id, coins_awarded)
    
    # Update user progress
    start_db = time.time()
    incident_progress_collection.update_one(
        {"userId": user_oid, "scenarioId": scenario_id},
        {
            "$set": {
                "completedAt": datetime.utcnow(),
                "score": score,
                "responseRating": response_rating,
                "timeSpent": time_spent,
                "status": "completed"
            }
        }
    )
    duration = time.time() - start_db
    if hasattr(g, 'db_time_accumulator'):
        g.db_time_accumulator += duration
    
    # Prepare action details for results
    action_details = []
    for stage in scenario.get('stages', []):
        stage_id = stage.get('id')
        if stage_id in selected_actions:
            action_id = selected_actions[stage_id]
            action = next((a for a in stage.get('actions', []) if a.get('id') == action_id), None)
            if action:
                # Determine quality of choice
                max_points = max(a.get('points', 0) for a in stage.get('actions', []))
                points = action.get('points', 0)
                quality = 'best' if points == max_points else \
                          'good' if points >= max_points * 0.7 else \
                          'fair' if points >= max_points * 0.4 else 'poor'
                
                action_details.append({
                    'id': action_id,
                    'stageId': stage_id,
                    'text': action.get('text', ''),
                    'outcome': action.get('outcome', ''),
                    'points': points,
                    'quality': quality
                })
    
    # Generate key lessons
    key_lessons = generate_key_lessons(scenario, selected_actions)
    
    # Check for achievements
    achievements = []
    if response_rating >= 90:
        achievements.append({
            'name': 'Expert Responder',
            'description': 'Achieved a 90% or higher response rating in an incident scenario.'
        })
    if response_rating >= 70 and time_bonus > 0:
        achievements.append({
            'name': 'Swift Defender',
            'description': 'Responded effectively and quickly to an incident.'
        })
    if is_first_completion:
        achievements.append({
            'name': 'First Response',
            'description': f'Completed the "{scenario.get("title")}" incident scenario.'
        })
    
    # Generate feedback summary
    feedback_summary = generate_feedback_summary(response_rating, action_details)
    
    # Prepare results
    results = {
        'responseRating': response_rating,
        'xpAwarded': xp_awarded,
        'coinsAwarded': coins_awarded,
        'timeBonus': time_bonus,
        'feedbackSummary': feedback_summary,
        'keyLessons': key_lessons,
        'actionDetails': action_details,
        'achievements': achievements
    }
    
    return jsonify(results)

def apply_difficulty(scenario, difficulty):
    """
    Modify scenario based on difficulty level.
    """
    if difficulty == 'easy':
        # Easier time limits
        for stage in scenario.get('stages', []):
            if 'timeLimit' in stage:
                stage['timeLimit'] = int(stage['timeLimit'] * 1.5)
    elif difficulty == 'hard':
        # Stricter time limits
        for stage in scenario.get('stages', []):
            if 'timeLimit' in stage:
                stage['timeLimit'] = int(stage['timeLimit'] * 0.7)
    
    # Add difficulty to scenario
    scenario['difficulty'] = difficulty
    
    return scenario

def generate_key_lessons(scenario, selected_actions):
    """
    Generate key lessons based on the scenario and selected actions.
    """
    lessons = []
    
    # Include default lessons from scenario
    if 'key_lessons' in scenario:
        lessons.extend(scenario['key_lessons'])
    
    # Add lessons based on user performance
    poor_choices = 0
    for stage in scenario.get('stages', []):
        stage_id = stage.get('id')
        if stage_id in selected_actions:
            action_id = selected_actions[stage_id]
            action = next((a for a in stage.get('actions', []) if a.get('id') == action_id), None)
            if action:
                max_points = max(a.get('points', 0) for a in stage.get('actions', []))
                points = action.get('points', 0)
                
                if points < max_points * 0.4:
                    poor_choices += 1
                    if 'bestPractice' in action:
                        lessons.append(action['bestPractice'])
    
    # Add general lessons if needed
    if not lessons or len(lessons) < 3:
        if scenario.get('type') == 'malware':
            lessons.append("Always isolate affected systems before starting investigation to prevent lateral movement.")
            lessons.append("Use trusted, write-protected tools for malware investigation to avoid tampering.")
        elif scenario.get('type') == 'phishing':
            lessons.append("Train users to verify suspicious email senders through out-of-band communications.")
            lessons.append("Implement and regularly update email filtering solutions.")
        elif scenario.get('type') == 'breach':
            lessons.append("Document all breach investigation steps for potential legal reporting requirements.")
            lessons.append("Change all credentials on affected systems, not just the ones known to be compromised.")
    
    # Limit to 5 lessons
    return lessons[:5]

def generate_feedback_summary(response_rating, action_details):
    """
    Generate a feedback summary based on the response rating.
    """
    if response_rating >= 90:
        return "You demonstrated excellent incident response skills, making optimal choices at each stage. Your approach followed industry best practices and would likely result in minimal damage and quick resolution."
    
    if response_rating >= 70:
        return "Your response was generally effective, with good decision-making at critical points. While there were some areas for improvement, your approach would likely contain the incident successfully."
    
    if response_rating >= 50:
        return "Your response was adequate but inconsistent. You made some good decisions but missed important best practices in others. This approach would likely contain the incident but with potential for additional damage or longer recovery time."
    
    return "Your response needs significant improvement. Several decisions were suboptimal or contrary to best practices. This approach could potentially worsen the incident or delay recovery. Review the key lessons for guidance on improving your incident response skills."

def generate_default_scenarios():
    """
    Generate default incident response scenarios.
    """
    scenarios = [
        {
            "id": "1",
            "title": "Ransomware Outbreak",
            "type": "malware",
            "shortDescription": "Handle a ransomware infection that has started encrypting files across the organization.",
            "description": "A ransomware infection has been detected within the organization. Multiple users are reporting that their files are being encrypted, and ransom notes have appeared on several workstations. This is a fast-moving incident that requires immediate action to contain the damage and protect critical systems.",
            "organization": "Regional Healthcare Provider",
            "industry": "Healthcare",
            "organizationSize": "Mid-size (500-1000 employees)",
            "playerRole": "Security Incident Response Team Lead",
            "roleDescription": "You are the lead of the security incident response team, responsible for coordinating the organization's response to security incidents.",
            "responsibilities": [
                "Assess the scope and impact of security incidents",
                "Make critical decisions about containment and remediation",
                "Coordinate with IT teams, management, and external stakeholders",
                "Ensure compliance with regulatory requirements during incident response"
            ],
            "alertMessage": "MULTIPLE DEPARTMENTS REPORTING ENCRYPTED FILES AND RANSOM DEMANDS",
            "objectivesDescription": "Your goal is to contain the ransomware outbreak, minimize data loss, and restore normal operations as quickly as possible, while complying with all regulatory requirements.",
            "objectives": [
                "Contain the ransomware to prevent further encryption",
                "Identify the infection vector",
                "Protect critical patient data and systems",
                "Develop and execute a recovery plan",
                "Ensure proper documentation and reporting"
            ],
            "tips": [
                "Time is critical in ransomware incidents - containment should be your first priority",
                "Communication is essential, but be careful about sharing sensitive details through potentially compromised channels",
                "Preserve evidence where possible, but prioritize protecting critical systems",
                "Have a clear decision-making framework for whether to restore from backups or consider other options"
            ],
            "difficulty": 3,
            "maxScore": 500,
            "stages": [
                {
                    "id": "ransomware_stage1",
                    "order": 1,
                    "totalSteps": 5,
                    "timeLimit": 120,
                    "situation": "You've just been alerted that multiple departments are reporting encrypted files and ransom notes on their computers. The help desk is being flooded with calls. Initial reports indicate the encryption started about 30 minutes ago. The ransom note demands $500,000 in Bitcoin within 72 hours or all data will be deleted.",
                    "additionalInfo": "Your organization has backups that are tested quarterly, but the last full test was 45 days ago. You have a security team of 5 people, and your organization has a cyber insurance policy with a $50,000 deductible.",
                    "actions": [
                        {
                            "id": "action1_1",
                            "text": "Immediately shut down all systems and the entire network to stop the spread",
                            "outcome": "You've halted the encryption process, but also caused a complete operational shutdown including critical patient care systems. The organization has no immediate access to electronic health records.",
                            "explanation": "While this action stops the ransomware from spreading, it also causes significant operational disruption in a healthcare environment where system availability is critical for patient care.",
                            "bestPractice": "In healthcare environments, a targeted isolation approach is preferred over complete shutdown to maintain critical patient care systems.",
                            "points": 20
                        },
                        {
                            "id": "action1_2",
                            "text": "Isolate affected departments by disconnecting them from the network while keeping critical systems online",
                            "outcome": "You've contained the ransomware to currently affected systems while maintaining essential operations. Unaffected systems remain operational but isolated.",
                            "explanation": "This balanced approach contains the incident while preserving critical functions. It demonstrates understanding of healthcare environments where availability is essential for patient care.",
                            "bestPractice": "Targeted isolation of affected systems while maintaining critical operations is the recommended approach for ransomware in healthcare settings.",
                            "points": 100
                        },
                        {
                            "id": "action1_3",
                            "text": "Keep systems running while the security team investigates the source of the infection",
                            "outcome": "While your team investigates, the ransomware continues to spread rapidly, encrypting critical databases including patient records. The scope of the incident has significantly expanded.",
                            "explanation": "Delaying containment actions allows the ransomware to spread further. In ransomware incidents, containment should typically take priority over investigation.",
                            "bestPractice": "Contain first, then investigate. Allowing malware to continue running while investigating only increases the damage.",
                            "points": 10
                        },
                        {
                            "id": "action1_4",
                            "text": "Activate the incident response plan, assemble the response team, and begin targeted isolation of affected systems",
                            "outcome": "The response team quickly implements network segmentation, isolating affected areas while preserving critical patient care systems. The ransomware spread slows significantly.",
                            "explanation": "This structured approach follows incident response best practices by assembling the right team and implementing targeted containment, balancing security and operational needs.",
                            "bestPractice": "Following an established incident response plan with defined roles and containment procedures is the most effective initial response to a security incident.",
                            "points": 90
                        }
                    ]
                },
                {
                    "id": "ransomware_stage2",
                    "order": 2,
                    "totalSteps": 5,
                    "timeLimit": 180,
                    "situation": "You've contained the immediate spread of the ransomware. Approximately 30% of your systems are affected, primarily in administration, billing, and some clinical departments. The ransomware has been identified as a variant of REvil, known for both encrypting files and exfiltrating data before encryption. You need to determine your next steps for investigation and evidence preservation.",
                    "actions": [
                        {
                            "id": "action2_1",
                            "text": "Immediately restore from backups and rebuild affected systems to resume operations as quickly as possible",
                            "outcome": "You've restored operations quickly, but you've lost forensic evidence about how the attack occurred and whether data was exfiltrated. The attackers' access method remains unknown, creating risk of reinfection.",
                            "explanation": "While rapid restoration helps business continuity, it can destroy valuable forensic evidence needed to understand the full scope of the breach and prevent future attacks.",
                            "bestPractice": "Before restoration, capture forensic images of affected systems to preserve evidence for investigation and potential regulatory reporting.",
                            "points": 30
                        },
                        {
                            "id": "action2_2",
                            "text": "Conduct a forensic investigation of affected systems to determine the infection vector and extent of data access before restoration",
                            "outcome": "Your investigation reveals the initial infection came through a phishing email with a malicious macro. You also find evidence of data exfiltration from HR systems containing employee PII.",
                            "explanation": "This methodical approach provides critical information about the attack lifecycle, helping to ensure complete remediation and accurate breach reporting.",
                            "bestPractice": "Forensic investigation before restoration helps identify all affected systems, understand the attack method, and determine if sensitive data was accessed or exfiltrated.",
                            "points": 100
                        },
                        {
                            "id": "action2_3",
                            "text": "Negotiate with the attackers to understand what data they claim to have stolen and potentially reduce the ransom",
                            "outcome": "Initial contact with the attackers confirms they claim to have patient and billing data. They provide a small sample of data as proof but negotiations only seem to encourage more aggressive demands.",
                            "explanation": "Engaging with attackers can provide information but also validates you as a potential paying victim, potentially leading to increased demands or future attacks.",
                            "bestPractice": "Law enforcement and cybersecurity authorities generally advise against negotiating with attackers, as it doesn't guarantee data return and may fund further criminal activities.",
                            "points": 20
                        },
                        {
                            "id": "action2_4",
                            "text": "Create forensic images of a sample of affected systems, then begin restoration of critical systems in parallel with investigation",
                            "outcome": "You've balanced evidence preservation with operational recovery. The sample images provide insight into the attack method while allowing critical systems to be restored promptly.",
                            "explanation": "This approach strikes a reasonable balance between forensic needs and business continuity, particularly appropriate for healthcare environments where extended downtime isn't acceptable.",
                            "bestPractice": "When complete imaging isn't practical due to operational needs, capturing representative samples while prioritizing critical system restoration can be an effective compromise.",
                            "points": 80
                        }
                    ]
                },
                {
                    "id": "ransomware_stage3",
                    "order": 3,
                    "totalSteps": 5,
                    "situation": "Your investigation has confirmed data exfiltration occurred, including patient records and billing information. Approximately 25,000 patient records may have been accessed. Your backup restoration is in progress but will take at least 24 more hours for full recovery. You need to decide on external communication strategy.",
                    "actions": [
                        {
                            "id": "action3_1",
                            "text": "Delay any external notifications until systems are fully restored and you have complete details about the affected data",
                            "outcome": "You've gained time for complete restoration, but you're now past regulatory notification requirements for healthcare data breach reporting. This could result in significant compliance penalties.",
                            "explanation": "While having complete information is ideal, healthcare organizations have strict breach notification timelines under regulations like HIPAA, which don't allow for delays until complete assessment.",
                            "bestPractice": "Healthcare breach notification requirements often begin when you have reasonable belief a breach occurred, not when you have complete details. Timely notification is required even with preliminary information.",
                            "points": 10
                        },
                        {
                            "id": "action3_2",
                            "text": "Immediately notify all patients about the potential data breach with full transparency about the ransomware attack",
                            "outcome": "Your notification causes immediate public concern and media attention. While transparent, the premature notification includes many patients whose data wasn't actually compromised, causing unnecessary alarm.",
                            "explanation": "While transparency is important, notifying individuals before you have reasonably complete information can cause unnecessary fear and confusion, and may require corrective communications later.",
                            "bestPractice": "Breach notifications should be timely but based on the best available information about whose data was actually affected to avoid unnecessarily alarming unaffected individuals.",
                            "points": 50
                        },
                        {
                            "id": "action3_3",
                            "text": "Notify appropriate regulatory authorities about the breach while continuing investigation, and prepare for patient notification once affected records are identified",
                            "outcome": "You've met regulatory reporting obligations while gaining time to precisely identify affected individuals. Regulators appreciate your proactive communication and structured response plan.",
                            "explanation": "This approach balances compliance requirements with the need for accurate information, demonstrating a responsible and structured incident response approach.",
                            "bestPractice": "Initial regulatory notification followed by more detailed individual notifications as information becomes available is the recommended approach for healthcare data breaches.",
                            "points": 100
                        },
                        {
                            "id": "action3_4",
                            "text": "Engage legal counsel and PR firm to manage communications while delaying formal notifications until legal advice is received",
                            "outcome": "While you gain expert guidance, the delay puts you at risk of missing regulatory reporting deadlines. When you do notify, authorities question why initial notification was delayed.",
                            "explanation": "Expert guidance is valuable, but it shouldn't significantly delay required notifications. Legal and PR assistance should support timely compliance, not replace it.",
                            "bestPractice": "Engage legal and PR expertise in parallel with initiating required notifications. Expert guidance should enhance your response, not delay compliance with notification requirements.",
                            "points": 40
                        }
                    ]
                },
                {
                    "id": "ransomware_stage4",
                    "order": 4,
                    "totalSteps": 5,
                    "situation": "Systems are being restored, and notifications are underway. Analysis of the attack shows the initial infection vector was a phishing email with a malicious Excel macro. The account that opened it had local admin rights, which facilitated lateral movement. You need to implement immediate security improvements to prevent reinfection.",
                    "actions": [
                        {
                            "id": "action4_1",
                            "text": "Require immediate password changes for all users and implement multi-factor authentication across all systems",
                            "outcome": "You've improved authentication security, but haven't addressed the root infection vector (phishing and macro execution) or the privilege issue that facilitated spread.",
                            "explanation": "While password changes and MFA are good security practices, they wouldn't have prevented the initial infection through macro execution or the lateral movement enabled by local admin rights.",
                            "bestPractice": "Effective security improvements should address the specific vulnerabilities identified in the incident, not just general security best practices.",
                            "points": 40
                        },
                        {
                            "id": "action4_2",
                            "text": "Disable Office macros across the organization and implement a comprehensive security awareness program focused on phishing",
                            "outcome": "You've directly addressed the initial infection vector, significantly reducing the risk of similar attacks. Some departments report operational challenges adapting to macro restrictions.",
                            "explanation": "This targets the specific infection vector (macro execution via phishing), demonstrating a direct response to the identified vulnerability.",
                            "bestPractice": "Restricting macro execution, especially from external sources, is an effective control against a common initial infection vector for ransomware and other malware.",
                            "points": 80
                        },
                        {
                            "id": "action4_3",
                            "text": "Implement a widespread rollout of endpoint protection software with anti-ransomware capabilities",
                            "outcome": "Your new endpoint protection provides improved detection capabilities, but alerts from the first week show macro-based threats are still getting through due to user permission.",
                            "explanation": "Technology solutions alone, without addressing user behavior and privileges, provide incomplete protection against socially-engineered attacks like phishing.",
                            "bestPractice": "Defense in depth requires both technical controls and addressing human factors through policies, privileges, and awareness.",
                            "points": 60
                        },
                        {
                            "id": "action4_4",
                            "text": "Implement a comprehensive security improvement plan addressing macros, admin rights, network segmentation, and security awareness",
                            "outcome": "Your holistic approach addresses multiple vulnerabilities in the attack chain. Initial monitoring shows significantly improved prevention and detection capabilities.",
                            "explanation": "This comprehensive approach addresses multiple factors that contributed to the incident: the initial infection vector, privilege issues that facilitated spread, network architecture that allowed lateral movement, and user awareness.",
                            "bestPractice": "Effective security improvements should address all phases of the attack lifecycle identified during the incident, creating multiple layers of defense.",
                            "points": 100
                        }
                    ]
                },
                {
                    "id": "ransomware_stage5",
                    "order": 5,
                    "totalSteps": 5,
                    "situation": "The immediate incident is now contained, systems have been restored, and initial security improvements are in place. You need to conduct a post-incident review and develop longer-term security recommendations for executive leadership to prevent future incidents.",
                    "actions": [
                        {
                            "id": "action5_1",
                            "text": "Recommend significant budget increase for security tools, including next-gen endpoint protection, enhanced email filtering, and a security operations center",
                            "outcome": "Your technology-focused recommendations require significant investment without clear alignment to the specific risks demonstrated by the incident. Leadership questions the cost-benefit ratio.",
                            "explanation": "While security tools are important, recommendations focused primarily on new technology purchases without addressing process, people, and structural issues may not effectively address the demonstrated risks.",
                            "bestPractice": "Post-incident recommendations should balance technology, process, and organizational improvements based on a clear analysis of the attack lifecycle and detected vulnerabilities.",
                            "points": 50
                        },
                        {
                            "id": "action5_2",
                            "text": "Document lessons learned but focus primarily on praising the team's effective response to avoid blame and maintain morale",
                            "outcome": "Your positive approach maintains team morale, but the lack of specific improvement recommendations leaves the organization vulnerable to similar attacks in the future.",
                            "explanation": "While avoiding blame is appropriate, effective post-incident analysis requires honest assessment of gaps and vulnerabilities that contributed to the incident.",
                            "bestPractice": "Blameless post-incident reviews can still identify specific improvements needed, focusing on systemic issues rather than individual mistakes.",
                            "points": 30
                        },
                        {
                            "id": "action5_3",
                            "text": "Develop a detailed report analyzing the attack lifecycle, identifying specific vulnerabilities, and recommending prioritized improvements across technology, process, and organization",
                            "outcome": "Your comprehensive analysis provides clear context for specific, prioritized recommendations. Leadership approves your implementation roadmap based on demonstrated risk reduction.",
                            "explanation": "This structured approach connects incident findings directly to specific, prioritized recommendations, making it clear how each improvement addresses demonstrated vulnerabilities.",
                            "bestPractice": "Effective post-incident recommendations should be directly tied to specific findings from the incident analysis, prioritized based on risk, and include both quick wins and longer-term improvements.",
                            "points": 100
                        },
                        {
                            "id": "action5_4",
                            "text": "Focus primarily on compliance improvements to ensure regulatory requirements are met and potential fines are avoided in future incidents",
                            "outcome": "Your compliance focus addresses regulatory concerns but misses critical security improvements that would actually prevent future incidents. You're better prepared for audits but still vulnerable to attacks.",
                            "explanation": "While compliance is important, especially after a regulatory reportable incident, focusing primarily on compliance rather than security effectiveness may not address the actual risks and vulnerabilities.",
                            "bestPractice": "Effective security improvements should focus first on addressing actual risks and attack vectors, with compliance considerations integrated into the overall security strategy rather than driving it.",
                            "points": 40
                        }
                    ]
                }
            ],
            "key_lessons": [
                "Ransomware containment requires balancing security and operational needs, especially in healthcare environments",
                "Forensic investigation is critical for understanding attack vectors and data exfiltration",
                "Healthcare organizations have specific breach notification requirements that must be followed even with incomplete information",
                "Effective security improvements should address all phases of the attack lifecycle"
            ]
        },
        {
            "id": "2",
            "title": "Phishing Campaign Detection",
            "type": "phishing",
            "shortDescription": "Respond to a targeted phishing campaign attempting to harvest credentials and deploy malware.",
            "description": "A sophisticated phishing campaign targeting your organization has been detected. The attackers are using convincing emails impersonating your company's leadership to harvest credentials and potentially deploy malware. Several employees have already interacted with the phishing emails, and there are indicators that some credentials may have been compromised.",
            "organization": "Financial Services Firm",
            "industry": "Finance",
            "organizationSize": "Large (5000+ employees)",
            "playerRole": "Cybersecurity Analyst",
            "roleDescription": "You are a cybersecurity analyst responsible for monitoring and responding to security threats. You have access to email security tools, endpoint protection systems, and authentication logs.",
            "responsibilities": [
                "Monitor security alerts and identify potential threats",
                "Analyze suspicious activities and determine appropriate response actions",
                "Implement immediate security controls to mitigate threats",
                "Coordinate with other security team members and IT staff"
            ],
            "alertMessage": "MULTIPLE EMPLOYEES REPORTING SUSPICIOUS EMAILS FROM EXECUTIVE TEAM",
            "objectivesDescription": "Your goal is to identify the scope of the phishing campaign, contain its impact, prevent credential compromise, and implement measures to block similar attacks in the future.",
            "objectives": [
                "Identify affected users and systems",
                "Contain the phishing campaign",
                "Prevent unauthorized access with compromised credentials",
                "Recover from any compromise that occurred",
                "Implement measures to prevent similar phishing attacks"
            ],
            "tips": [
                "Look for patterns in the phishing emails to identify all potential targets",
                "Act quickly to prevent further credential compromise",
                "Consider both technical controls and user communications in your response",
                "Document all identified indicators of compromise for future detection"
            ],
            "difficulty": 2,
            "maxScore": 500,
            "stages": [
                {
                    "id": "phishing_stage1",
                    "order": 1,
                    "totalSteps": 5,
                    "timeLimit": 90,
                    "situation": "The security team has received multiple reports of suspicious emails appearing to come from the CEO asking recipients to review an urgent document. The emails contain a link to what appears to be a OneDrive document but actually leads to a credential harvesting site. Some employees have already clicked the link and potentially entered their credentials.",
                    "actions": [
                        {
                            "id": "action1_1",
                            "text": "Immediately block all external emails to prevent further phishing attempts from reaching users",
                            "outcome": "External email is completely blocked, stopping the phishing campaign but also halting all legitimate business email. Customer communications are severely disrupted.",
                            "explanation": "This action is unnecessarily disruptive to business operations. While it prevents further phishing emails, it also blocks all legitimate external communication.",
                            "bestPractice": "Phishing response should balance security needs with business continuity, using targeted blocking rather than complete email shutdown when possible.",
                            "points": 20
                        },
                        {
                            "id": "action1_2",
                            "text": "Analyze the phishing emails to identify patterns, then configure email filtering rules to block similar messages",
                            "outcome": "Your analysis reveals consistent patterns in sender domains, subject lines, and link structures. Targeted filtering rules block further phishing attempts while allowing legitimate email.",
                            "explanation": "This targeted approach effectively contains the specific campaign while minimizing business disruption, demonstrating good balance between security and operations.",
                            "bestPractice": "Analyzing phishing patterns and implementing specific filtering rules is an effective first-line defense that balances security with business needs.",
                            "points": 90
                        },
                        {
                            "id": "action1_3",
                            "text": "Send an immediate company-wide email warning about the phishing attempt with screenshots and safe reporting instructions",
                            "outcome": "Your alert raises awareness and prevents some additional users from falling victim. However, without technical controls, some phishing emails continue to reach users and harvest credentials.",
                            "explanation": "User awareness is important but insufficient by itself. Without technical controls to block the phishing emails, awareness alone cannot fully contain the campaign.",
                            "bestPractice": "Effective phishing response requires both technical controls and user awareness, as neither is completely effective alone.",
                            "points": 60
                        },
                        {
                            "id": "action1_4",
                            "text": "Focus on investigating which employees have already entered credentials before taking any containment actions",
                            "outcome": "While you investigate, the phishing campaign continues, resulting in additional credential compromises. By the time you identify affected users, the scope has significantly expanded.",
                            "explanation": "Delaying containment to focus solely on investigation allows the attack to continue and expand. In active attacks, containment should generally take priority or occur in parallel with investigation.",
                            "bestPractice": "Investigation should not come at the expense of containment in active attacks. The best approach is to contain the threat while investigating its impact in parallel.",
                            "points": 30
                        }
                    ]
                },
                {
                    "id": "phishing_stage2",
                    "order": 2,
                    "totalSteps": 5,
                    "situation": "You've contained the immediate phishing campaign through email filtering. Analysis of email logs and security alerts shows approximately 50 employees received the phishing email, and 15 clicked the link. You need to address potential credential compromise.",
                    "actions": [
                        {
                            "id": "action2_1",
                            "text": "Force an immediate password reset for all employees in the organization",
                            "outcome": "All 5,000+ employees are forced to create new passwords, causing significant help desk volume and some business disruption. Many unaffected users are confused and frustrated by the urgent reset.",
                            "explanation": "This approach is unnecessarily broad, causing organization-wide disruption when only a small percentage of users are potentially affected.",
                            "bestPractice": "Password resets should be targeted to affected or potentially affected users when the scope is well understood, unless there's evidence of a much wider compromise.",
                            "points": 40
                        },
                        {
                            "id": "action2_2",
                            "text": "Force password resets only for users who clicked the phishing link, identified through email security logs",
                            "outcome": "The 15 affected users have their passwords reset, but analysis later reveals 3 additional users who clicked the link weren't initially identified in logs, leaving their accounts vulnerable.",
                            "explanation": "While more targeted than a global reset, this approach relies too heavily on complete detection of affected users, which is not always possible with available logs.",
                            "bestPractice": "Password reset scope should account for the confidence level in identifying all affected users, with a security margin when complete identification cannot be guaranteed.",
                            "points": 70
                        },
                        {
                            "id": "action2_3",
                            "text": "Force password resets for all users who received the phishing email plus implementing additional monitoring for unusual login activities",
                            "outcome": "All potentially affected users have credentials reset, and enhanced monitoring successfully detects two compromise attempts using credentials that weren't initially identified in click logs.",
                            "explanation": "This approach combines targeted remediation with additional detection capabilities, recognizing the limitations of logs in identifying every affected user.",
                            "bestPractice": "Defense in depth combines preventive measures like password resets with detective controls like enhanced monitoring to address potential gaps in identification.",
                            "points": 100
                        },
                        {
                            "id": "action2_4",
                            "text": "Implement enhanced login monitoring without forcing password resets, to avoid disruption while watching for suspicious activities",
                            "outcome": "Monitoring detects several successful logins using compromised credentials before they could be blocked, resulting in data access and continued attacker presence.",
                            "explanation": "Monitoring alone is insufficient when credentials are known to be compromised, as detection may occur only after successful attacker access.",
                            "bestPractice": "When credential compromise is known or strongly suspected, password resets should be implemented promptly, not just monitoring.",
                            "points": 20
                        }
                    ]
                },
                {
                    "id": "phishing_stage3",
                    "order": 3,
                    "totalSteps": 5,
                    "situation": "Password resets have been completed for potentially affected users. Further investigation reveals the phishing site also delivered a browser extension to users who entered credentials. This extension can capture additional login sessions and potentially access browser data. You need to address this malware component.",
                    "actions": [
                        {
                            "id": "action3_1",
                            "text": "Send instructions to all affected users on how to manually check for and remove suspicious browser extensions",
                            "outcome": "Only about 60% of affected users successfully complete the removal process. The remainder either don't understand the instructions or fail to complete the steps properly.",
                            "explanation": "Relying solely on user action for malware removal is unreliable, as users may lack technical skills or fail to follow instructions completely.",
                            "bestPractice": "Malware remediation should not rely primarily on end-user actions, especially for non-technical users.",
                            "points": 30
                        },
                        {
                            "id": "action3_2",
                            "text": "Deploy emergency endpoint scanning to detect and remove the malicious extension across all corporate systems",
                            "outcome": "Automated scanning successfully removes the malicious extension from all corporate devices, but doesn't address potential access from personal devices that accessed company resources.",
                            "explanation": "This approach effectively addresses corporate-managed devices but misses BYOD or personal devices that may have been affected and still have access to company resources.",
                            "bestPractice": "Malware remediation should consider all devices that may access company resources, not just corporate-managed endpoints.",
                            "points": 70
                        },
                        {
                            "id": "action3_3",
                            "text": "Implement browser extension whitelisting through group policy and force extension refresh on all corporate devices",
                            "outcome": "The malicious extension is removed and prevented from reinstalling on corporate devices. However, this approach causes some disruption as legitimate extensions need re-approval.",
                            "explanation": "This approach not only removes the current threat but implements preventive controls against similar future attacks, though with some operational impact.",
                            "bestPractice": "Effective security response addresses both the immediate threat and implements controls to prevent similar future attacks.",
                            "points": 80
                        },
                        {
                            "id": "action3_4",
                            "text": "Deploy extension removal on corporate devices, implement additional authentication challenges for all users, and provide clear BYOD remediation instructions",
                            "outcome": "Your comprehensive approach removes the threat from corporate devices while adding protections for access from potentially compromised personal devices. All access vectors are secured.",
                            "explanation": "This layered approach addresses all potential access vectors: corporate devices, authentication systems, and guidance for personal devices, demonstrating comprehensive defense in depth.",
                            "bestPractice": "Comprehensive security response addresses all potential attack vectors and access methods, not just the primary affected systems.",
                            "points": 100
                        }
                    ]
                },
                {
                    "id": "phishing_stage4",
                    "order": 4,
                    "totalSteps": 5,
                    "situation": "The malicious extension has been removed, and immediate credential compromises have been addressed. Analysis of the phishing campaign shows it specifically targeted finance department employees and attempted to access financial systems. You need to implement additional security measures to prevent similar attacks.",
                    "actions": [
                        {
                            "id": "action4_1",
                            "text": "Implement multi-factor authentication for all employees, with priority on finance department and privileged accounts",
                            "outcome": "MFA deployment successfully prevents further access attempts using compromised credentials. Initial deployment focuses on high-risk groups with rollout to other users scheduled.",
                            "explanation": "This approach directly addresses the vulnerability exploited in the phishing attack by adding a layer of protection beyond passwords, prioritizing the most critical users.",
                            "bestPractice": "Multi-factor authentication is one of the most effective controls against credential-based attacks, with prioritization based on risk appropriate for rapid deployment.",
                            "points": 100
                        },
                        {
                            "id": "action4_2",
                            "text": "Increase frequency and depth of phishing awareness training for all employees",
                            "outcome": "Enhanced training improves user awareness, but phishing tests show determined attackers can still achieve some success rate even with trained users.",
                            "explanation": "While user awareness is valuable, it cannot provide complete protection as sophisticated phishing can sometimes deceive even trained users.",
                            "bestPractice": "User training should be part of a defense-in-depth strategy but not relied upon as the primary protection against phishing.",
                            "points": 50
                        },
                        {
                            "id": "action4_3",
                            "text": "Implement stricter email filtering and sender verification policies",
                            "outcome": "Enhanced email security reduces the volume of phishing emails reaching users, but verification spoofing techniques still allow some sophisticated phishing to get through.",
                            "explanation": "Email security controls are important but not completely effective against all phishing techniques, particularly sophisticated spear phishing.",
                            "bestPractice": "Email security should be part of a defense-in-depth strategy but supplemented with controls that protect against the impact of successful phishing.",
                            "points": 60
                        },
                        {
                            "id": "action4_4",
                            "text": "Focus primarily on browser security, implementing browser isolation for accessing sensitive systems",
                            "outcome": "Browser isolation provides strong protection against web-based attacks like the malicious extension, but doesn't address credential harvesting which was the primary initial attack vector.",
                            "explanation": "While browser isolation helps with one aspect of the attack (malicious extensions), it doesn't address the primary vulnerability of credential harvesting through phishing.",
                            "bestPractice": "Security improvements should address the primary attack vectors identified in the incident, not just secondary aspects.",
                            "points": 40
                        }
                    ]
                },
                {
                    "id": "phishing_stage5",
                    "order": 5,
                    "totalSteps": 5,
                    "situation": "One week after the incident, security monitoring detects suspicious activity from a service account that wasn't identified in the initial phishing campaign. Investigation shows an attacker is attempting to use this account, which has elevated privileges, to access financial systems. This appears to be a continuation of the campaign that wasn't fully contained.",
                    "actions": [
                        {
