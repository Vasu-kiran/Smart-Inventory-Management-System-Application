import React, { useState } from 'react';
import { ArrowRight } from 'lucide-react';
import { Navbar } from '../Components/Navbar';
import logo from '../assets/logo.jpg';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import apiService from '../layers/Service';
import { isLoggedIn } from '../Auth/isAuth';
import AdminAccount from '../Pages/AdminAccount';

export function SignUp() {
  const navigate = useNavigate();

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [mobileNumber, setMobileNumber] = useState('');
  const [gender, setGender] = useState('');
  const [email, setEmail] = useState('');

  const isUserLoggedIn = isLoggedIn();

  if (isUserLoggedIn) {
    alert("Already Logged In !")
    return <AdminAccount />;
  }

  const [passwordError, setPasswordError] = useState('');
  const [mobileNumberError, setMobileNumberError] = useState('');
  const [emailError, setEmailError] = useState('');

  const validatePassword = (value) => {
    const passwordRegex = /^(?=.*[A-Z])(?=.*[!@#$%^&*])(?=.*[0-9]).{4,}$/;
    return passwordRegex.test(value);
  };

  const validateMobileNumber = (value) => {
    const mobileNumberRegex = /^\d{10}$/;
    return mobileNumberRegex.test(value);
  };

  const validateEmail = (value) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(value);
  };

  const handleSignUp = async (e) => {
    e.preventDefault();

    if (!validatePassword(password)) {
      setPasswordError('Password must be at least 4 characters with 1 capital letter, 1 special character, and 1 numeric value.');
      return;
    } else {
      setPasswordError('');
    }

    if (!validateMobileNumber(mobileNumber)) {
      setMobileNumberError('Mobile number must be 10 digits and contain only numbers.');
      return;
    } else {
      setMobileNumberError('');
    }

    if (!validateEmail(email)) {
      setEmailError('Enter a valid email address.');
      return;
    } else {
      setEmailError('');
    }

    const userData = {
      username,
      pwd: password,
      mobileNumber,
      gender,
      email,
    };

    try {
        const response = await apiService.signUp(userData);
  
        console.log('API Response:', response.data);
        alert(`Registration Successful, Kindly Sign In`);
        navigate('/signin');
      } catch (error) {
        console.error('Error during fetch:', error.message);
  
        
        if (error.response && error.response.data) {
          console.error('Response body:', error.response.data);
        }
  
        alert(`${error.response.data} Please Try Again` );
      }
    };

  return (
    <>
      <Navbar />
      <section >
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
            Sign up to create account
            </h2>
            <p className="mt-2 text-center text-base text-gray-600">
              Already have an account?{' '}
              <Link
                to="/SignIn"
                className="font-semibold text-black transition-all duration-200 hover:underline"
              >
                Sign In
              </Link>
            </p>
            <form action="#" method="POST" className="mt-8">
              <div className="space-y-5">
                {/* Username input */}
                <div>
                  <label htmlFor="username" className="text-base font-medium text-gray-900">
                    {' '}
                    Username{' '}
                  </label>
                  <div className="mt-2">
                    <input
                      className="flex h-10 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                      type="text"
                      placeholder="Username"
                      id="username"
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                    ></input>
                  </div>
                </div>
                
                <div>
                  <label htmlFor="password" className="text-base font-medium text-gray-900">
                    {' '}
                    Password{' '}
                  </label>
                  <div className="mt-2">
                    <input
                      className="flex h-10 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                      type="password"
                      placeholder="Password"
                      id="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                    ></input>
                  </div>
                  
                  {passwordError && (
                    <p className="mt-2 text-sm text-red-600">{passwordError}</p>
                  )}
                </div>
                
                <div>
                  <label htmlFor="mobileNumber" className="text-base font-medium text-gray-900">
                    {' '}
                    Mobile Number{' '}
                  </label>
                  <div className="mt-2">
                    <input
                      className="flex h-10 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                      type="text"
                      placeholder="Mobile Number"
                      id="mobileNumber"
                      value={mobileNumber}
                      onChange={(e) => setMobileNumber(e.target.value)}
                    ></input>
                  </div>
                  {/* Mobile Number error message */}
                  {mobileNumberError && (
                    <p className="mt-2 text-sm text-red-600">{mobileNumberError}</p>
                  )}
                </div>
                
                <div>
                  <label htmlFor="gender" className="text-base font-medium text-gray-900">
                    {' '}
                    Gender{' '}
                  </label>
                  <div className="mt-2">
                    <select
                      id="gender"
                      className="flex h-10 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                      value={gender}
                      onChange={(e) => setGender(e.target.value)}
                    >
                      <option value="" disabled>
                        Select Gender
                      </option>
                      <option value="MALE">MALE</option>
                      <option value="FEMALE">FEMALE</option>
                      
                    </select>
                  </div>
                </div>
                
                <div>
                  <label htmlFor="email" className="text-base font-medium text-gray-900">
                    {' '}
                    Email address{' '}
                  </label>
                  <div className="mt-2">
                    <input
                      className="flex h-10 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                      type="email"
                      placeholder="Email"
                      id="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    ></input>
                  </div>
                  
                  {emailError && (
                    <p className="mt-2 text-sm text-red-600">{emailError}</p>
                  )}
                </div>
                <div>
                  <button
                    type="button"
                    onClick={handleSignUp} 
                    className="inline-flex w-full items-center justify-center rounded-md bg-black px-3.5 py-2.5 font-semibold leading-7 text-white hover:bg-black/80"
                  >
                    Create Account <ArrowRight className="ml-2" size={16} />
                  </button>
                  
                </div>
              </div>
            </form>
          </div>
        </div>
      </section>
    </>
  );
}

export default SignUp;
