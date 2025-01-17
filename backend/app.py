#ProxyAuthRequired/backend/app.py

from flask import Flask
from flask_socketio import SocketIO
from dotenv import load_dotenv
from flask_cors import CORS
from flask_session import Session
from pymongo import MongoClient
import redis
import os
import logging
from flask import request, jsonify
from routes.xploit_routes import xploit_bp  
from routes.scenario_routes import scenario_bp 
from routes.analogy_routes import analogy_bp
from routes.subscribe_routes import subscribe_bp
from routes.unsubscribe_routes import unsubscribe_bp
from routes.admin_newsletter_routes import admin_newsletter_bp
from database.models import create_user
from routes.grc_routes import grc_bp
from routes.log_routes import log_bp
from routes.celery_routes import celery_bp
from routes.status_routes import status_bp





load_dotenv()
OPENAI_API_KEY = os.getenv("OPENAI_API_KEY")


mongo_uri = os.getenv("MONGO_URI")


client = MongoClient(mongo_uri)


db = client.get_database()


    

logging.basicConfig(
    level=logging.DEBUG,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
)
logger = logging.getLogger(__name__)


app = Flask(__name__)
CORS(app)
socketio = SocketIO(app, cors_allowed_origins="*")

app.config['SECRET_KEY'] = os.getenv('SECRET_KEY')



app.config['SESSION_TYPE'] = 'redis'
app.config['SESSION_PERMANENT'] = False
app.config['SESSION_USE_SIGNER'] = True
app.config['SESSION_KEY_PREFIX'] = 'flask_session:'
app.config['SESSION_REDIS'] = redis.StrictRedis(host='redis', port=6379, db=0)


REDIS_PASSWORD = os.getenv('REDIS_PASSWORD')  

app.config['SESSION_REDIS'] = redis.StrictRedis(
    host='redis',
    port=6379,
    db=0,
    password=REDIS_PASSWORD
)

Session(app)


@app.route('/health')
def home():
    return 'Backend is running'


@app.before_request
def log_request_info():
    logger.info(f"Handling request to {request.path} with method {request.method}")
    
    
app.register_blueprint(xploit_bp, url_prefix='/payload')
app.register_blueprint(scenario_bp, url_prefix='/scenario')
app.register_blueprint(analogy_bp, url_prefix='/analogy')
app.register_blueprint(grc_bp, url_prefix='/grc')
app.register_blueprint(log_bp, url_prefix='/logs')
app.register_blueprint(subscribe_bp, url_prefix='/subscribe')
app.register_blueprint(unsubscribe_bp, url_prefix='/unsubscribe')
app.register_blueprint(admin_newsletter_bp, url_prefix='/admin/newsletter')
app.register_blueprint(celery_bp, url_prefix='/celery')
app.register_blueprint(status_bp, url_prefix='/status')

@app.route('/register', methods=['POST'])
def register():
    user_data = request.json
    try:
        user_id = create_user(user_data)
        return jsonify({"message": "User created", "user_id": str(user_id)}), 201
    except ValueError as ve:
        return jsonify({"error": str(ve)}), 400
    except Exception as e:
        logger.error(f"Error registering user: {e}")
        return jsonify({"error": "Internal server error"}), 500
    
ADMIN_API_KEY = os.getenv("ADMIN_API_KEY")   
    
@app.route('/authenticate', methods=['POST'])
def authenticate():
    data = request.get_json()
    if not data or 'password' not in data:
        return jsonify({"error": "Password is required."}), 400
    
    password = data['password']
    
    if password == ADMIN_API_KEY:
        
        return jsonify({"message": "Authentication successful."}), 200
    else:
        return jsonify({"error": "Invalid password."}), 401


@socketio.on('connect')
def handle_connect():
    logger.info('Client connected')
    socketio.emit('message', {'data': 'Connected to server'})

if __name__ == '__main__':
    socketio.run(app, host='0.0.0.0', port=5000, debug=True, allow_unsafe_werkzeug=True)

