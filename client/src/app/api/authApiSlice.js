import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { baseURL } from "../../constants/ApiUrl"
export const authApiSlice = createApi({
  reducerPath: "authApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${baseURL}/auth`,
    credentials: "include",
  }),
  tagTypes: ["Auth"],
  endpoints: (builder) => ({
    register: builder.mutation({
      query: (credentials) => ({
        url: "/register",
        method: "POST",
        body: credentials,
      }),
      invalidatesTags: ["Auth"],
    }),
    verifyOTP: builder.mutation({
      query: (credentials) => ({
        url: "/verify-otp",
        method: "POST",
        body: credentials,
      }),
      invalidatesTags: ["Auth"],
    }),
    login: builder.mutation({
      query: (credentials) => ({
        url: "/login",
        method: "POST",
        body: credentials,
      }),
      invalidatesTags: ["Auth"],
    }),
    logout: builder.mutation({
      query: () => ({
        url: "/logout",
        method: "POST",
      }),
      invalidatesTags: ["Auth"],
    }),
    deleteProfile: builder.mutation({
      query: () => ({
        url: "/delete-profile",
        method: "POST",
      }),
      invalidatesTags: ["Auth"],
    }),
    checkAuth: builder.query({
      query: () => "/check-auth",
      providesTags: ["Auth"],
    }),
    forgetPassword: builder.mutation({
      query: (email) => ({
        url: "/forget-password",
        method: "POST",
        body: { email },
      }),
    }),
    verifyForgetPasswordOTP: builder.mutation({
      query: (credentials) => ({
        url: "/verify-forget-password-otp",
        method: "POST",
        body: credentials,
      }),
    }),
    updatePassword: builder.mutation({
      query: (credentials) => ({
        url: "/update-password",
        method: "POST",
        body: credentials,
      }),
    }),
    updateProfileInfo: builder.mutation({
      query: (credentials) => ({
        url: "/update-profile-info",
        method: "PUT",
        body: credentials,
      }),
      invalidatesTags: ["Auth"],
    }),
    updateProfileImage: builder.mutation({
      query: (credentials) => ({
        url: "/update-profile-image",
        method: "PUT",
        body: credentials,
      }),
      invalidatesTags: ["Auth"],
    }),
    getProfile: builder.query({
      query: (userId) => `/${userId}`,
      providesTags: ["Auth"],
    }),
    createBio: builder.mutation({
      query: (credentials) => ({
        url: "/create-bio",
        method: "POST",
        body: credentials,
      }),
      invalidatesTags: ["Auth"],
    }),
  }),
});

export const {
  useRegisterMutation,
  useLoginMutation,
  useVerifyOTPMutation,
  useLogoutMutation,
  useDeleteProfileMutation,
  useCheckAuthQuery,
  useForgetPasswordMutation,
  useUpdatePasswordMutation,
  useUpdateProfileInfoMutation,
  useUpdateProfileImageMutation,
  useVerifyForgetPasswordOTPMutation,
  useGetProfileQuery,
  useCreateBioMutation,
} = authApiSlice;
