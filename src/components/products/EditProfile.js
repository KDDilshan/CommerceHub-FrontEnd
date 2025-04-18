import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const EditProfile = () => {
  const [user, setUser] = useState({
    id: null,
    username: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [profileImage, setProfileImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState('');
  const navigate = useNavigate();

  // Get user info when component mounts
  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const token = localStorage.getItem('accessToken');
        
        if (!token) {
          navigate('/login');
          return;
        }

        const response = await axios.get('http://localhost:8092/auth/api/user/profile', {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });

        // Extract user ID and email from response
        const userData = response.data;
        
        // Set user state with existing data
        setUser({
          id: userData.id || null, // Make sure you have id in your UserProfileResponse
          username: userData.username || '',
          email: userData.email || '',
          password: '',
          confirmPassword: ''
        });

        if (userData.id) {
            try {
              const imageResponse = await axios.get(`http://localhost:8092/auth/api/user-image/${userData.id}`, {
                headers: {
                  'Authorization': `Bearer ${token}`
                },
                responseType: 'arraybuffer'
              });
          
              const base64Image = btoa(
                new Uint8Array(imageResponse.data).reduce((data, byte) => data + String.fromCharCode(byte), '')
              );
              setImagePreview(`data:image/png;base64,${base64Image}`);
            } catch (imgError) {
              console.log('No profile image found or error loading image');
            }
          }
          

        setLoading(false);
      } catch (err) {
        console.error('Error fetching user profile:', err);
        setError('Failed to load user profile. Please try again later.');
        setLoading(false);
      }
    };

    fetchUserProfile();
  }, [navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser(prevUser => ({
      ...prevUser,
      [name]: value
    }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setProfileImage(file);
      
      // Create preview
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setSuccessMessage('');
    
    // Validate form
    if (user.password !== user.confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    try {
      setLoading(true);
      const token = localStorage.getItem('accessToken');
      
      // Update user details
      if (user.id) {
        const userUpdateData = {
          username: user.username,
          email: user.email
        };
        
        // Only include password if it's provided
        if (user.password) {
          userUpdateData.password = user.password;
        }
        
        await axios.put(`http://localhost:8092/auth/api/update/${user.id}`, userUpdateData, {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        });
        
        // Upload profile image if selected
        if (profileImage) {
          const formData = new FormData();
          formData.append('file', profileImage);
          
          await axios.post(`http://localhost:8092/auth/api/user-image/upload/${user.id}`, formData, {
            headers: {
              'Authorization': `Bearer ${token}`,
              'Content-Type': 'multipart/form-data'
            }
          });
        }
        
        setSuccessMessage('Profile updated successfully!');
        
        // Clear password fields after successful update
        setUser(prev => ({
          ...prev,
          password: '',
          confirmPassword: ''
        }));
      }
    } catch (err) {
      console.error('Error updating profile:', err);
      setError(err.response?.data?.error || 'Failed to update profile. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  if (loading && user.id === null) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto bg-white rounded-lg shadow-md overflow-hidden my-8 p-8">
      <h2 className="text-2xl font-bold mb-6 text-center">Edit Profile</h2>
      
      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4" role="alert">
          <span className="block sm:inline">{error}</span>
        </div>
      )}
      
      {successMessage && (
        <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative mb-4" role="alert">
          <span className="block sm:inline">{successMessage}</span>
        </div>
      )}
      
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Profile Image */}
        <div className="flex flex-col items-center mb-6">
          <div className="h-32 w-32 rounded-full bg-gray-200 flex items-center justify-center overflow-hidden mb-4">
            {imagePreview ? (
              <img src={imagePreview} alt="Profile Preview" className="h-full w-full object-cover" />
            ) : (
              <span className="text-4xl text-gray-600">{user.username?.charAt(0).toUpperCase() || user.email?.charAt(0).toUpperCase()}</span>
            )}
          </div>
          
          <label className="block mb-2 cursor-pointer">
            <span className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded transition-colors">
              {imagePreview ? 'Change Photo' : 'Upload Photo'}
            </span>
            <input 
              type="file" 
              accept="image/*" 
              className="hidden" 
              onChange={handleImageChange} 
            />
          </label>
        </div>
        
        {/* Username */}
        <div>
          <label htmlFor="username" className="block mb-2 text-sm font-medium text-gray-700">
            Username
          </label>
          <input 
            type="text" 
            id="username" 
            name="username" 
            value={user.username} 
            onChange={handleChange} 
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" 
            required 
          />
        </div>
        
        {/* Email */}
        <div>
          <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-700">
            Email
          </label>
          <input 
            type="email" 
            id="email" 
            name="email" 
            value={user.email} 
            onChange={handleChange} 
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" 
            required 
          />
        </div>
        
        {/* Password */}
        <div>
          <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-700">
            New Password (leave blank to keep current)
          </label>
          <input 
            type="password" 
            id="password" 
            name="password" 
            value={user.password} 
            onChange={handleChange} 
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" 
          />
        </div>
        
        {/* Confirm Password */}
        <div>
          <label htmlFor="confirmPassword" className="block mb-2 text-sm font-medium text-gray-700">
            Confirm New Password
          </label>
          <input 
            type="password" 
            id="confirmPassword" 
            name="confirmPassword" 
            value={user.confirmPassword} 
            onChange={handleChange} 
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" 
          />
        </div>
        
        {/* Buttons */}
        <div className="flex justify-between">
          <button 
            type="button" 
            onClick={() => navigate('/profile')} 
            className="px-6 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300 transition-colors"
          >
            Cancel
          </button>
          <button 
            type="submit" 
            className="px-6 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors"
            disabled={loading}
          >
            {loading ? 'Saving...' : 'Save Changes'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditProfile;