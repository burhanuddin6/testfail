import axios from 'axios';
import { LOCAL_URL } from '../utilities/globals';


// api endpoint for milestone creation
const createMilestone = async (milestoneData) => {
  const API_URL = `${LOCAL_URL}api/tcms/milestones/`;

  try {
    const response = await axios.post(API_URL, milestoneData, {
      headers: {
        'Content-Type': 'application/json',
      },
    });

    console.log(response.data); // debug statement, remove before production
    return response.data;  
  } catch (error) {
    console.error('Error creating milestone:', error);
    throw error;  
  }
};

// api endpoint for fetching milestone to display
const fetchMilestones = async () => {

    const API_URL = `${LOCAL_URL}api/tcms/milestones/`;
  
    try {
      const response = await axios.get(API_URL);
      console.log(response.data); // debug statement, remove before production
      return response.data;  
    } catch (error) {
      console.error('Error fetching milestones:', error);
      throw error;  
    }
};

// api endpoint to delete a milestone
const deleteMilestone = async (milestoneId) => {

  const API_URL = `${LOCAL_URL}api/tcms/milestones/`;

  try {
    const response = await axios.delete(`${API_URL}${milestoneId}`);
    console.log(response.data); // debug statement, remove before production
    return response.data; // Axios automatically parses JSON
  } catch (error) {
    console.error('Error deleting milestone:', error.response?.data || error.message);
    throw error; // Propagate the error for handling in the frontend
  }
};


export {createMilestone, fetchMilestones, deleteMilestone};
