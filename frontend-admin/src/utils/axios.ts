import axios from 'axios';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  //   baseURL: 'http://localhost:8090/api',
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token'); // si guarsde mi token en localstorage utizilo el nombre con el que lo guarde.
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;
