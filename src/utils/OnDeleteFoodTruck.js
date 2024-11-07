import { deleteFoodTruck } from '../lib/foodTruckData';

export const onDeleteFoodTruck = (truckId) => {
  console.log('Attempting to delete truck with ID:', truckId);
  
  if (window.confirm('Are you sure you want to delete this food truck?')) {
    deleteFoodTruck(truckId);
    console.log('Food truck deleted successfully');
    return true;
  }
  
  console.log('Food truck deletion cancelled');
  return false;
};