import api from './api';

export const getAllTemplates = (params) => {
  return api.get('/templates', { params });
};

export const getTemplateById = (templateId) => {
  return api.get(`/templates/${templateId}`);
};

export const getMyFavorites = () => {
  return api.get('/favorites');
};

export const addFavorite = (templateId) => {
  return api.post(`/favorites/${templateId}`);
};

export const removeFavorite = (templateId) => {
  return api.delete(`/favorites/${templateId}`);
};