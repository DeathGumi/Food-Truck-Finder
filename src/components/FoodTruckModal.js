import React, { useState, useEffect } from 'react';
import StarRating from './StarRating';
import dummyReviews from '../lib/dummyReviews';

const FoodTruckModal = ({ truck, isOpen, onClose }) => {
  const [reviews, setReviews] = useState([]);
  const [newRating, setNewRating] = useState(0);
  const [newReview, setNewReview] = useState('');
  const [showReviewForm, setShowReviewForm] = useState(false);

  useEffect(() => {
    if (truck) {
      const storedReviews = JSON.parse(localStorage.getItem(`reviews_${truck.id}`)) || dummyReviews[truck.id] || [];
      setReviews(storedReviews);
    }
  }, [truck]);

  if (!isOpen) return null;

  const handleSubmitRating = () => {
    if (newRating === 0 || newReview.trim() === '') {
      alert('Please provide both a rating and a review.');
      return;
    }

    const newReviewObject = {
      rating: newRating,
      text: newReview.trim()
    };

    const updatedReviews = [newReviewObject, ...reviews];
    setReviews(updatedReviews);
    localStorage.setItem(`reviews_${truck.id}`, JSON.stringify(updatedReviews));
    setNewRating(0);
    setNewReview('');
    setShowReviewForm(false);
  };

  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center p-4 z-50" onClick={handleOverlayClick}>
      <div className="bg-white rounded-lg max-w-3xl w-full max-h-[90vh] overflow-y-auto relative" onClick={e => e.stopPropagation()}>
        <button 
          onClick={onClose} 
          className="absolute top-2 right-2 text-xl text-black hover:text-gray-700"
        >
          &times;
        </button>
        <div className="p-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-bold text-black">{truck.name}</h2>
            <button 
              onClick={() => setShowReviewForm(true)}
              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
            >
              + Review
            </button>
          </div>
          
          <img src={truck.imageUrl} alt={truck.name} className="w-full h-64 object-cover rounded-lg mb-4"/>
          
          <div className="mb-4">
            <StarRating rating={truck.rating} />
            <span className="ml-2 text-black">{truck.rating.toFixed(1)} ({truck.reviews} reviews)</span>
          </div>
          
          <p className="text-black mb-4">{truck.description}</p>
          
          <h3 className="text-xl font-semibold mb-2 text-black">Reviews</h3>
          <div className="space-y-4 mb-6">
            {reviews.map((review, index) => (
              <div key={index} className="border-b pb-2">
                <StarRating rating={review.rating} />
                <p className="mt-1 text-black">{review.text}</p>
              </div>
            ))}
          </div>
          
          {showReviewForm && (
            <div>
              <h3 className="text-xl font-semibold mb-2 text-black">Add Your Review</h3>
              <p className="text-gray-600 mb-4">
                Note: Your review will be saved in your browser's local storage.
              </p>
              <div className="space-y-2">
                <StarRating 
                  rating={newRating} 
                  onRatingChange={setNewRating} 
                  editable={true}
                  highlightOnHover={true}
                />
                <textarea 
                  value={newReview}
                  onChange={(e) => setNewReview(e.target.value)}
                  className="w-full p-2 border rounded text-black"
                  placeholder="Write your review here..."
                  rows="3"
                />
                <button 
                  onClick={handleSubmitRating}
                  className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
                >
                  Submit Review
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default FoodTruckModal;