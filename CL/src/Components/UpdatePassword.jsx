import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import apiService from '../layers/Service';


const UpdatePassword = () => {
  const navigate = useNavigate();
  const [showForm, setShowForm] = useState(false);
  const [newPassword, setNewPassword] = useState('');
  const [userId, setUserId] = useState('');

  useEffect(() => {
    
    const storedUserId = localStorage.getItem('userId');
    if (storedUserId) {
      setUserId(storedUserId);
    } else {
      
      navigate('/login'); 
    }
  }, [navigate]);

  const handleButtonClick = () => {
    setShowForm(true);
  };

  const handleCancelClick = () => {
    setShowForm(false);
    setNewPassword('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      
      await apiService.updateUserPassword(userId, newPassword);

      
      alert('Password updated successfully!');
    
      setShowForm(false);
    } catch (error) {
     
      console.error('API Request failed:', error.message);
      alert('Error: Something went wrong while updating the password.');
    }
  };

  return (
    <div>
      {!showForm ? (
        <div className="flex justify-center mt-4">
          <button
            className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
            onClick={handleButtonClick}
          >
            Change Password
          </button>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="max-w-md mx-auto mt-5">
          <div className="mb-4">
            <label htmlFor="newPassword" className="block text-sm font-bold mb-2">
              New Password:
            </label>
            <input
              type="password"
              id="newPassword"
              className="w-full border rounded py-2 px-3 focus:outline-none focus:border-blue-500"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              required
            />
          </div>

          <div className="flex justify-center mt-4">
            <button
              type="submit"
              className="bg-blue-400 hover:bg-blue-700 text-black font-bold py-2 px-4 rounded mr-2"
            >
              Update Password
            </button>
            <button
              type="button"
              onClick={handleCancelClick}
              className="bg-red-500 text-white font-bold py-2 px-4 rounded"
            >
              Cancel
            </button>
          </div>
        </form>
      )}
    </div>
  );
};

export default UpdatePassword;
