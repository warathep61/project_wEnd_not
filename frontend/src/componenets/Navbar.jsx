import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { DataContext } from '../App';

export default function Navbar() {
    const {token, setToken} = useContext(DataContext);
    const navigate = useNavigate();

    const logout = () => {
        fetch('http://127.0.0.1:8000/api/logout' , {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`
            }
        }).then(() => {
            setToken("")
            navigate('/');
        })
    }
  return (
    <div>
        {token ? (
            <nav className="bg-green-600 p-4 shadow-md mt-10 ml-10 mr-10">
            <div className="container mx-auto flex justify-between items-center">
              <div className="text-white text-xl font-bold">
                Admin 
              </div>
              <ul className="flex space-x-6">
                <li>
                  <Link to="/" className="text-white hover:text-gray-300">
                    Home
                  </Link>
                </li>
                <li>
                  <Link to="/admin" className="text-white hover:text-gray-300">
                    Admin
                  </Link>
                </li>
                <li>
                  <Link onClick={logout} className="text-red-400 hover:text-gray-300">
                    Logout
                  </Link>
                </li>
              </ul>
            </div>
          </nav>
        ) : (
            <nav className="bg-green-600 p-4 shadow-md mt-10 ml-10 mr-10">
            <div className="container mx-auto flex justify-between items-center">
              <div className="text-white text-xl font-bold">
                My Website
              </div>
              <ul className="flex space-x-6">
                <li>
                  <Link to="/" className="text-white hover:text-gray-300">
                    Home
                  </Link>
                </li>
                <li>
                  <Link to="/register" className="text-white hover:text-gray-300">
                    Register
                  </Link>
                </li>
              </ul>
            </div>
          </nav>
        )}
    </div>
  );
}
