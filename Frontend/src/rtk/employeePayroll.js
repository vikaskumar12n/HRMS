import { createApi } from "@reduxjs/toolkit/query/react";
import axiosBaseQuery from "./axiosBaseQuery";

export const EmployeePayrollApi = createApi({
    reducerPath:'payrollApi',
    baseQuery:axiosBaseQuery,
    tagTypes:['payroll'],
    endpoints:(builder)=>({
        getEarnings:builder.query({
            query:({id, date})=>({
                url:`/payroll/employee/view/list/by-month/${id}?${date}`,
                method:'GET',
            }),
             providesTags: ['payroll']
        }),
        getSlip:builder.query({
            query:({id, date})=>({
                url:`/payroll/download/salary/slip/${id}?${date}`,
                method:'GET',
            }),
             providesTags: ['slipPayroll']
        })
    })
})

export const {useGetEarningsQuery, useGetSlipQuery} = EmployeePayrollApi