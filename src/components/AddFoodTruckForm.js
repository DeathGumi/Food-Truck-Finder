import React, { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';

const AddFoodTruckForm = ({ onAddFoodTruck }) => {
  const [formData, setFormData] = useState({
    name: '',
    cuisine: '',
    description: '',
    priceRange: '$',
    hours: '',
    location: { lat: '', lng: '' },
    imageurl: '',
    menu: [{ item: '', price: '' }]
  });   

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleLocationChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      location: {
        ...prevState.location,
        [name]: value
      }
    }));
  };

  const handleMenuChange = (index, e) => {
    const { name, value } = e.target;
    const updatedMenu = [...formData.menu];
    updatedMenu[index] = { ...updatedMenu[index], [name]: value };
    setFormData(prevState => ({
      ...prevState,
      menu: updatedMenu
    }));
  };

  const addMenuItem = () => {
    setFormData(prevState => ({
      ...prevState,
      menu: [...prevState.menu, { item: '', price: '' }]
    }));
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData(prevState => ({
          ...prevState,
          imageurl: reader.result
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newFoodTruck = {
      ...formData,
      id: uuidv4(),
      rating: 0,
      reviews: 0,
      menu: formData.menu.filter(item => item.item && item.price)
    };
    onAddFoodTruck(newFoodTruck);
    setFormData({
      name: '',
      cuisine: '',
      description: '',
      priceRange: '$',
      hours: '',
      location: { lat: '', lng: '' },
      imageurl: '',
      menu: [{ item: '', price: '' }]
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700">Name</label>
        <input type="text" name="name" value={formData.name} onChange={handleChange} required className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50" />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700">Cuisine</label>
        <input type="text" name="cuisine" value={formData.cuisine} onChange={handleChange} required className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50" />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700">Description</label>
        <textarea name="description" value={formData.description} onChange={handleChange} required className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50" />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700">Price Range</label>
        <select name="priceRange" value={formData.priceRange} onChange={handleChange} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50">
          <option value="$">$</option>
          <option value="$$">$$</option>
          <option value="$$$">$$$</option>
        </select>
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700">Hours</label>
        <input type="text" name="hours" value={formData.hours} onChange={handleChange} required className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50" />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700">Location</label>
        <input type="text" name="lat" value={formData.location.lat} onChange={handleLocationChange} placeholder="Latitude" required className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50" />
        <input type="text" name="lng" value={formData.location.lng} onChange={handleLocationChange} placeholder="Longitude" required className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50" />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700">Image</label>
        <input type="file" onChange={handleImageUpload} accept="image/*" className="mt-1 block w-full" />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700">Menu Items</label>
        {formData.menu.map((item, index) => (
          <div key={index} className="flex space-x-2 mt-2">
            <input type="text" name="item" value={item.item} onChange={(e) => handleMenuChange(index, e)} placeholder="Item name" className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50" />
            <input type="number" name="price" value={item.price} onChange={(e) => handleMenuChange(index, e)} placeholder="Price" className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50" />
          </div>
        ))}
        <button type="button" onClick={addMenuItem} className="mt-2 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600">Add Menu Item</button>
      </div>
      <button type="submit" className="w-full px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600">Add Food Truck</button>
    </form>
  );
};

export default AddFoodTruckForm;