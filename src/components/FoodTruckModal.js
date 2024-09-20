import React, { useState } from 'react';
import StarRating from './StarRating';

const FoodTruckModal = ({ truck, isOpen, onClose, onUpdateRating }) => {
  const [newRating, setNewRating] = useState(0);
  const [newReview, setNewReview] = useState('');

  if (!isOpen) return null;

  const handleSubmitRating = () => {
    onUpdateRating(truck.id, newRating, newReview);
    setNewRating(0);
    setNewReview('');
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center p-4 z-50">
      <div className="bg-white rounded-lg max-w-3xl w-full max-h-[90vh] overflow-y-auto relative">
        <button 
          onClick={onClose} 
          className="absolute top-2 right-2 text-xl text-gray-600 hover:text-gray-800"
        >
          &times;
        </button>
        <div className="p-6">
          <h2 className="text-2xl font-bold mb-4">{truck.name}</h2>
          
          <img src={truck.imageUrl} alt={truck.name} className="w-full h-64 object-cover rounded-lg mb-4"/>
          
          <div className="mb-4">
            <StarRating rating={truck.rating} />
            <span className="ml-2">{truck.rating.toFixed(1)} ({truck.reviews} reviews)</span>
          </div>
          
          <p className="text-gray-600 mb-4">{truck.description}</p>
          
          <h3 className="text-xl font-semibold mb-2">Reviews</h3>
          <div className="space-y-4 mb-6">
            {truck.reviewList?.map((review, index) => (
              <div key={index} className="border-b pb-2">
                <StarRating rating={review.rating} />
                <p className="mt-1">{review.text}</p>
              </div>
            ))}
          </div>
          
          <h3 className="text-xl font-semibold mb-2">Add Your Review</h3>
          <div className="space-y-2">
            <StarRating rating={newRating} onRatingChange={setNewRating} editable={true} />
            <textarea 
              value={newReview}
              onChange={(e) => setNewReview(e.target.value)}
              className="w-full p-2 border rounded"
              placeholder="Write your review here..."
              rows="3"
            />
            <button 
              onClick={handleSubmitRating}
              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
            >
              Submit Review
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FoodTruckModal;