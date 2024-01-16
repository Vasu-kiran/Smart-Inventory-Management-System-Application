import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import apiService from '../layers/Service';
import { Navbar2 } from '../Components/Navbar2';
import { isLoggedIn } from '../Auth/isAuth';
import UnAuthenticated from './UnAuthenticated';

const AddGodown = () => {
  const navigate = useNavigate();
  const [location, setLocation] = useState('');
  const [capacityInQuintals, setCapacityInQuintals] = useState('');
  const [startDate, setStartDate] = useState('');
  const [username, setUsername] = useState('');
  const [userSuggestions, setUserSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [uId, setUId] = useState(null);

  const [capacityError, setCapacityError] = useState('');

  const isUserLoggedIn = isLoggedIn();

  if (!isUserLoggedIn) {
    return <UnAuthenticated />;
  }

  useEffect(() => {
    const fetchUserSuggestions = async () => {
      try {
        const response = await apiService.getUserByUsername(username);
        setUserSuggestions(response.data);
      } catch (error) {
        console.error('API Request failed:', error.message);
      }
    };

    if (username.length >= 2) {
      fetchUserSuggestions();
    } else {
      setUserSuggestions([]);
    }
  }, [username]);

  const handleUsernameChange = (e) => {
    setUsername(e.target.value);
    setShowSuggestions(true);
  };

  const handleUsernameSelection = async (selectedUsername) => {
    try {
      const response = await apiService.getUserByUsername(selectedUsername);
      const selectedUserData = response.data[0];

      console.log('Selected User Data:', selectedUserData.userId);
      setSelectedUser(selectedUserData);
      setUId(selectedUserData.userId);
    } catch (error) {
      console.error('API Request failed:', error.message);
    }

    setUsername(selectedUsername);
    setShowSuggestions(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Capacity validation
    if (capacityInQuintals <= 0 || capacityInQuintals >= 1001) {
      setCapacityError('Capacity must be more than 0 and less than or equal to 1000.');
      return;
    } else {
      setCapacityError('');
    }

    const godownData = {
      location,
      capacityInQuintals: Number(capacityInQuintals),
      startDate,
      users: {
        userId: Number(uId),
      },
    };

    try {
      const response = await apiService.addGodown(godownData);

      console.log('API Response:', response.data);
      alert('Godown added successfully!');
      navigate('/godowns');
    } catch (error) {
      if (error.response && error.response.status === 400) {
        console.log( error.response.data);
        alert(error.response.data);
      } else {
        console.log('API Request failed:', error.message);
      }
      
    }
  };

  return (
    <div>
      <Navbar2 />
      <h1 className="text-center font-bold">Add New Godown</h1>
      <form onSubmit={handleSubmit} className="max-w-md mx-auto mt-5">
        <div className="mb-4">
          <label htmlFor="location" className="block text-md font-bold mb-8">
            Location:
            <input
              type="text"
              id="location"
              className="w-full border rounded py-2 px-3 mt-2 focus:outline-none focus:border-blue-500"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              placeholder="Enter location"
              required
            />
          </label>
        </div>

        <div className="mb-4">
          <label htmlFor="capacityInQuintals" className="block text-sm font-bold mb-8">
            Capacity in Quintals:
            <input
              type="number"
              id="capacityInQuintals"
              className={`w-full border rounded py-2 px-3 mt-2 focus:outline-none focus:border-blue-500 ${
                capacityError ? 'border-red-500' : ''
              }`}
              value={capacityInQuintals}
              onChange={(e) => setCapacityInQuintals(e.target.value)}
              placeholder="Enter capacity"
              required
            />
          </label>
          {capacityError && <p className="text-red-500 text-xs italic">{capacityError}</p>}
        </div>

        <div className="mb-4">
          <label htmlFor="startDate" className="block text-sm font-bold mb-8">
            Start Date:
            <input
              type="date"
              id="startDate"
              className="w-full border rounded mt-2 py-2 px-3 focus:outline-none focus:border-blue-500"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
              placeholder="Select start date"
              required
            />
          </label>
        </div>

        <div className="mb-4">
          <label htmlFor="username" className="block text-sm font-bold mb-2">
            Godown Manager
            <input
              type="text"
              id="username"
              className="w-full border rounded  mt-2 py-2 px-3 focus:outline-none focus:border-blue-500"
              value={username}
              onChange={handleUsernameChange}
              placeholder="Enter Name of Godown Manager"
              required
            />
            {showSuggestions && (
              <ul className="suggestions-list">
                {userSuggestions.map((user) => (
                  <li
                    key={user.userId}
                    onClick={() => handleUsernameSelection(user.username)}
                  >
                    {user.username}
                  </li>
                ))}
              </ul>
            )}
          </label>
        </div>

        <div>
          <button
            type="submit"
            className="bg-blue-400 hover:bg-blue-700 text-black font-bold py-2 px-4 rounded"
          >
            Add Godown
          </button>
          <Link
            to="/Account"
            type="submit"
            className="bg-blue-400 hover:bg-blue-700 text-black font-bold py-2 px-4 rounded ml-4"
          >
            Cancel
          </Link>
        </div>
      </form>
    </div>
  );
};

export default AddGodown;
