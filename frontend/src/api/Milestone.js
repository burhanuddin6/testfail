import axiosInstance from './AxiosInstance';

// function for milestone creation
const createMilestone = async (milestoneData) => {
  try {
    const response = await axiosInstance.post(`milestones/`, milestoneData);
    console.log(response.data); // debug statement, remove before production
    return response.data;
  } catch (error) {
    console.error('Error creating milestone:', error); // debug statement, remove before production
    throw error;
  }
};

// function for fetching milestones of a given project to display 
const fetchMilestones = async (projectId) => {
  try {
    const response = await axiosInstance.get(`milestones/?project_id=${projectId}`);
    // console.log(response.data); // debug statement, remove before production
    return response.data;
  } catch (error) {
    console.error('Error fetching milestones:', error); // debug statement, remove before production
    throw error;
  }
};

// function to delete a milestone 
const deleteMilestone = async (milestoneId) => {
  try {
    const response = await axiosInstance.delete(`milestones/${milestoneId}/`);
    console.log(response.data); // debug statement, remove before production
    return response.data; 
  } catch (error) { 
    console.error('Error deleting milestone:', error); // debug statement, remove before production
    throw error; 
  }
};

// function to get a milestone (id, name) of a project
const fetchMilestonesIdName = async(projectId) => {
  try {
      const response = await axiosInstance.get('milestones/get_name_id/', {
          params: { project_id: projectId }
      });
      console.log(`ur milestone payload is:  ${JSON.stringify(response.data, null, 2)}`); // debug statement, remove before production
      // console.log(response); // debug statement, remove before production
      return response.data.milestones; 
  } catch (error) {
      console.error('Error fetching name and milestone id for add milestone form', error); // debug statement, remove before production
      return [];
  }
}


export { createMilestone, fetchMilestones, deleteMilestone , fetchMilestonesIdName };
