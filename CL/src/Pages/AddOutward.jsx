import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import apiService from '../layers/Service';
import { Navbar2 } from '../Components/Navbar2';
import { Link } from 'react-router-dom';
import { isLoggedIn } from '../Auth/isAuth';
import UnAuthenticated from './UnAuthenticated';

const AddOutward = () => {
  const navigate = useNavigate();
  const [quantity, setQuantity] = useState('');
  const [godownId, setGodownId] = useState('');
  const [productId, setProductId] = useState('');
  const [purpose, setPurpose] = useState('');
  const [itemName, setItemName] = useState('');
  // const [receiptNo, setReceiptNo] = useState('');
  const [dateOfSupply, setDateOfSupply] = useState('');
  const [billCheckedBy, setBillCheckedBy] = useState('');
  // const [invoiceNo, setInvoiceNo] = useState('');
  const [billValue, setBillValue] = useState('');
  const [deliveredTo, setDeliveredTo] = useState('');
  const [dateOfDelivery, setDateOfDelivery] = useState('');
  const [godowns, setGodowns] = useState([]);
  const [users, setUsers] = useState([]);
  const [selectedGodownLocation, setSelectedGodownLocation] = useState('');
  const [selectedProductName, setSelectedProductName] = useState('');
  const [products, setProducts] = useState([]);

  const isUserLoggedIn = isLoggedIn();

  if (!isUserLoggedIn) {
    return <UnAuthenticated />;
  }
  

  useEffect(() => {
    const fetchGodowns = async () => {
      try {
        const response = await apiService.getGodowns2();
        console.log('Godowns API Response:', response.data);
        // Filter godowns with status true
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
    const fetchProducts = async () => {
      try {
        const response = await apiService.getProducts();
        setProducts(response.data);
        console.log('Products Data:', response.data);
      } catch (error) {
        console.error('Error fetching Products data:', error.message);
      }
    };

    fetchGodowns();
    fetchUsers();
    fetchProducts();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const selectedGodown = godowns.find((godown) => godown.location === selectedGodownLocation);
    if (!selectedGodown) {
      alert('Error: Invalid Godown Location');
      return;
    }
    const selectedProduct = products.find((product) => product.productName === selectedProductName);

    if (!selectedProduct) {
      alert('Error: Invalid Product Name');
      return;
    }

    const outwardData = {
      quantity: Number(quantity),
      godowns: {
        godownId: selectedGodown.godownId,
      },
      productsToDeliver: [
        {
          productId: selectedProduct.productId,
        },
      ],
      purpose,
      itemName,
      // receiptNo: Number(receiptNo),
      dateOfSupply,
      billCheckedBy,
      // invoiceNo: Number(invoiceNo),
      billValue,
      deliveredTo,
      dateOfDelivery,
    };

    try {
      const response = await apiService.addOutward(outwardData);

      // On successful response
      console.log('API Response:', response.data);
      alert('Outward added successfully!');
      navigate('/outwards');

    } catch (error) {
      // On failed response
      console.error('API Request failed:', error.message);
      alert('Error: Something went wrong while adding the outward.');
    }
  };

  return (
    <div>
      <Navbar2 />
      <h1 className="text-center">Add New Outward</h1>
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
          <label htmlFor="productId" className="block text-sm font-bold mb-2">Product:</label>
          <select
            id="productId"
            className="w-full border rounded py-2 px-3 focus:outline-none focus:border-blue-500"
            value={selectedProductName}
            onChange={(e) => setSelectedProductName(e.target.value)}
            required
          >
            <option value="" disabled>Select Product</option>
            {products.map((product) => (
              <option key={product.productId} value={product.productName}>
                {product.productName}
              </option>
            ))}
          </select>
        </div>

        <div className="mb-4">
          <label htmlFor="purpose" className="block text-sm font-bold mb-2">Purpose:</label>
          <input
            type="text"
            id="purpose"
            className="w-full border rounded py-2 px-3 focus:outline-none focus:border-blue-500"
            value={purpose}
            onChange={(e) => setPurpose(e.target.value)}
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
          <label htmlFor="deliveredTo" className="block text-sm font-bold mb-2">Delivered To:</label>
          <input
            type="text"
            id="deliveredTo"
            className="w-full border rounded py-2 px-3 focus:outline-none focus:border-blue-500"
            value={deliveredTo}
            onChange={(e) => setDeliveredTo(e.target.value)}
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

        <div>
          <button type="submit" className="bg-blue-400 hover:bg-blue-700 text-black font-bold py-2 px-4 rounded">
            Add Outward
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

export default AddOutward;
