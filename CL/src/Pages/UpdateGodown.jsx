

import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import apiService from '../layers/Service';
import { Navbar2 } from '../Components/Navbar2';
import { isLoggedIn } from '../Auth/isAuth';
import UnAuthenticated from './UnAuthenticated';

const UpdateGodown = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [godown, setGodown] = useState(null);

  const isUserLoggedIn = isLoggedIn();

  if (!isUserLoggedIn) {
    return <UnAuthenticated />;
  }

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await apiService.getGodownById(id);
        setGodown(response.data);
        console.log('Godown data:', response.data);
      } catch (error) {
        console.error('Error fetching godown data:', error.message);
      }
    };

    fetchData();
  }, [id]);

  const handleFormSubmit = async (event) => {
    event.preventDefault();

    try {
      const godownData = {
        location: godown.location, // Use the initially fetched value
        capacityInQuintals: event.target.capacityInQuintals.value,
        startDate: godown.startDate,
        status:event.target.status.value
      };

      
      if (!godownData.capacityInQuintals || !godownData.startDate) {
        alert('Please fill in all the fields.');
        return;
      }

      const response = await apiService.updateGodownById(id, godownData);
      console.log('Update response:', response.data);
      alert('Godown data updated successfully');
      navigate('/godowns');
    } catch (error) {
      console.error('Error updating godown data:', error.message);
      alert('Error updating godown data');
    }
  };

  return (
    <div className="bg-gray-100 min-h-screen">
      <Navbar2 />
      <div className="max-w-2xl mx-auto p-8 bg-white shadow-lg mt-8">
        <h1 className="text-2xl font-bold mb-4">Update Godown</h1>
        {godown && (
          <form onSubmit={handleFormSubmit}>
            <div className="mb-4">
              <label className="block text-sm font-semibold mb-2">Location:</label>
              <input
                type="text"
                name="location"
                value={godown.location}
                readOnly 
                className="w-full p-2 border rounded"
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-semibold mb-2">Capacity (Quintals):</label>
              <input
                type="text"
                name="capacityInQuintals"
                defaultValue={godown.capacityInQuintals}
                className="w-full p-2 border rounded"
              />
            </div>
            
            <div className="mb-4">
              <label className="block text-sm font-semibold mb-2">Status:</label>
              <select
                name="status"
                defaultValue={godown.status}
                className="w-full p-2 border rounded"
              >
                <option value={true}>Active</option>
                <option value={false}>Inactive</option>
              </select>
            </div>

            <button
              type="submit"
              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
            >
              Update Godown
            </button>
          </form>
        )}
      </div>
    </div>
  );
};

export default UpdateGodown;