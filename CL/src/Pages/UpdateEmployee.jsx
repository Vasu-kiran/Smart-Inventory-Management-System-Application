import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import apiService from '../layers/Service';
import { Navbar2 } from '../Components/Navbar2';
import { isLoggedIn } from '../Auth/isAuth';
import UnAuthenticated from './UnAuthenticated';

const UpdateEmployee = () => {
  const { userId } = useParams();
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [userEmail, setUserEmail] = useState(null);
  const [formErrors, setFormErrors] = useState({});

  const isUserLoggedIn = isLoggedIn();

  if (!isUserLoggedIn) {
    return <UnAuthenticated />;
  }

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await apiService.getUserByUserId(userId);
        setUser(response.data);
        console.log('User data:', response.data);
        setUserEmail(response.data.email);
      } catch (error) {
        console.error('Error fetching user data:', error.message);
        alert('Error fetching user data');
      }
    };

    fetchData();
  }, [userId]);

  const validateForm = () => {
    const errors = {};

    
    if (!user.username) {
      errors.username = 'Username is required';
    }

    if (!user.role) {
      errors.role = 'Role is required';
    }

    
    if (!user.mobileNumber) {
      errors.mobileNumber = 'Mobile Number is required';
    } else if (isNaN(user.mobileNumber) || user.mobileNumber.length !== 10) {
      errors.mobileNumber = 'Mobile Number should be 10 digits';
    }

    
    if (!user.gender) {
      errors.gender = 'Gender is required';
    }

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();

    if (!validateForm()) {
      alert('Please fill in all the required fields correctly.');
      return;
    }

    try {
      
      const userData = {
        username: event.target.username.value,
        role: event.target.role.value,
        mobileNumber: event.target.mobileNumber.value,
        gender: event.target.gender.value,
        email: userEmail,
      };

      
      const response = await apiService.updateUserById(userId, userData);
      console.log('Update response:', response.data);
      alert('User data updated successfully');

      
      navigate('/employees');
    } catch (error) {
      console.error('Error updating user data:', error.message);
      alert('Error updating user data');
    }
  };

  const handleInputChange = (event) => {
    setUser({
      ...user,
      [event.target.name]: event.target.value,
    });
  };

  return (
    <div className="bg-gray-100 min-h-screen">
      <Navbar2 />
      <div className="max-w-2xl mx-auto p-8 bg-white shadow-lg mt-8">
        <h1 className="text-2xl font-bold mb-4">Update Employee</h1>
        {user && (
          <form onSubmit={handleFormSubmit}>
            <div className="mb-4">
              <label className="block text-sm font-semibold mb-2">Username:</label>
              <input
                type="text"
                name="username"
                value={user.username}
                onChange={handleInputChange}
                className="w-full p-2 border rounded"
              />
              {formErrors.username && (
                <span className="text-red-500">{formErrors.username}</span>
              )}
            </div>
            <div className="mb-4">
              <label className="block text-sm font-semibold mb-2">Role:</label>
              <select
                name="role"
                value={user.role}
                onChange={handleInputChange}
                className="w-full p-2 border rounded"
              >
                <option value="">Select Role</option>
                <option value="ADMIN">ADMIN</option>
                <option value="MANAGER">MANAGER</option>
                <option value="GUEST">GUEST</option>
              </select>
              {formErrors.role && (
                <span className="text-red-500">{formErrors.role}</span>
              )}
            </div>
            <div className="mb-4">
              <label className="block text-sm font-semibold mb-2">Mobile Number:</label>
              <input
                type="text"
                name="mobileNumber"
                value={user.mobileNumber}
                onChange={handleInputChange}
                className="w-full p-2 border rounded"
              />
              {formErrors.mobileNumber && (
                <span className="text-red-500">{formErrors.mobileNumber}</span>
              )}
            </div>
            <div className="mb-4">
              <label className="block text-sm font-semibold mb-2">Gender:</label>
              <select
                name="gender"
                value={user.gender}
                onChange={handleInputChange}
                className="w-full p-2 border rounded"
              >
                <option value="">Select Gender</option>
                <option value="MALE">MALE</option>
                <option value="FEMALE">FEMALE</option>
              </select>
              {formErrors.gender && (
                <span className="text-red-500">{formErrors.gender}</span>
              )}
            </div>
            <Link
              to="/employees"
              className="bg-blue-400 text-white px-4 py-2 rounded hover:bg-blue-600"
            >
              Go Back
            </Link>
            <button
              type="submit"
              className="bg-blue-500 ml-[50px] text-white px-4 py-2 rounded hover:bg-blue-600"
            >
              Update User
            </button>
          </form>
        )}
      </div>
    </div>
  );
};

export default UpdateEmployee;
