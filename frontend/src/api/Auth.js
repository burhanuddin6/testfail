import axios from 'axios';
import { LOCAL_URL, LOCAL_VERIFY_EMAIL_URL } from '../utilities/globals';


const login = async (formData) => {
  try {
    const response = await axios.post(`${LOCAL_URL}api/accounts/login/`, formData);
    console.log(response.data);
    return response.data; 
  } catch (error) {
    
    console.log(error); //debug statement, remove before deployment
    console.log(error.response.data); //debug statement, remove before deployment
    console.log(error.response.data.detail); //debug statement, remove before deployment
    throw error.response; 
  }
};

const signUp = async ({ firstName, lastName, workEmail, password }) => {
  try {
    const response = await axios.post(`${LOCAL_URL}api/accounts/signup/`, {
      email: workEmail,
      password: password,
      first_name: firstName,
      last_name: lastName,
    });
    return response.data; 
  } catch (error) {
    console.log(error); //debug statement, remove before deployment
    console.log(error.response.data); //debug statement, remove before deployment
    console.log(error.response.data.detail); //debug statement, remove before deployment
    if (error.response.status === 400 && error.response.data.detail === 'Email address already taken.') {
      throw new Error('Email is already in use. Please use a different email.');
    } else {
      throw new Error('Failed to create account. Please try again later.');
    }
  }
};

const verifyEmail = async (code) => {
  try {
    const response = await axios.get(`${LOCAL_VERIFY_EMAIL_URL}?code=${code}`);
    return response.data; 
  } catch (error) {
    throw new Error('Email verification failed.'); 
  }
};

const getUserDetails = async (token) => {
  try {
    const response = await axios.get(`${LOCAL_URL}/api/accounts/users/me`, {
      headers: {
        Authorization: `Token ${token}`
      }
    });

    return response.data; 
  } catch (error) {
    throw error; 
  }
};

export { login, signUp, verifyEmail, getUserDetails };
