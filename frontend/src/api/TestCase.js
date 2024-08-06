import axiosInstance from './AxiosInstance';

// function for creating a test case
const createTestCase = async (data) => {
  try {
      const response = await axiosInstance.post('test_cases/', data);
      console.log(response) // debug statement, remove before production
      return response.data; 
  } catch (error) {
      console.error('Error creating test case:', error); // debug statement, remove before production
      throw error; 
  }
};

// function to update a test case using its id 
const updateTestCase = async (testCaseId, testCaseData) => {
  try {
    const response = await axiosInstance.patch(`test_cases/${testCaseId}`, testCaseData);
    return response.data;
  } catch (error) {
    console.error('Error updating test case:', error); // debug statement, remove before production
    throw error;
  }
};

// function to delete a test case using its id
const deleteTestCase = async (testCaseId) => {
  try {
    await axiosInstance.delete(`test_cases/${testCaseId}/`);
  } catch (error) {
    console.error('Error deleting test case:', error); // debug statement, remove before production
    throw error;
  }
};

// function for fetching a test case using its id 
const fetchTestCaseDetails = async (testCaseId) => {
  try {
    const response = await axiosInstance.get(`test_cases/${testCaseId}`);
    // console.log(response); // debug statement, remove before production
    return response.data;
  } catch (error) {
    console.error('Error fetching test case details:', error); // debug statement, remove before production
    throw error;
  }
};

// function for fetching choices to be displayed on test case creation form 
const fetchTestCaseChoices = async () => {
    try {
        const response = await axiosInstance.get('test_cases/');
        // console.log(`response: ${JSON.stringify(response.data, null, 2)}`); // debug statement, remove before production
        return response.data;
    } catch (error) {
        console.error('Error fetching test case choices:', error); // debug statement, remove before production
        throw error;
    }
};

// function for fetching sections and cases of a given test suite
const fetchSectionsAndCases = async (suiteId) => {
  try {
    const response = await axiosInstance.get('sections_cases/', {
      params: { suiteId }
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching sections and cases:', error); // debug statement, remove before production
    throw error; 
  }
};

export { fetchTestCaseChoices, createTestCase, fetchSectionsAndCases, deleteTestCase, fetchTestCaseDetails, updateTestCase};