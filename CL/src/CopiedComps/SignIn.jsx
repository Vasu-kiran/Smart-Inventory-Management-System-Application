import React, { useState } from 'react';
import { ArrowRight } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import apiService from '../layers/Service'; 
import logo from '../assets/logo.jpg';
import { Navbar } from '../Components/Navbar';
import { Navbar2 } from '../Components/Navbar2';
import Footer from '../Components/Footer';
import { isLoggedIn } from '../Auth/isAuth';
import AdminAccount from '../Pages/AdminAccount';

export function SignIn() {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const isUserLoggedIn = isLoggedIn();

  if (isUserLoggedIn) {
    alert("Already Logged In !")
    return <AdminAccount />;
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    const userData = {
      username: username,
      pwd: password,
    };

    try {
      const response = await apiService.signIn(userData);

      if (response.status === 200) {
        const result = response.data;

        localStorage.setItem('role', result.role);
        localStorage.setItem('gender', result.gender);
        localStorage.setItem('mobileNumber', result.mobileNumber);
        localStorage.setItem('userId', result.userId);
        localStorage.setItem('username', result.username);

        console.log('API Response:', result);
        alert(`Welcome Back ${result.username} !`);
        navigate('/Account');
      } else {
        console.error('API Request failed:', response.status, response.statusText);

        if (response.data) {
          console.error('Response body:', response.data);
        }
      }
    } catch (error) {
      console.error('Error during fetch:', error.message);

      if (error.response && error.response.data) {
        console.error('Response body:', error.response.data);
      }

      alert(`${error.response.data} Please Try Again`);
    }
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <section className="flex-grow">
        <div className="flex items-center justify-center px-4 py-10 sm:px-6 sm:py-16 lg:px-8 lg:py-24">
          <div className="xl:mx-auto xl:w-full xl:max-w-sm 2xl:max-w-md">
            <div className="mb-2 flex justify-center">
              <img
                className="w-16 h-16 p-1 border-2 border-black rounded-full border-opacity-20"
                src={logo}
                alt="logo"
              />
            </div>
            <h2 className="text-center text-2xl font-bold leading-tight text-black">
              Sign in to your account
            </h2>
            <p className="mt-2 text-center text-sm text-gray-600 ">
              Don&apos;t have an account?{' '}
              <Link
                to="/SignUp"
                className="font-semibold text-black transition-all duration-200 hover:underline"
              >
                Register Now
              </Link>
            </p>
            <form onSubmit={handleSubmit} className="mt-8">
              <div className="space-y-5">
                <div>
                  <label htmlFor="" className="text-base font-medium text-gray-900">
                    {' '}
                    Username{' '}
                  </label>
                  <div className="mt-2">
                    <input
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                      className="flex h-10 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                      type="text"
                      placeholder="Username"
                    ></input>
                  </div>
                </div>
                <div>
                  <label htmlFor="" className="text-base font-medium text-gray-900">
                    {' '}
                    Password{' '}
                  </label>
                  <div className="mt-2">
                    <input
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="flex h-10 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                      type="password"
                      placeholder="Password"
                    ></input>
                  </div>
                </div>
                <div>
                  <button
                    type="submit"
                    className="inline-flex w-full items-center justify-center rounded-md bg-black px-3.5 py-2.5 font-semibold leading-7 text-white hover:bg-black/80"
                  >
                    Get started <ArrowRight className="ml-2" size={16} />
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
}

export default SignIn;
