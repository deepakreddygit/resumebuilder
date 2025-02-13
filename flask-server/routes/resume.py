from flask import Blueprint, request, jsonify
from flask_cors import CORS
from db import users_collection
from bson import ObjectId
import uuid  # To generate unique resume IDs

resume_bp = Blueprint("resume", __name__)
CORS(resume_bp, origins="http://localhost:3000")

# Save a resume (Now supports multiple resumes per user)
@resume_bp.route("/resume/save/<user_id>", methods=["POST"])
def save_resume(user_id):
    data = request.json
    resume_id = str(uuid.uuid4())[:8]  # Generate a short unique ID for the resume

    new_resume = {
        "resume_id": resume_id,
        "name": data.get("name", ""),
        "email": data.get("email", ""),
        "phone": data.get("phone", ""),
        "summary": data.get("summary", ""),
        "experience": data.get("experience", []),
        "education": data.get("education", []),
        "skills": data.get("skills", []),
        "certifications": data.get("certifications", []),  # ✅ NEW FIELD
        "projects": data.get("projects", []),  # ✅ NEW FIELD
        "languages": data.get("languages", [])  # ✅ NEW FIELD
    }

    # Update the user document by pushing new resumes to the array
    users_collection.update_one(
        {"_id": ObjectId(user_id)},
        {"$push": {"resumes": new_resume}},  # Add new resume to array
        upsert=True
    )

    print(f"[SERVER] Resume saved successfully for user: {user_id} with Resume ID: {resume_id}")
    return jsonify({"message": "Resume saved successfully!", "resume_id": resume_id}), 200

# Fetch all resumes for a user
@resume_bp.route("/resume/all/<user_id>", methods=["GET"])
def get_all_resumes(user_id):
    user = users_collection.find_one({"_id": ObjectId(user_id)}, {"resumes": 1, "_id": 0})
    if not user or "resumes" not in user:
        return jsonify({"message": "No resumes found"}), 404

    return jsonify(user["resumes"]), 200

# Fetch a single resume by ID (for editing)
@resume_bp.route("/resume/<resume_id>", methods=["GET"])
def get_resume(resume_id):
    """ Fetch a specific resume by ID """
    user = users_collection.find_one({"resumes.resume_id": resume_id}, {"resumes.$": 1})
    
    if not user:
        return jsonify({"error": "Resume not found!"}), 404

    return jsonify(user["resumes"][0]), 200

# Update a resume
@resume_bp.route('/resume/update/<resume_id>', methods=['PUT'])
def update_resume(resume_id):
    """ Update the resume details in MongoDB """
    data = request.json
    print(f"[SERVER] Updating Resume ID: {resume_id}")

    try:
        # Find user with resume
        user = users_collection.find_one({"resumes.resume_id": resume_id})

        if not user:
            return jsonify({"error": "Resume not found!"}), 404

        # Update resume in array
        users_collection.update_one(
            {"_id": user["_id"], "resumes.resume_id": resume_id},
            {"$set": {
                "resumes.$.name": data.get("name"),
                "resumes.$.phone": data.get("phone"),
                "resumes.$.summary": data.get("summary"),
                "resumes.$.email": data.get("email"),
                "resumes.$.experience": data.get("experience", []),
                "resumes.$.education": data.get("education", []),
                "resumes.$.skills": data.get("skills", []),
                "resumes.$.certifications": data.get("certifications", []),  # ✅ NEW FIELD
                "resumes.$.projects": data.get("projects", []),  # ✅ NEW FIELD
                "resumes.$.languages": data.get("languages", [])  # ✅ NEW FIELD
            }}
        )

        return jsonify({"message": "Resume updated successfully!"}), 200

    except Exception as e:
        print(f"[ERROR] {str(e)}")
        return jsonify({"error": "Failed to update resume!"}), 500
    

# DELETE Resume by ID
@resume_bp.route('/resume/delete/<resume_id>', methods=['DELETE'])
def delete_resume(resume_id):
    """ Delete a resume by resume_id """
    print(f"[SERVER] Deleting Resume ID: {resume_id}")

    try:
        # Find the user who has this resume
        user = users_collection.find_one({"resumes.resume_id": resume_id})
        
        if not user:
            return jsonify({"error": "Resume not found!"}), 404

        # Remove the resume from the resumes array
        users_collection.update_one(
            {"_id": user["_id"]},
            {"$pull": {"resumes": {"resume_id": resume_id}}}
        )

        return jsonify({"message": "Resume deleted successfully!"}), 200

    except Exception as e:
        print(f"[ERROR] {str(e)}")
        return jsonify({"error": "Failed to delete resume!"}), 500   