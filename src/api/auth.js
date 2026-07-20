import api from './client';

export const registerStudent = (payload) => api.post('/auth/register/student', payload).then((r) => r.data);
export const registerCompany = (payload) => api.post('/auth/register/company', payload).then((r) => r.data);
export const verifyCompany = (token) => api.get(`/auth/verify-company/${token}`).then((r) => r.data);
export const resendCompanyVerification = () => api.post('/auth/verify-company/resend').then((r) => r.data);
export const login = (payload) => api.post('/auth/login', payload).then((r) => r.data);
export const getMe = () => api.get('/auth/me').then((r) => r.data);
