/**
 * Axios Instance Configuration
 * 
 * This module exports a pre-configured Axios instance for making HTTP requests to the 
 * TCMS API. It sets up the base URL for the API and includes an interceptor to 
 * automatically attach an authorization token to the request headers if available.
 * 
 * - **Base URL**: The base URL for all requests is set to `${LOCAL_URL}api/tcms/`.
 * - **Request Interceptor**: Adds an authorization token to the headers of each request.
 * 
 * **Setup and Usage**:
 * 
 * 1. **Base URL**: The instance is configured with a base URL, which means that you 
 *    only need to provide the endpoint path when making requests. For example, to 
 *    request `/users/`, you would use `axiosInstance.get('/users/')`.
 * 
 * 2. **Authorization Token**: The request interceptor checks for an authorization 
 *    token obtained from `getToken()` and includes it in the `Authorization` header 
 *    of the request if it is present. This is useful for authenticated endpoints.
 * 
 * **Dependencies**:
 * - `axios`: HTTP client used for making requests.
 * - `../utilities/globals`: Contains `LOCAL_URL` and `getToken()` function.
 */

import axios from 'axios';
import { LOCAL_URL, getToken } from '../utilities/globals';

const axiosInstance = axios.create({
  baseURL: `${LOCAL_URL}api/tcms/`,
});

axiosInstance.interceptors.request.use(
  (config) => {
    const token = getToken();
    console.log(token); //debug statement, remove before deployment
    console.log('Request Config:', config); //debug statement, remove before deployment
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
