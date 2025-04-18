# backend/routes/phishing_routes.py
from flask import Blueprint, request, jsonify, g
from bson.objectid import ObjectId
import time
from datetime import datetime
import random

from mongodb.database import db
from models.test import get_user_by_id, update_user_coins, update_user_xp

# Initialize the blueprint
phishing_bp = Blueprint('phishing', __name__)

# Phishing examples collection
phishing_examples_collection = db.phishingExamples
phishing_scores_collection = db.phishingScores

# Get all phishing examples
@phishing_bp.route('/examples', methods=['GET'])
def get_phishing_examples():
    """
    Retrieve a set of phishing and legitimate examples 
    for the Phishing Phrenzy game.
    """
    start_db = time.time()
    examples = list(phishing_examples_collection.find({}, {'_id': 0}))
    duration = time.time() - start_db
    if hasattr(g, 'db_time_accumulator'):
        g.db_time_accumulator += duration

    # If there are no examples in the database, generate some defaults
    if not examples:
        examples = generate_default_examples()
        
        # Store these examples in the database for future use
        if examples:
            start_db = time.time()
            phishing_examples_collection.insert_many(examples)
            duration = time.time() - start_db
            if hasattr(g, 'db_time_accumulator'):
                g.db_time_accumulator += duration
    
    # Shuffle examples to ensure randomized order
    random.shuffle(examples)
    
    # Limit to 20 examples per game session
    return jsonify(examples[:20])

@phishing_bp.route('/submit-score', methods=['POST'])
def submit_score():
    """
    Submit a Phishing Phrenzy game score and award XP/coins based on performance.
    """
    data = request.json
    user_id = data.get('userId')
    score = data.get('score', 0)
    timestamp = data.get('timestamp', datetime.utcnow().isoformat())
    
    if not user_id:
        return jsonify({"error": "userId is required"}), 400
    
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
    
    # Store the score
    score_doc = {
        "userId": user_oid,
        "score": score,
        "timestamp": datetime.utcnow(),
        "game": "phishingPhrenzy"
    }
    
    start_db = time.time()
    phishing_scores_collection.insert_one(score_doc)
    duration = time.time() - start_db
    if hasattr(g, 'db_time_accumulator'):
        g.db_time_accumulator += duration
    
    # Award XP and coins based on score
    xp_to_award = score // 5  # 1 XP for every 5 points
    coins_to_award = score // 10  # 1 coin for every 10 points
    
    # Update user stats
    start_db = time.time()
    update_user_xp(user_id, xp_to_award)
    update_user_coins(user_id, coins_to_award)
    duration = time.time() - start_db
    if hasattr(g, 'db_time_accumulator'):
        g.db_time_accumulator += duration
    
    # Get updated user
    start_db = time.time()
    updated_user = get_user_by_id(user_id)
    duration = time.time() - start_db
    if hasattr(g, 'db_time_accumulator'):
        g.db_time_accumulator += duration
    
    # Check for phishing-related achievements
    achievements = []
    
    # Example achievement: First Phishing Game
    if phishing_scores_collection.count_documents({"userId": user_oid}) == 1:
        achievements.append("first_phishing_game")
    
    # Example achievement: Phishing Expert (score > 300)
    if score > 300:
        achievements.append("phishing_expert")
    
    # Example achievement: Phishing Master (score > 500)
    if score > 500:
        achievements.append("phishing_master")
    
    # Return updated user info and any achievements unlocked
    return jsonify({
        "success": True,
        "scoreSubmitted": score,
        "xpAwarded": xp_to_award,
        "coinsAwarded": coins_to_award,
        "newXP": updated_user.get("xp", 0),
        "newCoins": updated_user.get("coins", 0),
        "achievements": achievements
    })

@phishing_bp.route('/leaderboard', methods=['GET'])
def get_leaderboard():
    """
    Get the top scores for the Phishing Phrenzy game.
    """
    limit = int(request.args.get('limit', 10))
    
    start_db = time.time()
    # Aggregate to get top scores with user info
    pipeline = [
        {"$match": {"game": "phishingPhrenzy"}},
        {"$sort": {"score": -1}},
        {"$limit": limit},
        {"$lookup": {
            "from": "mainusers",
            "localField": "userId",
            "foreignField": "_id",
            "as": "user"
        }},
        {"$unwind": "$user"},
        {"$project": {
            "score": 1,
            "timestamp": 1,
            "username": "$user.username",
            "userId": "$userId"
        }}
    ]
    
    leaderboard = list(phishing_scores_collection.aggregate(pipeline))
    duration = time.time() - start_db
    if hasattr(g, 'db_time_accumulator'):
        g.db_time_accumulator += duration
    
    # Convert ObjectId to string for JSON serialization
    for entry in leaderboard:
        entry["userId"] = str(entry["userId"])
    
    return jsonify(leaderboard)

def generate_default_examples():
    """
    Generate default phishing and legitimate examples if none exist in the database.
    """
    examples = []
    
    # Phishing emails
    examples.append({
        "type": "email",
        "from": "security@bankofamerica-secure.com",
        "subject": "URGENT: Your Account Has Been Compromised",
        "body": "Dear Valued Customer,\n\nWe have detected suspicious activity on your account. Your account has been temporarily limited.\n\nTo remove the limitation, please verify your information by clicking the link below:\n\nhttps://secure-bankofamerica.com.verify-identity.net/login\n\nIgnoring this message will result in permanent account suspension.\n\nSincerely,\nBank of America Security Team",
        "links": ["https://secure-bankofamerica.com.verify-identity.net/login"],
        "date": "2025-03-15",
        "isPhishing": true
    })
    
    examples.append({
        "type": "email",
        "from": "accounts@netflix-billing.com",
        "subject": "Netflix Payment Declined - Action Required",
        "body": "Dear Netflix Customer,\n\nWe were unable to process your payment for your Netflix subscription. To avoid service interruption, please update your payment information immediately.\n\nUpdate Payment Method: https://netflix-account-verify.com/update-payment\n\nIf you do not update your payment information within 24 hours, your account will be suspended.\n\nThank you,\nNetflix Billing Team",
        "links": ["https://netflix-account-verify.com/update-payment"],
        "date": "2025-03-17",
        "isPhishing": true
    })
    
    examples.append({
        "type": "email",
        "from": "helpdesk@microsoft365.support",
        "subject": "Your Microsoft 365 account will be suspended",
        "body": "Your Microsoft 365 subscription has expired.\n\nTo continue using Microsoft Office 365 services, you must verify your account information. Otherwise, your account will be deleted within 24 hours.\n\nVerify Account: https://office365-verification-center.com/verify\n\nThank you,\nMicrosoft Support Team",
        "links": ["https://office365-verification-center.com/verify"],
        "date": "2025-03-12",
        "isPhishing": true
    })
    
    # Legitimate emails
    examples.append({
        "type": "email",
        "from": "no-reply@amazon.com",
        "subject": "Your Amazon Order #112-3426789-9214568",
        "body": "Hello John Doe,\n\nThank you for your order. We'll send a confirmation when your item ships.\n\nDetails:\nOrder #112-3426789-9214568\nPlaced on March 16, 2025\n\nEcho Dot (4th Gen) - Smart speaker with Alexa - Charcoal\nPrice: $29.99\nQuantity: 1\nShipping: FREE Prime Shipping\nEstimated delivery: March 19, 2025\n\nView or manage your order: https://www.amazon.com/orders/112-3426789-9214568\n\nThank you for shopping with us.\nAmazon.com",
        "links": ["https://www.amazon.com/orders/112-3426789-9214568"],
        "date": "2025-03-16",
        "isPhishing": false
    })
    
    examples.append({
        "type": "email",
        "from": "noreply@github.com",
        "subject": "Security alert: New sign-in to your GitHub account",
        "body": "Hello username,\n\nWe noticed a new sign-in to your GitHub account.\n\nTime: March 15, 2025, 09:42 UTC\nLocation: San Francisco, CA, USA\nDevice: Chrome on Windows\n\nIf this was you, you can disregard this email.\n\nIf this wasn't you, you can secure your account here: https://github.com/settings/security\n\nThanks,\nThe GitHub Team",
        "links": ["https://github.com/settings/security"],
        "date": "2025-03-15",
        "isPhishing": false
    })
    
    # Phishing SMS
    examples.append({
        "type": "sms",
        "from": "+1-345-678-9012",
        "message": "ALERT: Your Amazon account has been locked due to suspicious activity. Verify your identity here: amzn-secure.com/verify",
        "links": ["amzn-secure.com/verify"],
        "isPhishing": true
    })
    
    examples.append({
        "type": "sms",
        "from": "+1-234-567-8910",
        "message": "Apple: Your iCloud account is being deleted. Verify your information to keep your account: secure-icloud.com/verify-now",
        "links": ["secure-icloud.com/verify-now"],
        "isPhishing": true
    })
    
    # Legitimate SMS
    examples.append({
        "type": "sms",
        "from": "CHASE",
        "message": "Chase: A charge of $752.25 at APPLE ONLINE STORE was made on your credit card. If not you, call 800-432-3117.",
        "links": [],
        "isPhishing": false
    })
    
    examples.append({
        "type": "sms",
        "from": "887-65",
        "message": "Your Amazon OTP is: 358942. Do not share this code with anyone.",
        "links": [],
        "isPhishing": false
    })
    
    # Phishing websites
    examples.append({
        "type": "website",
        "url": "https://faceboook-login.com/",
        "title": "Log into Facebook",
        "content": "Connect with friends and the world around you on Facebook.",
        "formFields": [
            {"label": "Email or Phone Number", "type": "text", "placeholder": "Email or Phone Number"},
            {"label": "Password", "type": "password", "placeholder": "Password"}
        ],
        "submitButton": "Log In",
        "isPhishing": true
    })
    
    examples.append({
        "type": "website",
        "url": "https://secure-paypaI.com/signin",
        "title": "PayPal: Login",
        "content": "Login to your PayPal account to manage your money, send payments, and more.",
        "formFields": [
            {"label": "Email", "type": "email", "placeholder": "Email"},
            {"label": "Password", "type": "password", "placeholder": "Password"}
        ],
        "submitButton": "Log In",
        "isPhishing": true
    })
    
    # Legitimate websites
    examples.append({
        "type": "website",
        "url": "https://www.apple.com/shop/checkout",
        "title": "Apple Store Checkout",
        "content": "Review your bag. Complete your purchase securely with Apple Pay or enter your payment details below.",
        "formFields": [
            {"label": "Card Number", "type": "text", "placeholder": "Card Number"},
            {"label": "Expiration Date", "type": "text", "placeholder": "MM/YY"},
            {"label": "Security Code", "type": "password", "placeholder": "CVC"}
        ],
        "submitButton": "Pay Now",
        "isPhishing": false
    })
    
    examples.append({
        "type": "website",
        "url": "https://www.linkedin.com/login",
        "title": "LinkedIn Login",
        "content": "Make the most of your professional life. Join your colleagues, classmates, and friends on LinkedIn.",
        "formFields": [
            {"label": "Email or Phone", "type": "text", "placeholder": "Email or Phone"},
            {"label": "Password", "type": "password", "placeholder": "Password"}
        ],
        "submitButton": "Sign in",
        "isPhishing": false
    })
    
    return examples
