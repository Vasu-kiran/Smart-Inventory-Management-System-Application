

import React from 'react';
import { Link } from 'react-router-dom';
import { Navbar } from '../Components/Navbar';
import AdminAccount from '../Pages/AdminAccount';
import { isLoggedIn } from '../Auth/isAuth';


export function HomePage() {
  const isUserLoggedIn = isLoggedIn();

  if (isUserLoggedIn) {
    
    return <AdminAccount />;
  }

  
  return (
    <>
    <Navbar/>
    <div>
      
      

      
      <div className="bg-blue-500 p-10 text-white text-center">
        <h1 className="text-4xl font-bold mb-4">Smart Inventory System</h1>
        <p className="text-lg">Sign in or Sign up to access to proceed further.</p>
      </div>

      
      <div className="container mx-auto mt-[100px]  flex justify-center">
        <div className="w-[250px] p-4">
          <Link to="/signin" className="block text-center bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
            Sign In
          </Link>
        </div>
        <div className="w-[250px] p-4">
          <Link to="/signup" className="block text-center bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded">
            Sign Up
          </Link>
        </div>
      </div>

    
    </div>
    </>
  );
};

export default HomePage;
