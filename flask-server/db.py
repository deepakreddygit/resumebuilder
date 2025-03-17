# from pymongo import MongoClient
# from config import Config

# client = MongoClient(Config.MONGO_URI)
# db = client.get_database('resume_builder_db')
# users_collection = db.users

from pymongo import MongoClient
from config import Config

client = MongoClient(Config.MONGO_URI)
db = client.get_database('resume_builder_db')

# ✅ Collections
users_collection = db.users  # Stores user authentication & reviews
resumes_collection = db.resumes  # Stores user resumes separately
user_profiles_collection = db.user_profiles  # 🔹 New Collection to store common data


