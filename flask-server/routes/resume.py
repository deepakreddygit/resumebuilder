from flask import Blueprint, request, jsonify
from flask_cors import CORS
from db import users_collection
from bson import ObjectId
import uuid  

resume_bp = Blueprint("resume", __name__)
CORS(resume_bp, origins="http://localhost:3000")

# ✅ Save a resume
@resume_bp.route("/resume/save/<user_id>", methods=["POST"])
def save_resume(user_id):
    data = request.json
    resume_id = str(uuid.uuid4())[:8]  
    role = data.get("role", "software-engineer")  

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
    }

    users_collection.update_one(
        {"_id": ObjectId(user_id)},
        {"$push": {"resumes": new_resume}},  
        upsert=True
    )

    print(f"[SERVER] Resume saved successfully for user: {user_id} with Resume ID: {resume_id}")
    return jsonify({"message": "Resume saved successfully!", "resume_id": resume_id}), 200


# ✅ Fetch all resumes for a user
@resume_bp.route("/resume/all/<user_id>", methods=["GET"])
def get_all_resumes(user_id):
    user = users_collection.find_one({"_id": ObjectId(user_id)}, {"resumes": 1, "_id": 0})
    if not user or "resumes" not in user:
        return jsonify({"message": "No resumes found"}), 404

    return jsonify(user["resumes"]), 200


# ✅ Fetch a single resume by ID (for editing)
@resume_bp.route("/resume/<resume_id>", methods=["GET"])
def get_resume(resume_id):
    user = users_collection.find_one({"resumes.resume_id": resume_id}, {"resumes.$": 1})

    if not user:
        return jsonify({"error": "Resume not found!"}), 404

    return jsonify(user["resumes"][0]), 200


# ✅ Update a resume
@resume_bp.route('/resume/update/<resume_id>', methods=['PUT'])
def update_resume(resume_id):
    data = request.json
    print(f"[SERVER] Updating Resume ID: {resume_id}")

    user = users_collection.find_one({"resumes.resume_id": resume_id})
    if not user:
        return jsonify({"error": "Resume not found!"}), 404

    update_fields = {f"resumes.$.{key}": value for key, value in data.items()}

    users_collection.update_one(
        {"_id": user["_id"], "resumes.resume_id": resume_id},
        {"$set": update_fields}
    )

    print(f"[SERVER] Resume Updated Successfully: {resume_id}")
    return jsonify({"message": "Resume updated successfully!"}), 200


# ✅ Delete a resume
@resume_bp.route('/resume/delete/<resume_id>', methods=['DELETE'])
def delete_resume(resume_id):
    print(f"[SERVER] Deleting Resume ID: {resume_id}")

    user = users_collection.find_one({"resumes.resume_id": resume_id})
    if not user:
        return jsonify({"error": "Resume not found!"}), 404

    users_collection.update_one(
        {"_id": user["_id"]},
        {"$pull": {"resumes": {"resume_id": resume_id}}}
    )

    print(f"[SERVER] Resume Deleted Successfully: {resume_id}")
    return jsonify({"message": "Resume deleted successfully!"}), 200




# ✅ Submit a review for a resume
@resume_bp.route("/review/submit", methods=["POST"])
def submit_review():
    data = request.json
    user_id = data.get("user_id")
    template_number = data.get("templateNumber")
    review_text = data.get("reviewText")

    if not user_id or not template_number or not review_text:
        return jsonify({"error": "Missing required fields"}), 400

    # Prevent duplicate reviews for the same template by the same user
    existing_review = users_collection.find_one(
        {"_id": ObjectId(user_id), "reviews.templateNumber": template_number},
        {"reviews.$": 1}
    )

    if existing_review:
        return jsonify({"error": "You have already reviewed this template!"}), 400

    review = {
        "review_id": str(uuid.uuid4())[:8],
        "user_id": user_id,
        "templateNumber": template_number,
        "reviewText": review_text
    }

    users_collection.update_one(
        {"_id": ObjectId(user_id)},
        {"$push": {"reviews": review}},
        upsert=True
    )

    print(f"[SERVER] Review saved for user {user_id} on template {template_number}")
    return jsonify({"message": "Review submitted successfully!", "review_id": review["review_id"]}), 201



# ✅ Fetch all reviews with usernames
@resume_bp.route("/reviews", methods=["GET"])
def get_all_reviews():
    try:
        users = users_collection.find({}, {"_id": 1, "name": 1, "reviews": 1})
        all_reviews = []

        for user in users:
            username = user.get("name", "Unknown User")
            user_reviews = user.get("reviews", [])

            for review in user_reviews:
                review["username"] = username  
                all_reviews.append(review)

        print(f"[SERVER] Sending {len(all_reviews)} reviews")
        return jsonify(all_reviews), 200

    except Exception as e:
        print(f"[ERROR] {str(e)}")
        return jsonify({"error": "Failed to fetch reviews"}), 500


# ✅ Edit a review (Only the user who created it can update it)
@resume_bp.route("/review/update/<review_id>", methods=["PUT"])
def update_review(review_id):
    data = request.json
    user_id = data.get("user_id")
    new_text = data.get("reviewText")

    if not user_id or not new_text:
        return jsonify({"error": "Missing required fields"}), 400

    result = users_collection.update_one(
        {"_id": ObjectId(user_id), "reviews.review_id": review_id},
        {"$set": {"reviews.$.reviewText": new_text}}
    )

    if result.modified_count == 0:
        return jsonify({"error": "Review not found or unauthorized"}), 404

    print(f"[SERVER] Review {review_id} updated by User {user_id}")
    return jsonify({"message": "Review updated successfully!"}), 200


# ✅ Delete a review (Only the user who created it can delete it)
@resume_bp.route('/review/delete/<review_id>', methods=['DELETE'])
def delete_review(review_id):
    print(f"[SERVER] Deleting Review ID: {review_id}")

    try:
        data = request.json
        user_id = data.get("user_id")

        if not user_id:
            return jsonify({"error": "User ID required"}), 400

        result = users_collection.update_one(
            {"_id": ObjectId(user_id)},
            {"$pull": {"reviews": {"review_id": review_id}}}
        )

        if result.modified_count == 0:
            return jsonify({"error": "Review not found or unauthorized"}), 404

        print(f"[SERVER] Review Deleted Successfully: {review_id}")
        return jsonify({"message": "Review deleted successfully!"}), 200

    except Exception as e:
        print(f"[ERROR] {str(e)}")
        return jsonify({"error": "Failed to delete review!"}), 500


