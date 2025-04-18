from flask import request, jsonify, g
from bson.objectid import ObjectId
from models.test import get_user_by_id, update_user_fields
import time
from .blueprint import api_bp

@api_bp.route('/subscription/cancel', methods=['POST'])
def cancel_subscription():
    # Redirect to the proper subscription cancellation endpoint
    data = request.json or {}
    user_id = data.get("userId")
    
    if not user_id:
        return jsonify({"error": "userId is required"}), 400
    
    try:
        user = get_user_by_id(user_id)
        if not user:
            return jsonify({"error": "User not found"}), 404
        
        subscription_id = user.get('stripeSubscriptionId')
        if not subscription_id:
            return jsonify({"error": "No active subscription found"}), 400
        
        # Import the needed modules
        import stripe
        import os
        from datetime import datetime
        
        # Get Stripe API key
        stripe.api_key = os.getenv('STRIPE_SECRET_KEY')
        
        # Cancel the subscription in Stripe
        stripe.Subscription.modify(
            subscription_id,
            cancel_at_period_end=True
        )
        
        # Update user's subscription status
        update_user_fields(user_id, {
            'subscriptionStatus': 'canceling'
        })
        
        # Log this subscription event
        from mongodb.database import db
        db.subscriptionEvents.insert_one({
            'userId': ObjectId(user_id),
            'event': 'subscription_cancellation_requested',
            'platform': 'stripe',
            'stripeSubscriptionId': subscription_id,
            'timestamp': datetime.utcnow()
        })
        
        return jsonify({'success': True, 'message': 'Subscription will be canceled at the end of the billing period'})
    
    except Exception as e:
        return jsonify({"error": f"Error canceling subscription: {str(e)}"}), 500
