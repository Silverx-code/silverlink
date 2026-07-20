import api from './client';

export const searchCompanies = (params) => api.get('/companies', { params }).then((r) => r.data);
export const getCompany = (id) => api.get(`/companies/${id}`).then((r) => r.data);
export const getCompanyReviews = (id) => api.get(`/companies/${id}/reviews`).then((r) => r.data);
export const addReview = (id, payload) => api.post(`/companies/${id}/reviews`, payload).then((r) => r.data);
export const saveCompany = (id) => api.post(`/students/me/saved-companies/${id}`).then((r) => r.data);
export const unsaveCompany = (id) => api.delete(`/students/me/saved-companies/${id}`).then((r) => r.data);
export const getSavedCompanies = () => api.get('/students/me/saved-companies').then((r) => r.data);
