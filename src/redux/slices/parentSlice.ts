import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import toast from 'react-hot-toast';

// API URL
const API_URL = 'https://api.pulisync.xyz/api/v1/parent/account-setup';

// Thunks
export const requestAccountSetup = createAsyncThunk(
  'parent/requestAccountSetup',
  async (data, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${API_URL}/request`, data);
      toast.success('Account setup request sent successfully!');
      return response.data;
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        const message = error.response?.data || error.message || 'API Error';
        toast.error(message);
        return rejectWithValue(message);
      } else if (error instanceof Error) {
        toast.error(error.message || 'General Error');
        return rejectWithValue(error.message || 'General Error');
      } else {
        toast.error('An unexpected error occurred');
        return rejectWithValue('An unexpected error occurred');
      }
    }
  }
);

export const verifyAccountSetup = createAsyncThunk(
  'parent/verifyAccountSetup',
  async (data, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${API_URL}/verify`, data);
      toast.success('Account verified successfully!');
      return response.data;
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        const message = error.response?.data || error.message || 'API Error';
        toast.error(message);
        return rejectWithValue(message);
      } else if (error instanceof Error) {
        toast.error(error.message || 'General Error');
        return rejectWithValue(error.message || 'General Error');
      } else {
        toast.error('An unexpected error occurred');
        return rejectWithValue('An unexpected error occurred');
      }
    }
  }
);

export const completeAccountSetup = createAsyncThunk(
  'parent/completeAccountSetup',
  async (
    data: { name: string; password: string; contact: string },
    { rejectWithValue }
  ) => {
    try {
      const response = await axios.post(`${API_URL}/setup`, data);
      toast.success('Account setup completed successfully!');
      return response.data;
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        const message =
          error.response?.data?.message || error.message || 'API Error';
        toast.error(message);
        return rejectWithValue(message);
      } else if (error instanceof Error) {
        toast.error(error.message || 'General Error');
        return rejectWithValue(error.message || 'General Error');
      } else {
        toast.error('An unexpected error occurred');
        return rejectWithValue('An unexpected error occurred');
      }
    }
  }
);

// Slice
const parentSlice = createSlice({
  name: 'parent',
  initialState: {
    status: 'idle',
    error: null as string | null,
    profile: { name: '', role: '' },
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(requestAccountSetup.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(requestAccountSetup.fulfilled, (state) => {
        state.status = 'succeeded';
      })
      .addCase(requestAccountSetup.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload as string | null; // Explicitly cast payload
      })
      .addCase(verifyAccountSetup.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(verifyAccountSetup.fulfilled, (state) => {
        state.status = 'succeeded';
      })
      .addCase(verifyAccountSetup.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload as string | null; // Explicitly cast payload
      })
      .addCase(completeAccountSetup.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(completeAccountSetup.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.profile = action.payload.profile;
      })
      .addCase(completeAccountSetup.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload as string | null; // Explicitly cast payload
      });
  },
});

export default parentSlice.reducer;
