export function calculateAverageRating(reviews) {
    if (reviews.length === 0) return 0;
    const totalRating = reviews.reduce((sum, review) => sum + review.rating, 0);
    return Number((totalRating / reviews.length).toFixed(1));
  }
  
  export function updateTruckWithNewReview(truck, newReview) {
    const updatedReviews = [newReview, ...(truck.reviews || [])];
    const averageRating = calculateAverageRating(updatedReviews);
    
    return {
      ...truck,
      rating: averageRating,
      reviews: updatedReviews.length,
      reviewsData: updatedReviews 
    };
  }
  
  export function saveReviewToLocalStorage(truckId, reviews) {
    localStorage.setItem(`reviews_${truckId}`, JSON.stringify(reviews));
  }
  
  export function getReviewsFromLocalStorage(truckId) {
    const storedReviews = localStorage.getItem(`reviews_${truckId}`);
    return storedReviews ? JSON.parse(storedReviews) : [];
  }