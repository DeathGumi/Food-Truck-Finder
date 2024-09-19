import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

export default function FoodTruckDetails() {
  const router = useRouter();
  const { id } = router.query;
  const [truck, setTruck] = useState(null);

  useEffect(() => {
    if (id) {
      fetch(`/api/foodtrucks?id=${id}`)
        .then(res => res.json())
        .then(data => setTruck(data))
        .catch(error => console.error('Error fetching food truck details:', error));
    }
  }, [id]);

  if (!truck) return <div>Loading...</div>;

  return (
    <div>
      <h1>{truck.name}</h1>
      <p>{truck.cuisine} - {truck.description}</p>
      <h2>Menu</h2>
      <ul>
        {truck.menu.map((item, index) => (
          <li key={index}>{item.item} - ${item.price}</li>
        ))}
      </ul>
    </div>
  );
}