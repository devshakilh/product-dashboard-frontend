import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import axios, { AxiosError } from 'axios';
import toast from 'react-hot-toast';

export interface AuthState {
  accessToken: string | null;
  refreshToken: string | null;
  email: string | null;
  role: string | null;
  isAuthenticated: boolean;
  loading: boolean;
  error: string | null;
}

const initialState: AuthState = {
  accessToken: null,
  refreshToken: null,
  email: null,
  role: null,
  isAuthenticated: false,
  loading: false,
  error: null,
};

// Helper for displaying toast notifications
const showErrorToast = (message: string) => toast.error(message);
const showSuccessToast = (message: string) => toast.success(message);

// API Base URL
const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_URL || 'https://api.pulisync.xyz/api/v1';

// Sign In Action
export const signIn = createAsyncThunk(
  'auth/signIn',
  async (
    credentials: { email: string; password: string },
    { rejectWithValue }
  ) => {
    try {
      const response = await axios.post(
        `${API_BASE_URL}/auth/signIn`,
        credentials
      );
      showSuccessToast('Logged in successfully!');
      return response.data;
    } catch (error: unknown) {
      if (error instanceof AxiosError) {
        showErrorToast(error.response?.data?.message || 'Login failed');
        return rejectWithValue(error.response?.data || 'Login failed');
      }
      showErrorToast('Login failed');
      return rejectWithValue('Login failed');
    }
  }
);

// Sign Out Action
export const signOut = createAsyncThunk('auth/signOut', async () => {
  localStorage.removeItem('accessToken');
  localStorage.removeItem('refreshToken');
  showSuccessToast('Logged out successfully!');
  return;
});

// Refresh Access Token Action
export const refreshAccessToken = createAsyncThunk(
  'auth/refreshAccessToken',
  async (refreshToken: string, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${API_BASE_URL}/auth/refresh`, {
        refreshToken,
      });
      showSuccessToast('Session refreshed!');
      return response.data;
    } catch (error: unknown) {
      if (error instanceof AxiosError) {
        showErrorToast(
          error.response?.data?.message || 'Failed to refresh session'
        );
        return rejectWithValue(
          error.response?.data || 'Failed to refresh token'
        );
      }
      showErrorToast('Failed to refresh session');
      return rejectWithValue('Failed to refresh token');
    }
  }
);

// Change Password Action Update
export const changePassword = createAsyncThunk<
  void,
  { oldPassword: string; newPassword: string },
  { rejectValue: string }
>(
  'auth/changePassword',
  async ({ oldPassword, newPassword }, { rejectWithValue }) => {
    try {
      await axios.post(`${API_BASE_URL}/auth/change-password`, {
        oldPassword,
        newPassword,
      });
      showSuccessToast('Password changed successfully!');
    } catch (error: AxiosError | unknown) {
      if (axios.isAxiosError(error)) {
        showErrorToast(
          error.response?.data?.message || 'Failed to change password'
        );
        return rejectWithValue(
          error.response?.data?.message || 'Failed to change password'
        );
      }
      showErrorToast('Failed to change password');
      return rejectWithValue('Failed to change password');
    }
  }
);

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(signIn.pending, (state) => {
        state.loading = true;
      })
      .addCase(signIn.fulfilled, (state, action) => {
        state.accessToken = action.payload.accessToken;
        state.refreshToken = action.payload.refreshToken;
        state.email = action.payload.email;
        state.role = action.payload.role;
        state.isAuthenticated = true;
        state.loading = false;
        state.error = null;
      })
      .addCase(signIn.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(signOut.fulfilled, (state) => {
        state.accessToken = null;
        state.refreshToken = null;
        state.email = null;
        state.role = null;
        state.isAuthenticated = false;
        state.loading = false;
      })
      .addCase(refreshAccessToken.fulfilled, (state, action) => {
        state.accessToken = action.payload.accessToken;
        state.refreshToken = action.payload.refreshToken;
        state.loading = false;
        state.error = null;
      })

      // Extra Reducer Update
      .addCase(changePassword.fulfilled, (state) => {
        state.loading = false;
        state.error = null;
      })

      .addMatcher(
        (action) => action.type.endsWith('/pending'),
        (state) => {
          state.loading = true;
        }
      )
      .addMatcher(
        (action) => action.type.endsWith('/rejected'),
        (state, action: PayloadAction<string | undefined>) => {
          state.loading = false;
          state.error = action.payload || 'Unknown error occurred';
        }
      );
  },
});

export default authSlice.reducer;
