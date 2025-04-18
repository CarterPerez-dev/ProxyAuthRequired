from flask import Blueprint, request, jsonify, current_app
from models.test import validate_password
from models.password_reset import (
    create_reset_token_by_email,
    verify_reset_token,
    reset_password_with_token,
    send_password_reset_email
)
from dotenv import load_dotenv
import os

load_dotenv()

# Create a blueprint for password reset routes
password_reset_bp = Blueprint('password_reset', __name__)

# Get the frontend URL from environment variable or use a default
FRONTEND_URL = os.getenv('FRONTEND_URL', 'https://certgames.com')

@password_reset_bp.route('/request-reset', methods=['POST'])
def request_password_reset():
    """
    Request a password reset email.
    Expects {"email": "user@example.com"} in the request body.
    """
    data = request.json
    if not data or 'email' not in data:
        return jsonify({"error": "Email is required"}), 400
    
    email = data.get('email')
    
    # Find user by email and create a token
    user_id, token = create_reset_token_by_email(email)
    
    # Even if the user doesn't exist, we'll return success for security reasons
    # This prevents user enumeration attacks
    if not user_id or not token:
        # In a real-world scenario, you might want to log this
        current_app.logger.info(f"Password reset requested for non-existent email: {email}")
        return jsonify({
            "message": "If your email is registered, you will receive a password reset link."
        }), 200
    
    # Send the password reset email
    email_sent = send_password_reset_email(email, token, FRONTEND_URL)
    
    if not email_sent:
        return jsonify({
            "error": "Failed to send password reset email. Please try again later."
        }), 500
    
    return jsonify({
        "message": "Password reset link has been sent to your email."
    }), 200

@password_reset_bp.route('/verify-token/<token>', methods=['GET'])
def verify_token(token):
    """
    Verify if a password reset token is valid.
    Returns user_id if valid, error otherwise.
    """
    user_id = verify_reset_token(token)
    
    if not user_id:
        return jsonify({
            "valid": False,
            "error": "Invalid or expired token"
        }), 400
    
    return jsonify({
        "valid": True,
        "userId": user_id
    }), 200

@password_reset_bp.route('/reset-password', methods=['POST'])
def reset_password():
    """
    Reset a password using a valid token.
    Expects {"token": "token_string", "newPassword": "new_password", "confirmPassword": "same_password"} in the request body.
    """
    data = request.json
    if not data:
        return jsonify({"error": "No data provided"}), 400
    
    token = data.get('token')
    new_password = data.get('newPassword')
    confirm_password = data.get('confirmPassword')
    
    if not token or not new_password or not confirm_password:
        return jsonify({"error": "Token, new password, and confirm password are required"}), 400
    
    if new_password != confirm_password:
        return jsonify({"error": "Passwords do not match"}), 400
    
    # Validate the new password
    user_id = verify_reset_token(token)
    if not user_id:
        return jsonify({"error": "Invalid or expired token"}), 400
    
    # Validate password
    valid, errors = validate_password(new_password)
    if not valid:
        return jsonify({"error": "Invalid password", "details": errors}), 400
    
    # Reset the password
    success, message = reset_password_with_token(token, new_password)
    
    if not success:
        return jsonify({"error": message}), 400
    
    return jsonify({"message": "Password has been reset successfully"}), 200
