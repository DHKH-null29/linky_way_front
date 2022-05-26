import axios from 'axios';

const createInstance = axios.create({
  baseURL: process.env.REACT_APP_MAIN_API || 'http://localhost:8070',
  headers: {
    'content-type': 'application/json',
  },
  timeout: 2000,
});

const createAuthInstance = axios.create({
  baseURL: process.env.REACT_APP_MAIN_API || 'http://localhost:8070',
  headers: {
    'content-type': 'application/json',
    Authorization: localStorage.getItem('act'),
  },
  timeout: 2000,
});

export const requestForAll = createInstance;
export const requestForAuth = createAuthInstance;
