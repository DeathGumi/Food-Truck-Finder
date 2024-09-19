import { Marker, Popup } from 'react-leaflet';
import FoodTruckCard from './FoodTruckCard';

export default function FoodTruckMarker({ truck }) {
  return (
    <Marker position={[truck.location.lat, truck.location.lng]}>
      <Popup>
        <FoodTruckCard truck={truck} />
      </Popup>
    </Marker>
  );
}