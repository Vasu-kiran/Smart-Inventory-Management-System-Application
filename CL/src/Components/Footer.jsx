import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-black text-white p-6 mt-16">
      <div className="container mx-auto">
        <div className="flex flex-wrap justify-between">
          <div className="w-full md:w-1/2 lg:w-1/3 mb-4 md:mb-0">
            <h2 className="text-lg font-semibold mb-4">About Us</h2>
            <p className="text-sm">
              Smart Inventory Management System is dedicated to providing efficient and intelligent solutions for inventory control and management.
            </p>
          </div>
          <div className="w-full md:w-1/2 lg:w-1/3 mb-4 md:mb-0">
            <h2 className="text-lg font-semibold mb-4">Contact Us</h2>
            <p className="text-sm">
              Email: info@smartinventory.com
              <br />
              Phone: +1 (123) 456-7890
            </p>
          </div>
          
        </div>
        <hr className="border-gray-700 my-6" />
        <p className="text-sm text-center">© 2024 Smart Inventory Management System. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
