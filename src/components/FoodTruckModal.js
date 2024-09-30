import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import StarRating from './StarRating';
import dummyReviews from '../lib/dummyReviews';
import { isFoodTruckOpen } from '../utils/isFoodTruckOpen';

const FoodTruckModal = ({ truck, isOpen, onClose, onDeleteFoodTruck }) => {
  const [reviews, setReviews] = useState([]);
  const [newRating, setNewRating] = useState(0);
  const [newReview, setNewReview] = useState('');
  const [newImage, setNewImage] = useState(null);
  const [showReviewForm, setShowReviewForm] = useState(false);
  const [selectedReview, setSelectedReview] = useState(null);
  const [showMenu, setShowMenu] = useState(false);

  useEffect(() => {
    if (truck) {
      const formatDate = (dateString) => {
        const date = new Date(dateString);
        return `${(date.getMonth() + 1).toString().padStart(2, '0')}/${date.getDate().toString().padStart(2, '0')}/${date.getFullYear().toString().slice(-2)}`;
      };
  
      const storedReviews = JSON.parse(localStorage.getItem(`reviews_${truck.id}`)) || dummyReviews[truck.id] || [];
      const formattedReviews = storedReviews.map(review => ({
        ...review,
        date: formatDate(review.date)
      }));
  
      setReviews(formattedReviews);
    }
  }, [truck]);

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

    const today = new Date();
    const formattedDate = `${(today.getMonth() + 1).toString().padStart(2, '0')}/${today.getDate().toString().padStart(2, '0')}/${today.getFullYear().toString().slice(-2)}`;

    const newReviewObject = {
      rating: newRating,
      text: newReview.trim(),
      image: newImage,
      date: formattedDate
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
      const updatedReviews = reviews.filter(review => review !== selectedReview);
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

  const handleDeleteFoodTruck = () => {
    if (window.confirm('Are you sure you want to delete this food truck?')) {
      onDeleteFoodTruck(truck.id);
      onClose();
    }
  };

  const isTruckOpen = isFoodTruckOpen(truck.hours);

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center p-4 z-50" onClick={handleOverlayClick}>
      <div className="bg-white rounded-lg max-w-3xl w-full max-h-[90vh] overflow-y-auto relative" onClick={e => e.stopPropagation()}>
        <button 
          onClick={onClose} 
          className="absolute top-2 right-2 text-xl text-white hover:text-gray-300 z-10"
        >
          &times;
        </button>
        <div className="relative">
          {truck.imageurl && (
            <div className="relative w-full h-64">
              <Image 
                src={truck.imageurl}
                alt={truck.name} 
                layout="fill"
                objectFit="cover"
                className="rounded-t-lg"
              />
              <div className="absolute inset-0 bg-black bg-opacity-50 rounded-t-lg"></div>
              <div className="absolute inset-0 p-6 text-white flex flex-col justify-between">
                <div>
                  <h2 className="text-3xl font-bold mb-2">{truck.name}</h2>
                  <div className="flex items-center mb-2">
                    <StarRating rating={truck.rating} size="xl" />
                    <span className="ml-2 text-lg"> ({truck.reviews} reviews)</span>
                  </div>
                  <p className="text-lg text-gray-300 mb-2">{truck.description}</p>
                </div>
                <div className="flex items-center space-x-2">
                  <span className={`text-lg font-semibold ${isTruckOpen ? 'text-green-400' : 'text-red-400'}`}>
                    {isTruckOpen ? 'Open' : 'Closed'}
                  </span>
                  <span className="text-lg">•</span>
                  <p className="text-lg">{truck.hours}</p>
                </div>
              </div>
            </div>
          )}
        </div>
        
        <div className="p-4 bg-gray-100 flex space-x-4">
          <button 
            onClick={() => setShowReviewForm(true)}
            className="flex-1 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          >
            Write a review
          </button>
          <button 
            onClick={() => setShowMenu(!showMenu)}
            className="flex-1 bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
          >
            {showMenu ? 'Hide menu' : 'View menu'}
          </button>
        </div>

        <div className="p-6">
          {showMenu && (
            <>
              <h3 className="text-xl font-semibold mb-2 text-black">Menu</h3>
              <ul className="list-disc pl-5 mb-4">
                {truck.menu.map((item, index) => (
                  <li key={index} className="text-black">
                    {item.item} - ${typeof item.price === 'number' ? item.price.toFixed(2) : parseFloat(item.price).toFixed(2)}
                  </li>
                ))}
              </ul>
            </>
          )}
          
          <h3 className="text-xl font-semibold mb-2 text-black">Reviews</h3>
          <div className="space-y-4 mb-6">
            {reviews.map((review, index) => (
              <div 
                key={index} 
                className="border border-gray-200 rounded-lg p-4 transition-all duration-300 hover:shadow-xl hover:scale-105 cursor-pointer bg-gray-50"
                onClick={() => handleReviewClick(review)}
              >
                <div className="flex justify-between items-center">
                  <StarRating rating={review.rating} />
                  <span className="text-sm text-gray-500">{review.date}</span>
                </div>
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

          <div className="mt-6 flex justify-end">
            <button 
              onClick={handleDeleteFoodTruck}
              className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition duration-300"
            >
              Delete Food Truck
            </button>
          </div>
        </div>
      </div>

      {showReviewForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-60">
          <div className="bg-white rounded-lg p-6 max-w-md w-full">
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
              <button 
                onClick={() => setShowReviewForm(false)}
                className="ml-2 bg-gray-300 text-black px-4 py-2 rounded hover:bg-gray-400"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

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
            <div className="flex justify-between items-center">
              <StarRating rating={selectedReview.rating} />
              <span className="text-sm text-gray-500">{selectedReview.date}</span>
            </div>
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