from flask import Blueprint, request, jsonify
from flask_cors import CORS
from db import users_collection, resumes_collection, user_profiles_collection
from bson import ObjectId
import uuid  
import cloudinary
import cloudinary.uploader
from flask import request, jsonify
from bson import ObjectId
import os
from dotenv import load_dotenv
from datetime import datetime

resume_bp = Blueprint("resume", __name__)
CORS(resume_bp, origins="http://localhost:3000")


from flask import Blueprint, request, jsonify
from flask_cors import CORS
from db import users_collection, resumes_collection, user_profiles_collection
import uuid  

resume_bp = Blueprint("resume", __name__)
CORS(resume_bp, origins="http://localhost:3000")


load_dotenv()

cloudinary.config(
    cloud_name=os.getenv("CLOUDINARY_CLOUD_NAME"),
    api_key=os.getenv("CLOUDINARY_API_KEY"),
    api_secret=os.getenv("CLOUDINARY_API_SECRET")
)

@resume_bp.route("/user/profile/<user_id>/upload-image", methods=["POST"])
def upload_profile_image(user_id):
    if 'profileImage' not in request.files:
        return jsonify({"error": "No file provided"}), 400

    file = request.files['profileImage']
    if file.filename == '':
        return jsonify({"error": "No file selected"}), 400

    try:
        upload_result = cloudinary.uploader.upload(
            file,
            folder="resume_builder/profile_images",
            public_id=str(user_id),
            overwrite=True,
            resource_type="image"
        )

        image_url = upload_result.get("secure_url")
        if not image_url:
            raise Exception("No secure_url returned from Cloudinary")

        # If user_id is stored as ObjectId in MongoDB, uncomment ObjectId below
        user_profiles_collection.update_one(
            {"user_id": user_id},  # or {"user_id": ObjectId(user_id)}
            {"$set": {"profileImage": image_url}},
            upsert=True
        )

        print(f"[SERVER]: Successfully uploaded - URL: {image_url}")

        return jsonify({
            "message": "Image uploaded successfully",
            "profileImageUrl": image_url
        }), 200

    except Exception as e:
        print(f"[SERVER ERROR]: {e}")
        return jsonify({"error": str(e)}), 500
    

@resume_bp.route("/user/profile/<user_id>/delete-image", methods=["DELETE"])
def delete_profile_image(user_id):
    try:
        public_id = f"resume_builder/profile_images/{user_id}"

        # Delete image from Cloudinary
        cloudinary.uploader.destroy(public_id, resource_type="image")

        # Remove the image URL from MongoDB
        user_profiles_collection.update_one(
            {"user_id": user_id},  # or ObjectId(user_id), check your schema
            {"$unset": {"profileImage": ""}}
        )

        print(f"[SERVER]: Successfully deleted image for user: {user_id}")

        return jsonify({"message": "Profile image deleted successfully"}), 200

    except Exception as e:
        print(f"[SERVER ERROR]: {e}")
        return jsonify({"error": str(e)}), 500
   


# ✅ Save a resume & Store Basic User Data (If Not Exists)
@resume_bp.route("/resume/save/<user_id>", methods=["POST"])
def save_resume(user_id):
    data = request.json
    resume_id = str(uuid.uuid4())[:8]
    role = data.get("role", "software-engineer")

    # 🔹 Check if user already has basic info stored
    existing_profile = user_profiles_collection.find_one({"user_id": user_id})

    if not existing_profile:
        # 🔹 Store Basic Info in `user_profiles_collection`
        basic_info = {
            "user_id": user_id,
            "name": data.get("name", ""),
            "email": data.get("email", ""),
            "phone": data.get("phone", ""),
            "summary": data.get("summary", ""),
            "education": data.get("education", []),
            "languages": data.get("languages", [])
        }
        user_profiles_collection.insert_one(basic_info)
        print(f"[SERVER] Basic info saved for user: {user_id}")
    else:
        # 🔹 Ensure profile is updated with latest user info
        user_profiles_collection.update_one(
            {"user_id": user_id},
            {"$set": {
                "name": data.get("name", existing_profile.get("name", "")),
                "email": data.get("email", existing_profile.get("email", "")),
                "phone": data.get("phone", existing_profile.get("phone", "")),
                "summary": data.get("summary", existing_profile.get("summary", "")),
                "education": data.get("education", existing_profile.get("education", [])),
                "languages": data.get("languages", existing_profile.get("languages", []))
            }}
        )

    # 🔹 Store Resume in `resumes_collection`
    new_resume = {
        "resume_id": resume_id,
        "user_id": user_id,
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
        "lastUpdated": datetime.utcnow().isoformat() 
    }

    # ✅ Include Sales Manager Fields
    if role == "sales-manager":
        new_resume["salesStrategies"] = data.get("salesStrategies", [])
        new_resume["clientAcquisition"] = data.get("clientAcquisition", [])
        new_resume["revenueGrowth"] = data.get("revenueGrowth", [])
        new_resume["salesTools"] = data.get("salesTools", [])
        new_resume["negotiationExperience"] = data.get("negotiationExperience", [])

    # ✅ Include Marketing Manager Fields
    if role == "marketing-manager":
        new_resume["marketingStrategies"] = data.get("marketingStrategies", [])
        new_resume["socialMedia"] = data.get("socialMedia", [])

    # ✅ Include Financial Manager Fields
    if role == "financial-manager":
        new_resume["investments"] = data.get("investments", [])
        new_resume["financialTools"] = data.get("financialTools", [])
        new_resume["budgetExperience"] = data.get("budgetExperience", "")
        new_resume["leadershipExperience"] = data.get("leadershipExperience", "")

    # ✅ Include Healthcare Professional Fields
    if role == "healthcare-professional":
        new_resume["healthcareExperience"] = data.get("healthcareExperience", [])
        new_resume["clinicalSkills"] = data.get("clinicalSkills", [])
        new_resume["certificationsHealthcare"] = data.get("certificationsHealthcare", [])

    # ✅ Include Content Writer Fields
    if role == "content-writer":
        new_resume["writingSamples"] = data.get("writingSamples", [])
        new_resume["genres"] = data.get("genres", [])
        new_resume["seoExperience"] = data.get("seoExperience", "")    
    

    # ✅ Save to MongoDB
    resumes_collection.insert_one(new_resume)
    print("Saved lastUpdated:", datetime.utcnow().isoformat())


    print(f"[SERVER] Resume saved for user: {user_id} with Resume ID: {resume_id}")
    return jsonify({"message": "Resume saved successfully!", "resume_id": resume_id}), 200

@resume_bp.route("/user/profile/<user_id>", methods=["GET"])
def get_user_profile(user_id):
    try:
        # 🔹 Fetch Basic User Info
        user_profile = user_profiles_collection.find_one({"user_id": user_id}, {"_id": 0})

        if not user_profile:
            return jsonify({"error": "No user profile found"}), 404

        # 🔹 Fetch Latest Resume (may be None)
        latest_resume = resumes_collection.find_one({"user_id": user_id}, {"_id": 0})

        # ✅ Ensure fallback values to prevent .get() on None
        latest_resume = latest_resume or {}

        # ✅ Merge resume info into user_profile safely
        user_profile["name"] = latest_resume.get("name", user_profile.get("name", ""))
        user_profile["email"] = latest_resume.get("email", user_profile.get("email", ""))
        user_profile["phone"] = latest_resume.get("phone", user_profile.get("phone", ""))
        user_profile["summary"] = latest_resume.get("summary", user_profile.get("summary", ""))
        user_profile["education"] = latest_resume.get("education", user_profile.get("education", []))
        user_profile["languages"] = latest_resume.get("languages", user_profile.get("languages", []))
        user_profile["profileImage"] = user_profile.get("profileImage", "/assets/images/default_profile.jpg")

        print(f"[SERVER] Sending Profile Data: {user_profile}")
        return jsonify(user_profile), 200

    except Exception as e:
        print(f"[SERVER ERROR] get_user_profile failed: {str(e)}")
        return jsonify({"error": "Internal Server Error"}), 500



# Fetch user details for profile page
@resume_bp.route("/user/details/<user_id>", methods=["GET"])
def get_user_details(user_id):
    """ Fetch user's name and email from `users_collection`. """
    user = users_collection.find_one({"_id": ObjectId(user_id)}, {"_id": 0, "name": 1, "email": 1})

    if not user:
        return jsonify({"error": "User not found"}), 404

    print(f"[SERVER] Sending User Details: {user}")
    return jsonify(user), 200


# ✅ Fetch all resumes for a user
@resume_bp.route("/resume/all/<user_id>", methods=["GET"])
def get_all_resumes(user_id):
    resumes = list(resumes_collection.find({"user_id": user_id}, {"_id": 0}))
    if not resumes:
        return jsonify({"message": "No resumes found"}), 404

    return jsonify(resumes), 200


# ✅ Fetch a single resume by ID
@resume_bp.route("/resume/<resume_id>", methods=["GET"])
def get_resume(resume_id):
    resume = resumes_collection.find_one({"resume_id": resume_id}, {"_id": 0})
    if not resume:
        return jsonify({"error": "Resume not found!"}), 404

    return jsonify(resume), 200


# ✅ Update a resume
@resume_bp.route('/resume/update/<resume_id>', methods=['PUT'])
def update_resume(resume_id):
    data = request.json
    print(f"[SERVER] Updating Resume ID: {resume_id}")

    resume = resumes_collection.find_one({"resume_id": resume_id})
    if not resume:
        return jsonify({"error": "Resume not found!"}), 404

    resumes_collection.update_one(
        {"resume_id": resume_id},
         {"$set": {**data, "lastUpdated": datetime.utcnow().isoformat()}}
    )

    print(f"[SERVER] Resume Updated Successfully: {resume_id}")
    return jsonify({"message": "Resume updated successfully!"}), 200

# ✅ Delete a resume
@resume_bp.route('/resume/delete/<resume_id>', methods=['DELETE'])
def delete_resume(resume_id):
    print(f"[SERVER] Deleting Resume ID: {resume_id}")

    # 🔹 Find the resume before deleting to get user_id
    resume = resumes_collection.find_one({"resume_id": resume_id})

    if not resume:
        return jsonify({"error": "Resume not found!"}), 404

    user_id = resume["user_id"]

    # 🔹 Delete the resume
    result = resumes_collection.delete_one({"resume_id": resume_id})

    if result.deleted_count == 0:
        return jsonify({"error": "Resume not found!"}), 404

    print(f"[SERVER] Resume Deleted Successfully: {resume_id}")

    # 🔹 Check if the user has any other resumes left
    remaining_resumes = resumes_collection.find_one({"user_id": user_id})

    if not remaining_resumes:
        # ✅ Only clear `education` and `languages`, not name/email
        user_profiles_collection.update_one(
            {"user_id": user_id},
            {"$set": {
                "education": [],
                "languages": []
            }}
        )
        print(f"[SERVER] Cleared education & languages for user: {user_id}")

    # ✅ Fetch and return the updated profile after deletion
    updated_profile = user_profiles_collection.find_one({"user_id": user_id}, {"_id": 0})
    return jsonify({"message": "Resume deleted successfully!", "updated_profile": updated_profile}), 200





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
