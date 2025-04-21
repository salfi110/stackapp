import axios from 'axios';

const API = axios.create({
  baseURL: 'http://localhost:5000', // your backend URL
  withCredentials: true,
});

export default API;
