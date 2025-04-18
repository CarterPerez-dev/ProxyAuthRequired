import functools
from flask import session, jsonify, request, redirect, current_app
from mongodb.database import db
from models.test import get_user_by_id

def subscription_required(f):
    """
    Middleware to check if the user has an active subscription.
    This middleware can be applied to routes that require an active subscription.
    """
    @functools.wraps(f)
    def decorated_function(*args, **kwargs):
        # Get the user ID from the session or request
        user_id = session.get('userId')
        
        if not user_id:
            # Check if it's in the request
            try:
                data = request.get_json(silent=True) or {}
                user_id = data.get('userId')
            except Exception:
                pass
                
        if not user_id:
            # Check query parameters
            user_id = request.args.get('userId')
            
        if not user_id:
            # No user ID, return error
            return jsonify({"error": "Authentication required", "status": "unauthenticated"}), 401
            
        # Get the user
        user = get_user_by_id(user_id)
        if not user:
            return jsonify({"error": "User not found", "status": "unauthenticated"}), 404
            
        # Check subscription status
        subscription_active = user.get('subscriptionActive', False)
        if not subscription_active:
            # Always return JSON error instead of conditionally redirecting
            return jsonify({
                "error": "Subscription required", 
                "status": "subscription_required"
            }), 403
                
        # User has an active subscription, proceed
        return f(*args, **kwargs)
        
    return decorated_function

def check_subscription_middleware():
    """
    Function to create a Flask before_request middleware
    that checks subscription status for certain routes
    """
    def check_subscription():
        # Routes that require a premium subscription
        premium_required_prefixes = [
            '/payload',  # XploitCraft
            '/scenario', # ScenarioSphere
            '/grc',      # GRC Wizard
            '/test/daily-question/answer',  # Answering daily questions
        ]
        
        # Routes for limited access (free users with usage tracking)
        limited_access_prefixes = [
            '/test/attempts',  # Practice tests (limited to 100 questions)
            '/analogy',        # AnalogHub (fully accessible to free users)
        ]
        
        # Routes that should always be accessible
        public_prefixes = [
            '/test/user',
            '/test/login',
            '/test/register',
            '/test/public-leaderboard',
            '/password-reset',
            '/oauth',
            '/.well-known',
        ]
        
        # Check if current path requires premium
        if any(request.path.startswith(prefix) for prefix in premium_required_prefixes):
            # Get the user ID from the session or request
            user_id = session.get('userId')
            
            if not user_id:
                # Check if it's in the request
                try:
                    data = request.get_json(silent=True) or {}
                    user_id = data.get('userId')
                except Exception:
                    pass
                    
            if not user_id:
                # Check query parameters
                user_id = request.args.get('userId')
                
            if not user_id:
                # No user ID, return error
                return jsonify({
                    "error": "Authentication required", 
                    "status": "unauthenticated",
                    "tier": "login_required"
                }), 401
                
            # Get the user
            user = get_user_by_id(user_id)
            if not user:
                return jsonify({
                    "error": "User not found", 
                    "status": "unauthenticated",
                    "tier": "login_required"
                }), 404
                
            # Check subscription status
            subscription_active = user.get('subscriptionActive', False)
            if not subscription_active:
                return jsonify({
                    "error": "Premium subscription required", 
                    "status": "subscription_required",
                    "tier": "premium_required",
                    "feature": "premium_only"
                }), 403
        
        # For limited access routes, we'll do specific checks in the route handlers,
        # so we don't block access here
                
    return check_subscription
