import axios from 'axios';
import { LOCAL_URL, getToken } from '../utilities/globals';

// creates an Axios instance
const axiosInstance = axios.create({
  baseURL: `${LOCAL_URL}api/tcms/`,
});

// adds a request interceptor to include the token in the headers
axiosInstance.interceptors.request.use(
  (config) => {
    const token = getToken();
    console.log(token);
    // Log the entire config object
    console.log('Request Config:', config);
    if (token) {
      config.headers.Authorization = `Token ${token}`; 
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default axiosInstance;
