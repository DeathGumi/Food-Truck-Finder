import React, { useState } from 'react';

const StarRating = ({ rating, onRatingChange, editable = false, highlightOnHover = false }) => {
  const [hoverRating, setHoverRating] = useState(0);

  const fullStars = Math.floor(rating);
  const hasHalfStar = rating % 1 >= 0.5;
  const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);

  const handleStarClick = (selectedRating) => {
    if (editable && onRatingChange) {
      onRatingChange(selectedRating);
    }
  };

  const handleStarHover = (hoveredRating) => {
    if (highlightOnHover) {
      setHoverRating(hoveredRating);
    }
  };

  const handleMouseLeave = () => {
    if (highlightOnHover) {
      setHoverRating(0);
    }
  };

  const renderStar = (index) => {
    const isActive = (hoverRating || rating) >= index;
    const starClass = `w-4 h-4 ${isActive ? 'text-yellow-400' : 'text-gray-300'} ${editable ? 'cursor-pointer' : ''}`;

    return (
      <svg
        key={`star-${index}`}
        className={starClass}
        fill="currentColor"
        viewBox="0 0 20 20"
        onClick={() => handleStarClick(index)}
        onMouseEnter={() => handleStarHover(index)}
      >
        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
      </svg>
    );
  };

  return (
    <div className="flex items-center" onMouseLeave={handleMouseLeave}>
      {[...Array(fullStars)].map((_, i) => renderStar(i + 1))}
      {hasHalfStar && (
        <svg className="w-4 h-4 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      )}
      {[...Array(emptyStars)].map((_, i) => renderStar(fullStars + (hasHalfStar ? 1 : 0) + i + 1))}
      <span className="ml-1 text-white text-sm">{rating.toFixed(1)}</span>
    </div>
  );
};

export default StarRating;