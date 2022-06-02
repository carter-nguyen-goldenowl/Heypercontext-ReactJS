import { configureStore } from '@reduxjs/toolkit';
import * as authSlice from '../components/frontend/auth/authSlice';

const store = configureStore({
  reducer: {
    auth: authSlice.reducer,
  },
});

export default store;
