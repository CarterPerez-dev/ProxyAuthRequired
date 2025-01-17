# models/newsletter_content.py

from pymongo import MongoClient
import os
from dotenv import load_dotenv

load_dotenv()

mongo_uri = os.getenv("MONGO_URI")
client = MongoClient(mongo_uri)
db = client.get_database()

newsletter_collection = db["newsletter"] 

def get_current_newsletter_db():
    """
    Returns the single doc that stores the current newsletter content.
    """
    return newsletter_collection.find_one({})

def set_current_newsletter_db(content):
    """
    Overwrite the single doc with new content.
    """
 
    newsletter_collection.delete_many({})

    newsletter_collection.insert_one({"content": content})

