

import React, { useState, useEffect } from 'react';
import apiService from '../layers/Service';
import { Navbar2 } from '../Components/Navbar2';
import { Link, useNavigate } from 'react-router-dom';
import { isLoggedIn } from '../Auth/isAuth';
import UnAuthenticated from './UnAuthenticated';



const Godowns = () => {
  const [godowns, setGodowns] = useState([]);
  const navigate = useNavigate();
  const userRole = localStorage.getItem('role'); 

  const isUserLoggedIn = isLoggedIn();

  if (!isUserLoggedIn) {
    return <UnAuthenticated />;
  }

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await apiService.getGodowns();
        console.log(response.data);
        setGodowns(response.data);
        console.log(response.data.status);
      } catch (error) {
        console.error('Error fetching godown data:', error.message);
      }
    };

    fetchData();
  }, []);
  const handleUpdateGodown = (godownId) => {
    
    navigate(`/updateGodown/${godownId}`);
  };

  return (
    <div>
      <Navbar2 />
      <h1 className="text-center text-xl font-bold">Godowns</h1>
      <table className="border-collapse border border-gray-800 mx-auto mt-10">
        <thead>
          <tr>
            <th className="border border-gray-800 p-2">ID</th>
            <th className="border border-gray-800 p-2">Location</th>
            <th className="border border-gray-800 p-2">Capacity (Quintals)</th>
            <th className="border border-gray-800 p-2">Start Date</th>
            <th className="border border-gray-800 p-2">Godown Manager</th>
            <th className="border border-gray-800 p-2">Godown Status</th>
            
            {userRole === 'ADMIN' && (
              <th className="border border-gray-800 p-2">Actions</th>
            )}
          </tr>
        </thead>
        <tbody>
          {godowns.reverse().map((godown) => (
            <tr key={godown.godownId}>
              <td className="border border-gray-800 p-2">{godown.godownId}</td>
              <td className="border border-gray-800 p-2">{godown.location}</td>
              <td className="border border-gray-800 p-2">{godown.capacityInQuintals}</td>
              <td className="border border-gray-800 p-2">{godown.startDate.join('/')}</td>
              <td className="border border-gray-800 p-2">{godown.users && godown.users.username}</td>
              <td className="border border-gray-800 p-2">
                {godown.status !== null ? (godown.status ? 'Active' : 'Inactive') : 'N/A'}
              </td>
              {userRole === 'ADMIN' && (
                <td className="border border-gray-800 p-2">
                  <button
                    className="bg-blue-500 rounded-full px-3 py-1 ml-2"
                    onClick={() => handleUpdateGodown(godown.godownId)}
                  >
                    Update
                  </button>
                </td>
              )}
            </tr>
          ))}
        </tbody>
      </table>
      <div className="flex justify-center mt-4">
        <Link
          to="/Account"
          className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
        >
          Go Back
        </Link>
        {userRole === 'ADMIN' && (
          <Link
            to="/addGodown"
            className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600 ml-4"
          >
            Add New Godown
          </Link>
        )}
      </div>
    </div>
  );
};

export default Godowns;