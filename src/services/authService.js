import API from '../utils/axiosConfig';
import axios from 'axios';

const API_URLS = 'http://localhost:8092';

export const register = async (userData) => {
  try {
    const response = await API.post(`${API_URLS}/auth/api/register`, userData);
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

export const login = async (credentials) => {
  try {
    const response = await API.post(`${API_URLS}/auth/api/login`, credentials);
    if (response.data.token) {
      localStorage.setItem('accessToken', response.data.token);
      localStorage.setItem('refreshToken', response.data.refreshToken);
      
      const user = {
        username: response.data.username,
        role: response.data.roles[0].name 
      };
    
      localStorage.setItem('user', JSON.stringify(user));
    }
    return response.data;
  } catch (error) {
    throw error.response.data|| {error: 'Login failed. Please check your credentials.'};
  }

};

const APIs = axios.create({
  baseURL: 'http://localhost:8092', 
});

APIs.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('accessToken');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export default APIs;


export const registerAdmin = async (userData) => {
  try {
    const response = await API.post('/auth/api/Admin_Register', userData);
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

export const logout = async () => {
  try {
    await API.post('/auth/api/Logout');
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
    localStorage.removeItem('user');
  } catch (error) {
    console.error('Logout error:', error);
    // Still clear local storage even if server logout fails
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
    localStorage.removeItem('user');
  }
};
