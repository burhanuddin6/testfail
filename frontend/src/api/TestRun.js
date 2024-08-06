import axiosInstance from './AxiosInstance';

// function for creating a test run
const createTestRun = async (testRunData) => {
  try {
    const response = await axiosInstance.post(`test_runs/`, testRunData);
    console.log(response.data); // debug statement, remove before production
    return response.data; 
  } catch (error) {
    console.error('Error creating test run:', error); // debug statement, remove before production
    throw error; 
  }
};

// function to delete a test run using its id
const deleteTestRun = async (testRunId) => {
  try {
    await axiosInstance.delete(`test_runs/${testRunId}/`);
  } catch (error) {
    console.error('Error deleting test run:', error); // debug statement, remove before production
    throw error;
  }
};

// function for fetching a test run of a given suite
const fetchTestRuns = async (projectId, suiteId = '', milestoneId = '') => {
  try {
      const response = await axiosInstance.get(`test_runs/?project_id=${projectId}${suiteId ? `&suite_id=${suiteId}` : ''}${milestoneId ? `&milestone_id=${milestoneId}` : ''}`); //review projectid usage
       console.log(`runs response: ${JSON.stringify(response.data, null, 2)}`); // debug statement, remove before production

      console.log(response); // debug statement, remove before production
      return response.data;
  } catch (error) {
      console.error('Error fetching test runs:', error); // debug statement, remove before production
      throw error;
  }
};
  
export { createTestRun, fetchTestRuns, deleteTestRun };
