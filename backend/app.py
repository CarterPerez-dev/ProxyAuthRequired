import os
import logging
import time
import pytz
import redis
import stripe  
from datetime import datetime
from flask import Flask, g, request, jsonify, current_app, send_from_directory, session
from flask_cors import CORS
from flask_session import Session
from flask_socketio import SocketIO, join_room, leave_room, emit
from pymongo import MongoClient
from dotenv import load_dotenv
import psutil
from werkzeug.middleware.proxy_fix import ProxyFix


# routes
# AI Blueprints
from routes.AI.analogy_routes import analogy_bp
from routes.AI.grc_routes import grc_bp
from routes.AI.scenario_routes import scenario_bp
from routes.AI.xploit_routes import xploit_bp

# SubscriptionAuth Blueprints
from routes.SubscriptionAuth.oauth_routes import oauth_bp, oauth
from routes.SubscriptionAuth.password_reset_routes import password_reset_bp
from routes.SubscriptionAuth.subscription_routes import subscription_bp

# Admin Blueprints
from routes.admin.admin_newsletter_routes import admin_news_bp
from routes.admin.cracked_admin import cracked_bp, api_logs

# Games Blueprints
from routes.games.cipher_routes import cipher_bp
from routes.games.incident_routes import incident_bp
from routes.games.phishing_routes import phishing_bp

# Info Blueprints
from routes.info.contact_form import contact_bp

# Main Blueprints 
from routes.main import api_bp
from routes.main.leaderboard_routes import public_leaderboard_bp
from routes.main.newsletter_routes import newsletter_bp
from routes.main.support_routes import support_bp

# Models
from models.test import create_user, get_user_by_id, update_user_fields

# Database
from mongodb.database import db



from helpers.global_rate_limiter import apply_global_rate_limiting, setup_rate_limit_headers
from middleware.subscription_check import check_subscription_middleware


load_dotenv()
# You aint gettin shii
OPENAI_API_KEY = os.getenv("OPENAI_API_KEY")
mongo_uri = os.getenv("MONGO_URI")
CRACKED_ADMIN_PASSWORD = os.getenv('CRACKED_ADMIN_PASSWORD', 'authkey')
REDIS_PASSWORD = os.getenv('REDIS_PASSWORD')
SECRET_KEY = os.getenv('SECRET_KEY', 'supersecret')
stripe.api_key = os.getenv('STRIPE_SECRET_KEY')
stripe_publishable_key = os.getenv('STRIPE_PUBLISHABLE_KEY')
stripe_price_id = os.getenv('STRIPE_PRICE_ID')
webhook_secret = os.getenv('STRIPE_WEBHOOK_SECRET')

# Setup logging
logging.basicConfig(level=logging.INFO, format='%(asctime)s - %(name)s - %(levelname)s - %(message)s')
logger = logging.getLogger(__name__)

#######################################
# Initialize Flask & Related
#######################################
app = Flask(__name__)
app.config['SECRET_KEY'] = SECRET_KEY

# Setup CORS
CORS(app, supports_credentials=True)

# Setup SocketIO
socketio = SocketIO(app, cors_allowed_origins="*", path="/api/socket.io")

# Setup Redis-based sessions. Password for my session is Password123!.....KIDDDDDING YOU AINT HACKIN SHITTTT
app.config['SESSION_TYPE'] = 'redis'
app.config['SESSION_PERMANENT'] = True
app.config['SESSION_USE_SIGNER'] = True
app.config['SESSION_KEY_PREFIX'] = 'flask_session:'
app.config['SESSION_REDIS'] = redis.StrictRedis(host='redis', port=6379, db=0, password=REDIS_PASSWORD)

Session(app)

oauth.init_app(app) 


app.wsgi_app = ProxyFix(app.wsgi_app, x_for=1, x_proto=1, x_host=1, x_port=1)


app.config['JSON_SORT_KEYS'] = False  # Better JSON performance
app.config['PROPAGATE_EXCEPTIONS'] = True
app.config['PRESERVE_CONTEXT_ON_EXCEPTION'] = False
# Make socketio accessible from other files (avoiding circular imports)
app.extensions['socketio'] = socketio

@app.route('/health')
def home():
    return 'Backend is running'

@app.before_request
def log_request_info():
    logger.info(f"Handling request to {request.path} with method {request.method}")


@app.before_request
def log_api_request():
    # Skip logging static files and certain endpoints
    if request.path.startswith('/static/') or request.path == '/health':
        return
    
    # Create a log entry
    log_entry = {
        "type": "api",
        "timestamp": datetime.utcnow().strftime("%Y-%m-%d %H:%M:%S"),
        "path": request.path,
        "method": request.method,
        "ip": request.remote_addr,
        "user_agent": request.headers.get('User-Agent', 'Unknown')
    }
    
    # Add to our log buffer
    api_logs.add(log_entry)



@app.before_request
def check_global_rate_limits():
    """Apply global rate limiting to public API endpoints"""
    return apply_global_rate_limiting()()

@app.after_request
def add_rate_limit_headers(response):
    """Add rate limit headers to responses"""
    return setup_rate_limit_headers(response)


@app.before_request
def check_user_subscription():
    return check_subscription_middleware()()


# blueprints

# AI blueprints
app.register_blueprint(xploit_bp, url_prefix='/payload')
app.register_blueprint(scenario_bp, url_prefix='/scenario')
app.register_blueprint(analogy_bp, url_prefix='/analogy')
app.register_blueprint(grc_bp, url_prefix='/grc')

# Main Blueprints
app.register_blueprint(api_bp, url_prefix='/test')

# Admin/Main
app.register_blueprint(cracked_bp, url_prefix="/cracked")
app.register_blueprint(support_bp, url_prefix="/support")
app.register_blueprint(newsletter_bp, url_prefix='/newsletter')
app.register_blueprint(admin_news_bp, url_prefix="/cracked") 

# Auth
app.register_blueprint(password_reset_bp, url_prefix='/password-reset')
app.register_blueprint(oauth_bp, url_prefix='/oauth')

# Info
app.register_blueprint(public_leaderboard_bp, url_prefix='/public-leaderboard')
app.register_blueprint(contact_bp, url_prefix='/contact-form')

# Subscription
app.register_blueprint(subscription_bp, url_prefix='/subscription')

# Games
app.register_blueprint(cipher_bp, url_prefix='/cipher')
app.register_blueprint(incident_bp, url_prefix='/incident')
app.register_blueprint(phishing_bp, url_prefix='/phishing')



# AASA
@app.route('/.well-known/apple-app-site-association')
def apple_app_site_association():
    return send_from_directory('.well-known', 'apple-app-site-association', 
                              mimetype='application/json')

@app.route('/avatars/<path:filename>')
def serve_avatars(filename):
    avatar_folder = os.path.join('frontend', 'my-react-app', 'public', 'avatars')
    return send_from_directory(avatar_folder, filename)
    
    

    

###########################
# BEFORE REQUEST
###########################
@app.before_request
def log_request_start():
    g.request_start_time = time.time()
    g.db_time_accumulator = 0.0

###########################
# AFTER REQUEST
###########################
@app.after_request
def log_request_end(response):
    try:
        duration_sec = time.time() - g.request_start_time
        db_time_sec = getattr(g, 'db_time_accumulator', 0.0)
        response_size = 0
        if not response.direct_passthrough and response.data:
            response_size = len(response.data)
        http_status = response.status_code

        # Insert into perfSamples
        doc = {
            "route": request.path,
            "method": request.method,
            "duration_sec": duration_sec,
            "db_time_sec": db_time_sec,
            "response_bytes": response_size,
            "http_status": http_status,
            # Store in UTC
            "timestamp": datetime.utcnow()
        }
        db.perfSamples.insert_one(doc)
    except Exception as e:
        logger.warning(f"Failed to insert perfSample: {e}")
    return response

########################################################################
# Socket.IO event handlers
########################################################################
@socketio.on('connect')
def handle_connect():
    app.logger.info(f"Client connected: {request.sid}")
    socketio.emit('message', {'data': 'Connected to server'})

@socketio.on('join_thread')
def handle_join_thread(data):
    thread_id = data.get("threadId")
    if not thread_id:
        return

    user_id = session.get('userId')
    if not user_id:
        alt_id = data.get("userId")
        if alt_id:
            user_id = alt_id

    join_room(str(thread_id))
    print(f"[Socket.IO] user={user_id} joined thread {thread_id}")

@socketio.on('leave_thread')
def on_leave_thread(data):
    """
    data = { "threadId": "abc123" }
    """
    thread_id = data.get('threadId')
    if thread_id:
        leave_room(thread_id)
        app.logger.info(f"Client left thread room: {thread_id}")

@socketio.on('admin_typing')
def on_admin_typing(data):
    """
    Broadcast to that thread's room that admin is typing
    """
    thread_id = data.get('threadId')
    if thread_id:
        app.logger.info(f"Admin started typing in thread room: {thread_id}")
        socketio.emit('admin_typing', {"threadId": thread_id}, room=thread_id)

@socketio.on('admin_stop_typing')
def on_admin_stop_typing(data):
    thread_id = data.get('threadId')
    if thread_id:
        app.logger.info(f"Admin stopped typing in thread room: {thread_id}")
        socketio.emit('admin_stop_typing', {"threadId": thread_id}, room=thread_id)


@socketio.on('admin_new_message')
def on_admin_new_message(data):
    thread_id = data.get('threadId')
    message = data.get('message')
    if thread_id and message:
        thread_id = str(thread_id) 
        app.logger.info(f"Admin sending message to thread room: {thread_id}")
        socketio.emit('new_message', {
            "threadId": thread_id,
            "message": message
        }, room=thread_id)

@socketio.on('user_typing')
def on_user_typing(data):
    """
    data = { "threadId": "..." }
    Let the admin see "User is typing..."
    """
    thread_id = data.get('threadId')
    if thread_id:
        app.logger.info(f"User started typing in thread room: {thread_id}")
        socketio.emit('user_typing', {"threadId": thread_id}, room=thread_id)

@socketio.on('user_stop_typing')
def on_user_stop_typing(data):
    """
    data = { "threadId": "..." }
    Let the admin see the user is no longer typing
    """
    thread_id = data.get('threadId')
    if thread_id:
        app.logger.info(f"User stopped typing in thread room: {thread_id}")
        socketio.emit('user_stop_typing', {"threadId": thread_id}, room=thread_id)

@socketio.on('join_user_room')
def handle_join_user_room(data):
    user_id = session.get('userId')

    # Fallback
    if not user_id:
        alt_id = data.get("userId")
        if alt_id:
            user_id = alt_id

    if not user_id:
        print("[Socket.IO] join_user_room failed: no userId")
        return

    room_name = f"user_{user_id}"
    join_room(room_name)
    print(f"[Socket.IO] user={user_id} joined room {room_name}")

if __name__ == '__main__':
    # For local dev
    socketio.run(app, host='0.0.0.0', port=5000, debug=True, allow_unsafe_werkzeug=True)

