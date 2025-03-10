
import { configureStore } from '@reduxjs/toolkit';
import authReducer from './authSlice';
import tasksReducer from './tasksSlice';
import themeReducer from './themeSlice';
import sidebarReducer from './sidebarSlice';

const store = configureStore({
  reducer: {
    auth: authReducer,
    tasks: tasksReducer,
    theme: themeReducer,
    sidebar: sidebarReducer
  }
});

export default store;