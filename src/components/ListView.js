export default function ListView({ foodTrucks }) {
    return (
      <ul>
        {foodTrucks.map(truck => (
          <li key={truck.id} className="mb-2">
            <h3 className="font-bold">{truck.name}</h3>
            <p>{truck.cuisine}</p>
          </li>
        ))}
      </ul>
    );
  }