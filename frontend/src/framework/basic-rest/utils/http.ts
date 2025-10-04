import axios from 'axios';
import { getToken } from './get-token';

const http = axios.create({
  baseURL: process.env.NEXT_PUBLIC_REST_API_ENDPOINT,
  timeout: 30000,
  withCredentials: true,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
});

// Change request data/error here
http.interceptors.request.use(
  (config) => {
    const token = getToken();
    config.headers = {
      ...config.headers,
      Authorization: `JWT ${token ? token : ''}`,
    };
    return config;
  },
  (error) => {
    return console.log(error);
  }
);

export default http;
