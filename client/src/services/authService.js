import api from './api';

export const register = (userData) => {
  return api.post('/auth/register', userData);
};

export const login = (credentials) => {
  return api.post('/auth/login', credentials);
};

export const logout = () => {
  return api.post('/auth/logout');
};

export const checkAuthStatus = () => {
  return api.get('/auth/me');
};