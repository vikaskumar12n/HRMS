import { createApi } from "@reduxjs/toolkit/query/react";
import axiosBaseQuery from "./axiosBaseQuery";

export const policyApi = createApi({
  reducerPath: "policyApi", // ✅ make it consistent
  baseQuery: axiosBaseQuery,
  tagTypes: ["policy"],
  endpoints: (builder) => ({
    policyAdd: builder.mutation({
      query: (data) => (
        {
        url: "/policy/add",
        method: "POST",
        data,
        credentials: "include",
      }),
      invalidatesTags: ["policy"],
    }),
    
    policyEdit: builder.mutation({
      query: ({ id, title, description }) => (
          console.log(id),
        {
        url: `/policy/update/${id}`,
        method: "PUT",
        data: { title, description },
        credentials: "include",
      }),
      invalidatesTags: ["policy"],
    }),

    policyAll: builder.query({
      query: () => (
          {
          url: "/policy/all",
          method: "GET",
      }),
      providesTags: ["policy"], 
  }), 

  policyDelete:builder.mutation({
     query:({id})=>(
          console.log("rtk",id),
      {
        url:`/policy/delete/${id}`,
        method:"DELETE"
     }),
     invalidatesTags:["policy"]
  })
  }),
});

export const {usePolicyAddMutation,usePolicyAllQuery,usePolicyDeleteMutation,usePolicyEditMutation} = policyApi;
