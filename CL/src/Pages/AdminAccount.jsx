import React from 'react';
import { Navbar2 } from '../Components/Navbar2';
import { Link } from 'react-router-dom';
import Dashboard from '../Components/Dashboard';
import { isLoggedIn } from '../Auth/isAuth';
import UnAuthenticated from './UnAuthenticated';

const AdminAccount = () => {
  const currUserRole = localStorage.getItem('role');
  const isGuestUser = currUserRole === 'GUEST';
  const isUserLoggedIn = isLoggedIn();

  if (!isUserLoggedIn) {
    return <UnAuthenticated />;
  }

  return (
    <div className='bg-white h-screen'>
      <Navbar2 />

      <header className="bg-black text-white text-center py-4 flex justify-evenly items-center h-[70px]">
        
        {(currUserRole === 'ADMIN' || currUserRole === 'MANAGER') && (
          <>
          <h1 className="text-3xl ml-[700px] font-bold">{currUserRole} USER</h1>
          <Link to="/reports" className="border ml-[400px] border-black bg-blue-500 h-[50px] text-white text-center px-4 py-4 rounded-md hover:bg-blue-600 transition duration-300">
            View Report
          </Link>
          </>
        )}
      </header>

      <div className="container mx-auto mt-2 ">
        <h1 className="text-4xl font-bold mb-10 mx-auto text-center py-2 mt-[40px]">Welcome to your Account</h1>
        <div className='ml-[450px]'> <Dashboard /></div>

        <div className="grid grid-cols-2 gap-4 mt-[40px]">
          <Link to="/employees" className="border border-black bg-blue-500 text-white text-center px-4 py-4 rounded-md hover:bg-blue-600 transition duration-300">
            Employees
          </Link>
          <Link to="/godowns" className="border border-black bg-blue-500 text-white text-center px-4 py-4 rounded-md hover:bg-blue-600 transition duration-300">
            Godowns
          </Link>

          {!isGuestUser && (
            <>
              <Link to="/inwards" className="border border-black bg-blue-500 text-white text-center px-4 py-4 rounded-md hover:bg-blue-600 transition duration-300">
                Inwards
              </Link>
              <Link to="/outwards" className="border border-black bg-blue-500 text-white text-center px-4 py-4 rounded-md hover:bg-blue-600 transition duration-300">
                Outwards
              </Link>
            </>
          )}

          <Link to="/products" className="border border-black bg-blue-500 text-white text-center px-4 py-4 rounded-md hover:bg-blue-600 transition duration-300">
            Products
          </Link>
          <Link to="/returns" className="border border-black bg-blue-500 text-white text-center px-4 py-4 rounded-md hover:bg-blue-600 transition duration-300">
            Returns
          </Link>
        </div>
      </div>
    </div>
  );
};

export default AdminAccount;
