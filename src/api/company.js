import api from './client';

export const getMyCompany = () => api.get('/companies/me').then((r) => r.data);
export const updateMyCompany = (payload) => api.patch('/companies/me', payload).then((r) => r.data);
export const updateMyDepartments = (departments) => api.patch('/companies/me/departments', { departments }).then((r) => r.data);
export const updateMyStatus = (status) => api.patch('/companies/me/status', { status }).then((r) => r.data);
export const uploadMyLogo = (file) => {
  const formData = new FormData();
  formData.append('logo', file);
  return api.post('/companies/me/logo', formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  }).then((r) => r.data);
};
export const listMyApplications = (params) => api.get('/companies/me/applications', { params }).then((r) => r.data);
export const updateApplicationStatus = (id, status) => api.patch(`/companies/me/applications/${id}`, { status }).then((r) => r.data);
export const getMyViewStats = () => api.get('/companies/me/views').then((r) => r.data);
