import os
from pymongo import MongoClient
from dotenv import load_dotenv

load_dotenv()

mongo_uri = os.getenv("MONGO_URI")
client = MongoClient(mongo_uri)
db = client.get_database()

users_collection = db["users"]

def create_user(user_data):
    email = user_data.get("email")
    if not email:
        raise ValueError("Email is required")
    existing = users_collection.find_one({"email": email})
    if existing:
        return existing["_id"]
    result = users_collection.insert_one({"email": email})
    return result.inserted_id

def get_all_subscribers():
    return list(users_collection.find({}))

def find_subscription(email):
    return users_collection.find_one({"email": email})

def add_subscription(email):
    existing = find_subscription(email)
    if not existing:
        users_collection.insert_one({"email": email})

def remove_subscription(email):
    users_collection.delete_one({"email": email})

