import axiosInstance from './AxiosInstance';


const fetchActivity = async () => {
    try {
      const response = await axiosInstance.get('user_actions/');
      console.log("acitivty data in api call" + response.data); // debug statement, remove before production
      return response.data; 
    } catch (error) {
      console.error('Error fetching user activity:', error); // debug statement, remove before production
      throw error; 
    }
};

export {fetchActivity};