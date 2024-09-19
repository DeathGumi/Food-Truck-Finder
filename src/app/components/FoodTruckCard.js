import RatingStars from './RatingStars';

export default function FoodTruckCard({ truck }) {
  return (
    <div>
      <h3>{truck.name}</h3>
      <p>{truck.cuisine}</p>
      <p>{truck.description}</p>
      <RatingStars rating={truck.rating} />
    </div>
  );
}