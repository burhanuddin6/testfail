import axiosInstance from './AxiosInstance';

const fetchTestSuites = async (projectId) => {
    const API_URL = `test_suites/?project_id=${projectId}`; 
    console.log('proj id received in fetch suite api' + projectId)

    try {
        const response = await axiosInstance.get(API_URL); 
        console.log(response.data); // debug statement, remove before production
        return response.data; 
    } catch (error) {
        console.error('Error fetching test suites:', error); // debug statement, remove before production
        throw error; 
    }
};

const createTestSuite = async (testSuiteData) => {
  try {
    const response = await axiosInstance.post('test_suites/', testSuiteData);
    console.log(response.data); // Debug statement, remove before production
    return response.data;
  } catch (error) {
    console.error('Error creating test suite:', error);
    throw error;
  }
};

// Function to update a test suite
const updateTestSuite = async (suiteId, testSuiteData) => {
  try {
    const response = await axiosInstance.put(`test_suites/${suiteId}/`, testSuiteData);
    console.log(response.data); // debug statement, remove before production
    return response.data;
  } catch (error) {
    console.error('Error updating test suite:', error);
    throw error;
  }
};

// Function to delete a test suite
const deleteTestSuite = async (suiteId) => {
  try {
    const response = await axiosInstance.delete(`test_suites/${suiteId}/`);
    console.log(response.data); // debug statement, remove before production
    return response.data;
  } catch (error) {
    console.error('Error deleting test suite:', error);
    throw error;
  }
};

export { fetchTestSuites, createTestSuite, updateTestSuite, deleteTestSuite}; // Export the function for use in other components
