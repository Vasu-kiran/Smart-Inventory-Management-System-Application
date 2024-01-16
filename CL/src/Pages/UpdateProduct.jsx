import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import apiService from '../layers/Service';
import { Navbar2 } from '../Components/Navbar2';
import { Link } from 'react-router-dom';
import { isLoggedIn } from '../Auth/isAuth';
import UnAuthenticated from './UnAuthenticated';

const UpdateProduct = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);

  const isUserLoggedIn = isLoggedIn();

  if (!isUserLoggedIn) {
    return <UnAuthenticated />;
  }

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await apiService.getProductById(id);
        setProduct(response.data);
        console.log('Product data:', response.data);
      } catch (error) {
        console.error('Error fetching product data:', error.message);
      }
    };

    fetchData();
  }, [id]);

  const handleFormSubmit = async (event) => {
    event.preventDefault();

    try {
      const productData = {
        productName: event.target.productName.value,
        price: event.target.price.value,
        quantity: event.target.quantity.value
        
      };

      const response = await apiService.updateProductById(id, productData);
      console.log('Update response:', response.data);
      alert('Product data updated successfully');
      navigate('/products');
    } catch (error) {
      console.error('Error updating product data:', error.message);
      alert('Error updating product data');
    }
  };

  const handleInputChange = (event) => {
    setProduct({
      ...product,
      [event.target.name]: event.target.value,
    });
  };

  return (
    <div className="bg-gray-100 min-h-screen">
      <Navbar2 />
      <div className="max-w-2xl mx-auto p-8 bg-white shadow-lg mt-8">
        <h1 className="text-2xl font-bold mb-4">Update Product</h1>
        {product && (
          <form onSubmit={handleFormSubmit}>
            <div className="mb-4">
              <label className="block text-sm font-semibold mb-2">Product Name:</label>
              <input
                type="text"
                name="productName"
                value={product.productName}
                onChange={handleInputChange}
                className="w-full p-2 border rounded"
                required
                placeholder="Enter product name"
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-semibold mb-2">Price:</label>
              <input
                type="number"
                name="price"
                value={product.price}
                onChange={handleInputChange}
                className="w-full p-2 border rounded"
                required
                placeholder="Enter price (must be more than 0)"
                min="1"
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-semibold mb-2">Quantity:</label>
              <input
                type="number"
                name="quantity"
                value={product.quantity}
                onChange={handleInputChange}
                className="w-full p-2 border rounded"
                required
                placeholder="Enter quantity (must be more than 0)"
                min="1"
              />
            </div>
            {/* <div className="mb-4">
              <label className="block text-sm font-semibold mb-2">Stock:</label>
              <select
                name="stock"
                className="w-full border rounded py-2 px-3 focus:outline-none focus:border-blue-500"
                value={product.stock.toString()} // Convert to string
                onChange={handleInputChange}
                required
              >
                <option value="true">In Stock</option>
                <option value="false">Out of Stock</option>
              </select>
            </div> */}
            <button
              type="submit"
              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
            >
              Update Product
            </button>
            <Link
                to="/Account"
                className="bg-blue-400 ml-3 hover:bg-blue-700 text-black font-bold py-2 px-4 rounded"
              >
                Cancel
              </Link>
          </form>
        )}
      </div>
    </div>
  );
};

export default UpdateProduct;
