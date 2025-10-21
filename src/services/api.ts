import axios from 'axios';

const API_URL = 'https://api.pulisync.xyz/api/v1/auth';

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export default api;
