import { configureStore } from "@reduxjs/toolkit";
import { authApiSlice } from "./api/authApiSlice";
import { friendsApiSlice } from "./api/friendsApiSlice";
import { postsApiSlice } from "./api/postsApiSlice";
import userSlice from "./userSlice";
import { chatApiSlice } from "./api/chatApiSlice";
import { eventsApiSlice } from "./api/eventsApiSlice";
import chatSlice from "./chatSlice";
import themeSlice from "./themeSlice";
import { notificationApiSlice } from "./api/notificationsApiSlice";
const store = configureStore({
  reducer: {
    [authApiSlice.reducerPath]: authApiSlice.reducer,
    [friendsApiSlice.reducerPath]: friendsApiSlice.reducer,
    [postsApiSlice.reducerPath]: postsApiSlice.reducer,
    [chatApiSlice.reducerPath]: chatApiSlice.reducer,
    [notificationApiSlice.reducerPath]: notificationApiSlice.reducer,
    [eventsApiSlice.reducerPath]: eventsApiSlice.reducer,
    user: userSlice,
    chat: chatSlice,
    theme: themeSlice,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      authApiSlice.middleware,
      friendsApiSlice.middleware,
      postsApiSlice.middleware,
      chatApiSlice.middleware,
      notificationApiSlice.middleware,
      eventsApiSlice.middleware
    ),
});
export default store;
