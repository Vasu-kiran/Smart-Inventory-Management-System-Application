import React, { useEffect, useState } from 'react';
import apiService from '../layers/Service';
import { Navbar2 } from '../Components/Navbar2';
import Footer from '../Components/Footer';
import { Link } from 'react-router-dom';
import html2pdf from 'html2pdf.js';
import UnAuthenticated from './UnAuthenticated';
import { isLoggedIn } from '../Auth/isAuth';


const Reports = () => {
  const [userData, setUserData] = useState([]);
  const [godownsData, setGodownsData] = useState([]);
  const [inwardsData, setInwardsData] = useState([]);
  const [outwardsData, setOutwardsData] = useState([]);
  const [productsData, setProductsData] = useState([]);
  const [returnsData, setReturnsData] = useState([]);
  const [reportDate, setReportDate] = useState('');
  const currUser = localStorage.getItem('username');

  const isUserLoggedIn = isLoggedIn();

  if (!isUserLoggedIn) {
    return <UnAuthenticated />;
  }

  useEffect(() => {
    const fetchData = async () => {
      try {
        const usersResponse = await apiService.getUsers();
        const godownsResponse = await apiService.getGodowns();
        const inwardsResponse = await apiService.getInwards();
        const outwardsResponse = await apiService.getOutwards();
        const productsResponse = await apiService.getProducts();
        const returnsResponse = await apiService.getReturns();

        setUserData(usersResponse.data);
        setGodownsData(godownsResponse.data);
        setInwardsData(inwardsResponse.data);
        setOutwardsData(outwardsResponse.data);
        setProductsData(productsResponse.data);
        setReturnsData(returnsResponse.data);

        setReportDate(new Date().toLocaleString());
      } catch (error) {
        console.error('API Request failed:', error.message);
      }
    };

    fetchData();
  }, []);

  // Calculations
  const totalEmployees = userData.length;
  const totalManagers = userData.filter(user => user.role === 'MANAGER').length;
  const totalGuests = userData.filter(user => user.role === 'GUEST').length;
  const totalGodowns = godownsData.length;
  const totalActiveGodowns = godownsData.filter(godown => godown.status).length;
  const totalCapacityOfGodowns = godownsData.reduce((acc, godown) => acc + godown.capacityInQuintals, 0);
  const totalInwards = inwardsData.length;
  const totalOutwards = outwardsData.length;
  const totalProducts = productsData.length;
  const totalReturns = returnsData.length;

  const downloadReportPDF = () => {
    const pdfContent = document.getElementById('ReportPage');

    html2pdf(pdfContent, {
      margin: 0,
      filename: 'SIMS_Report.pdf',
      image: { type: 'jpeg', quality: 0.98 },
      html2canvas: { scale: 2 },
      jsPDF: { unit: 'mm', format: 'a4', orientation: 'landscape' },
    });
  };

  return (
    <>
      <Navbar2 />
      <header className="bg-black text-white text-center h-[40px] py-4"></header>

      <div id="ReportPage" className="container mx-auto p-4 ">
        <h1 className="text-3xl font-bold mb-4 text-center mt-8">
          Smart Inventory Management System (SIMS) Report
        </h1>
        <p className="text-md text-gray-600 mb-2 font-bold text-center ">
          Report generated on: {reportDate} by {currUser}
        </p>

        <table id="reportTable" className="w-[800px] mx-auto border border-gray-300 mt-12">
          <thead>
            <tr className="bg-gray-100">
              <th className="py-2 px-4 border-b  text-left">Categories</th>
              <th className="py-2 px-4 border-b  text-left">Values</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="py-2 px-4 border-b border-r border-gray-400">Total Number of Employees</td>
              <td className="py-2 px-4 border-b border-r border-gray-400">{totalEmployees}</td>
            </tr>
            <tr>
              <td className="py-2 px-4 border-b border-r border-gray-400">Total Number of Managers</td>
              <td className="py-2 px-4 border-b border-r border-gray-400">{totalManagers}</td>
            </tr>
            <tr>
              <td className="py-2 px-4 border-b border-r border-gray-400">Total Number of Guest Users</td>
              <td className="py-2 px-4 border-b border-r border-gray-400">{totalGuests}</td>
            </tr>
            <tr>
              <td className="py-2 px-4 border-b border-r border-gray-400">Total Number of Godowns</td>
              <td className="py-2 px-4 border-b border-r border-gray-400">{totalGodowns}</td>
            </tr>
            <tr>
              <td className="py-2 px-4 border-b border-r border-gray-400">Total Number of Active Godowns</td>
              <td className="py-2 px-4 border-b border-r border-gray-400">{totalActiveGodowns}</td>
            </tr>
            <tr>
              <td className="py-2 px-4 border-b border-r border-gray-400">Total Capacity of Godowns</td>
              <td className="py-2 px-4 border-b border-r border-gray-400">{totalCapacityOfGodowns} Qs</td>
            </tr>
            <tr>
              <td className="py-2 px-4 border-b border-r border-gray-400">Total Number of Inwards</td>
              <td className="py-2 px-4 border-b border-r border-gray-400">{totalInwards}</td>
            </tr>
            <tr>
              <td className="py-2 px-4 border-b border-r border-gray-400">Total Number of Outwards</td>
              <td className="py-2 px-4 border-b border-r border-gray-400">{totalOutwards}</td>
            </tr>
            <tr>
              <td className="py-2 px-4 border-b border-r border-gray-400">Total Number of Products</td>
              <td className="py-2 px-4 border-b border-r border-gray-400">{totalProducts}</td>
            </tr>
            <tr>
              <td className="py-2 px-4 border-b border-r border-gray-400">Total Number of Returns</td>
              <td className="py-2 px-4 border-b border-r border-gray-400">{totalReturns}</td>
            </tr>
          </tbody>
        </table>
      </div>

      <Link
        to="/Account"
        className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 ml-[840px]"
      >
        Back
      </Link>

      <button
        className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600 ml-4"
        onClick={downloadReportPDF}
      >
        Download Report
      </button>

      <Footer />
    </>
  );
};

export default Reports;
