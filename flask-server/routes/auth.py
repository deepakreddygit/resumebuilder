from flask import Blueprint, request, jsonify
from db import users_collection
import bcrypt

auth_bp = Blueprint('auth', __name__)

# @auth_bp.route('/signup', methods=['POST'])
# def signup():
#     data = request.json
#     name = data.get('name')
#     email = data.get('email')
#     password = data.get('password')
#     confirm_password = data.get('confirmPassword')

#     if not name or not email or not password or not confirm_password:
#         return jsonify({"message": "All fields are required!"}), 400

#     if password != confirm_password:
#         return jsonify({"message": "Passwords do not match!"}), 400

#     if users_collection.find_one({"email": email}):
#         return jsonify({"message": "User already exists!"}), 400

#     hashed_pw = bcrypt.hashpw(password.encode('utf-8'), bcrypt.gensalt())

#     users_collection.insert_one({"name": name, "email": email, "password": hashed_pw})

#     print(f"[SERVER] New user signed up: {name} ({email})")
#     return jsonify({"message": "User created successfully!"}), 201

# @auth_bp.route('/login', methods=['POST'])
# def login():
#     data = request.json
#     email = data.get('email')
#     password = data.get('password')

#     if not email or not password:
#         return jsonify({"error": "Email and password are required!"}), 400

#     user = users_collection.find_one({"email": email})

#     if not user or not bcrypt.checkpw(password.encode('utf-8'), user['password']):
#         return jsonify({"error": "Invalid credentials!"}), 400

#     print(f"[SERVER] Login successful for user: {user['name']} ({email})")
#     return jsonify({"message": "Login successful!", "user": user['name']}), 200


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

    print(f"[SERVER] New user signed up: {name} ({email})")  # Log in console
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
        return jsonify({"error": "You don't have an account. Please sign up!"}), 400

    # Validate password
    if not bcrypt.checkpw(password.encode('utf-8'), user['password']):
        print(f"[SERVER] Login failed: Incorrect password for user '{email}'")
        return jsonify({"error": "Invalid credentials!"}), 400

    # Successful login
    print(f"[SERVER] Login successful for user: {user['name']} ({email})")  # Log user exists in console
    return jsonify({
        "message": "Login successful!",
        "user": user['name']  # Send user's name in the response
    }), 200