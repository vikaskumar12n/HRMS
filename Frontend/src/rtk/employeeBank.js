import { createApi } from "@reduxjs/toolkit/query/react";
import axiosBaseQuery from "./axiosBaseQuery";

export const bankDetailApi = createApi({
  reducerPath: "bankDetailApi", // ✅ make it consistent
  baseQuery: axiosBaseQuery,
  tagTypes: ["bank"],
  endpoints: (builder) => ({
    bankAdd: builder.mutation({
      query: ({ data, id }) => ({
        url: `/employee/bank/add/${id}`,
        method: "POST",
        data,
        credentials: "include",
      }),
      invalidatesTags: ["bank"],
    }),

    getOneEmployeeBank: builder.query({
      query: ({id}) => (
           console.log("rtk hu1",id),
          {
          url: `/employee/bank/one/${id}`,
          method: "GET",
      }),
      providesTags: ["bank"], 
  }), 
  }),
});

export const { useBankAddMutation,useGetOneEmployeeBankQuery} = bankDetailApi;
