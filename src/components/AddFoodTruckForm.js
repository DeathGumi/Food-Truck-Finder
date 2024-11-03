import React, { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';

const AddFoodTruckForm = ({ onAddFoodTruck }) => {
  const [formData, setFormData] = useState({
    name: '',
    cuisine: '',
    description: '',
    priceRange: '$',
    hours: '11:00 AM - 9:00 PM',
    openHour: '11',
    openMinute: '00',
    openPeriod: 'AM',
    closeHour: '9',
    closeMinute: '00',
    closePeriod: 'PM',
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

  const handleTimeChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => {
      const newState = {
        ...prevState,
        [name]: value
      };
      // Update the complete hours string
      const hours = `${newState.openHour}:${newState.openMinute} ${newState.openPeriod} - ${newState.closeHour}:${newState.closeMinute} ${newState.closePeriod}`;
      return {
        ...newState,
        hours
      };
    });
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
    const newTruck = {
      ...formData,
      menu: formData.menu.map(item => ({
        ...item,
        price: parseFloat(item.price)
      }))
    };
    onAddFoodTruck(newTruck);
    setFormData({
      name: '',
      cuisine: '',
      description: '',
      priceRange: '$',
      hours: '11:00 AM - 9:00 PM',
      openHour: '11',
      openMinute: '00',
      openPeriod: 'AM',
      closeHour: '9',
      closeMinute: '00',
      closePeriod: 'PM',
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
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-xs text-gray-500">Opening Time</label>
            <div className="flex space-x-2 items-center">
              <select 
                name="openHour"
                value={formData.openHour}
                onChange={handleTimeChange}
                className="mt-1 block w-20 rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
              >
                {[12, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11].map(hour => (
                  <option key={hour} value={hour}>{hour}</option>
                ))}
              </select>
              <span>:</span>
              <select 
                name="openMinute"
                value={formData.openMinute}
                onChange={handleTimeChange}
                className="mt-1 block w-20 rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
              >
                {['00', '15', '30', '45'].map(minute => (
                  <option key={minute} value={minute}>{minute}</option>
                ))}
              </select>
              <select 
                name="openPeriod"
                value={formData.openPeriod}
                onChange={handleTimeChange}
                className="mt-1 block w-20 rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
              >
                <option value="AM">AM</option>
                <option value="PM">PM</option>
              </select>
            </div>
          </div>
          <div>
            <label className="block text-xs text-gray-500">Closing Time</label>
            <div className="flex space-x-2 items-center">
              <select 
                name="closeHour"
                value={formData.closeHour}
                onChange={handleTimeChange}
                className="mt-1 block w-20 rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
              >
                {[12, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11].map(hour => (
                  <option key={hour} value={hour}>{hour}</option>
                ))}
              </select>
              <span>:</span>
              <select 
                name="closeMinute"
                value={formData.closeMinute}
                onChange={handleTimeChange}
                className="mt-1 block w-20 rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
              >
                {['00', '15', '30', '45'].map(minute => (
                  <option key={minute} value={minute}>{minute}</option>
                ))}
              </select>
              <select 
                name="closePeriod"
                value={formData.closePeriod}
                onChange={handleTimeChange}
                className="mt-1 block w-20 rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
              >
                <option value="AM">AM</option>
                <option value="PM">PM</option>
              </select>
            </div>
          </div>
        </div>
        <p className="text-sm text-gray-500 mt-2">Current hours: {formData.hours}</p>
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