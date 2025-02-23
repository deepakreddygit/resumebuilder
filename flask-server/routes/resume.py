from flask import Blueprint, request, jsonify
from flask_cors import CORS
from db import users_collection
from bson import ObjectId
import uuid  

resume_bp = Blueprint("resume", __name__)
CORS(resume_bp, origins="http://localhost:3000")

# Save a resume (Includes full Financial Manager fields)
@resume_bp.route("/resume/save/<user_id>", methods=["POST"])
def save_resume(user_id):
    data = request.json
    resume_id = str(uuid.uuid4())[:8]  
    role = data.get("role", "software-engineer")  # Default to Software Engineer

    new_resume = {
        "resume_id": resume_id,
        "name": data.get("name", ""),
        "email": data.get("email", ""),
        "phone": data.get("phone", ""),
        "summary": data.get("summary", ""),
        "experience": data.get("experience", []),
        "education": data.get("education", []),
        "skills": data.get("skills", []),
        "certifications": data.get("certifications", []),
        "projects": data.get("projects", []),
        "languages": data.get("languages", []),
        "templateNumber": data.get("templateNumber", "1"),
        "role": role,
        "investments": data.get("investments", []),  
        "financialTools": data.get("financialTools", []),  
        "budgetExperience": data.get("budgetExperience", ""),  
        "leadershipExperience": data.get("leadershipExperience", ""),  
        "marketingStrategies": data.get("marketingStrategies", []),  
        "socialMedia": data.get("socialMedia", []),  
    }

    users_collection.update_one(
        {"_id": ObjectId(user_id)},
        {"$push": {"resumes": new_resume}},  
        upsert=True
    )

    print(f"[SERVER] Resume saved successfully for user: {user_id} with Resume ID: {resume_id}")
    return jsonify({"message": "Resume saved successfully!", "resume_id": resume_id}), 200


#  Fetch all resumes for a user
@resume_bp.route("/resume/all/<user_id>", methods=["GET"])
def get_all_resumes(user_id):
    user = users_collection.find_one({"_id": ObjectId(user_id)}, {"resumes": 1, "_id": 0})
    if not user or "resumes" not in user:
        return jsonify({"message": "No resumes found"}), 404

    return jsonify(user["resumes"]), 200


#  Fetch a single resume by ID (for editing)
@resume_bp.route("/resume/<resume_id>", methods=["GET"])
def get_resume(resume_id):
    user = users_collection.find_one({"resumes.resume_id": resume_id}, {"resumes.$": 1})

    if not user:
        return jsonify({"error": "Resume not found!"}), 404

    resume = user["resumes"][0]

    # Ensure required fields exist
    resume.setdefault("templateNumber", "1")
    resume.setdefault("role", "software-engineer")
    resume.setdefault("investments", [])  
    resume.setdefault("financialTools", [])  
    resume.setdefault("budgetExperience", "")  
    resume.setdefault("leadershipExperience", "")  
    resume.setdefault("marketingStrategies", [])  
    resume.setdefault("socialMedia", [])  

    return jsonify(resume), 200


# Update a resume (Handles all Financial Manager fields)
@resume_bp.route('/resume/update/<resume_id>', methods=['PUT'])
def update_resume(resume_id):
    data = request.json
    print(f"[SERVER] Updating Resume ID: {resume_id}")

    try:
        user = users_collection.find_one({"resumes.resume_id": resume_id})

        if not user:
            return jsonify({"error": "Resume not found!"}), 404

        update_fields = {
            "resumes.$.name": data.get("name"),
            "resumes.$.phone": data.get("phone"),
            "resumes.$.summary": data.get("summary"),
            "resumes.$.email": data.get("email"),
            "resumes.$.experience": data.get("experience", []),
            "resumes.$.education": data.get("education", []),
            "resumes.$.skills": data.get("skills", []),
            "resumes.$.certifications": data.get("certifications", []),
            "resumes.$.projects": data.get("projects", []),
            "resumes.$.languages": data.get("languages", []),
            "resumes.$.templateNumber": data.get("templateNumber", "1"),
            "resumes.$.role": data.get("role", "software-engineer"),
        }

        if data.get("role") == "financial-manager":
            update_fields["resumes.$.investments"] = data.get("investments", [])
            update_fields["resumes.$.financialTools"] = data.get("financialTools", [])
            update_fields["resumes.$.budgetExperience"] = data.get("budgetExperience", "")
            update_fields["resumes.$.leadershipExperience"] = data.get("leadershipExperience", "")

        elif data.get("role") == "marketing-manager":
            update_fields["resumes.$.marketingStrategies"] = data.get("marketingStrategies", [])
            update_fields["resumes.$.socialMedia"] = data.get("socialMedia", [])

        users_collection.update_one(
            {"_id": user["_id"], "resumes.resume_id": resume_id},
            {"$set": update_fields}
        )

        print(f"[SERVER] Resume Updated Successfully: {resume_id}")
        return jsonify({"message": "Resume updated successfully!"}), 200

    except Exception as e:
        print(f"[ERROR] {str(e)}")
        return jsonify({"error": "Failed to update resume!"}), 500


#  DELETE Resume by ID
@resume_bp.route('/resume/delete/<resume_id>', methods=['DELETE'])
def delete_resume(resume_id):
    print(f"[SERVER] Deleting Resume ID: {resume_id}")

    try:
        user = users_collection.find_one({"resumes.resume_id": resume_id})
        
        if not user:
            return jsonify({"error": "Resume not found!"}), 404

        users_collection.update_one(
            {"_id": user["_id"]},
            {"$pull": {"resumes": {"resume_id": resume_id}}}
        )

        print(f"[SERVER] Resume Deleted Successfully: {resume_id}")
        return jsonify({"message": "Resume deleted successfully!"}), 200

    except Exception as e:
        print(f"[ERROR] {str(e)}")
        return jsonify({"error": "Failed to delete resume!"}), 500
