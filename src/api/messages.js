import api from './client';

export const getMessages = (applicationId) => api.get(`/applications/${applicationId}/messages`).then((r) => r.data);
export const sendMessageRest = (applicationId, body) => api.post(`/applications/${applicationId}/messages`, { body }).then((r) => r.data);
