import axios from 'axios';

const localAxios = axios.create({
  baseURL: 'http://127.0.0.1:8000/',
});

localAxios.defaults.headers.post['Content-Type'] = 'application/json';
localAxios.defaults.headers.post['Accept'] = 'application/json';

localAxios.defaults.withCredentials = true;

localAxios.interceptors.request.use(function (config) {
  const token = localStorage.getItem('auth_token');
  config.headers.Authorization = token ? `Bearer ${token} ` : '';
  return config;
});

export default localAxios;
