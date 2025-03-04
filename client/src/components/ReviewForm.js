import React, { useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { toast } from "react-toastify";
import axios from "axios";

function ReviewForm({ templateNumber, fetchReviews }) {
  const { userId } = useContext(AuthContext);
  const [reviewText, setReviewText] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!reviewText.trim()) {
      toast.error("Review cannot be empty!");
      return;
    }

    try {
      await axios.post("http://localhost:5000/review/submit", {
        user_id: userId,
        templateNumber,
        reviewText,
      });

      toast.success("Review submitted successfully!");
      setReviewText(""); 
      fetchReviews(); // Refresh reviews
    } catch (error) {
      toast.error("Failed to submit review.");
    }
  };

  return (
    <div>
      <h3>Leave a Review</h3>
      <textarea
        placeholder="Write your review here..."
        value={reviewText}
        onChange={(e) => setReviewText(e.target.value)}
      ></textarea>
      <button onClick={handleSubmit}>Submit</button>
    </div>
  );
}

export default ReviewForm;
