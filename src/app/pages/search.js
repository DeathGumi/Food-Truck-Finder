import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

export default function SearchResults() {
  const router = useRouter();
  const { term } = router.query;
  const [results, setResults] = useState([]);

  useEffect(() => {
    if (term) {
      fetch(`/api/foodtrucks?search=${encodeURIComponent(term)}`)
        .then(res => res.json())
        .then(data => setResults(data))
        .catch(error => console.error('Error fetching search results:', error));
    }
  }, [term]);

  return (
    <div>
      <h1>Search Results for "{term}"</h1>
      <ul>
        {results.map(truck => (
          <li key={truck.id}>
            <h2>{truck.name}</h2>
            <p>{truck.cuisine} - {truck.description}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}