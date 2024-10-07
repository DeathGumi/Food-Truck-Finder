import { deleteFoodTruck } from '../lib/foodTruckData';

export const onDeleteFoodTruck = (truckId, setFoodTrucks, setSearchResults, setSelectedTruck) => {
  console.log('Attempting to delete truck with ID:', truckId);
  
  if (window.confirm('Are you sure you want to delete this food truck?')) {
    deleteFoodTruck(truckId);
    
    setFoodTrucks(prevTrucks => {
      const updatedTrucks = prevTrucks.filter(truck => truck.id !== truckId);
      console.log('Updated trucks after deletion:', updatedTrucks);
      return updatedTrucks;
    });
    
    setSearchResults(prevResults => prevResults.filter(truck => truck.id !== truckId));
    setSelectedTruck(null);
    
    console.log('Food truck deleted successfully');
    return true;
  }
  
  console.log('Food truck deletion cancelled');
  return false;
};