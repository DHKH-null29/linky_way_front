import axios from 'axios';

const createInstance = axios.create({
  baseURL: process.env.REACT_APP_MAIN_API || 'http://localhost:8070',
  timeout: 2000,
});

createInstance.interceptors.request.use(
  config => {
    config.headers['Content-Type'] = 'application/json; charset=utf-8';
    return config;
  },
  error => {
    return Promise.reject(error.response.data);
  },
);

createInstance.interceptors.response.use(
  response => {
    return response.data;
  },
  error => {
    return Promise.reject(error.response.data);
  },
);

const createAuthInstance = axios.create({
  baseURL: process.env.REACT_APP_MAIN_API || 'http://localhost:8070',
  headers: {
    'content-type': 'application/json',
    Authorization: localStorage.getItem('act'),
  },
  timeout: 2000,
});

createAuthInstance.interceptors.request.use(
  config => {
    config.headers['Content-Type'] = 'application/json; charset=utf-8';
    config.headers['Authorization'] = localStorage.getItem('act');
    return config;
  },
  error => {
    return Promise.reject(error.response.data);
  },
);

createAuthInstance.interceptors.response.use(
  response => {
    return response.data;
  },
  error => {
    if (error.response.status === 401) {
      window.location.reload();
    }
    return Promise.reject(error.response.data);
  },
);

export const requestForAll = createInstance;
export const requestForAuth = createAuthInstance;
