import { ArrowUpRight } from 'lucide-react';
import React from 'react';
import userImg from "../assets/user.jpg"
import UpdatePassword from './UpdatePassword';

const DashboardCard = () => {
  const username = localStorage.getItem('username');
  const role = localStorage.getItem('role');
  const mobileNumber = localStorage.getItem('mobileNumber');
  const userId = localStorage.getItem('userId');
  const gender = localStorage.getItem('gender');

  return (
    <div className="flex max-w-2xl flex-col items-center rounded-md border border-black md:flex-row p-4">
      <div className="h-full w-full md:h-[200px] md:w-[300px]">
        
        <img
          src={userImg}
          alt="Profile"
          className="  rounded-md object-cover h-[160px] w-[200px]"
        />
      </div>
      <div>
        <div className="p-4">
          <h1 className="inline-flex items-center text-lg font-semibold">
            User Info <ArrowUpRight className="ml-2 h-4 w-4" />
          </h1>
          <div className="grid grid-cols-2 gap-2 mt-3">
            <div>
              <p className="text-sm font-semibold mb-1 text-black">Username:</p>
              <p className="text-black">{username}</p>
            </div>
            <div>
              <p className="text-sm font-semibold mb-1 text-black">Role:</p>
              <p className="text-black">{role}</p>
            </div>
            <div>
              <p className="text-sm font-semibold mb-1 text-black">Mobile Number:</p>
              <p className="text-black">{mobileNumber}</p>
            </div>
            <div>
              <p className="text-sm font-semibold mb-1 text-black">User ID: </p>
              <p className="text-black">EMP0{userId}</p>
            </div>
            <div>
              <p className="text-sm font-semibold mb-1 text-black">Gender:</p>
              <p className="text-black">{gender}</p>
            </div>
          </div>
          
        </div>
        <UpdatePassword/>
      </div>
    </div>
  );
};

export default DashboardCard;
