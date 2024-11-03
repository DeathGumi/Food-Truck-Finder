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
    addressDisplay: '',
    imageurl: '',
    menu: [{ item: '', price: '' }]
  });

  const [address, setAddress] = useState('');

  const cuisineOptions = [
    "American",
    "American Fusion",
    "Bakery",
    "Chinese",
    "Chinese-American",
    "French",
    "Fusion",
    "Italian",
    "Japanese",
    "Mediterranean",
    "Mexican",
    "Middle Eastern",
    "Vegan",
    "Vietnamese"
  ];

  const handleAddressSearch = async (address) => {
    try {
      const response = await fetch(
        `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(address)}&limit=1`
      );
      const data = await response.json();
      
      if (data && data[0]) {
        setFormData(prevState => ({
          ...prevState,
          location: {
            lat: data[0].lat,
            lng: data[0].lon
          },
          addressDisplay: data[0].display_name
        }));
      }
    } catch (error) {
      console.error('Error searching address:', error);
    }
  };

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

  const removeMenuItem = (indexToRemove) => {
    setFormData(prevState => ({
      ...prevState,
      menu: prevState.menu.filter((_, index) => index !== indexToRemove)
    }));
  };

  const handleTimeChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => {
      const newState = {
        ...prevState,
        [name]: value
      };
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
      addressDisplay: '',
      imageurl: '',
      menu: [{ item: '', price: '' }]
    });
    setAddress('');
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold mb-6 text-gray-800">Add New Food Truck</h2>
      
      <div className="space-y-6">
        {/* Basic Information Section */}
        <div className="bg-gray-50 p-4 rounded-lg">
          <h3 className="text-lg font-semibold mb-4 text-gray-700">Basic Information</h3>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Name</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Cuisine</label>
              <select
                name="cuisine"
                value={formData.cuisine}
                onChange={handleChange}
                required
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
              >
                <option value="">Select a cuisine</option>
                {cuisineOptions.map((cuisine) => (
                  <option key={cuisine} value={cuisine}>
                    {cuisine}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Description</label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                required
                rows="3"
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Price Range</label>
              <select
                name="priceRange"
                value={formData.priceRange}
                onChange={handleChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
              >
                <option value="$">$ (Under $10)</option>
                <option value="$$">$$ ($10-$20)</option>
                <option value="$$$">$$$ (Over $20)</option>
              </select>
            </div>
          </div>
        </div>

        {/* Hours Section */}
        <div className="bg-gray-50 p-4 rounded-lg">
          <h3 className="text-lg font-semibold mb-4 text-gray-700">Operating Hours</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Opening Time</label>
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
              <label className="block text-sm font-medium text-gray-700">Closing Time</label>
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

        {/* Location Section */}
        <div className="bg-gray-50 p-4 rounded-lg">
          <h3 className="text-lg font-semibold mb-4 text-gray-700">Location</h3>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Search Address</label>
              <div className="flex gap-2">
                <input
                  type="text"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  placeholder="Enter address or location name"
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                />
                <button
                  type="button"
                  onClick={() => handleAddressSearch(address)}
                  className="mt-1 px-4 py-2 bg-indigo-500 text-white rounded-md hover:bg-indigo-600 transition-colors"
                >
                  Search
                </button>
              </div>
            </div>

            {formData.addressDisplay && (
              <p className="text-sm text-gray-600">
                Found: {formData.addressDisplay}
              </p>
            )}

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Latitude</label>
                <input
                  type="text"
                  value={formData.location.lat}
                  readOnly
                  className="mt-1 block w-full rounded-md border-gray-300 bg-gray-50"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Longitude</label>
                <input
                  type="text"
                  value={formData.location.lng}
                  readOnly
                  className="mt-1 block w-full rounded-md border-gray-300 bg-gray-50"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Image Upload Section */}
        <div className="bg-gray-50 p-4 rounded-lg">
          <h3 className="text-lg font-semibold mb-4 text-gray-700">Food Truck Image</h3>
          <input
            type="file"
            onChange={handleImageUpload}
            accept="image/*"
            className="mt-1 block w-full text-sm text-gray-500
                      file:mr-4 file:py-2 file:px-4
                      file:rounded-md file:border-0
                      file:text-sm file:font-semibold
                      file:bg-indigo-50 file:text-indigo-700
                      hover:file:bg-indigo-100"
          />
        </div>

        {/* Menu Section */}
        <div className="bg-gray-50 p-4 rounded-lg">
          <h3 className="text-lg font-semibold mb-4 text-gray-700">Menu Items</h3>
          <div className="space-y-4">
            {formData.menu.map((item, index) => (
              <div key={index} className="flex space-x-4 items-center">
                <div className="flex-grow">
                  <input
                    type="text"
                    name="item"
                    value={item.item}
                    onChange={(e) => handleMenuChange(index, e)}
                    placeholder="Item name"
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                  />
                </div>
                <div className="w-32">
                  <input
                    type="number"
                    name="price"
                    value={item.price}
                    onChange={(e) => handleMenuChange(index, e)}
                    placeholder="Price"
                    step="0.01"
                    min="0"
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                  />
                </div>
                {formData.menu.length > 1 && (
                  <button
                    type="button"
                    onClick={() => removeMenuItem(index)}
                    className="text-red-500 hover:text-red-700 font-bold text-xl px-2"
                    title="Remove item"
                  >
                    ×
                  </button>
                )}
              </div>
            ))}
            <button
              type="button"
              onClick={addMenuItem}
              className="mt-2 px-4 py-2 bg-indigo-500 text-white rounded-md hover:bg-indigo-600 transition-colors flex items-center"
            >
              <span className="mr-2">+</span> Add Menu Item
            </button>
          </div>
        </div>
      </div>

      <button
        type="submit"
        className="mt-6 w-full px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 transition-colors font-semibold"
      >
        Add Food Truck
      </button>
    </form>
  );
};

export default AddFoodTruckForm;