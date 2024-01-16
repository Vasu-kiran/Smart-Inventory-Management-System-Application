import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import apiService from '../layers/Service';
import { Navbar2 } from '../Components/Navbar2';

const AddInward = () => {
  const navigate = useNavigate();
  const [quantity, setQuantity] = useState('');
  const [receivedBy, setReceivedBy] = useState('');
  const [godownId, setGodownId] = useState('');
  const [productId, setProductId] = useState('');
  const [dateOfSupply, setDateOfSupply] = useState('');
  const [invoiceNo, setInvoiceNo] = useState('');
  const [itemName, setItemName] = useState('');
  const [billCheckedBy, setBillCheckedBy] = useState('');
  const [receiptNo, setReceiptNo] = useState('');
  const [nameOfTheSupplier, setNameOfTheSupplier] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    const inwardData = {
      quantity: Number(quantity),
      receivedBy,
      godowns: {
        godownId: Number(godownId),
        users: {
          username: receivedBy,
        },
      },
      productsToPurchase: [
        {
          productId: Number(productId),
        },
      ],
      dateOfSupply,
      invoiceNo: Number(invoiceNo),
      itemName,
      billCheckedBy,
      receiptNo: Number(receiptNo),
      nameOfTheSupplier,
    };

    try {
      const response = await apiService.addInward(inwardData);

      // On successful response
      console.log('API Response:', response.data);
      alert('Inward added successfully!');
      navigate('/inwards');

    } catch (error) {
      // On failed response
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
          <input
            type="text"
            id="receivedBy"
            className="w-full border rounded py-2 px-3 focus:outline-none focus:border-blue-500"
            value={receivedBy}
            onChange={(e) => setReceivedBy(e.target.value)}
            required
          />
        </div>

        <div className="mb-4">
          <label htmlFor="godownId" className="block text-sm font-bold mb-2">Godown ID:</label>
          <input
            type="number"
            id="godownId"
            className="w-full border rounded py-2 px-3 focus:outline-none focus:border-blue-500"
            value={godownId}
            onChange={(e) => setGodownId(e.target.value)}
            required
          />
        </div>

        <div className="mb-4">
          <label htmlFor="productId" className="block text-sm font-bold mb-2">Product ID:</label>
          <input
            type="number"
            id="productId"
            className="w-full border rounded py-2 px-3 focus:outline-none focus:border-blue-500"
            value={productId}
            onChange={(e) => setProductId(e.target.value)}
            required
          />
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

        <div className="mb-4">
          <label htmlFor="invoiceNo" className="block text-sm font-bold mb-2">Invoice No:</label>
          <input
            type="number"
            id="invoiceNo"
            className="w-full border rounded py-2 px-3 focus:outline-none focus:border-blue-500"
            value={invoiceNo}
            onChange={(e) => setInvoiceNo(e.target.value)}
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
          <label htmlFor="billCheckedBy" className="block text-sm font-bold mb-2">Bill Checked By:</label>
          <input
            type="text"
            id="billCheckedBy"
            className="w-full border rounded py-2 px-3 focus:outline-none focus:border-blue-500"
            value={billCheckedBy}
            onChange={(e) => setBillCheckedBy(e.target.value)}
            required
          />
        </div>

        <div className="mb-4">
          <label htmlFor="receiptNo" className="block text-sm font-bold mb-2">Receipt No:</label>
          <input
            type="number"
            id="receiptNo"
            className="w-full border rounded py-2 px-3 focus:outline-none focus:border-blue-500"
            value={receiptNo}
            onChange={(e) => setReceiptNo(e.target.value)}
            required
          />
        </div>

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
        </div>
      </form>
    </div>
  );
};

export default AddInward;
