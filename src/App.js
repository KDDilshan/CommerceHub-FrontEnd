import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import Login from './components/auth/Login';
import Register from './components/auth/Register';
import AdminRegister from './components/auth/AdminRegister';
import ProductList from './components/products/ProductList';
import ProductDetail from './components/products/ProductDetail';
import ProductCreate from './components/products/ProductCreate';
import ProductEdit from './components/products/ProductEdit';
import UserProfile from './components/products/UserProfile';
import EditProfile from './components/products/EditProfile'; // Import the UserProfile component
import Home from './components/home';

// Protected route component
const ProtectedRoute = ({ children }) => {
  const isAuthenticated = localStorage.getItem('accessToken');
  
  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }
  
  return children;
};

function App() {
  return (
    <Router>
      <div className="flex flex-col min-h-screen">
        <Navbar />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/admin-register" element={<AdminRegister />} />

            <Route path="/products" element={<ProductList />} />
            <Route path="/products/:id" element={<ProductDetail />} />
            <Route 
              path="/products/create" 
              element={
                <ProtectedRoute>
                  <ProductCreate />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/products/edit/:id" 
              element={
                <ProtectedRoute>
                  <ProductEdit />
                </ProtectedRoute>
              } 
            />
            
            {/* Add the profile route */}
            <Route 
              path="/profile" 
              element={
                <ProtectedRoute>
                  <UserProfile />
                </ProtectedRoute>
              } 
            />

            <Route 
              path="/profile/edit" 
              element={
                <ProtectedRoute>
                  <EditProfile />
                </ProtectedRoute>
              } 
            />
            
            {/* Add other routes as needed */}
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;