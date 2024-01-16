import React, { useState, useEffect } from 'react';
import apiService from '../layers/Service';
import { Navbar2 } from '../Components/Navbar2';
import { Link, useNavigate } from 'react-router-dom';
import { isLoggedIn } from '../Auth/isAuth';
import UnAuthenticated from './UnAuthenticated';

const Emp = () => {
  const [users, setUsers] = useState([]);
  const navigate = useNavigate();
  const userRole = localStorage.getItem('role'); 

  const isUserLoggedIn = isLoggedIn();

  if (!isUserLoggedIn) {
    return <UnAuthenticated />;
  }

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await apiService.getUsers();
        console.log(response.data);
        setUsers(response.data);
      } catch (error) {
        console.error('Error fetching user data:', error.message);
      }
    };

    fetchData();
  }, []);

  const handleDeleteUser = async (username) => {
    try {
      await apiService.deleteUserByUsername(username);
      alert(`${username} deleted successfully`);
      const response = await apiService.getUsers();
      setUsers(response.data);
    } catch (error) {
      console.error('Error deleting user:', error.message);
      alert(`${username} is Associated with a Godown`);
    }
  };

  const handleUpdateUser = (userId) => {
    navigate(`/updateEmployee/${userId}`);
  };

  return (
    <div>
      <Navbar2 />
      <h1 className="text-center font-bold text-xl">Employees</h1>
      <table className="border-collapse border border-gray-800 mx-auto mt-10">
        <thead>
          <tr>
            <th className="border border-gray-800 p-2">Employee ID</th>
            <th className="border border-gray-800 p-2">Employee Name</th>
            <th className="border border-gray-800 p-2">Role</th>
            <th className="border border-gray-800 p-2">Mobile Number</th>
            <th className="border border-gray-800 p-2">Email</th>
            <th className="border border-gray-800 p-2">Gender</th>
            {userRole === 'ADMIN' && (
              <th className="border border-gray-800 p-2">Actions</th>
            )}
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.userId}>
              <td className="border border-gray-800 p-2">{user.userId}</td>
              <td className="border border-gray-800 p-2">{user.username}</td>
              <td className="border border-gray-800 p-2">{user.role}</td>
              <td className="border border-gray-800 p-2">{user.mobileNumber}</td>
              <td className="border border-gray-800 p-2">{user.email}</td>
              <td className="border border-gray-800 p-2">{user.gender}</td>
              {userRole === 'ADMIN' && (
                <td className="border border-gray-800 p-2">
                  <button
                    className="bg-blue-500 rounded-full w-[85px] ml-2"
                    onClick={() => handleUpdateUser(user.userId)}
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
            to="/addEmployee"
            className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600 ml-4"
          >
            Add New Employee
          </Link>
        )}
      </div>
    </div>
  );
};

export default Emp;
