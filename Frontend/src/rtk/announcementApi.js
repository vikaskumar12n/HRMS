import { createApi } from "@reduxjs/toolkit/query/react";
import axiosBaseQuery from "./axiosBaseQuery";

export const announcementApi = createApi({
  reducerPath: "announcement",
  baseQuery: axiosBaseQuery,
  tagTypes: ["announcement"],
  
  endpoints: (builder) => ({
    getAllAnnouncements: builder.query({
      query: () => ({
        url: "/compay/profile/get/all/announcements",
        method: "GET",
      }),
      providesTags: ["announcement"],
    }),
    
    addAnnouncement: builder.mutation({
      query: (data) => ({
        url: "/compay/profile/add/announcement",
        method: "POST",
        data,
      }),
      invalidatesTags: ["announcement"],
    }),
    
    updateAnnouncement: builder.mutation({
      query: ({ id, data }) => ({
        url: `/compay/profile/update/announcement/${id}`,
        method: "PUT",
        data,
      }),
      invalidatesTags: ["announcement"],
    }),
    
    deleteAnnouncement: builder.mutation({
      query: ({ id }) => ({
        url: `/compay/profile/delete/announcement/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["announcement"],
    }),
  }),
});

export const {
  useGetAllAnnouncementsQuery,
  useAddAnnouncementMutation,
  useUpdateAnnouncementMutation,
  useDeleteAnnouncementMutation,
} = announcementApi;