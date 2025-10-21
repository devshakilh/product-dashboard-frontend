// services/authService.ts
import axios from 'axios';

const API_URL = 'https://api.pulisync.xyz/auth';

// Login
export const loginUser = async (email: string, password: string) => {
  const response = await axios.post(`${API_URL}/signin`, { email, password });
  return response.data;
};

// Forgot Password
export const forgotPassword = async (email: string) => {
  const response = await axios.post(`${API_URL}/forgot-password`, { email });
  return response.data;
};

export const verifyCodeService = async (email: string, resetCode: string) => {
  const response = await axios.post(`${API_URL}/forgot-password/verify-code`, {
    email,
    resetCode,
  });
  return response.data;
};
