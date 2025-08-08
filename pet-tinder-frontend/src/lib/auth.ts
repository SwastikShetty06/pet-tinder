import api from './axios';

export const login = (email: string, password: string) => api.post('/auth/login', { email, password });
export const signup = (name: string, email: string, password: string) => api.post('/auth/signup', { name, email, password });
export const getMe = () => api.get('/auth/me');
export const logout = () => api.post('/auth/logout');
