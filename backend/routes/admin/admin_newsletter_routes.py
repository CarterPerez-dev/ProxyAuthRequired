from flask import Blueprint, request, jsonify, current_app, session
from datetime import datetime
from bson.objectid import ObjectId

# Import newsletter functions
from models.newsletter import (
    create_campaign,
    get_campaign_by_id,
    mark_campaign_sent,
    get_all_active_subscribers,
    newsletter_subscribers_collection,
    newsletter_campaigns_collection,
    _generate_unsubscribe_token,
    send_campaign_to_all
)

########## ADMIN BLUEPRINT ##########
admin_news_bp = Blueprint('admin_news_bp', __name__) 

def require_cracked_admin(required_role=None):
    """
    Reuse your existing logic here or import from cracked_admin.
    Minimal example below:
    """
    if not session.get('cracked_admin_logged_in'):
        return False
    if required_role:
        current_role = session.get('cracked_admin_role', 'basic')
        priority_map = {"basic": 1, "supervisor": 2, "superadmin": 3}
        needed = priority_map.get(required_role, 1)
        have = priority_map.get(current_role, 1)
        return have >= needed
    return True

################################
# ADMIN: Create a new campaign
################################
@admin_news_bp.route('/newsletter/create', methods=['POST'])
def admin_create_newsletter():
    if not require_cracked_admin(required_role="supervisor"):
        return jsonify({"error": "Insufficient admin privileges"}), 403

    data = request.json or {}
    title = data.get("title", "").strip()
    content_html = data.get("contentHtml", "").strip()

    if not title or not content_html:
        return jsonify({"error": "Missing title or contentHtml"}), 400

    campaign_id = create_campaign(title, content_html)
    return jsonify({"message": "Newsletter campaign created", "campaignId": campaign_id}), 201

#################################
# ADMIN: View a campaign by ID
#################################
@admin_news_bp.route('/newsletter/<campaign_id>', methods=['GET'])
def admin_get_newsletter(campaign_id):
    if not require_cracked_admin():
        return jsonify({"error": "Insufficient admin privileges"}), 403

    campaign = get_campaign_by_id(campaign_id)
    if not campaign:
        return jsonify({"error": "Campaign not found"}), 404

    # Convert _id -> str
    campaign["_id"] = str(campaign["_id"])
    return jsonify(campaign), 200

#################################
# ADMIN: Send a campaign
#################################
@admin_news_bp.route('/newsletter/send/<campaign_id>', methods=['POST'])
def admin_send_newsletter(campaign_id):
    if not require_cracked_admin(required_role="supervisor"):
        return jsonify({"error": "Insufficient admin privileges"}), 403

    campaign = get_campaign_by_id(campaign_id)
    if not campaign:
        current_app.logger.error(f"Campaign not found for ID: {campaign_id}")
        return jsonify({"error": "Campaign not found"}), 404

    if campaign.get("status") == "sent":
        return jsonify({"error": "Campaign already sent"}), 400

    # Send the campaign to all subscribers using SendGrid
    current_app.logger.info(f"Attempting to send campaign {campaign_id}")
    result = send_campaign_to_all(campaign_id)
    
    if result["success"]:
        return jsonify({
            "message": result["message"]
        }), 200
    else:
        current_app.logger.error(f"Failed to send campaign: {result['message']}")
        return jsonify({
            "error": result["message"]
        }), 400

#################################
# ADMIN: Get all subscribers
#################################
@admin_news_bp.route('/newsletter/subscribers', methods=['GET'])
def get_subscribers():
    if not require_cracked_admin():
        return jsonify({"error": "Insufficient admin privileges"}), 403
    
    try:
        # Get all subscribers (both active and unsubscribed)
        subscribers = list(newsletter_subscribers_collection.find())
        
        # Convert ObjectIds to strings for JSON serialization
        for sub in subscribers:
            sub['_id'] = str(sub['_id'])
        
        return jsonify({"subscribers": subscribers}), 200
    except Exception as e:
        current_app.logger.exception(f"Failed to fetch subscribers: {str(e)}")
        return jsonify({"error": f"Failed to fetch subscribers: {str(e)}"}), 500

#################################
# ADMIN: Get all campaigns
#################################
@admin_news_bp.route('/newsletter/campaigns', methods=['GET'])
def get_campaigns():
    if not require_cracked_admin():
        return jsonify({"error": "Insufficient admin privileges"}), 403
    
    try:
        # Get all campaigns
        campaigns = list(newsletter_campaigns_collection.find())
        
        # Convert ObjectIds to strings for JSON serialization
        for campaign in campaigns:
            campaign['_id'] = str(campaign['_id'])
        
        return jsonify({"campaigns": campaigns}), 200
    except Exception as e:
        current_app.logger.exception(f"Failed to fetch campaigns: {str(e)}")
        return jsonify({"error": f"Failed to fetch campaigns: {str(e)}"}), 500




@admin_news_bp.route('/newsletter/<campaign_id>', methods=['DELETE'])
def admin_delete_newsletter(campaign_id):
    if not require_cracked_admin(required_role="supervisor"):
        return jsonify({"error": "Insufficient admin privileges"}), 403
        
    try:
        campaign_oid = ObjectId(campaign_id)
    except:
        return jsonify({"error": "Invalid campaign ID"}), 400
        
    # Find the campaign first to check if it exists
    campaign = get_campaign_by_id(campaign_id)
    if not campaign:
        return jsonify({"error": "Campaign not found"}), 404
        
    # Delete the campaign
    newsletter_campaigns_collection.delete_one({"_id": campaign_oid})
    
    return jsonify({"message": "Campaign deleted successfully"}), 200
