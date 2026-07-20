import api from './client';

export const applyToCompany = (companyId, coverNote) => api.post(`/companies/${companyId}/applications`, { coverNote }).then((r) => r.data);
export const getMyApplications = () => api.get('/students/me/applications').then((r) => r.data);
export const getRecommendations = () => api.get('/students/me/recommendations').then((r) => r.data);
export const uploadMyCv = (file) => {
  const formData = new FormData();
  formData.append('cv', file);
  return api.post('/students/me/cv', formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  }).then((r) => r.data);
};
