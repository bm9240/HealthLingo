from pymongo import MongoClient
from dotenv import load_dotenv
import os

load_dotenv()  # Loads environment variables from .env

MONGO_URI = os.getenv("MONGO_URI")

client = MongoClient(MONGO_URI)
db = client["HealthLingo"]
users_collection = db["users"]
