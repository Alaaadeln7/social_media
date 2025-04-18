import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { baseURL } from "../../constants/ApiUrl";

export const chatApiSlice = createApi({
  reducerPath: "chatApiSlice",
  baseQuery: fetchBaseQuery({
    baseUrl: `${baseURL}/auth`,
    credentials: "include",
  }),
  tagTypes: ["Chat"],
  endpoints: (builder) => ({
    getConversations: builder.query({
      query: () => "/conversation",
      providesTags: ["Chat"],
    }),
    getConversation: builder.query({
      query: (conversationId) => `/conversation/${conversationId}`,
      providesTags: ["Chat"],
    }),
    createConversation: builder.mutation({
      query: (data) => ({
        url: "/conversation/create",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Chat"],
    }),
    sendMessage: builder.mutation({
      query: (data) => ({
        url: "/conversation/send-message/",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Chat"],
    }),
    uploadAudio: builder.mutation({
      query: (data) => ({
        url: "/conversation/upload-audio",
        method: "POST",
        body: data,
      }),
    }),
  }),
});
export const {
  useGetConversationsQuery,
  useGetConversationQuery,
  useCreateConversationMutation,
  useSendMessageMutation,
  useUploadAudioMutation,
} = chatApiSlice;
