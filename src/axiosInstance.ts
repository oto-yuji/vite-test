import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'https://vite-test-one-xi.vercel.app',
});

export default axiosInstance;

