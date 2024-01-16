import { ArrowLeft } from 'lucide-react';
import React from 'react';
import { Link } from 'react-router-dom';
import { Navbar } from '../Components/Navbar';

export function UnAuthenticated() {
  return (
    <>
    <Navbar/>
    <div className="py-10">
      <div className="text-center mt-[200px]">
        <p className="text-base font-semibold text-black">401</p>
        <h1 className="mt-2 text-3xl font-bold tracking-tight text-black sm:text-5xl">
          Unauthorized Access
        </h1>
        <p className="mt-4 text-base leading-7 text-gray-600">
          Sorry, you need to be logged in to access this page.
        </p>
        <div className="mt-4 flex items-center justify-center gap-x-3">
        <Link
                  to='/signIn'
                  className="rounded-md bg-black px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-black/80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
                >
                  Log In
                </Link>
                <Link
                  to="/SignUp"
                  className="rounded-md border border-black px-3 py-2 ml-5 text-sm font-semibold text-black shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
                >
                  Sign Up
                </Link>
        </div>
      </div>
    </div>
    </>
  );
}

export default UnAuthenticated;
