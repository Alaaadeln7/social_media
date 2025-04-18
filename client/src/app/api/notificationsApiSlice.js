import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"
import { baseURL } from "../../constants/ApiUrl";

export const notificationApiSlice = createApi({
  reducerPath: "notificationApiSlice",
  baseQuery: fetchBaseQuery({
    baseUrl: `${baseURL}/notifications`,
    credentials: "include",
  }),
  tagTypes: ["Notifications"],
  endpoints: (builder) => ({
    getNotifications: builder.query({
      query: () => "/",
      providesTags: ["Notifications"],
    }),
    makeNotificationSeen: builder.query({
      query: (notificationId) => `seen/${notificationId}`,
      providesTags: ["Notifications"],
    }),
    makeAllNotificationsSeen: builder.query({
      query: () => "/all-seen",
      providesTags: ["Notifications"],
    })
  })
});
export const {
  useGetNotificationsQuery,
  useMakeAllNotificationsSeenQuery,
  useMakeNotificationSeenQuery
} = notificationApiSlice