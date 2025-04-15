import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createProduct } from './../../services/productService'; 

const ProductCreate = () => {
  const [productData, setProductData] = useState({
    description: '',
    price: '',
    manufacturer:'',
    region: '',
    category: '',
  });

  const [image, setImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
  
    setProductData(prevData => ({
      ...prevData,
      [name]: name === 'price' ? (value === '' ? '' : parseFloat(value)) : value
    }));
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
    setLoading(true);
    setError('');
  
    try {
      const newProduct = await createProduct(productData, image);
      navigate(`/products/${newProduct.id}`);
    } catch (err) {
      setError('Failed to create product. Please try again.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };
  

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Create New Product</h1>

      {error && (
        <div className="mb-4 p-3 bg-red-100 text-red-700 rounded">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow-lg p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

          <div className="md:col-span-2">
            <label htmlFor="name" className="block text-gray-700 font-semibold mb-2">
              Product manufacturer
            </label>
            <input
                type="text"
                id="manufacturer"
                name="manufacturer"
                value={productData.manufacturer}
                onChange={handleChange}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
              />
          </div>

          <div className="md:col-span-2">
            <label htmlFor="description" className="block text-gray-700 font-semibold mb-2">
              Description *
            </label>
            <textarea
              id="description"
              name="description"
              rows="4"
              value={productData.description}
              onChange={handleChange}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
            ></textarea>
          </div>

          <div>
            <label htmlFor="price" className="block text-gray-700 font-semibold mb-2">
              Price *
            </label>
            <input
              type="number"
              id="price"
              name="price"
              step="0.01"
              min="0"
              value={productData.price}
              onChange={handleChange}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
            />
          </div>

          
          <div>
            <label htmlFor="category" className="block text-gray-700 font-semibold mb-2">
              Category
            </label>
            <input
              type="text"
              id="category"
              name="category"
              value={productData.category}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
            />
          </div>

          <div>
            <label htmlFor="region" className="block text-gray-700 font-semibold mb-2">
                    Region
            </label>
                  <input
                    type="text"
                    id="region"
                    name="region"
                    value={productData.region}
                    onChange={handleChange}
                    placeholder="e.g. US"
                    className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
                />
            </div>


          <div className="md:col-span-2">
            <label htmlFor="image" className="block text-gray-700 font-semibold mb-2">
              Product Image
            </label>
            <input
              type="file"
              id="image"
              accept="image/*"
              onChange={handleImageChange}
              className="w-full"
            />
            {imagePreview && (
              <div className="mt-2">
                <img 
                  src={imagePreview} 
                  alt="Product preview" 
                  className="h-40 object-contain"
                />
              </div>
            )}
          </div>
        </div>

        <div className="mt-8 flex justify-end space-x-4">
          <button
            type="button"
            onClick={() => navigate('/products')}
            className="px-4 py-2 bg-gray-300 text-gray-700 rounded hover:bg-gray-400"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={loading}
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 disabled:bg-blue-300"
          >
            {loading ? 'Creating...' : 'Create Product'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default ProductCreate;
