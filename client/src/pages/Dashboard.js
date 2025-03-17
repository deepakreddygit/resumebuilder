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
  const [loadingReviews, setLoadingReviews] = useState(true);  // ✅ Added loading state for reviews
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
      } finally {
        setLoadingReviews(false); // ✅ Stop loading once data is fetched
      }
    };

    fetchData();
  }, [userId, isAuthenticated]);

  // Handle Edit Review
  const handleEditReview = (review) => {
    setEditingReview(review.review_id);
    setEditedReviewText(review.reviewText);
  };

  // Handle Save Review
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

  // Open Delete Modal
  const handleOpenDeleteModal = (reviewId) => {
    setSelectedReviewId(reviewId);
    setShowDeleteModal(true);
  };

  // Close Delete Modal
  const handleCloseDeleteModal = () => {
    setShowDeleteModal(false);
    setSelectedReviewId(null);
  };

  // Confirm Delete
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

  // ✅ Review Slider Settings
  const sliderSettings = {
    dots: reviews.length > 1,
    infinite: reviews.length > 2,
    speed: 800,
    slidesToShow: Math.min(reviews.length, 3),
    slidesToScroll: 1,
    autoplay: reviews.length > 2,
    autoplaySpeed: 2000,
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
    <ToastContainer />

    <div className="content-wrapper">
  
      <div className="left-content">

  <div className="buttons-group">
  <button
  className="btn primary-btn"
  onClick={() => navigate("/templates")}
  style={{
    backgroundColor: "#2f5bea",
    color: "#ffffff",
    border: "none",
    padding: "12px 24px",
    borderRadius: "50px",
    fontSize: "16px",
    fontWeight: "bold",
    boxShadow: "0 4px 14px rgba(47,91,234,0.4)",
    cursor: "pointer",
  }}
>
  Create new resume
</button>

  </div>
</div>






    </div>
      {/* ✅ Reviews Section */}
      <h2 className="text-center mt-5 mb-4" style={{ fontWeight: 600 }}>User Reviews</h2>


      {/* ✅ Show "Loading reviews..." text while fetching */}
      {loadingReviews ? (
        <p className="text-center">Loading reviews...</p>
      ) : reviews.length > 0 ? (
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
  <button
    style={{
      background: "linear-gradient(135deg, #007bff, #0056b3)",
      color: "white",
      border: "none",
      padding: "8px 16px",
      borderRadius: "5px",
      fontSize: "14px",
      cursor: "pointer",
      transition: "all 0.3s ease",
      boxShadow: "2px 2px 5px rgba(0, 0, 0, 0.2)",
      fontWeight: "600",
      marginRight: "8px"
    }}
    onClick={handleSaveReview}
  >
    Save
  </button>

  <button
    style={{
      background: "linear-gradient(135deg, #e0e0e0, #bdbdbd)",
      color: "#333",
      border: "none",
      padding: "8px 16px",
      borderRadius: "5px",
      fontSize: "14px",
      cursor: "pointer",
      transition: "all 0.3s ease",
      boxShadow: "2px 2px 5px rgba(0, 0, 0, 0.2)",
      fontWeight: "600"
    }}
    onClick={() => setEditingReview(null)}
  >
    Cancel
  </button>
</div>

                  </div>
                ) : (
                  <>
                    <p className="review-text">{review.reviewText}</p>
                    {review.user_id === userId && (
                    <div className="review-actions">
                    <button
                      style={{
                        background: "linear-gradient(135deg, #444, #222)",
                        color: "white",
                        border: "none",
                        padding: "8px 12px",
                        borderRadius: "5px",
                        fontSize: "14px",
                        marginRight: "8px",
                        cursor: "pointer",
                        transition: "all 0.3s ease",
                        boxShadow: "2px 2px 5px rgba(0, 0, 0, 0.2)"
                      }}
                      onClick={() => handleEditReview(review)}
                    >
                      Edit
                    </button>
                  
                    <button
                      style={{
                        background: "linear-gradient(135deg, #d9534f, #b52b27)",
                        color: "white",
                        border: "none",
                        padding: "8px 12px",
                        borderRadius: "5px",
                        fontSize: "14px",
                        cursor: "pointer",
                        transition: "all 0.3s ease",
                        boxShadow: "2px 2px 5px rgba(0, 0, 0, 0.2)"
                      }}
                      onClick={() => handleOpenDeleteModal(review.review_id)}
                    >
                      Delete
                    </button>
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


    </div>
  );
}

export default Dashboard;






