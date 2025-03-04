import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { getAllReviews, updateReview, deleteReview, getUserResumes } from "../api";  
import "bootstrap/dist/css/bootstrap.min.css";
import "../styles/Dashboard.css";
import Slider from "react-slick"; 
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Dashboard() {
  const { isAuthenticated, userName, userId } = useContext(AuthContext);
  const navigate = useNavigate();
  const [reviews, setReviews] = useState([]);
  const [resumeCount, setResumeCount] = useState(null);
  const [editingReview, setEditingReview] = useState(null);
  const [editedReviewText, setEditedReviewText] = useState("");
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedReviewId, setSelectedReviewId] = useState(null);

  useEffect(() => {
    if (!isAuthenticated) {
      window.location.href = "/login";
    }

    const fetchData = async () => {
      try {
        if (userId) {
          const resumes = await getUserResumes(userId);
          setResumeCount(resumes.length);

          let res = await getAllReviews();
          console.log("✅ Raw Reviews Received:", res);

          const uniqueReviews = Array.from(new Set(res.map(r => r.review_id)))
            .map(id => res.find(r => r.review_id === id));

          console.log("✅ Unique Reviews:", uniqueReviews);
          setReviews(uniqueReviews.reverse());
        }
      } catch (error) {
        console.error("❌ Error fetching data:", error);
        setReviews([]);
        setResumeCount(0);
      }
    };

    fetchData();
  }, [userId, isAuthenticated]);

  // ✅ Handle Edit Review
  const handleEditReview = (review) => {
    setEditingReview(review.review_id);
    setEditedReviewText(review.reviewText);
  };

  // ✅ Handle Save Review
  const handleSaveReview = async () => {
    if (!editedReviewText.trim()) {
      toast.error("Review text cannot be empty!", { position: "top-right" });
      return;
    }

    const result = await updateReview(editingReview, userId, editedReviewText);

    if (result.message) {
      setReviews((prevReviews) =>
        prevReviews.map((rev) =>
          rev.review_id === editingReview ? { ...rev, reviewText: editedReviewText } : rev
        )
      );

      setEditingReview(null);
      setEditedReviewText("");
      toast.success("Review updated successfully!", { position: "top-right" });
    } else {
      toast.error("Failed to update review.", { position: "top-right" });
    }
  };

  // ✅ Open Delete Modal
  const handleOpenDeleteModal = (reviewId) => {
    setSelectedReviewId(reviewId);
    setShowDeleteModal(true);
  };

  // ✅ Close Delete Modal
  const handleCloseDeleteModal = () => {
    setShowDeleteModal(false);
    setSelectedReviewId(null);
  };

  // ✅ Confirm Delete Review
  const handleConfirmDelete = async () => {
    if (!selectedReviewId) return;

    const result = await deleteReview(selectedReviewId, userId);

    if (result.message) {
      setReviews((prevReviews) => prevReviews.filter((rev) => rev.review_id !== selectedReviewId));
      toast.success("Review deleted successfully!", { position: "top-right" });
    } else {
      toast.error("Failed to delete review.", { position: "top-right" });
    }

    setShowDeleteModal(false);
    setSelectedReviewId(null);
  };

  // ✅ Slider Settings
  const sliderSettings = {
    dots: reviews.length > 1,
    infinite: reviews.length > 2,
    speed: 800,
    slidesToShow: Math.min(reviews.length, 3),
    slidesToScroll: 1,
    autoplay: reviews.length > 2,
    autoplaySpeed: 4000,
    centerMode: reviews.length > 1,
    centerPadding: reviews.length > 1 ? "20px" : "0px",
    responsive: [
      {
        breakpoint: 1024,
        settings: { slidesToShow: Math.min(reviews.length, 2), slidesToScroll: 1, centerMode: true }
      },
      {
        breakpoint: 768,
        settings: { slidesToShow: 1, slidesToScroll: 1, centerMode: false }
      }
    ]
  };

  return (
    <div className="dashboard-container">
      {/* ✅ Toast Container */}
      <ToastContainer />

      <h1 className="text-center mt-5">Welcome, {userName}!</h1>
      <p className="sub-text text-center">Create an ATS-friendly resume in just minutes.</p>

      <div className="resume-count text-center mb-4">
        {resumeCount === null ? (
          <h3>Loading resumes...</h3>
        ) : (
          <h3>
            You have <span className="resume-number">{resumeCount}</span> saved resumes
          </h3>
        )}
      </div>

      <div className="text-center mb-5">
        <button className="btn btn-primary create-btn" onClick={() => navigate("/templates")}>
          Create New Resume
        </button>
      </div>

      <h2 className="text-center mt-5 mb-4">User Reviews</h2>

      {reviews.length > 0 ? (
        <div className="slider-container">
          <Slider key={reviews.length} {...sliderSettings}>
            {reviews.map((review) => (
              <div key={review.review_id} className="review-card">
                <p>
                  <strong>{review.username}</strong> reviewed Template {review.templateNumber}
                </p>

                {editingReview === review.review_id ? (
  <div className="review-edit-container">
    <textarea
      value={editedReviewText}
      onChange={(e) => setEditedReviewText(e.target.value)}
    />
    <div className="review-buttons">
      <button className="save-btn" onClick={handleSaveReview}>Save</button>
      <button className="cancel-btn" onClick={() => setEditingReview(null)}>Cancel</button>
    </div>
  </div>
) : (
  <>
    <p className="review-text">{review.reviewText}</p>
    {review.user_id === userId && (
      <div className="review-actions">
        <button className="edit-btn" onClick={() => handleEditReview(review)}>Edit</button>
        <button className="delete-btn" onClick={() => handleOpenDeleteModal(review.review_id)}>Delete</button>
      </div>
    )}
  </>
)}

              </div>
            ))}
          </Slider>
        </div>
      ) : (
        <p className="text-center">No reviews available.</p>
      )}

      {/* ✅ Delete Confirmation Modal */}
      {showDeleteModal && (
        <div className="delete-modal-overlay">
          <div className="delete-modal-content">
            <h4>Confirm Deletion</h4>
            <p>Are you sure you want to delete this review?</p>
            <div className="delete-modal-actions">
              <button className="btn btn-secondary" onClick={handleCloseDeleteModal}>
                Cancel
              </button>
              <button className="btn btn-danger ms-2" onClick={handleConfirmDelete}>
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Dashboard;
