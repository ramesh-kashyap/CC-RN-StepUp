import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';


// Base URL for your API
const BASE_URL = 'http://192.168.29.193:8000/api/';



// Create an Axios instance
const Api = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json', // Default content type
    'Accept': 'application/json', // Accept JSON responses
  },
  withCredentials: true, // Make sure credentials (cookies) are included
  timeout: 10000, // 10 seconds timeout

});

// Add a request interceptor to attach the token to every request
Api.interceptors.request.use(
  async (config) => {
    try {
      // Get the token from AsyncStorage
      const token = await AsyncStorage.getItem('auth_token');
      
      // If token exists, set it in the Authorization header
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      
      // Add your appKey and application type here
      config.headers['App-Key'] = 'StepUp'; // or get it from AsyncStorage if needed
      config.headers['Application-Type'] = 'ReactNative'; // Adjust according to your app's requirement

      return config;
    } catch (error) {
      return Promise.reject(error);
    }
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Optionally, you can also add a response interceptor to handle error globally
Api.interceptors.response.use(
  (response) => response, // Simply return response if successful
  (error) => {
    // Handle errors globally here (e.g., logout on 401, show error messages, etc.)
    if (error.response && error.response.status === 401) {
      // Token expired or unauthorized
      // Redirect to login or show a modal
      console.log("Unauthorized. Redirecting to login...");
      // You can handle the redirection to login here.

    }
    return Promise.reject(error);
  }
);

export default Api;
