import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import apiService from '../layers/Service';
import { Navbar2 } from '../Components/Navbar2';

const AddGodown = () => {
  const navigate = useNavigate();
  const [location, setLocation] = useState('');
  const [capacityInQuintals, setCapacityInQuintals] = useState('');
  const [startDate, setStartDate] = useState('');
  const [userId, setUserId] = useState('');

  const isUserLoggedIn = isLoggedIn();

  if (!isUserLoggedIn) {
    return <UnAuthenticated />;
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    const godownData = {
      location,
      capacityInQuintals: Number(capacityInQuintals),
      startDate,
      users: {
        userId: Number(userId)
      },
    };

    try {
      const response = await apiService.addGodown(godownData);

      // On successful response
      console.log('API Response:', response.data);
      alert('Godown added successfully!');
      navigate('/godowns');

    } catch (error) {
      // On failed response
      console.error('API Request failed:', error.message);
      alert('Error: Something went wrong while adding the godown.');
    }
  };

  return (
    <div>
      <Navbar2 />
      <h1 className="text-center">Add New Godown</h1>
      <form onSubmit={handleSubmit} className="max-w-md mx-auto mt-5">
        <div className="mb-4">
          <label htmlFor="location" className="block text-sm font-bold mb-2">Location:</label>
          <input
            type="text"
            id="location"
            className="w-full border rounded py-2 px-3 focus:outline-none focus:border-blue-500"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            required
          />
        </div>

        <div className="mb-4">
          <label htmlFor="capacityInQuintals" className="block text-sm font-bold mb-2">Capacity in Quintals:</label>
          <input
            type="number"
            id="capacityInQuintals"
            className="w-full border rounded py-2 px-3 focus:outline-none focus:border-blue-500"
            value={capacityInQuintals}
            onChange={(e) => setCapacityInQuintals(e.target.value)}
            required
          />
        </div>

        <div className="mb-4">
          <label htmlFor="startDate" className="block text-sm font-bold mb-2">Start Date:</label>
          <input
            type="date"
            id="startDate"
            className="w-full border rounded py-2 px-3 focus:outline-none focus:border-blue-500"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
            required
          />
        </div>

        <div className="mb-4">
          <label htmlFor="username" className="block text-sm font-bold mb-2">UserId:</label>
          <input
            type="number"
            id="userId"
            className="w-full border rounded py-2 px-3 focus:outline-none focus:border-blue-500"
            value={userId}
            onChange={(e) => setUserId(e.target.value)}
            required
          />
        </div>

        <div>
          <button type="submit" className="bg-blue-400 hover:bg-blue-700 text-black font-bold py-2 px-4 rounded">
            Add Godown
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddGodown;
