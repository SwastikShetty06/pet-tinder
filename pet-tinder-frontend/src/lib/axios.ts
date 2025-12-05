import axios from 'axios';

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || (process.env.NODE_ENV === 'production'
    ? 'https://pet-tinder-96ka.onrender.com/api' // Live backend URL
    : 'http://localhost:5001/api'),
  withCredentials: true,     // ← send cookies on cross-site requests
});

// Add a request interceptor to attach the token
api.interceptors.request.use(
  (config) => {
    const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null;
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export default api;
