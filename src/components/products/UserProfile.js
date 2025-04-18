import React, { useState, useEffect } from 'react';
import { getUserProfile } from '../../services/authService'; // Your API function
import { Link, useNavigate } from 'react-router-dom';

const UserProfile = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [products, setProducts] = useState([]);
  const [profileImage, setProfileImage] = useState(null);
  const [userId, setUserId] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const profileData = await getUserProfile(); // Assuming it returns userId, email, etc.
        const { id, email, products } = profileData;

        setUserId(id);
        setEmail(email);
        setProducts(products || []);

        if (id) {
          setProfileImage(`http://localhost:8092/auth/api/user-image/${id}`);
        }

        setLoading(false);
      } catch (err) {
        console.error('Error fetching user profile:', err);
        setError(err.error || 'Failed to load user profile');
        setLoading(false);
      }
    };

    fetchUserProfile();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative my-4" role="alert">
        <strong className="font-bold">Error: </strong>
        <span className="block sm:inline">{error}</span>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto bg-white rounded-lg shadow-md overflow-hidden my-8">
      <div className="p-8">
        <div className="flex flex-col md:flex-row md:items-center mb-6">
          <div className="h-24 w-24 rounded-full bg-gray-200 flex items-center justify-center overflow-hidden mb-4 md:mb-0">
            {profileImage ? (
              <img 
                src={profileImage} 
                alt="Profile" 
                className="h-full w-full object-cover"
              />
            ) : (
              <span className="text-3xl text-gray-600">
                {email?.charAt(0).toUpperCase()}
              </span>
            )}
          </div>
          <div className="md:ml-6">
            <h2 className="text-2xl font-bold mb-2">User Profile</h2>
            <p className="text-gray-700 text-lg">{email}</p>
            <div className="mt-4 flex flex-wrap gap-2">
              <button 
                onClick={() => navigate('/profile/edit')} 
                className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded transition-colors"
              >
                Edit Profile
              </button>
              <button 
                onClick={() => navigate('/profile/change-password')} 
                className="bg-gray-200 hover:bg-gray-300 text-gray-800 px-4 py-2 rounded transition-colors"
              >
                Change Password
              </button>
            </div>
          </div>
        </div>

        <div className="border-t pt-6 mt-6">
          <h3 className="text-xl font-semibold mb-4">Your Products</h3>

          {products.length === 0 ? (
            <div className="bg-gray-50 p-6 rounded-lg text-center">
              <p className="text-gray-500 mb-4">You haven't created any products yet.</p>
              <Link to="/products/create" className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded inline-block transition-colors">
                Create Your First Product
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {products.map((product, index) => (
                <div key={index} className="border rounded-lg overflow-hidden hover:shadow-md transition-shadow">
                  {product.image && (
                    <div className="h-40 overflow-hidden bg-gray-100">
                      <img 
                        src={`data:image/jpeg;base64,${arrayBufferToBase64(product.image)}`} 
                        alt={product.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  )}
                  <div className="p-4">
                    <h4 className="font-bold text-lg">{product.name}</h4>
                    <p className="text-gray-700 mb-2">${product.price?.toFixed(2)}</p>
                    {product.description && (
                      <p className="text-gray-500 text-sm line-clamp-2">{product.description}</p>
                    )}
                    <div className="mt-3 flex justify-end">
                      <Link to={`/products/${product.id}`} className="text-blue-500 hover:text-blue-700 mr-3">
                        View
                      </Link>
                      <Link to={`/products/edit/${product.id}`} className="text-green-500 hover:text-green-700">
                        Edit
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {products.length > 0 && (
            <div className="mt-4 text-center">
              <Link to="/create-product" className="text-blue-500 hover:text-blue-700">
                + Add Another Product
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

// Helper function to convert array buffer to base64
const arrayBufferToBase64 = (buffer) => {
  if (buffer instanceof ArrayBuffer) {
    return btoa(
      new Uint8Array(buffer).reduce((data, byte) => data + String.fromCharCode(byte), '')
    );
  } else if (Array.isArray(buffer)) {
    return btoa(
      new Uint8Array(buffer).reduce((data, byte) => data + String.fromCharCode(byte), '')
    );
  }
  return '';
};

export default UserProfile;
