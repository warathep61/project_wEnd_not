import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { DataContext } from '../App';

export default function Register() {
  const [name, setName] = useState('');
  const [registerEmail, setRegisterEmail] = useState('');
  const [registerPassword, setRegisterPassword] = useState('');
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [message, setMessage] = useState('');
  const {setToken} = useContext(DataContext);

  const navigate = useNavigate();
  // Function to handle registration
  const handleRegister = async (e) => {
    e.preventDefault(); // Prevent default form submission

    try {
      const response = await fetch('http://127.0.0.1:8000/api/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, email: registerEmail, password: registerPassword }),
      });

      if (response.ok) {
        const data = await response.json();
        setMessage('Successfully registered!'); // Set success message
      } else {
        setMessage('Registration failed!'); // Handle error case
      }
    } catch (error) {
      console.error('Error during registration:', error);
      setMessage('An error occurred during registration.');
    }
  };

  // Function to handle login
  const handleLogin = async (e) => {
    e.preventDefault(); // Prevent default form submission

    try {
      const response = await fetch('http://127.0.0.1:8000/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email: loginEmail, password: loginPassword }),
      });

      if (response.ok) {
        const data = await response.json();
        setToken(data.token)
        setMessage('Successfully logged in!'); // Set success message
        navigate('/admin')

      } else {
        setMessage('Login failed!'); // Handle error case
      }
    } catch (error) {
      console.error('Error during login:', error);
      setMessage('An error occurred during login.');
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="w-full max-w-4xl bg-white shadow-lg rounded-lg p-6 flex">
        {/* Register Form */}
        <div className="w-1/2 border-r-2 pr-6">
          <h2 className="text-2xl font-bold mb-6">Register</h2>
          <form onSubmit={handleRegister}>
            <div className="mb-4">
              <label className="block text-gray-700 mb-2" htmlFor="name">Name</label>
              <input
                type="text"
                id="name"
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-blue-500"
                placeholder="Enter your name"
                value={name}
                onChange={(e) => setName(e.target.value)} // Update name state
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 mb-2" htmlFor="register-email">Email</label>
              <input
                type="email"
                id="register-email"
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-blue-500"
                placeholder="Enter your email"
                value={registerEmail}
                onChange={(e) => setRegisterEmail(e.target.value)} // Update email state
              />
            </div>
            <div className="mb-6">
              <label className="block text-gray-700 mb-2" htmlFor="register-password">Password</label>
              <input
                type="password"
                id="register-password"
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-blue-500"
                placeholder="Enter your password"
                value={registerPassword}
                onChange={(e) => setRegisterPassword(e.target.value)} // Update password state
              />
            </div>
            <button className="w-full bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600">
              Register
            </button>
          </form>
        </div>

        {/* Login Form */}
        <div className="w-1/2 pl-6">
          <h2 className="text-2xl font-bold mb-6">Login</h2>
          <form onSubmit={handleLogin}>
            <div className="mb-4">
              <label className="block text-gray-700 mb-2" htmlFor="login-email">Email</label>
              <input
                type="email"
                id="login-email"
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-blue-500"
                placeholder="Enter your email"
                value={loginEmail}
                onChange={(e) => setLoginEmail(e.target.value)} // Update login email state
              />
            </div>
            <div className="mb-6">
              <label className="block text-gray-700 mb-2" htmlFor="login-password">Password</label>
              <input
                type="password"
                id="login-password"
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-blue-500"
                placeholder="Enter your password"
                value={loginPassword}
                onChange={(e) => setLoginPassword(e.target.value)} // Update login password state
              />
            </div>
            <button className="w-full bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600">
              Login
            </button>
          </form>
        </div>
      </div>

      {/* Message Display */}
      {message && (
        <div className="mt-4 text-center text-green-600 font-semibold">
          {message}
        </div>
      )}
    </div>
  );
}
