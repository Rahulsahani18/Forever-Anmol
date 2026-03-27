// src/redux/slices/packagesSlice.jsx
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const API_URL = '/api/collections';

const api = axios.create({
  timeout: 15000,
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  },
});

// Fetch fresh data - no caching
export const fetchPackages = createAsyncThunk(
  'packages/fetchPackages',
  async (_, { rejectWithValue }) => {
    try {
      console.log('Fetching fresh data from API...');
      const response = await api.get(API_URL);
      
      if (response.status === 200 && response.data) {
        if (response.data.status === 200 && response.data.data) {
          return response.data;
        }
        return response.data;
      }
      
      throw new Error(`HTTP ${response.status}: ${response.statusText}`);
      
    } catch (error) {
      console.error('API Error:', error.message);
      if (error.response) {
        return rejectWithValue(error.response.data?.message || `Server error: ${error.response.status}`);
      } else if (error.request) {
        return rejectWithValue('No response from server. Please check your connection.');
      } else {
        return rejectWithValue(error.message || 'An error occurred');
      }
    }
  }
);

const initialState = {
  categories: {},
  allPackages: [],
  loading: false,
  error: null,
  currentCategory: null,
  currentPackage: null,
  lastFetched: null, // Track when data was last fetched
};

const packagesSlice = createSlice({
  name: 'packages',
  initialState,
  reducers: {
    setCurrentCategory: (state, action) => {
      state.currentCategory = action.payload;
    },
    setCurrentPackage: (state, action) => {
      state.currentPackage = action.payload;
    },
    clearCurrentPackage: (state) => {
      state.currentPackage = null;
    },
    clearError: (state) => {
      state.error = null;
    },
    // Optional: Force refresh
    forceRefresh: (state) => {
      state.lastFetched = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchPackages.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchPackages.fulfilled, (state, action) => {
        state.loading = false;
        state.lastFetched = Date.now();
        
        const responseData = action.payload;
        
        if (responseData && responseData.status === 200 && responseData.data) {
          state.categories = responseData.data.categories || {};
          state.allPackages = responseData.data.allPackages || [];
        } else if (responseData && responseData.categories) {
          state.categories = responseData.categories;
          state.allPackages = responseData.allPackages || [];
        } else if (Array.isArray(responseData)) {
          state.allPackages = responseData;
        } else {
          console.warn('Unexpected API response format:', responseData);
          state.allPackages = [];
          state.categories = {};
        }
        
        console.log('Packages loaded:', state.allPackages.length);
      })
      .addCase(fetchPackages.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'Failed to fetch packages';
        console.error('Error fetching packages:', action.payload);
      });
  },
});

export const { setCurrentCategory, setCurrentPackage, clearCurrentPackage, clearError, forceRefresh } = packagesSlice.actions;
export default packagesSlice.reducer;