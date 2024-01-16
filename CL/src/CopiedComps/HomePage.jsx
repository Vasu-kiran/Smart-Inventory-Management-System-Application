
import React from 'react';
import { ChevronDown, ChevronRight } from 'lucide-react';
import { Navbar } from '../Components/Navbar';
import Footer from '../Components/Footer';
import { Link } from 'react-router-dom';
import AdminAccount from '../Pages/AdminAccount';
import { isLoggedIn } from '../Auth/isAuth';


export function HomePage() {
  const isUserLoggedIn = isLoggedIn();

  if (isUserLoggedIn) {
    
    return <AdminAccount />;
  }


  return (
    <div className="flex flex-col min-h-screen">
      
      <Navbar />
      
     
      <div className="flex-1 relative w-full">
        <div className="relative isolate z-0 bg-white px-6 pt-14 lg:px-8">
          <div className="relative mx-auto max-w-2xl py-24">
            <div className="text-center">
              <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">
                Smart Inventory Management System
              </h1>
              <p className="mt-6 text-lg leading-8 text-gray-600">
                One stop Solution for all your Inventory Management Needs
              </p>
              <div className="mt-10">
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
                  Get Started
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      
      <Footer />
    </div>
  );
}


export default HomePage;
