import api from './axios';

export const fetchPets = () => api.get('/pets');
export const createPet = (formData: FormData) => api.post('/pets', formData, { headers: { 'Content-Type': 'multipart/form-data' } });
export const recordSwipe = (petId: string, direction: 'like' | 'pass') =>
  api.post('/swipes', { petId, direction });
export const fetchMatches = () => api.get('/matches');
