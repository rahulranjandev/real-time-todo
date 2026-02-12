import axios from 'axios';

const host = import.meta.env.VITE_API_HOST;

const instance = axios.create({
  baseURL: host,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const getBanners = () => instance.get('/photostory');

export const updateBanner = (data) =>
  instance.post('/photostory', data, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
