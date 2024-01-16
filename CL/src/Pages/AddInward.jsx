

import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import apiService from '../layers/Service';
import { Navbar2 } from '../Components/Navbar2';
import { Link } from 'react-router-dom';
import { isLoggedIn } from '../Auth/isAuth';
import UnAuthenticated from './UnAuthenticated';


const AddInward = () => {
  const navigate = useNavigate();
  const [quantity, setQuantity] = useState('');
  const [receivedBy, setReceivedBy] = useState('');
  const [godownId, setGodownId] = useState('');
  const [productId, setProductId] = useState('');
  const [dateOfSupply, setDateOfSupply] = useState('');
  const [itemName, setItemName] = useState('');
  const [billCheckedBy, setBillCheckedBy] = useState('');
  const [nameOfTheSupplier, setNameOfTheSupplier] = useState('');
  const [users, setUsers] = useState([]);

  
  const [godowns2Data, setGodowns2Data] = useState([]);
  const [products, setProducts] = useState([]);
  const [productName, setProductName] = useState('');

  const isUserLoggedIn = isLoggedIn();

  if (!isUserLoggedIn) {
    return <UnAuthenticated />;
  }

  useEffect(() => {
    const fetchGodowns2Data = async () => {
      try {
        const response = await apiService.getGodowns2();
        setGodowns2Data(response.data);
        console.log('Godowns2 Data:', response.data);
      } catch (error) {
        console.error('Error fetching Godowns2 data:', error.message);
      }
    };

    const fetchUsers = async () => {
      try {
        const response = await apiService.getUsers();
        setUsers(response.data);
        console.log('Users Data:', response.data);
      } catch (error) {
        console.error('Error fetching Users data:', error.message);
      }
    };
    const fetchProducts = async () => {
      try {
        const response = await apiService.getProducts();
        setProducts(response.data);
        console.log('Products Data:', response.data);
      } catch (error) {
        console.error('Error fetching Products data:', error.message);
      }
    };

    fetchGodowns2Data();
    fetchUsers();
    fetchProducts();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    const selectedReceivedBy = users.find((user) => user.username === receivedBy);
    const selectedBillCheckedBy = users.find((user) => user.username === billCheckedBy);
    const selectedGodown = godowns2Data.find((godown) => godown.godownId === Number(godownId));
    const godownIdToSend = selectedGodown ? selectedGodown.godownId : '';
    const selectedProduct = products.find((product) => product.productName === productName);
    const productIdToSend = selectedProduct ? selectedProduct.productId : '';
  
    const inwardData = {
      quantity: Number(quantity),
      receivedBy: selectedReceivedBy ? selectedReceivedBy.username : '', 
      godowns: {
        godownId: godownIdToSend,
        users: {
          username: receivedBy,
        },
      },
      productsToPurchase: [
        {
          productId: productIdToSend,
        },
      ],
      dateOfSupply,
      itemName,
      billCheckedBy: selectedBillCheckedBy ? selectedBillCheckedBy.username : '', 
      nameOfTheSupplier,
    };
  
    try {
      const response = await apiService.addInward(inwardData);
  
      console.log('API Response:', response.data);
      alert('Inward added successfully!');
      navigate('/inwards');
    } catch (error) {
      console.error('API Request failed:', error.message);
      alert('Error: Something went wrong while adding the inward.');
    }
  };

  return (
    <div>
      <Navbar2 />
      <h1 className="text-center">Add New Inward</h1>
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
          <label htmlFor="receivedBy" className="block text-sm font-bold mb-2">Received By:</label>
          <select
            id="receivedBy"
            className="w-full border rounded py-2 px-3 focus:outline-none focus:border-blue-500"
            value={receivedBy}
            onChange={(e) => setReceivedBy(e.target.value)}
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
          <label htmlFor="godownId" className="block text-sm font-bold mb-2">Godown Location:</label>
          <select
            id="godownId"
            className="w-full border rounded py-2 px-3 focus:outline-none focus:border-blue-500"
            value={godownId}
            onChange={(e) => setGodownId(e.target.value)}
            required
          >
            <option value="" disabled>Select Godown Location</option>
            {godowns2Data
              .filter((godown) => godown.status === true)
              .map((godown) => (
                <option key={godown.godownId} value={godown.godownId}>
                  {godown.location}
                </option>
              ))}
          </select>
        </div>

        <div className="mb-4">
          <label htmlFor="productId" className="block text-sm font-bold mb-2">Product :</label>
          <select
            id="productId"
            className="w-full border rounded py-2 px-3 focus:outline-none focus:border-blue-500"
            value={productName}
            onChange={(e) => setProductName(e.target.value)}
            required
          >
            <option value="" disabled>Select Product </option>
            {products.map((product) => (
              <option key={product.productId} value={product.productName}>
                {product.productName}
              </option>
            ))}
          </select>
        </div>

        <div className="mb-4">
          <label htmlFor="dateOfSupply" className="block text-sm font-bold mb-2">Date of Supply:</label>
          <input
            type="date"
            id="dateOfSupply"
            className="w-full border rounded py-2 px-3 focus:outline-none focus:border-blue-500"
            value={dateOfSupply}
            onChange={(e) => setDateOfSupply(e.target.value)}
            required
          />
        </div>

        {/* <div className="mb-4">
          <label htmlFor="invoiceNo" className="block text-sm font-bold mb-2">Invoice No:</label>
          <input
            type="number"
            id="invoiceNo"
            className="w-full border rounded py-2 px-3 focus:outline-none focus:border-blue-500"
            value={invoiceNo}
            onChange={(e) => setInvoiceNo(e.target.value)}
            required
          />
        </div> */}

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
          <label htmlFor="nameOfTheSupplier" className="block text-sm font-bold mb-2">Name of the Supplier:</label>
          <input
            type="text"
            id="nameOfTheSupplier"
            className="w-full border rounded py-2 px-3 focus:outline-none focus:border-blue-500"
            value={nameOfTheSupplier}
            onChange={(e) => setNameOfTheSupplier(e.target.value)}
            required
          />
        </div>

        <div>
          <button type="submit" className="bg-blue-400 hover:bg-blue-700 text-black font-bold py-2 px-4 rounded">
            Add Inward
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

export default AddInward;
