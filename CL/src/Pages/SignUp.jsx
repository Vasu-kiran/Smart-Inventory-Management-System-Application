import React, { useState } from 'react';
import apiService from '../layers/Service';
import { useNavigate, Link } from 'react-router-dom';
import { Navbar } from '../Components/Navbar';

const SignUp = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  // const [role, setRole] = useState('');
  const [mobileNumber, setMobileNumber] = useState('');
  const [gender, setGender] = useState('');
  const [email, setEmail] = useState('');

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
      // role,
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
      <div>
        <div className="bg-blue-400 p-10 text-black text-center">
          <h1 className="text-4xl font-bold mb-4">Register Now !</h1>

          <form onSubmit={handleSignUp} className="max-w-md mx-auto mt-[50px]">
            <div className="mb-4">
              <label htmlFor="username" className="block text-sm font-bold mb-2">
                Username:
                <input
                  type="text"
                  id="username"
                  className="w-full border rounded py-2 px-3 focus:outline-none focus:border-blue-500"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="Enter your username"
                  required
                />
              </label>
            </div>

            <div className="mb-4">
              <label htmlFor="password" className="block text-sm font-bold mb-2 mt-[40px]">
                Password:
                <input
                  type="password"
                  id="password"
                  className={`w-full border rounded py-2 px-3 focus:outline-none focus:border-blue-500 ${
                    passwordError ? 'border-red-500' : ''
                  }`}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your password"
                  required
                />
              </label>
              {passwordError && <p className="text-black text-md italic">{passwordError}</p>}
            </div>

            {/* <div className="mb-4">
              <label htmlFor="role" className="block text-sm font-bold mb-2 mt-[40px]">
                Role:
                <select
                  name="role"
                  className="w-full border rounded py-2 px-3 focus:outline-none focus:border-blue-500"
                  value={role}
                  onChange={(e) => setRole(e.target.value)}
                  placeholder="Select role"
                  required
                >
                  <option value="">Select Role</option>
                  <option value="ADMIN">ADMIN</option>
                  <option value="MANAGER">MANAGER</option>
                  <option value="GUEST">GUEST</option>
                </select>
              </label>
            </div> */}

            <div className="mb-4">
              <label htmlFor="mobileNumber" className="block text-sm font-bold mb-2 mt-[40px]">
                Mobile:
                <input
                  type="number"
                  id="mobileNumber"
                  className={`w-full border rounded py-2 px-3 focus:outline-none focus:border-blue-500 ${
                    mobileNumberError ? 'border-red-500' : ''
                  }`}
                  value={mobileNumber}
                  onChange={(e) => setMobileNumber(e.target.value)}
                  placeholder="Enter your mobile number"
                  required
                />
              </label>
              {mobileNumberError && <p className="text-red-500 text-xs italic">{mobileNumberError}</p>}
            </div>

            <div className="mb-4">
              <label htmlFor="gender" className="block text-sm font-bold mb-2 mt-[40px]">
                Gender:
                <select
                  name="gender"
                  className="w-full border rounded py-2 px-3 focus:outline-none focus:border-blue-500"
                  value={gender}
                  onChange={(e) => setGender(e.target.value)}
                  placeholder="Select gender"
                  required
                >
                  <option value="">Select Gender</option>
                  <option value="MALE">MALE</option>
                  <option value="FEMALE">FEMALE</option>
                </select>
              </label>
            </div>

            <div className="mb-4">
              <label htmlFor="email" className="block text-sm font-bold mb-2 mt-[40px]">
                Email:
                <input
                  type="email"
                  id="email"
                  className={`w-full border rounded py-2 px-3 focus:outline-none focus:border-blue-500 ${
                    emailError ? 'border-red-500' : ''
                  }`}
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  required
                />
              </label>
              {emailError && <p className="text-red-500 text-xs italic">{emailError}</p>}
            </div>

            <div>
              <button
                type="submit"
                className="bg-blue-400 hover:bg-blue-700 text-black font-bold py-2 px-4 rounded"
              >
                Sign Up
              </button>
              <Link
                to="/"
                className="bg-blue-400 hover:bg-blue-700 text-black font-bold py-2 px-4 rounded"
              >
                Home
              </Link>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default SignUp;
