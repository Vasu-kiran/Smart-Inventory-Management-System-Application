

import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import logo from '../assets/logo.jpg';

export function Navbar2() {
  const navigate = useNavigate();

  const handleLogout = () => {
    
    localStorage.clear();

   
    navigate('/');
  };

  return (
    <div className="relative w-full bg-white">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-2 sm:px-6 lg:px-8">
        <div className="inline-flex items-center space-x-2">
          <span>
          <img
              className='w-14 h-14 p-1 border-2 border-black rounded-full border-opacity-20'
              src={logo}
              alt='logo'
            />
          </span>
          <span className="font-bold">Smart Inventory</span>
        </div>
        <div className="hidden lg:flex space-x-2">
          <button
            onClick={handleLogout}
            className="rounded-md bg-red-500 text-white px-3 py-2 text-sm font-semibold hover:bg-red-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
          >
            Log Out
          </button>
        </div>
      </div>
    </div>
  );
}
