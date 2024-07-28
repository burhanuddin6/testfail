import axiosInstance from './AxiosInstance';

const fetchTestSuites = async () => {
    const API_URL = `test_suites/`; // Update the endpoint based on your API structure

    try {
        const response = await axiosInstance.get(API_URL); // Use axiosInstance to fetch data
        console.log(response.data); // debug statement, remove before production
        return response.data; // Return the data from the response
    } catch (error) {
        console.error('Error fetching test suites:', error); // Log the error for debugging
        throw error; // Throw the error to be handled in the component
    }
};

export { fetchTestSuites }; // Export the function for use in other components
