# database.py
from flask import Flask
from flask_pymongo import PyMongo
from dotenv import load_dotenv
import os

load_dotenv()

app = Flask(__name__)

# MongoDB Connection
app.config["MONGO_URI"] = os.getenv("MONGO_URI")  # e.g. "mongodb://localhost:27017/yourdb"
mongo = PyMongo(app)

# Expose the db object for collections
db = mongo.db

"""
------------------------------------------------------------------------------
 mainusers_collection
------------------------------------------------------------------------------
"""
mainusers_collection = db.mainusers

"""
------------------------------------------------------------------------------
 shop_collection
------------------------------------------------------------------------------
"""
shop_collection = db.shopItems

"""
------------------------------------------------------------------------------
 achievements_collection
------------------------------------------------------------------------------
"""
achievements_collection = db.achievements

"""
------------------------------------------------------------------------------
 tests_collection
------------------------------------------------------------------------------
"""
tests_collection = db.tests

"""
------------------------------------------------------------------------------
 testProgress_collection (Optional)
------------------------------------------------------------------------------
"""
testProgress_collection = db.testProgress

