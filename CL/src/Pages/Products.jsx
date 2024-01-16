import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import apiService from '../layers/Service';
import { Navbar2 } from '../Components/Navbar2';
import { isLoggedIn } from '../Auth/isAuth';
import UnAuthenticated from './UnAuthenticated';


const Products = () => {
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const userRole = localStorage.getItem('role'); 

  const isUserLoggedIn = isLoggedIn();

  if (!isUserLoggedIn) {
    return <UnAuthenticated />;
  }

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await apiService.getProducts();
        setProducts(response.data);
        console.log(response.data);
      } catch (error) {
        console.error('Error fetching product data:', error.message);
      }
    };

    fetchData();
  }, []);

  const handleDeleteProduct = async (productId) => {
    try {
      await apiService.deleteProductById(productId);
      const response = await apiService.getProducts();
      console.log(response.data);
      alert('Product Deleted Successfully');
      setProducts(response.data);
    } catch (error) {
      console.error('Error deleting product:', error.message);
    }
  };

  const handleUpdateProduct = (id) => {
    navigate(`/updateProduct/${id}`);
  };

  return (
    <div>
      <Navbar2 />
      <h1 className="text-center font-bold">Products</h1>
      <table className="border-collapse border border-gray-800 mx-auto mt-10">
        <thead>
          <tr>
            <th className="border border-gray-800 p-2">ID</th>
            <th className="border border-gray-800 p-2">Product Name</th>
            <th className="border border-gray-800 p-2">Quantity</th>
            <th className="border border-gray-800 p-2">Price/Quintal</th>
            
            
            {userRole === 'ADMIN' && (
              <th className="border border-gray-800 p-2">Actions</th>
            )}
          </tr>
        </thead>
        <tbody>
          {products.map((product) => (
            <tr key={product.productId}>
              <td className="border border-gray-800 p-2">{product.productId}</td>
              <td className="border border-gray-800 p-2">{product.productName}</td>
              <td className="border border-gray-800 p-2">{product.quantity}</td>
              <td className="border border-gray-800 p-2">{product.price}</td>
              
              
              {userRole === 'ADMIN' && (
                <td className="border border-gray-800 p-2">
                  {/* <button
                    className="bg-red-400 rounded-full px-3 py-1"
                    onClick={() => handleDeleteProduct(product.productId)}
                  >
                    Delete
                  </button> */}
                  <button
                    className="bg-blue-500 rounded-full px-3 py-1 ml-2"
                    onClick={() => handleUpdateProduct(product.productId)}
                  >
                    Update
                  </button>
                </td>
              )}
            </tr>
          ))}
        </tbody>
      </table>
      <div className="flex justify-center mt-4">
        <Link
          to="/Account"
          className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
        >
          Go Back
        </Link>
       
        {userRole !== 'GUEST' && (
          <Link
            to="/addProduct"
            className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600 ml-4"
          >
            Add New Product
          </Link>
        )}
      </div>
    </div>
  );
};

export default Products;
