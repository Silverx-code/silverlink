import api from './client';

export const searchLocations = (q) => api.get('/locations', { params: { q } }).then((r) => r.data);
export const findOrCreateLocation = (state, city) => api.post('/locations', { state, city }).then((r) => r.data);
