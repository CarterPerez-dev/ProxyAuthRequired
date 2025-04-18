from flask import Blueprint, request, jsonify, redirect
from models.newsletter import (
    subscribe_email,
    unsubscribe_email,
    unsubscribe_by_token
)

newsletter_bp = Blueprint('newsletter_bp', __name__)  # Fixed the __name__ parameter

@newsletter_bp.route('/subscribe', methods=['POST'])
def newsletter_subscribe():
    data = request.json or {}
    email = data.get("email", "").strip()
    result = subscribe_email(email)
    return jsonify(result), (200 if result["success"] else 400)

@newsletter_bp.route('/unsubscribe', methods=['POST'])
def newsletter_unsubscribe():
    data = request.json or {}
    email = data.get("email", "").strip()
    result = unsubscribe_email(email)
    return jsonify(result), (200 if result["success"] else 400)

@newsletter_bp.route('/unsubscribe/<token>', methods=['GET'])
def newsletter_unsubscribe_token(token):
    """
    Allows one-click unsubscribe via GET.
    e.g. 
      <a href="https://certgames.com/newsletter/unsubscribe/<token>">Unsubscribe</a>
    
    You can either:
      (a) Return a JSON response 
      (b) Or return an HTML "You have unsubscribed"
      (c) Or redirect them to a 'success' page
    For this example, we'll do a simple JSON plus a 200 or 400 status.
    """
    result = unsubscribe_by_token(token)
    if result["success"]:
        # Optionally, you can redirect them to a 'Thank You' page
        # return redirect("https://yoursite.com/unsubscribe-success.html")
        # Or just return JSON
        return jsonify({"message": result["message"]}), 200
    else:
        return jsonify({"error": result["message"]}), 400
