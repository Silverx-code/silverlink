import api from './client';

export const getCaptchaChallenge = () => api.get('/auth/captcha').then((r) => r.data);
