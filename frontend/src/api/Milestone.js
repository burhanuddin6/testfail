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
const fetchMilestones = async (projectId) => {
  const API_URL = `milestones/?project_id=${projectId}`;
  console.log('proj id received in fetch api' + projectId) // Debug statement, remove before production

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

const fetchMilestonesIdName = async(projectId) => {
  try {
      const response = await axiosInstance.get('milestones/get_name_id/', {
          params: { project_id: projectId }
      });
      
      // Extract the data from the response
      console.log(response);
      return response.data.milestones; 
  } catch (error) {
      console.error('Error fetching name and milestone id for add milestone form', error);
      return [];
  }
}


export { createMilestone, fetchMilestones, deleteMilestone , fetchMilestonesIdName };
