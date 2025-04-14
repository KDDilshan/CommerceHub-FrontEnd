import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  getAllProducts, 
  searchProducts, 
  getProductsSortedByPrice, 
  getProductsSortedByName,
  deleteProduct,
  getProductImageUrl
} from '../../services/productService';

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [sortMethod, setSortMethod] = useState('default');
  const [limit, setLimit] = useState(5);

  const fetchProducts = async () => {
    setLoading(true);
    try {
      let data;
      switch (sortMethod) {
        case 'price-asc':
          data = await getProductsSortedByPrice('asc');
          break;
        case 'price-desc':
          data = await getProductsSortedByPrice('desc');
          break;
        case 'name-asc':
          data = await getProductsSortedByName('asc');
          break;
        case 'name-desc':
          data = await getProductsSortedByName('desc');
          break;
        default:
          data = await getAllProducts(limit);
      }
      setProducts(data);
    } catch (err) {
      setError('Failed to load products. Please try again later.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = async () => {
    if (!searchTerm.trim()) {
      fetchProducts();
      return;
    }
    
    setLoading(true);
    try {
      const data = await searchProducts(searchTerm);
      setProducts(data);
    } catch (err) {
      setError('Search failed. Please try again.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleSortChange = (e) => {
    setSortMethod(e.target.value);
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      try {
        await deleteProduct(id);
        setProducts(products.filter(product => product.id !== id));
      } catch (err) {
        setError('Failed to delete product. Please try again.');
        console.error(err);
      }
    }
  };

  useEffect(() => {
    fetchProducts();
  }, [sortMethod, limit]);

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Products</h1>
        <Link 
          to="/products/create" 
          className="bg-green-500 hover:bg-green-600 text-white py-2 px-4 rounded"
        >
          Add New Product
        </Link>
      </div>
      
      {error && (
        <div className="mb-4 p-3 bg-red-100 text-red-700 rounded">
          {error}
        </div>
      )}
      
      <div className="mb-6 flex flex-wrap gap-4">
        <div className="flex-1 min-w-[300px]">
          <div className="flex">
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search products..."
              className="flex-1 px-3 py-2 border border-gray-300 rounded-l focus:outline-none focus:border-blue-500"
            />
            <button
              onClick={handleSearch}
              className="bg-blue-500 text-white py-2 px-4 rounded-r hover:bg-blue-600"
            >
              Search
            </button>
          </div>
        </div>
        
        <div className="flex flex-wrap gap-4">
          <div>
            <select
              value={sortMethod}
              onChange={handleSortChange}
              className="px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
            >
              <option value="default">Sort by</option>
              <option value="price-asc">Price: Low to High</option>
              <option value="price-desc">Price: High to Low</option>
              <option value="name-asc">Name: A to Z</option>
              <option value="name-desc">Name: Z to A</option>
            </select>
          </div>
          
          <div>
            <select
              value={limit}
              onChange={(e) => setLimit(Number(e.target.value))}
              className="px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
            >
              <option value={5}>Show 5</option>
              <option value={10}>Show 10</option>
              <option value={20}>Show 20</option>
              <option value={50}>Show 50</option>
            </select>
          </div>
        </div>
      </div>
      
      {loading ? (
        <div className="text-center py-10">
          <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-blue-500 border-r-transparent"></div>
          <p className="mt-2">Loading products...</p>
        </div>
      ) : products.length === 0 ? (
        <div className="text-center py-10">
          <p className="text-gray-500">No products found.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {products.map((product) => (
            <div key={product.id} className="border rounded-lg overflow-hidden shadow-lg bg-white">
              <div className="h-48 bg-gray-200 relative">
                <img 
                  src={getProductImageUrl(product.id)} 
                  alt={product.name} 
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    e.target.src = 'https://via.placeholder.com/300x200?text=No+Image';
                  }}
                />
              </div>
              <div className="p-4">
                <h2 className="text-xl font-semibold mb-2">{product.name}</h2>
                <p className="text-gray-600 mb-2 line-clamp-2">{product.description}</p>
                <p className="text-lg font-bold text-blue-600 mb-4">${product.price.toFixed(2)}</p>
                <div className="flex space-x-2">
                  <Link 
                    to={`/products/${product.id}`} 
                    className="flex-1 bg-blue-500 hover:bg-blue-600 text-white py-2 px-3 rounded text-center"
                  >
                    View
                  </Link>
                  <Link 
                    to={`/products/edit/${product.id}`} 
                    className="flex-1 bg-yellow-500 hover:bg-yellow-600 text-white py-2 px-3 rounded text-center"
                  >
                    Edit
                  </Link>
                  <button 
                    onClick={() => handleDelete(product.id)}
                    className="flex-1 bg-red-500 hover:bg-red-600 text-white py-2 px-3 rounded"
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ProductList;