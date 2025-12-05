import axios from 'axios';

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || (process.env.NODE_ENV === 'production'
    ? 'https://pet-tinder-96ka.onrender.com/api' // Live backend URL
    : 'http://localhost:5001/api'),
  withCredentials: true,     // ← send cookies on cross-site requests
});

export default api;
