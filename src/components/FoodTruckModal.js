import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import StarRating from './StarRating';
import dummyReviews from '../lib/dummyReviews';

const FoodTruckModal = ({ truck, isOpen, onClose }) => {
  const [reviews, setReviews] = useState([]);
  const [newRating, setNewRating] = useState(0);
  const [newReview, setNewReview] = useState('');
  const [newImage, setNewImage] = useState(null);
  const [showReviewForm, setShowReviewForm] = useState(false);
  const [selectedReview, setSelectedReview] = useState(null);

  useEffect(() => {
    if (truck) {
      const storedReviews = JSON.parse(localStorage.getItem(`reviews_${truck.id}`)) || dummyReviews[truck.id] || [];
      setReviews(storedReviews);
    }
  }, [truck]);

  if (!isOpen) return null;

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setNewImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmitRating = () => {
    if (newRating === 0 || newReview.trim() === '') {
      alert('Please provide both a rating and a review.');
      return;
    }

    const newReviewObject = {
      id: Date.now(), // Ensure unique id for each review
      rating: newRating,
      text: newReview.trim(),
      image: newImage
    };

    const updatedReviews = [newReviewObject, ...reviews];
    setReviews(updatedReviews);
    localStorage.setItem(`reviews_${truck.id}`, JSON.stringify(updatedReviews));
    setNewRating(0);
    setNewReview('');
    setNewImage(null);
    setShowReviewForm(false);
  };

  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  const handleReviewClick = (review) => {
    setSelectedReview(review);
  };

  const handleDeleteReview = () => {
    if (selectedReview) {
      const updatedReviews = reviews.filter(review => review.id !== selectedReview.id);
      setReviews(updatedReviews);
      localStorage.setItem(`reviews_${truck.id}`, JSON.stringify(updatedReviews));
      setSelectedReview(null);
    }
  };

  const handleCloseReviewDetail = (e) => {
    if (e.target === e.currentTarget) {
      setSelectedReview(null);
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
          
          {truck.imageurl && (
            <div className="relative w-full h-64 mb-4">
              <Image 
                src={truck.imageurl}
                alt={truck.name} 
                layout="fill"
                objectFit="cover"
                className="rounded-lg"
              />
            </div>
          )}
          
          <div className="mb-4">
            <StarRating rating={truck.rating} />
            <span className="ml-2 text-black">{truck.rating.toFixed(1)} ({truck.reviews} reviews)</span>
          </div>
          
          <p className="text-black mb-4">{truck.description}</p>
          
          <h3 className="text-xl font-semibold mb-2 text-black">Menu</h3>
          <ul className="list-disc pl-5 mb-4">
            {truck.menu.map((item, index) => (
              <li key={index} className="text-black">
                {item.item} - ${item.price.toFixed(2)}
              </li>
            ))}
          </ul>
          
          <h3 className="text-xl font-semibold mb-2 text-black">Reviews</h3>
          <div className="space-y-4 mb-6">
            {reviews.map((review) => (
              <div key={review.id} className="border-b pb-2 cursor-pointer" onClick={() => handleReviewClick(review)}>
                <StarRating rating={review.rating} />
                <p className="mt-1 text-black">{review.text}</p>
                {review.image && (
                  <Image
                    src={review.image}
                    alt="Review image"
                    width={200}
                    height={200}
                    className="mt-2 rounded"
                  />
                )}
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
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="w-full p-2 border rounded text-black"
                />
                {newImage && (
                  <Image
                    src={newImage}
                    alt="Review image preview"
                    width={200}
                    height={200}
                    className="mt-2 rounded"
                  />
                )}
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

      {selectedReview && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-60" onClick={handleCloseReviewDetail}>
          <div className="bg-white rounded-lg p-6 max-w-md w-full relative" onClick={e => e.stopPropagation()}>
            <button 
              onClick={() => setSelectedReview(null)} 
              className="absolute top-2 right-2 text-xl text-black hover:text-gray-700"
            >
              &times;
            </button>
            <h3 className="text-xl font-semibold mb-2 text-black">Review Details</h3>
            <StarRating rating={selectedReview.rating} />
            <p className="mt-2 text-black">{selectedReview.text}</p>
            {selectedReview.image && (
              <Image
                src={selectedReview.image}
                alt="Review image"
                width={200}
                height={200}
                className="mt-2 rounded"
              />
            )}
            <button 
              onClick={handleDeleteReview}
              className="mt-4 bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
            >
              Delete Review
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default FoodTruckModal;