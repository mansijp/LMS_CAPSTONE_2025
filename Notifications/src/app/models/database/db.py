from pymongo import MongoClient
from dotenv import load_dotenv
import os

# Load environment variables
load_dotenv(dotenv_path=os.path.join(os.path.dirname(__file__), '../../../../.env'))

# MongoDB Connection (pymongo)
MONGO_URL = os.getenv("MONGO_URL", "mongodb+srv://lmscapstonemansi:capstonemansi25@primary.ncu4vwq.mongodb.net/")
client = MongoClient(MONGO_URL)
db = client["sample_mflix"]

def get_db():
    return db

def close_db():
    client.close()
