import React, { useEffect, useState } from "react";
import Slider from "react-slick";
import { getAllReviews } from "../api"; 
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "../styles/ReviewSlider.css";

const ReviewsSlider = () => {
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    getAllReviews()
      .then((res) => {
        console.log("✅ Reviews received:", res);
        // Sort latest reviews first (Descending order)
        setReviews(res.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)));
      })
      .catch(() => setReviews([]));
  }, []);

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    arrows: false,
    responsive: [
      { breakpoint: 1024, settings: { slidesToShow: 2 } },
      { breakpoint: 600, settings: { slidesToShow: 1 } },
    ],
  };

  return (
    <div className="review-slider-container">
      <h2 className="review-heading">Check Our Top-Rated Reviews</h2>
      <p className="review-subheading">See what users say about our resume builder!</p>
      
      <Slider {...settings}>
        {reviews.length > 0 ? (
          reviews.map((review, index) => (
            <div key={index} className="review-card">
              <h4>{review.username}</h4>
              <p className="review-text">"{review.reviewText}"</p>
              <span className="review-date">{new Date().toDateString()}</span>
            </div>
          ))
        ) : (
          <p>No reviews yet.</p>
        )}
      </Slider>
    </div>
  );
};

export default ReviewsSlider;
