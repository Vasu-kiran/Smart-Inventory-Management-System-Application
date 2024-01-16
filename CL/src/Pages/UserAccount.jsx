

import React from 'react';
import { Navbar2 } from '../Components/Navbar2';
import { Link } from 'react-router-dom';
import Dashboard from '../Components/Dashboard';
import { isLoggedIn } from '../Auth/isAuth';
import UnAuthenticated from './UnAuthenticated';

const AdminAccount = () => {

  const currUserRole = localStorage.getItem('role');

  const isUserLoggedIn = isLoggedIn();

  if (!isUserLoggedIn) {
    return <UnAuthenticated />;
  }
  return (
    <div className='bg-blue-200 h-screen'>
     
      <Navbar2 />

      
      <header className="bg-gray-800 text-white text-center py-4">
        <h1 className="text-3xl font-bold">{currUserRole} USER</h1>
        
      </header>

      
      <div className="container mx-auto mt-2  p-4">
        <h1 className="text-4xl font-bold mb-4 mx-auto text-center py-2">Welcome to your Account</h1>
        <div className=' ml-[650px]'> <Dashboard/></div>
        

        
        <div className="flex flex-col space-y-10 mt-[40px]">
        <Link to="/employees" className="bg-blue-500 text-white text-center px-4 py-2 rounded-md hover:bg-blue-600">
            Employees
          </Link>
          <Link to="/godowns" className="bg-blue-500 text-white text-center px-4 py-2 rounded-md hover:bg-blue-600">
            Godowns
          </Link>
          
          <Link to="/inwards" className="bg-blue-500 text-white text-center px-4 py-2 rounded-md hover:bg-blue-600">
            Inwards
          </Link>
          <Link to="/outwards" className="bg-blue-500 text-white text-center px-4 py-2 rounded-md hover:bg-blue-600">
            Outwards
          </Link>
          <Link to="/products" className="bg-blue-500 text-white text-center px-4 py-2 rounded-md hover:bg-blue-600">
           Products
          </Link>

          
        </div>
      </div>
    </div>
  );
};

export default AdminAccount;
