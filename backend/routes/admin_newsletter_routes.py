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
        return jsonify({"error": "Campaign not found"}), 404

    if campaign.get("status") == "sent":
        return jsonify({"error": "Campaign already sent"}), 400

    # Send the campaign to all subscribers using SendGrid
    result = send_campaign_to_all(campaign_id)
    
    if result["success"]:
        return jsonify({
            "message": result["message"]
        }), 200
    else:
        return jsonify({
            "error": result["message"]
        }), 400
