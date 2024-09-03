import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'https://django-render-1ra5.onrender.com',
});

export default axiosInstance;

