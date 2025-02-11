from flask import Blueprint, request, jsonify
from flask_cors import CORS  
from db import users_collection
import bcrypt
from bson import ObjectId  

auth_bp = Blueprint('auth', __name__)


CORS(auth_bp, origins="http://localhost:3000")

# Home route
@auth_bp.route('/')
def home():
    return "Welcome to the Home Page!"

# Signup route
@auth_bp.route('/signup', methods=['POST'])
def signup():
    data = request.json
    name = data.get('name')
    email = data.get('email')
    password = data.get('password')
    confirm_password = data.get('confirmPassword')

    # Validate input
    if not name or not email or not password or not confirm_password:
        return jsonify({"message": "All fields are required!"}), 400

    # Check if passwords match
    if password != confirm_password:
        return jsonify({"message": "Passwords do not match!"}), 400

    # Check if user already exists
    existing_user = users_collection.find_one({"email": email})
    if existing_user:
        return jsonify({"message": "User already exists!"}), 400

    # Hash the password before storing it
    hashed_pw = bcrypt.hashpw(password.encode('utf-8'), bcrypt.gensalt())

    # Create new user in the database
    users_collection.insert_one({
        "name": name,
        "email": email,
        "password": hashed_pw
    })

    print(f"[SERVER] New user signed up: {name} ({email})")  
    return jsonify({"message": "User created successfully!"}), 201

# Login route
@auth_bp.route('/login', methods=['POST'])
def login():
    data = request.json
    email = data.get('email')
    password = data.get('password')

    # Validate input
    if not email or not password:
        print("[SERVER] Login attempt with missing email or password")
        return jsonify({"error": "Email and password are required!"}), 400

    # Check if the user exists
    user = users_collection.find_one({"email": email})

    if not user:
        print(f"[SERVER] Login failed: User with email '{email}' does not exist")
        return jsonify({"error": "User not found! Please sign up."}), 400

    # Validate password
    if not bcrypt.checkpw(password.encode('utf-8'), user['password']):
        print(f"[SERVER] Login failed: Incorrect password for user '{email}'")
        return jsonify({"error": "Invalid credentials!"}), 400

    print(f"[SERVER] Login successful for user: {user['name']} ({email})")  
    return jsonify({
        "message": "Login successful!",
        "user": user['name'], 
        "user_id": str(user['_id']),  
    }), 200

# Get user by ID route 
@auth_bp.route('/user/<user_id>', methods=['GET'])
def get_user_by_id(user_id):

    user = users_collection.find_one({"_id": ObjectId(user_id)})
    
    if not user:
        return jsonify({"error": "User not found!"}), 404

    return jsonify({
        "user_id": str(user['_id']),
        "name": user['name'],
        "email": user['email']
    }), 200
