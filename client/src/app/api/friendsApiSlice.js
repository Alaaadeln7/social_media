import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { baseURL } from "../../constants/ApiUrl";
export const friendsApiSlice = createApi({
  reducerPath: "friendsApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${baseURL}/friends`,
    credentials: "include",
  }),
  tagTypes: ["Friends"],
  endpoints: (builder) => ({
    getFriends: builder.query({
      query: () => "/",
      providesTags: ["Friends"],
    }),
    addFriends: builder.mutation({
      query: (friendId) => ({
        url: "/add-friend",
        method: "POST",
        body: { friendId },
      }),
      invalidatesTags: ["Friends"],
    }),
    acceptFriend: builder.mutation({
      query: (friendId) => ({
        url: "/accept-friend",
        method: "POST",
        body: { friendId },
      }),
      invalidatesTags: ["Friends"],
    }),
    rejectedFriends: builder.mutation({
      query: (friendId) => ({
        url: "/reject-friend",
        method: "POST",
        body: { friendId },
      }),
      invalidatesTags: ["Friends"],
    }),
    getAllUsers: builder.query({
      query: () => "/get-all-users",
      invalidatesTags: ["Friends"],
    }),
    getFriendRequests: builder.query({
      query: () => "/get-requests",
      providesTags: ["Friends"],
    }),
  }),
});
export const {
  useGetFriendsQuery,
  useAddFriendsMutation,
  useAcceptFriendMutation,
  useRejectedFriendsMutation,
  useGetAllUsersQuery,
  useGetFriendRequestsQuery,
} = friendsApiSlice;
