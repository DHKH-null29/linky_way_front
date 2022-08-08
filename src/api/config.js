import { ERROR_CODE } from '../constants/status';
import { TOKEN_INFO } from '../constants/tokens';
import axios from 'axios';

const ACCESS_TOKEN_NAME = TOKEN_INFO.ACCESS_TOKEN_NAME;

const createInstance = axios.create({
  baseURL: process.env.REACT_APP_MAIN_API || 'http://localhost:8070',
  withCredentials: true,
  timeout: 10000,
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
    Authorization: localStorage.getItem(ACCESS_TOKEN_NAME),
  },
  withCredentials: true,
  timeout: 10000,
});

createAuthInstance.interceptors.request.use(
  config => {
    config.headers['Content-Type'] = 'application/json; charset=utf-8';
    config.headers['Authorization'] = localStorage.getItem(ACCESS_TOKEN_NAME);
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
    if (error.response.status === ERROR_CODE.UNAUTHORIZED) {
      setTimeout(() => (window.location.href = '/login'), 150);
      return;
    }
    return Promise.reject(error.response.data);
  },
);

export const pagingRequestWrapper = async fn => {
  const result = await fn().then(response => response.data);
  return {
    data: result.content,
    hasNext: result.hasNext,
    next: result.lastIndex,
  };
};

export const requestForAll = createInstance;
export const requestForAuth = createAuthInstance;
