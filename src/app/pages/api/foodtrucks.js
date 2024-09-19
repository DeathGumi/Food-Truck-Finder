import { getAllFoodTrucks, getFoodTruckById, searchFoodTrucks } from '../../lib/foodTruckData';

export default function handler(req, res) {
  const { method, query } = req;

  switch (method) {
    case 'GET':
      if (query.id) {
        const truck = getFoodTruckById(query.id);
        if (truck) {
          res.status(200).json(truck);
        } else {
          res.status(404).json({ message: 'Food truck not found' });
        }
      } else if (query.search) {
        const results = searchFoodTrucks(query.search);
        res.status(200).json(results);
      } else {
        const trucks = getAllFoodTrucks();
        res.status(200).json(trucks);
      }
      break;
    default:
      res.setHeader('Allow', ['GET']);
      res.status(405).end(`Method ${method} Not Allowed`);
  }
}