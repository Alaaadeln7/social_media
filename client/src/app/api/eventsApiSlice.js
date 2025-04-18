import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { baseURL } from "../../constants/ApiUrl";


export const eventsApiSlice = createApi({
  reducerPath: "eventsApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${baseURL}/events`,
    credentials: "include",
  }),
  tagTypes: ["Events"],
  endpoints: (builder) => ({
    getEvents: builder.query({
      query: () => "/",
      providesTags: ["Events"],
    }),
    createEvent: builder.mutation({
      query: (eventData) => ({
        url: "/create",
        method: "POST",
        body: eventData,
      }),
      invalidatesTags: ["Events"],
    }),
    updateEvent: builder.mutation({
      query: ({ values, eventId }) => ({
        url: `/update/${eventId}`,
        method: "PUT",
        body: values,
      }),
      invalidatesTags: ["Events"],
    }),
    deleteEvent: builder.mutation({
      query: (eventId) => ({
        url: `/delete/${eventId}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Events"],
    }),
  }),
});

export const {
  useGetEventsQuery,
  useCreateEventMutation,
  useUpdateEventMutation,
  useDeleteEventMutation }
  = eventsApiSlice