import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  selectedUser: null,
  onlineUsers: [],
};

const usersSlice = createSlice({
  name: "usersSlice",
  initialState,
  reducers: {
    setSelectedUser: (state, action) => {
      state.selectedUser = action.payload;
    },
    setOnlineUsers: (state, action) => {
      state.onlineUsers = action.payload;
    },

  },
});

export const { setSelectedUser, setOnlineUsers, setTyping } =
  usersSlice.actions;
export default usersSlice.reducer;
