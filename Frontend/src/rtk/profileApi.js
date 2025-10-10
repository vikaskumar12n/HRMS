import { createApi } from "@reduxjs/toolkit/query/react";
import axiosBaseQuery from "./axiosBaseQuery";

export const profileApi = createApi({
  reducerPath: "profile",
  baseQuery: axiosBaseQuery,
  tagTypes: ["profile"],
  
  endpoints: (builder) => ({
    getAllProfiles: builder.query({
      query: () => ({
        url: "/profile",
        method: "GET",
      }),
      providesTags: ["profile"],
    }),
    
    addProfile: builder.mutation({
      query: (data) => ({
        url: "/profile",
        method: "POST",
        data,
      }),
      invalidatesTags: ["profile"],
    }),
    
    updateProfile: builder.mutation({
      query: ({ id, data }) => ({
        url: `/profile/${id}`,
        method: "PUT",
        data,
      }),
      invalidatesTags: ["profile"],
    }),
    
    deleteProfile: builder.mutation({
      query: ({ id }) => ({
        url: `/profile/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["profile"],
    }),
  }),
});

export const {
  useGetAllProfilesQuery,
  useAddProfileMutation,
  useUpdateProfileMutation,
  useDeleteProfileMutation,
} = profileApi;