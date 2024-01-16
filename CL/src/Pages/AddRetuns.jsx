import React, { useState , useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import apiService from '../layers/Service';
import { Navbar2 } from '../Components/Navbar2';
import { Link } from 'react-router-dom';
import { isLoggedIn } from '../Auth/isAuth';
import UnAuthenticated from './UnAuthenticated';

const AddReturns = () => {
  const navigate = useNavigate();
  const [quantity, setQuantity] = useState('');
  const [godownId, setGodownId] = useState('');
  const [outwardsId, setOutwardsId] = useState('');
  const [billCheckedBy, setBillCheckedBy] = useState('');
  const [billValue, setBillValue] = useState('');
  const [dateOfDelivery, setDateOfDelivery] = useState('');
  // const [receiptNo, setReceiptNo] = useState('');
  const [receivedBy, setReceivedBy] = useState('');
  const [dateOfReturn, setDateOfReturn] = useState('');
  const [itemName, setItemName] = useState('');
  const [godowns, setGodowns] = useState([]);
  const [selectedGodownLocation, setSelectedGodownLocation] = useState('');
  const [users, setUsers] = useState([]);
  const [isDamaged, setIsDamaged] = useState([]);
  const [selectedReceivedBy, setSelectedReceivedBy] = useState('');

  const isUserLoggedIn = isLoggedIn();

  if (!isUserLoggedIn) {
    return <UnAuthenticated />;
  }
 
  

  useEffect(() => {
    const fetchGodowns = async () => {
      try {
        const response = await apiService.getGodowns2();
        console.log('Godowns API Response:', response.data);
        
        const activeGodowns = response.data.filter((godown) => godown.status === true);
        setGodowns(activeGodowns);
      } catch (error) {
        console.error('Error fetching godowns data:', error.message);
      }
    };
    const fetchUsers = async () => {
      try {
        const response = await apiService.getUsers();
        setUsers(response.data);
      } catch (error) {
        console.error('Error fetching users data:', error.message);
      }
    };


    fetchGodowns();
    fetchUsers();
    
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
   
    const selectedGodown = godowns.find((godown) => godown.location === selectedGodownLocation);
    if (!selectedGodown) {
      alert('Error: Invalid Godown Location');
      return;
    }
  

    const returnsData = {
      quantity: Number(quantity),
      godowns: {
        godownId: selectedGodown.godownId,
      },
      outwards: {
        outwardsId: Number(outwardsId),
      },
      billCheckedBy,
      billValue,
      dateOfDelivery,
      // receiptNo: Number(receiptNo),
      receivedBy: selectedReceivedBy,
      dateOfReturn,
      itemName,
      isDamaged,
    };

    try {
      const response = await apiService.addReturn(returnsData);

      
      console.log('API Response:', response.data);
      alert('Returns added successfully!');
      navigate('/returns');

    } catch (error) {
      
      console.error('API Request failed:', error.message);
      alert('Error: Something went wrong while adding the returns.');
    }
  };

  return (
    <div>
      <Navbar2 />
      <h1 className="text-center">Add New Returns</h1>
      <form onSubmit={handleSubmit} className="max-w-md mx-auto mt-5">
        <div className="mb-4">
          <label htmlFor="quantity" className="block text-sm font-bold mb-2">Quantity:</label>
          <input
            type="number"
            id="quantity"
            className="w-full border rounded py-2 px-3 focus:outline-none focus:border-blue-500"
            value={quantity}
            onChange={(e) => setQuantity(e.target.value)}
            required
          />
        </div>

        <div className="mb-4">
          <label htmlFor="godownLocation" className="block text-sm font-bold mb-2">Godown Location:</label>
          <select
            id="godownLocation"
            className="w-full border rounded py-2 px-3 focus:outline-none focus:border-blue-500"
            value={selectedGodownLocation}
            onChange={(e) => setSelectedGodownLocation(e.target.value)}
            required
          >
            <option value="" disabled>Select Godown Location</option>
            {godowns.map((godown) => (
              <option key={godown.godownId} value={godown.location}>
                {godown.location}
              </option>
            ))}
          </select>
        </div>

        <div className="mb-4">
          <label htmlFor="outwardsId" className="block text-sm font-bold mb-2">Outwards ID:</label>
          <input
            type="number"
            id="outwardsId"
            className="w-full border rounded py-2 px-3 focus:outline-none focus:border-blue-500"
            value={outwardsId}
            onChange={(e) => setOutwardsId(e.target.value)}
            required
          />
        </div>

        <div className="mb-4">
          <label htmlFor="billCheckedBy" className="block text-sm font-bold mb-2">Bill Checked By:</label>
          <select
            id="billCheckedBy"
            className="w-full border rounded py-2 px-3 focus:outline-none focus:border-blue-500"
            value={billCheckedBy}
            onChange={(e) => setBillCheckedBy(e.target.value)}
            required
          >
            <option value="" disabled>Select Bill Checked By</option>
            {users.map((user) => (
              <option key={user.userId} value={user.username}>
                {user.username}
              </option>
            ))}
          </select>
        </div>

        <div className="mb-4">
          <label htmlFor="billValue" className="block text-sm font-bold mb-2">Bill Value:</label>
          <input
            type="text"
            id="billValue"
            className="w-full border rounded py-2 px-3 focus:outline-none focus:border-blue-500"
            value={billValue}
            onChange={(e) => setBillValue(e.target.value)}
            required
          />
        </div>

        <div className="mb-4">
          <label htmlFor="dateOfDelivery" className="block text-sm font-bold mb-2">Date of Delivery:</label>
          <input
            type="date"
            id="dateOfDelivery"
            className="w-full border rounded py-2 px-3 focus:outline-none focus:border-blue-500"
            value={dateOfDelivery}
            onChange={(e) => setDateOfDelivery(e.target.value)}
            required
          />
        </div>

        {/* <div className="mb-4">
          <label htmlFor="receiptNo" className="block text-sm font-bold mb-2">Receipt No:</label>
          <input
            type="number"
            id="receiptNo"
            className="w-full border rounded py-2 px-3 focus:outline-none focus:border-blue-500"
            value={receiptNo}
            onChange={(e) => setReceiptNo(e.target.value)}
            required
          />
        </div> */}

        <div className="mb-4">
          <label htmlFor="receivedBy" className="block text-sm font-bold mb-2">Received By:</label>
          <select
            id="receivedBy"
            className="w-full border rounded py-2 px-3 focus:outline-none focus:border-blue-500"
            value={selectedReceivedBy}
            onChange={(e) => setSelectedReceivedBy(e.target.value)}
            required
          >
            <option value="" disabled>Select Received By</option>
            {users.map((user) => (
              <option key={user.userId} value={user.username}>
                {user.username}
              </option>
            ))}
          </select>
        </div>
        

        <div className="mb-4">
          <label htmlFor="dateOfReturn" className="block text-sm font-bold mb-2">Date of Return:</label>
          <input
            type="date"
            id="dateOfReturn"
            className="w-full border rounded py-2 px-3 focus:outline-none focus:border-blue-500"
            value={dateOfReturn}
            onChange={(e) => setDateOfReturn(e.target.value)}
            required
          />
        </div>

        <div className="mb-4">
          <label htmlFor="itemName" className="block text-sm font-bold mb-2">Item Name:</label>
          <input
            type="text"
            id="itemName"
            className="w-full border rounded py-2 px-3 focus:outline-none focus:border-blue-500"
            value={itemName}
            onChange={(e) => setItemName(e.target.value)}
            required
          />
        </div>

        <div className="mb-4">
          <label htmlFor="itemName" className="block text-sm font-bold mb-2">Damaged:</label>
          <input
            type="text"
            id="isDamaged"
            className="w-full border rounded py-2 px-3 focus:outline-none focus:border-blue-500"
            value={isDamaged}
            onChange={(e) => setIsDamaged(e.target.value)}
            required
          />
        </div>
        <div>
          <button type="submit" className="bg-blue-400 hover:bg-blue-700 text-black font-bold py-2 px-4 rounded">
            Add Returns
          </button>
          <Link
                to="/Account"
                className="bg-blue-400 ml-3 hover:bg-blue-700 text-black font-bold py-2 px-4 rounded"
              >
                Cancel
              </Link>
        </div>
      </form>
    </div>
  );
};

export default AddReturns;
