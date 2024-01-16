import React, { useState, useEffect } from 'react';
import apiService from '../layers/Service';
import { Navbar2 } from '../Components/Navbar2';
import { Link } from 'react-router-dom';
import { isLoggedIn } from '../Auth/isAuth';
import UnAuthenticated from './UnAuthenticated';


const Inwards = () => {
  const [inwards, setInwards] = useState([]);

  const isUserLoggedIn = isLoggedIn();

  if (!isUserLoggedIn) {
    return <UnAuthenticated />;
  }

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await apiService.getInwards();
        setInwards(response.data);
      } catch (error) {
        console.error('Error fetching inward data:', error.message);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      <Navbar2 />
      <h1 className="text-center mt-[70px] text-xl font-bold">Inwards</h1>
      <table className="border-collapse border border-gray-800 mx-auto mt-10">
        <thead>
          <tr>
            <th className="border border-gray-800 p-2">ID</th>
            <th className="border border-gray-800 p-2">Received By</th>
            <th className="border border-gray-800 p-2">Invoice No</th>
            <th className="border border-gray-800 p-2">Supply Date</th>
            <th className="border border-gray-800 p-2">Item Name</th>
            <th className="border border-gray-800 p-2">Receipt No</th>
            <th className="border border-gray-800 p-2">Bill Checked By</th>
            <th className="border border-gray-800 p-2">Supplier Name</th>
          </tr>
        </thead>
        <tbody>
          {inwards.map((inward) => (
            <tr key={inward.inwardsId}>
              <td className="border border-gray-800 p-2">{inward.inwardsId}</td>
              <td className="border border-gray-800 p-2">{inward.receivedBy}</td>
              <td className="border border-gray-800 p-2">{inward.invoiceNo}</td>
              <td className="border border-gray-800 p-2">{inward.dateOfSupply}</td>
              <td className="border border-gray-800 p-2">{inward.itemName}</td>
              <td className="border border-gray-800 p-2">{inward.receiptNo}</td>
              <td className="border border-gray-800 p-2">{inward.billCheckedBy}</td>
              <td className="border border-gray-800 p-2">{inward.nameOfTheSupplier}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="flex justify-center mt-4">
        <Link to="/Account" className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600">
          Back
        </Link>
        <Link to="/addInward" className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600 ml-4">
          Add New Inward
        </Link>
      </div>
    </div>
  );
};

export default Inwards;
