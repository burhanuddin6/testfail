import axiosInstance from './AxiosInstance'; 

// API endpoint for fetching sections (id, name) by suite ID
const fetchSectionsBySuiteId = async (suiteId) => {
    const API_URL = `/sections/by_suite/?test_suite_id=${suiteId}`; 

    try {
        const response = await axiosInstance.get(API_URL);
        return response.data;
    } catch (error) {
        console.error('Error fetching sections:', error);
        throw error;
    }
};


const createSection = async (sectionData) => {
    const API_URL = 'sections/'; 
  try {
    const response = await axiosInstance.post(API_URL, sectionData);
    return response.data;
  } catch (error) {
    console.error('Error creating section:', error);
    throw error; // Re-throw the error so it can be handled by the calling function
  }
};


const deleteSection = async (sectionId) => {
  try {
    const response = await axiosInstance.delete(`sections/${sectionId}/delete/`);
    console.log(response);
    return response.data;
  } catch (error) {
    console.error(error);
    throw new Error(error);
  }
};



export { fetchSectionsBySuiteId, createSection, deleteSection };
