import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isOpen: false,
  rightSidebarOpen: false,
  selectedTaskId: null
};

const sidebarSlice = createSlice({
  name: 'sidebar',
  initialState,
  reducers: {
    toggleSidebar: (state, action) => {
      state.isOpen = action.payload !== undefined ? action.payload : !state.isOpen;
    },
    toggleRightSidebar: (state, action) => {
      state.rightSidebarOpen = action.payload !== undefined ? action.payload : !state.rightSidebarOpen;
    },
    setSelectedTask: (state, action) => {
      state.selectedTaskId = action.payload;
    }
  }
});

export const { toggleSidebar, toggleRightSidebar, setSelectedTask } = sidebarSlice.actions;
export default sidebarSlice.reducer;