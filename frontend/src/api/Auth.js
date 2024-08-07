import axios from 'axios';
import { LOCAL_URL, LOCAL_VERIFY_EMAIL_URL } from '../utilities/globals';
import axiosInstance from './AxiosInstance';


// function for user login
const login = async (formData) => {
  try {
    const response = await axios.post(`${LOCAL_URL}api/accounts/login/`, formData);
    console.log(response.data); //debug statement, remove before deployment
    return response.data; 
  } catch (error) {
    console.log(error); //debug statement, remove before deployment
    console.log(error.response.data); //debug statement, remove before deployment
    console.log(error.response.data.detail); //debug statement, remove before deployment
    throw error.response; 
  }
};

// function for user login
const logout = async (token) => {
  try {
    const response = await axios.get(`${LOCAL_URL}/api/accounts/logout/`, {
      headers: {
        Authorization: `Token ${token}`
      }
    });
    return response.data; 
  } catch (error) {
    throw error; 
  }
};

// function for user sign up
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

// function for user account verification //REVIEW
const verifyEmail = async (code) => {
  try {
    const response = await axios.get(`${LOCAL_VERIFY_EMAIL_URL}?code=${code}`);
    return response.data; 
  } catch (error) {
    throw new Error('Email verification failed.'); 
  }
};

// function to get current logged-in users details
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

// function to get QA users
const getQaUsers = async (groupName = 'qa-user') => {
  try {
    const response = await axiosInstance.get(`get_qa_users/`, {
      params: { group_name: groupName }
    });
    console.log("qa users " + response); //debug statement, remove before deployment
    return response.data.users; 
  } catch (error) {
    console.error('Error fetching QA users:', error); //debug statement, remove before deployment
    throw error; 
  }
};

export { login, logout, signUp, verifyEmail, getUserDetails, getQaUsers};
