# models/user_subscription.py

from pymongo import MongoClient
import os
from dotenv import load_dotenv
import logging

load_dotenv()

mongo_uri = os.getenv("MONGO_URI")
client = MongoClient(mongo_uri)
db = client.get_database()

users_collection = db["users"]


logging.basicConfig(
    level=logging.DEBUG,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
)
logger = logging.getLogger(__name__)

def create_user(user_data):
    """
    Create a new user in the users collection.
    :param user_data: Dictionary containing user details (e.g., {"email": "alice@example.com"})
    :return: The ID of the created or existing user
    """
    email = user_data.get("email")
    if not email:
        logger.error("Email is required to create a user.")
        raise ValueError("Email is required to create a user.")

    existing_user = users_collection.find_one({"email": email})
    if existing_user:
        logger.info(f"User with email {email} already exists with ID {existing_user['_id']}.")
        return existing_user["_id"]

    result = users_collection.insert_one({"email": email})
    logger.info(f"Created new user with email {email} and ID {result.inserted_id}.")
    return result.inserted_id

def add_subscription(email: str):
    """
    Add a user subscription if it doesn't already exist.
    :param email: User's email address
    """
    existing = users_collection.find_one({"email": email})
    if not existing:
        users_collection.insert_one({"email": email})
        logger.info(f"Added new subscription for email: {email}")
    else:
        logger.info(f"Subscription already exists for email: {email}")

def remove_subscription(email: str):
    """
    Remove a user subscription by email.
    :param email: User's email address
    """
    result = users_collection.delete_one({"email": email})
    if result.deleted_count > 0:
        logger.info(f"Removed subscription for email: {email}")
    else:
        logger.warning(f"No subscription found for email: {email}")

def find_subscription(email: str):
    """
    Find a user subscription by email.
    :param email: User's email address
    :return: The subscription document if found, else None
    """
    return users_collection.find_one({"email": email})

def get_all_subscribers():
    """
    Retrieve all user subscriptions.
    :return: List of all subscription documents
    """
    return list(users_collection.find({}))

