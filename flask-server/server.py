# from flask import Flask, request, jsonify
# from flask_cors import CORS
# from pymongo import MongoClient
# import bcrypt

# app = Flask(__name__)
# CORS(app)  # Enable CORS for all routes

# # MongoDB connection
# client = MongoClient("mongodb+srv://deepakreddy1635:EHikudm9963sIrXR@cluster0.c4kfz.mongodb.net/?retryWrites=true&w=majority")
# db = client.get_database('resume_builder_db')
# users_collection = db.users

# # Home route
# @app.route('/')
# def home():
#     return "Welcome to the Home Page!"

# # Signup route
# @app.route('/signup', methods=['POST'])
# def signup():
#     data = request.json
#     name = data.get('name')
#     email = data.get('email')
#     password = data.get('password')
#     confirm_password = data.get('confirmPassword')

#     # Validate input
#     if not name or not email or not password or not confirm_password:
#         return jsonify({"message": "All fields are required!"}), 400

#     # Check if passwords match
#     if password != confirm_password:
#         return jsonify({"message": "Passwords do not match!"}), 400

#     # Check if user already exists
#     existing_user = users_collection.find_one({"email": email})
#     if existing_user:
#         return jsonify({"message": "User already exists!"}), 400

#     # Hash the password before storing it
#     hashed_pw = bcrypt.hashpw(password.encode('utf-8'), bcrypt.gensalt())

#     # Create new user in the database
#     users_collection.insert_one({
#         "name": name,
#         "email": email,
#         "password": hashed_pw
#     })

#     print(f"[SERVER] New user signed up: {name} ({email})")  # Log in console
#     return jsonify({"message": "User created successfully!"}), 201

# # Login route
# @app.route('/login', methods=['POST'])
# def login():
#     data = request.json
#     email = data.get('email')
#     password = data.get('password')

#     # Validate input
#     if not email or not password:
#         print("[SERVER] Login attempt with missing email or password")
#         return jsonify({"error": "Email and password are required!"}), 400

#     # Check if the user exists
#     user = users_collection.find_one({"email": email})

#     if not user:
#         print(f"[SERVER] Login failed: User with email '{email}' does not exist")
#         return jsonify({"error": "You don't have an account. Please sign up!"}), 400

#     # Validate password
#     if not bcrypt.checkpw(password.encode('utf-8'), user['password']):
#         print(f"[SERVER] Login failed: Incorrect password for user '{email}'")
#         return jsonify({"error": "Invalid credentials!"}), 400

#     # Successful login
#     print(f"[SERVER] Login successful for user: {user['name']} ({email})")  # Log user exists in console
#     return jsonify({
#         "message": "Login successful!",
#         "user": user['name']  # Send user's name in the response
#     }), 200

# # Members route (optional, for testing purposes)
# @app.route('/members', methods=['GET'])
# def members():
#     return jsonify({"members": ["Member1", "Member2", "Member3"]})

# # Run the app
# if __name__ == '__main__':
#     app.run(debug=True)


from flask import Flask
from flask_cors import CORS
from routes.auth import auth_bp
from routes.home import home_bp


app = Flask(__name__)
CORS(app)

# Register blueprints
app.register_blueprint(auth_bp)
app.register_blueprint(home_bp)


if __name__ == '__main__':
    app.run(debug=True)
