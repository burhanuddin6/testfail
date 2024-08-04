import axiosInstance from './AxiosInstance'; // Adjust the path based on your project structure

const fetchProjects = async () => {
  try {
    const response = await axiosInstance.get('project/');
    console.log(response);
    return response.data; 
  } catch (error) {
    console.error('Error fetching projects:', error);
    throw error; 
  }
};

const fetchProjectByID = async (projectID) => {
  try {
    console.log(`projecct id is ${projectID}`)
    const response = await axiosInstance.get(`project/${projectID}/`);
    console.log("fetchProjectByID" + response);
    return response.data; 
  } catch (error) {
    console.error('Error fetching projects:', error);
    // throw error; 
  }
};

export { fetchProjects, fetchProjectByID };
