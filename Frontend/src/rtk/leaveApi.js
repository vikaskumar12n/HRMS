import { createApi } from "@reduxjs/toolkit/query/react";
import axiosBaseQuery from "./axiosBaseQuery";

export const leaveApi = createApi({
  reducerPath: "leave",
  baseQuery: axiosBaseQuery,
  tagTypes: ["leave"],

  endpoints: (builder) => ({
    leaveCreate: builder.mutation({
      query: ({ id, formData }) => ({
        url: `leave/add/${id}`,
        method: "POST",
        data: formData,
      }),
      invalidatesTags: ["leave"],
    }),

    leaveDelete: builder.mutation({
      query: ({ leaveId }) => ({
        url: `leave/delete/${leaveId}`,
        method: "DELETE",
      }),
      invalidatesTags: ["leave"],
    }),

    leaveUpdate: builder.mutation({
      query: ({ id, formData }) => ({
        url: `leave/edit/${id}`,
        method: "PUT",
        data: formData,
      }),
      invalidatesTags: ["leave"],
    }),

    ApproveLeave: builder.mutation({
      query: ({id}) => ({
        url: `leave/aproved/${id}`,
        method: "PUT",
      }),
      invalidatesTags: ["leave"],
    }),

    RejectLeave: builder.mutation({
      query: ({id}) => ({
        url: `leave/reject/${id}`,
        method: "PUT",
      }),
      invalidatesTags: ["leave"],
    }),

    getLeaveDetail: builder.query({
      query: () => ({
        url: "/leave/all/detal",
        method: "GET",
      }),
      providesTags: ["leave"],
    }),

    getAllLeave: builder.query({
      query: () => ({
        url: "/leave/all",
        method: "GET",
      }),
      providesTags: ["leave"],
    }),

    getEmployeeLeave: builder.query({
      query: () => ({
        url: "/leave/all/employee",
        method: "GET",
      }),
      providesTags: ["leave"],
    }),

    getLeave: builder.query({
      query: ({id , range}) => ({
        url: `/leave/get/myleave/${id}?${range}`,
        method: "GET",
      }),
      providesTags: ["employeeleave"],
    }),
   
  }),
});

export const {
  useGetEmployeeLeaveQuery,
  useGetLeaveDetailQuery,
  useLeaveCreateMutation,
  useLeaveDeleteMutation,
  useLeaveUpdateMutation,
  useApproveLeaveMutation,
  useGetAllLeaveQuery,
  useRejectLeaveMutation,
  useGetLeaveQuery
} = leaveApi;