import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getProductById, updateProduct, uploadProductImage, getProductImageUrl } from '../../services/productService';

const ProductEdit = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  
  const [productData, setProductData] = useState({
    description: '',
    price: '',
    region:'',
    manufacturer: '',
  });
  
  const [image, setImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const data = await getProductById(id);
        setProductData({
          description: data.description || '',
          price: data.price || '',
          region: data.region || '',
          manufacturer: data.manufacturer || '',
        });
        
        // Set the image preview from existing product image
        setImagePreview(getProductImageUrl(id));
      } catch (err) {
        setError('Failed to load product details. Please try again.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProductData({
      ...productData,
      [name]: name === 'price' || name === 'quantity' ? parseFloat(value) || '' : value
    });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setError('');

    try {
      // First update the product
      await updateProduct(id, productData);
      
      // Then upload the new image if one was selected
      if (image) {
        await uploadProductImage(id, image);
      }
      
      navigate(`/products/${id}`);
    } catch (err) {
      setError('Failed to update product. Please try again.');
      console.error(err);
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-blue-500 border-r-transparent"></div>
        <p className="ml-2">Loading product details...</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Edit Product</h1>
      
      {error && (
        <div className="mb-4 p-3 bg-red-100 text-red-700 rounded">
          {error}
        </div>
      )}
      
      <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow-lg p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
         
          
          <div className="md:col-span-2">
            <label className="block text-gray-700 font-semibold mb-2" htmlFor="description">
              Description *
            </label>
            <textarea
              className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
              id="description"
              name="description"
              rows="4"
              value={productData.description}
              onChange={handleChange}
              required
            ></textarea>
          </div>

          <div>
            <label className="block text-gray-700 font-semibold mb-2" htmlFor="region">
              Region
            </label>
            <input
              className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
              type="text"
              id="region"
              name="region"
              value={productData.region}
              onChange={handleChange}
            />
          </div>

          <div>
            <label className="block text-gray-700 font-semibold mb-2" htmlFor="manufacturer">
              Manufacturer
            </label>
            <input
              className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
              type="text"
              id="manufacturer"
              name="manufacturer"
              value={productData.manufacturer}
              onChange={handleChange}
            />
          </div>

          
          <div>
            <label className="block text-gray-700 font-semibold mb-2" htmlFor="price">
              Price *
            </label>
            <input
              className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
              type="number"
              id="price"
              name="price"
              step="0.01"
              min="0"
              value={productData.price}
              onChange={handleChange}
              required
            />
          </div>
          
        
          
          <div className="md:col-span-2">
            <label className="block text-gray-700 font-semibold mb-2" htmlFor="image">
              Product Image
            </label>
            <input
              className="w-full"
              type="file"
              id="image"
              accept="image/*"
              onChange={handleImageChange}
            />
            {imagePreview && (
              <div className="mt-2">
                <img 
                  src={imagePreview} 
                  alt="Product preview" 
                  className="h-40 object-contain"
                  onError={(e) => {
                    e.target.src = 'https://via.placeholder.com/300x200?text=No+Image';
                  }}
                />
              </div>
            )}
          </div>
        </div>
        
        <div className="mt-8 flex justify-end space-x-4">
          <button
            type="button"
            onClick={() => navigate(`/products/${id}`)}
            className="px-4 py-2 bg-gray-300 text-gray-700 rounded hover:bg-gray-400"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={submitting}
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 disabled:bg-blue-300"
          >
            {submitting ? 'Saving...' : 'Save Changes'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default ProductEdit;