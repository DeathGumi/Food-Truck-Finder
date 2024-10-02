export function calculateAverageRating(reviews) {
    if (reviews.length === 0) return 0;
    const totalRating = reviews.reduce((sum, review) => sum + review.rating, 0);
    return Math.round((totalRating / reviews.length) * 10) / 10; 
  }
  
  export function getReviewsFromLocalStorage(truckId) {
    const storedReviews = localStorage.getItem(`reviews_${truckId}`);
    return storedReviews ? JSON.parse(storedReviews) : [];
  }
  
  export function saveReviewToLocalStorage(truckId, reviews) {
    localStorage.setItem(`reviews_${truckId}`, JSON.stringify(reviews));
  }
  
  export function initializeReviewsIfNeeded(truck, dummyReviews) {
    let existingReviews = getReviewsFromLocalStorage(truck.id);
    if (existingReviews.length === 0 && dummyReviews[truck.id]) {
      existingReviews = dummyReviews[truck.id];
      saveReviewToLocalStorage(truck.id, existingReviews);
    }
    return existingReviews;
  }
  
  export function updateTruckWithNewReview(truck, newReview) {
    const existingReviews = getReviewsFromLocalStorage(truck.id);
    const updatedReviews = [newReview, ...existingReviews];
    const averageRating = calculateAverageRating(updatedReviews);
    
    saveReviewToLocalStorage(truck.id, updatedReviews);
    
    return {
      ...truck,
      rating: averageRating,
      reviews: updatedReviews.length,
      reviewsData: updatedReviews
    };
  }