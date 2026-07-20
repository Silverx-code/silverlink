import api from './client';

export const getStats = () => api.get('/admin/stats').then((r) => r.data);
export const getAnalytics = () => api.get('/admin/analytics').then((r) => r.data);
export const getPendingCompanies = () => api.get('/admin/companies/pending').then((r) => r.data);
export const verifyCompanyManually = (id) => api.patch(`/admin/companies/${id}/verify`).then((r) => r.data);
export const getUnmoderatedReviews = () => api.get('/admin/reviews/unmoderated').then((r) => r.data);
export const moderateReview = (id, action) => api.patch(`/admin/reviews/${id}/moderate`, { action }).then((r) => r.data);
export const getUniversities = () => api.get('/admin/universities').then((r) => r.data);
export const createUniversity = (payload) => api.post('/admin/universities', payload).then((r) => r.data);
export const createCoordinator = (payload) => api.post('/admin/coordinators', payload).then((r) => r.data);
