import React from 'react';

import { Link } from 'react-router-dom';
import logo from '../assets/logo.jpg';

const menuItems = [
  {
    name: 'Home',
    href: '/',
  }
 
];

export function Navbar() {
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
        <div className="hidden lg:flex">
          <ul className="ml-12 inline-flex space-x-8">
            {menuItems.map((item) => (
              <li key={item.name}>
                <a
                  href={item.href}
                  className="inline-flex items-center text-sm font-semibold text-gray-800 hover:text-gray-900"
                >
                  {item.name}
                  
                </a>
              </li>
            ))}
          </ul>
        </div>
        <div className="hidden space-x-2 lg:block">
          <Link
            to="/signup"
            className="rounded-md bg-transparent px-3 py-2 text-sm font-semibold text-black hover:bg-black/10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
          >
            Sign Up
          </Link>
          <Link
            to="/signin"
            className="rounded-md border border-black px-3 py-2 text-sm font-semibold text-black shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
          >
            Sign In
          </Link>
        </div>
      </div>
    </div>
  );
}
