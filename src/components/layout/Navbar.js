import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { logout } from '../../services/authService';

const Navbar = () => {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem('user')) || null;
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const handleLogout = async () => {
    try {
      await logout();
      navigate('/login');
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  return (
    <nav className="bg-blue-600 text-white shadow-md">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center py-4">
          <Link to="/" className="text-2xl font-bold">CommerceHub</Link>

          <div className="flex items-center space-x-6">
            <Link to="/products" className="hover:text-blue-200 transition">Products</Link>

            {!user ? (
              <>
                <Link to="/login" className="hover:text-blue-200 transition">Login</Link>
                <Link to="/register" className="hover:text-blue-200 transition">Register</Link>
              </>
            ) : (
              <div className="flex items-center space-x-6">
                {user.role === 'ADMIN' && (
                  <Link to="/admin" className="hover:text-blue-200 transition">Admin Panel</Link>
                )}

                {/* Wrap button + dropdown in one container */}
                <div
                  className="relative"
                  onMouseEnter={() => setDropdownOpen(true)}
                  onMouseLeave={() => setDropdownOpen(false)}
                >
                  <div className="flex items-center cursor-pointer hover:text-blue-200 transition">
                    <span>{user.username}</span>
                    <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                    </svg>
                  </div>

                  {/* DROPDOWN MENU */}
                  {dropdownOpen && (
                    <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-10">
                      <Link to="/profile" className="block px-4 py-2 text-gray-800 hover:bg-blue-500 hover:text-white">
                        Profile
                      </Link>
                      <button
                        onClick={handleLogout}
                        className="block w-full text-left px-4 py-2 text-gray-800 hover:bg-blue-500 hover:text-white"
                      >
                        Logout
                      </button>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
