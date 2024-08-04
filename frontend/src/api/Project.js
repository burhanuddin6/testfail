import axiosInstance from './AxiosInstance'; 


// function to get all projects
const fetchProjects = async () => {
  try {
    const response = await axiosInstance.get('project/');
    // console.log("project data in api call" + response.data); // debug statement, remove before production
    return response.data; 
  } catch (error) {
    console.error('Error fetching projects:', error); // debug statement, remove before production
    throw error; 
  }
};

// function to get a specific project using its id 
const fetchProjectByID = async (projectID) => {
  try {
    // console.log(`projecct id is ${projectID}`) // debug statement, remove before production
    const response = await axiosInstance.get(`project/${projectID}/`);
    // console.log("fetchProjectByID" + response);// debug statement, remove before production
    return response.data; 
  } catch (error) {
    console.error('Error fetching projects:', error); // debug statement, remove before production
  }
};

export { fetchProjects, fetchProjectByID };
