import api from './client';

export const getMyUniversity = () => api.get('/coordinators/me').then((r) => r.data);
export const getMyUniversityStats = () => api.get('/coordinators/me/stats').then((r) => r.data);
export const getMyStudents = (params) => api.get('/coordinators/me/students', { params }).then((r) => r.data);
export const getRecommendedCompanies = () => api.get('/coordinators/me/recommended-companies').then((r) => r.data);
