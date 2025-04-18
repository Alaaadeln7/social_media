import { createSlice } from "@reduxjs/toolkit";

export const chatSlice = createSlice({
  name: "chatSlice",
  initialState: {
    messages: [],
    lastMessage: [],
    typing: false,
    chatTheme: ""
  },
  reducers: {
    setMessages: (state, action) => {
      state.messages = action.payload;
    },
    addMessage: (state, action) => {
      state.messages.push(action.payload);
    },
    setLastMessage: (state, action) => {
      state.lastMessage.push(action.payload);
    },
    setTyping: (state, action) => {
      state.typing = action.payload
    },
    setChatTheme: (state, action) => {
      state.chatTheme = action.payload
    }
  },
});
export const { setMessages, addMessage, setLastMessage, setTyping, setChatTheme } = chatSlice.actions;

export default chatSlice.reducer;