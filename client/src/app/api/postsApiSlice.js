import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { baseURL } from "../../constants/ApiUrl";
export const postsApiSlice = createApi({
  reducerPath: "postsApiSlice",
  baseQuery: fetchBaseQuery({
    baseUrl: `${baseURL}/`,
    credentials: "include",
  }),
  tagTypes: ["Posts"],
  endpoints: (builder) => ({
    createPost: builder.mutation({
      query: (postData) => ({
        url: "posts/create",
        method: "POST",
        body: postData,
      }),
      invalidatesTags: ["Posts"],
    }),
    getAllPosts: builder.query({
      query: () => "posts/",
      providesTags: ["Posts"],
    }),
    getPostsByUserId: builder.query({
      query: (userId) => `posts/${userId}`,
      providesTags: ["Posts"],
    }),
    deletePost: builder.mutation({
      query: (postId) => ({
        url: `posts/delete/${postId}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Posts"],
    }),
    updatePost: builder.mutation({
      query: (postData) => ({
        url: "posts/update",
        method: "PUT",
        body: postData,
      }),
      invalidatesTags: ["Posts"],
    }),
    toggleLike: builder.mutation({
      query: (data) => ({
        url: `/posts/like`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Posts"],
    }),
    createComment: builder.mutation({
      query: (values) => ({
        url: "/comment/create",
        method: "POST",
        body: values,
      }),
      invalidatesTags: ["Posts"],
    }),
    deleteComment: builder.mutation({
      query: (commentId) => ({
        url: `comment/delete/${commentId}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Posts"],
    }),
    updateComment: builder.mutation({
      query: (values) => ({
        url: "/comment/update",
        method: "PUT",
        body: values,
      }),
      invalidatesTags: ["Posts"],
    }),
    makeLikeOnComment: builder.mutation({
      query: (data) => ({
        url: "/comment/make-like",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Posts"],
    }),
    savePost: builder.mutation({
      query: (data) => ({
        url: "/posts/save-post",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Posts"],
    }),
    getSavePost: builder.query({
      query: () => "/posts/saved-posts",
      providesTags: ["Posts"],
    }),
  }),
});

export const {
  useCreatePostMutation,
  useGetAllPostsQuery,
  useGetPostsByUserIdQuery,
  useDeletePostMutation,
  useUpdatePostMutation,
  useToggleLikeMutation,
  useCreateCommentMutation,
  useDeleteCommentMutation,
  useUpdateCommentMutation,
  useMakeLikeOnCommentMutation,
  useSavePostMutation,
  useGetSavePostQuery
} = postsApiSlice;
