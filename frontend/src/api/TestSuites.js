import axiosInstance from './AxiosInstance';

// function to create a test suite
const createTestSuite = async (testSuiteData) => {
  try {
    const response = await axiosInstance.post('test_suites/', testSuiteData);
    console.log(response.data); // debug statement, remove before production
    return response.data;
  } catch (error) {
    console.error('Error creating test suite:', error); // debug statement, remove before production
    throw error;
  }
};

// function to update a test suite
const updateTestSuite = async (suiteId, testSuiteData) => {
  try {
    const response = await axiosInstance.patch(`test_suites/${suiteId}/`, testSuiteData);
    console.log(response.data); // debug statement, remove before production
    return response.data;
  } catch (error) {
    console.error('Error updating test suite:', error); // debug statement, remove before production
    throw error;
  }
};


// function to get all test suites of a given project
const fetchTestSuites = async (projectId) => {
  try {
      const response = await axiosInstance.get(`test_suites/?project_id=${projectId}`); 
      console.log(`ur suite payload is:  ${JSON.stringify(response.data, null, 2)}`); // debug statement, remove before production
      return response.data; 
  } catch (error) {
      console.error('Error fetching test suites:', error); // debug statement, remove before production
      throw error; 
  }
};

// function to delete a test suite
const deleteTestSuite = async (suiteId) => {
  try {
    const response = await axiosInstance.delete(`test_suites/${suiteId}/`);
    console.log(response.data); // debug statement, remove before production
    return response.data;
  } catch (error) {
    console.error('Error deleting test suite:', error); // debug statement, remove before production
    throw error;
  }
};



export { fetchTestSuites, createTestSuite, updateTestSuite, deleteTestSuite}; 
