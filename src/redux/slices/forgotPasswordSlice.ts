import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios, { AxiosError } from 'axios';
import toast from 'react-hot-toast';

const API_BASE_URL = 'https://api.pulisync.xyz/api/v1/auth/forgot-password';

// Forgot Password Request
export const sendForgotPasswordEmail = createAsyncThunk<
  void,
  { email: string; language: string }, // Include language parameter
  { rejectValue: string }
>(
  'auth/sendForgotPasswordEmail',
  async ({ email, language }, { rejectWithValue }) => {
    try {
      await axios.post(`${API_BASE_URL}/request`, { email, language });
    } catch (error: unknown) {
      if (error instanceof AxiosError) {
        return rejectWithValue(
          error.response?.data?.message || 'Failed to send email'
        );
      }
      return rejectWithValue('Failed to send email');
    }
  }
);

// Verify Code
export const verifyCode = createAsyncThunk<
  void,
  { email: string; resetCode: string; language: string }, // Include language parameter
  { rejectValue: string }
>(
  'auth/verifyCode',
  async ({ email, resetCode, language }, { rejectWithValue }) => {
    try {
      await axios.post(`${API_BASE_URL}/verify`, {
        email,
        resetCode,
        language,
      });
    } catch (error: unknown) {
      if (error instanceof AxiosError) {
        return rejectWithValue(
          error.response?.data?.message || 'Invalid verification details'
        );
      }
      return rejectWithValue('Invalid verification details');
    }
  }
);

// Reset Password
export const resetPassword = createAsyncThunk<
  void,
  { email: string; resetCode: string; newPassword: string },
  { rejectValue: string }
>(
  'auth/resetPassword',
  async ({ email, resetCode, newPassword }, { rejectWithValue }) => {
    try {
      await axios.post(`${API_BASE_URL}/reset`, {
        email,
        resetCode,
        newPassword,
      });
    } catch (error: unknown) {
      if (error instanceof AxiosError) {
        return rejectWithValue(
          error.response?.data?.message || 'Failed to reset password'
        );
      }
      return rejectWithValue('Failed to reset password');
    }
  }
);

// Resend Verification Code
export const resendVerificationCode = createAsyncThunk<
  void,
  { email: string; language: string }, // Include language parameter
  { rejectValue: string }
>(
  'auth/resendVerificationCode',
  async ({ email, language }, { rejectWithValue }) => {
    try {
      await axios.post(`${API_BASE_URL}/request`, { email, language });
      toast.success('Verification code resent successfully!');
    } catch (error: unknown) {
      if (error instanceof AxiosError) {
        const errorMessage =
          error.response?.data?.message || 'Failed to resend code';
        toast.error(errorMessage);
        return rejectWithValue(errorMessage);
      }
      toast.error('Failed to resend code');
      return rejectWithValue('Failed to resend code');
    }
  }
);

// Define the initial state
interface ForgotPasswordState {
  loading: boolean;
  error: string | null;
  success: boolean;
}

const initialState: ForgotPasswordState = {
  loading: false,
  error: null,
  success: false,
};

// Create the slice
const forgotPasswordSlice = createSlice({
  name: 'forgotPassword',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Handle sendForgotPasswordEmail
      .addCase(sendForgotPasswordEmail.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = false;
      })
      .addCase(sendForgotPasswordEmail.fulfilled, (state) => {
        state.loading = false;
        state.success = true;
      })
      .addCase(sendForgotPasswordEmail.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'Failed to send email';
      })
      // Handle verifyCode
      .addCase(verifyCode.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = false;
      })
      .addCase(verifyCode.fulfilled, (state) => {
        state.loading = false;
        state.success = true;
      })
      .addCase(verifyCode.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'Invalid verification details';
      })
      // Handle resetPassword
      .addCase(resetPassword.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = false;
      })
      .addCase(resetPassword.fulfilled, (state) => {
        state.loading = false;
        state.success = true;
      })
      .addCase(resetPassword.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'Failed to reset password';
      })
      // Handle resendVerificationCode
      .addCase(resendVerificationCode.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = false;
      })
      .addCase(resendVerificationCode.fulfilled, (state) => {
        state.loading = false;
        state.success = true;
      })
      .addCase(resendVerificationCode.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'Failed to resend code';
      });
  },
});

// Export the reducer as the default export
export default forgotPasswordSlice.reducer;
