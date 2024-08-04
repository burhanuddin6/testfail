import axiosInstance from './AxiosInstance';

// API endpoint for creating a test run
const createTestRun = async (testRunData) => {
    const API_URL = `test_run/`; // Assuming the correct endpoint for creating a test run
  
    try {
      const response = await axiosInstance.post(API_URL, testRunData);
      console.log(response.data); // Debug statement, remove before production
      return response.data; // Return the created test run data
    } catch (error) {
      console.error('Error creating test run:', error); // Log error
      throw error; // Propagate the error for handling in the frontend
    }
};

// API endpoint for fetching test runs
// const fetchTestRuns = async (projectId) => {
//     const API_URL = `test_run/?project_id=${projectId}`; 
  
//     try {
//       const response = await axiosInstance.get(API_URL);
//       console.log(response);
//       return response.data; 
//     } catch (error) {
//       console.error('Error fetching test runs:', error);
//       throw error; 
//     }
// };

const fetchTestRuns = async (projectId, suiteId = '') => {
  // Append suiteId to query parameters if it exists
  const API_URL = `test_run/?project_id=${projectId}${suiteId ? `&suite_id=${suiteId}` : ''}`;

  try {
      const response = await axiosInstance.get(API_URL);
      console.log(response);
      return response.data;
  } catch (error) {
      console.error('Error fetching test runs:', error);
      throw error;
  }
};
  
export { createTestRun, fetchTestRuns };
