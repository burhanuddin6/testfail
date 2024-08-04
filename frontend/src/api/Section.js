import axiosInstance from './AxiosInstance'; 

// function for fetching sections (id, name) by suite ID
const fetchSectionsBySuiteId = async (suiteId) => {
  console.log("inside fetchTestCaseChoices");

    try {
        const response = await axiosInstance.get(`/sections/by_suite/?test_suite_id=${suiteId}`);
        return response.data;
    } catch (error) {
        console.error('Error fetching sections:', error); // debug statement, remove before production
        throw error;
    }
};

// function to create a section
const createSection = async (sectionData) => {
  try {
    const response = await axiosInstance.post('sections/', sectionData);
    return response.data;
  } catch (error) {
    console.error('Error creating section:', error); // debug statement, remove before production
    throw error; 
  }
};

// function to delete a section using its id
const deleteSection = async (sectionId) => {
  try {
    const response = await axiosInstance.delete(`sections/${sectionId}/delete/`);
    console.log(response); // debug statement, remove before production
    return response.data;
  } catch (error) {
    console.error(error); // debug statement, remove before production
    throw error;
  }
};

export { fetchSectionsBySuiteId, createSection, deleteSection };
