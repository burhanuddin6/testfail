import axiosInstance from './AxiosInstance';

// function for creating a test plan
const createTestPlan = async (testPlanData) => {
  try {
      const response = await axiosInstance.post('test_plans/', testPlanData);
      console.log(response) // debug statement, remove before production
      return response.data; 
  } catch (error) {
      console.error('Error creating test plan:', error); // debug statement, remove before production
      throw error; 
  }
};

// function to update a test plan using its id 
const updateTestPlan = async (testPlanId, testPlanData) => {
  try {
    const response = await axiosInstance.put(`test_plans/${testPlanId}`, testPlanData);
    return response.data;
  } catch (error) {
    console.error('Error updating test plan:', error); // debug statement, remove before production
    throw error;
  }
};

// function to delete a test plan using its id
const deleteTestPlan = async (testPlanId) => {
  try {
    await axiosInstance.delete(`test_plans/${testPlanId}/`);
  } catch (error) {
    console.error('Error deleting test plan:', error); // debug statement, remove before production
    throw error;
  }
};

// function for fetching a test plan using its id 
const fetchTestPlanDetails = async (testPlanId) => {
  try {
    const response = await axiosInstance.get(`test_plans/${testPlanId}`);
    console.log(response); // debug statement, remove before production
    return response.data;
  } catch (error) {
    console.error('Error fetching test plan details:', error); // debug statement, remove before production
    throw error;
  }
};

export {createTestPlan, updateTestPlan, deleteTestPlan, fetchTestPlanDetails};