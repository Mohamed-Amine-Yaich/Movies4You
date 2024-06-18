import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'http://www.omdbapi.com', // Replace with your API base URL from .env
  
  
});

export default axiosInstance;