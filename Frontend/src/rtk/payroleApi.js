import { createApi } from "@reduxjs/toolkit/query/react";
import axiosBaseQuery from "./axiosBaseQuery";

export const payroleApi = createApi({
    reducerPath: "payrole",
    baseQuery: axiosBaseQuery,
    tagTypes: ["payrole"],

    endpoints: (builder) => ({
        getPayroleList: builder.query({
            query: (year) => ({
                url: `/payroll/view/list?year=${year}`,
                method: "GET",
            }),
            providesTags: ["payrole"],
        }),

        paySalary: builder.mutation({
            query: (data) => ({
                url: `/payroll/pay/salary`,   
                method: "POST",               
                data:data,                   
            }),
            invalidatesTags: ["payrole"],    
        }),

    }),
});

export const {
    useGetPayroleListQuery,
    usePaySalaryMutation
} = payroleApi;
