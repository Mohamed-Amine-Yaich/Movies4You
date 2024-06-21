import axios from 'axios';
import Config from "react-native-config";
const axiosInstance = axios.create({
  baseURL: Config.API_BASE_URL, // Replace with your API base URL from .env


});

export default axiosInstance;