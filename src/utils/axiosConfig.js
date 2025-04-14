// src/utils/axiosConfig.js
import axios from 'axios';

const API = axios.create({
  baseURL: 'http://localhost:8092', // Change if your backend runs elsewhere
});

// Add Authorization token from localStorage to every request
API.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('accessToken');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor to refresh access token on 401
API.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        const refreshToken = localStorage.getItem('refreshToken');
        const res = await axios.post('http://localhost:8092/auth/api/Refresh', {
          refresh_token: refreshToken,
        });

        if (res.data.access_token) {
          localStorage.setItem('accessToken', res.data.access_token);
          localStorage.setItem('refreshToken', res.data.refresh_token);

          originalRequest.headers.Authorization = `Bearer ${res.data.access_token}`;
          return API(originalRequest);
        }
      } catch (refreshError) {
        window.location.href = '/login'; // Redirect if refresh fails
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);

export default API;
