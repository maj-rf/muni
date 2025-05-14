import axios from 'axios';

export const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL
    ? import.meta.env.VITE_API_URL + '/api/v1'
    : 'http://localhost:8081/api/v1',
  withCredentials: true,
});
