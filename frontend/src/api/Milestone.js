// import axios from 'axios';
// import { LOCAL_URL, getToken } from '../utilities/globals';


// // api endpoint for milestone creation
// const createMilestone = async (milestoneData) => {
//   const API_URL = `${LOCAL_URL}api/tcms/milestones/`;
//   const token = getToken(); // Retrieve the global token

//   try {
//     const response = await axios.post(API_URL, milestoneData, {
//       // headers: {
//       //   'Content-Type': 'application/json',
//       // },
//       headers: {
//         'Authorization': `Token ${token}` // Include the token in the request header
//       }
//     });

//     console.log(response.data); // debug statement, remove before production
//     return response.data;  
//   } catch (error) {
//     console.error('Error creating milestone:', error);
//     throw error;  
//   }
// };

// // api endpoint for fetching milestone to display
// const fetchMilestones = async () => {

//     const API_URL = `${LOCAL_URL}api/tcms/milestones/`;
//     const token = getToken(); 

//     try {
//       const response = await axios.get(API_URL, {headers: {
//         'Authorization': `Token ${token}` // Include the token in the request header
//       }});
//       console.log(response.data); // debug statement, remove before production
//       return response.data;  
//     } catch (error) {
//       console.error('Error fetching milestones:', error);
//       throw error;  
//     }
// };

// // api endpoint to delete a milestone
// const deleteMilestone = async (milestoneId) => {

//   const API_URL = `${LOCAL_URL}api/tcms/milestones/`;
//   const token = getToken(); 


//   try {
//     const response = await axios.delete(`${API_URL}${milestoneId}`, {
//       headers: {
//         'Authorization': `Token ${token}`  // Use 'Bearer' if your token requires it
//       }
//     }

//     );
//     console.log(response.data); // debug statement, remove before production
//     return response.data; // Axios automatically parses JSON
//   } catch (error) {
//     console.error('Error deleting milestone:', error.response?.data || error.message);
//     throw error; // Propagate the error for handling in the frontend
//   }
// };


// export {createMilestone, fetchMilestones, deleteMilestone};

import axiosInstance from './AxiosInstance';

// API endpoint for milestone creation
const createMilestone = async (milestoneData) => {
  const API_URL = `milestones/`;

  try {
    const response = await axiosInstance.post(API_URL, milestoneData);
    console.log(response.data); // Debug statement, remove before production
    return response.data;
  } catch (error) {
    console.error('Error creating milestone:', error);
    throw error;
  }
};

// API endpoint for fetching milestones to display
const fetchMilestones = async () => {
  const API_URL = `milestones/`;

  try {
    const response = await axiosInstance.get(API_URL);
    console.log(response.data); // Debug statement, remove before production
    return response.data;
  } catch (error) {
    console.error('Error fetching milestones:', error);
    throw error;
  }
};

// API endpoint to delete a milestone
const deleteMilestone = async (milestoneId) => {
  const API_URL = `milestones/${milestoneId}/`;

  try {
    const response = await axiosInstance.delete(API_URL);
    console.log(response.data); // debug statement, remove before production
    return response.data; // axios automatically parses JSON
  } catch (error) {
    console.error('Error deleting milestone:', error);
    throw error; 
  }
};

export { createMilestone, fetchMilestones, deleteMilestone };
