// src/store/store.ts
import { configureStore } from '@reduxjs/toolkit';

import accountSetupReducer from '../features/account-setup/store/account-setup.slice';
import authReducer from '../redux/slices/authSlices';
import parentReducer from '../redux/slices/parentSlice';
import forgotPasswordReducer from './slices/forgotPasswordSlice';

// import forgotPasswordReducer from "../redux/slices/forgotPasswordSlice";

const store = configureStore({
  reducer: {
    auth: authReducer,
    forgotPassword: forgotPasswordReducer,
    parent: parentReducer,
    accountSetup: accountSetupReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
