from flask import Blueprint, request, jsonify, current_app
import re
from datetime import datetime
from utils.email_sender import email_sender  # Import your existing email_sender
from mongodb.database import db
# Email validation regex
EMAIL_REGEX = re.compile(r"[^@]+@[^@]+\.[^@]+")

# Contact form blueprint
contact_bp = Blueprint('contact', __name__)

@contact_bp.route('/submit', methods=['POST'])
def submit_contact_form():
    """
    Process contact form submissions and send email via SendGrid
    """
    data = request.json or {}
    email = data.get('email', '').strip()
    message = data.get('message', '').strip()
    
    # Input validation
    if not email:
        return jsonify({"success": False, "error": "Email is required"}), 400
    
    if not EMAIL_REGEX.match(email):
        return jsonify({"success": False, "error": "Invalid email format"}), 400
        
    if not message:
        return jsonify({"success": False, "error": "Message is required"}), 400
    
    if len(message) < 10:
        return jsonify({"success": False, "error": "Message must be at least 10 characters"}), 400
    
    formatted_message = message.replace('\n', '<br>')

    try:
        # Create HTML content for the email
        html_content = f"""
        <h2>New Contact Form Submission</h2>
        <p><strong>From:</strong> {email}</p>
        <p><strong>Time:</strong> {datetime.utcnow().strftime('%Y-%m-%d %H:%M:%S UTC')}</p>
        <hr>
        <h3>Message:</h3>
        <p>{formatted_message}</p>
        """
        
        # Send email using your existing email_sender
        success = email_sender.send_email(
            to_email='support@certgames.com',  # This will use your configured support email
            subject=f"Contact Form Submission from {email}",
            html_content=html_content,
            email_type='support'  # Using your predefined support email type
        )
        
        if success:
            # Insert the contact form submission into the database
            db.contacts.insert_one({
                "email": email,
                "message": message,
                "timestamp": datetime.utcnow()
            })

            return jsonify({
                "success": True,
                "message": "Your message has been sent successfully. We'll get back to you soon!"
            }), 200
        else:
            return jsonify({
                "success": False,
                "error": "There was an error sending your message. Please try again later."
            }), 500
    except Exception as e:
        current_app.logger.error(f"Error sending contact form email: {str(e)}")
        return jsonify({
            "success": False,
            "error": "There was an error processing your request. Please try again later."
        }), 500
