import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import apiService from '../layers/Service';
import { Navbar2 } from '../Components/Navbar2';
import { isLoggedIn } from '../Auth/isAuth';
import UnAuthenticated from './UnAuthenticated';

const AddProduct = () => {
  const navigate = useNavigate();
  const [productName, setProductName] = useState('');
  const [price, setPrice] = useState('');
  const [quantity, setQuantity] = useState('');
  // const [stock, setStock] = useState(true);

  const isUserLoggedIn = isLoggedIn();

  if (!isUserLoggedIn) {
    return <UnAuthenticated />;
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    const productData = {
      productName,
      price: Number(price),
      quantity: Number(quantity)
      // stock,
    };

    try {
      const response = await apiService.addProduct(productData);

      console.log('API Response:', response.data);
      alert('Product added successfully!');
      navigate('/products');
    } catch (error) {
      console.error('API Request failed:', error.message);
      alert('Error: Something went wrong while adding the product.');
    }
  };

  return (
    <div>
      <Navbar2 />
      <h1 className="text-center">Add New Product</h1>
      <form onSubmit={handleSubmit} className="max-w-md mx-auto mt-5">
        <div className="mb-4">
          <label htmlFor="productName" className="block text-sm font-bold mb-2">Product Name:</label>
          <input
            type="text"
            id="productName"
            className="w-full border rounded py-2 px-3 focus:outline-none focus:border-blue-500"
            value={productName}
            onChange={(e) => setProductName(e.target.value)}
            required
            placeholder="Enter product name"
          />
        </div>

        <div className="mb-4">
          <label htmlFor="price" className="block text-sm font-bold mb-2">Price:</label>
          <input
            type="number"
            id="price"
            className="w-full border rounded py-2 px-3 focus:outline-none focus:border-blue-500"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            required
            placeholder="Enter price (must be more than 0)"
            min="1"
          />
        </div>

        <div className="mb-4">
          <label htmlFor="quantity" className="block text-sm font-bold mb-2">Quantity:</label>
          <input
            type="number"
            id="quantity"
            className="w-full border rounded py-2 px-3 focus:outline-none focus:border-blue-500"
            value={quantity}
            onChange={(e) => setQuantity(e.target.value)}
            required
            placeholder="Enter quantity (must be more than 0)"
            min="1"
          />
        </div>

        {/* <div className="mb-4">
          <label htmlFor="stock" className="block text-sm font-bold mb-2">Stock:</label>
          <select
            id="stock"
            className="w-full border rounded py-2 px-3 focus:outline-none focus:border-blue-500"
            value={stock}
            onChange={(e) => setStock(e.target.value === 'true')}
            required
          >
            <option value={true}>In Stock</option>
            <option value={false}>Out of Stock</option>
          </select>
        </div> */}

        <div>
          <button type="submit" className="bg-blue-400 hover:bg-blue-700 text-black font-bold py-2 px-4 rounded">
            Add Product
          </button>
          <Link to="/products" type="submit" className="bg-blue-400 hover:bg-blue-700 text-black font-bold py-2 px-4 rounded ml-4">
            Cancel
          </Link>
        </div>
      </form>
    </div>
  );
};

export default AddProduct;
