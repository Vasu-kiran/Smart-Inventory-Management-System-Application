import React, { useState, useEffect } from 'react';
import apiService from '../layers/Service';
import { Navbar2 } from '../Components/Navbar2';
import { Link } from 'react-router-dom';
import { isLoggedIn } from '../Auth/isAuth';
import UnAuthenticated from './UnAuthenticated';


const Outwards = () => {
  const [outwards, setOutwards] = useState([]);

  const isUserLoggedIn = isLoggedIn();

  if (!isUserLoggedIn) {
    return <UnAuthenticated />;
  }

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await apiService.getOutwards();
        setOutwards(response.data);
      } catch (error) {
        console.error('Error fetching outward data:', error.message);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      <Navbar2 />
      <h1 className="text-center font-bold text-xl mt-[70px]">Outwards</h1>
      <table className="border-collapse border border-gray-800 mx-auto mt-10">
        <thead>
          <tr>
            <th className="border border-gray-800 p-2">ID</th>
            <th className="border border-gray-800 p-2">Delivered To</th>
            <th className="border border-gray-800 p-2">Purpose</th>
            <th className="border border-gray-800 p-2">Date of Delivery</th>
            <th className="border border-gray-800 p-2">Invoice No</th>
            <th className="border border-gray-800 p-2">Supply Date</th>
            <th className="border border-gray-800 p-2">Item Name</th>
            <th className="border border-gray-800 p-2">Receipt No</th>
            <th className="border border-gray-800 p-2">Bill Checked By</th>
            <th className="border border-gray-800 p-2">Bill Value</th>
          </tr>
        </thead>
        <tbody>
          {outwards.map((outward) => (
            <tr key={outward.outwardsId}>
              <td className="border border-gray-800 p-2">{outward.outwardsId}</td>
              <td className="border border-gray-800 p-2">{outward.deliveredTo}</td>
              <td className="border border-gray-800 p-2">{outward.purpose}</td>
              <td className="border border-gray-800 p-2">{outward.dateOfDelivery}</td>
              <td className="border border-gray-800 p-2">{outward.invoiceNo}</td>
              <td className="border border-gray-800 p-2">{outward.dateOfSupply}</td>
              <td className="border border-gray-800 p-2">{outward.itemName}</td>
              <td className="border border-gray-800 p-2">{outward.receiptNo}</td>
              <td className="border border-gray-800 p-2">{outward.billCheckedBy}</td>
              <td className="border border-gray-800 p-2">{outward.billValue}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="flex justify-center mt-4">
        <Link to="/Account" className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600">
          Back
        </Link>
        <Link to="/addOutward" className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600 ml-4">
          Add New Outward
        </Link>
      </div>
    </div>
  );
};

export default Outwards;
