import { createApi } from "@reduxjs/toolkit/query/react";
import axiosBaseQuery from "./axiosBaseQuery";

export const attendanceDetailApi = createApi({
  reducerPath: "attendance",
  baseQuery: axiosBaseQuery,
  tagTypes: ["attendance"],

  endpoints: (builder) => ({
    employeeCheckIn: builder.mutation({
      query: ({payload , id}) => ({
        url: `employee/attendance/checkIn/${id}`,
        method: "POST",
        data:payload
      }),
      invalidatesTags: ["attendance"],
    }),
    employeeChekOut: builder.mutation({
      query: ({id}) => (
        console.log("rtk"),
        {
          url: `employee/attendance/checkout/${id}`,
          method: "PUT",
        }
      ),
      invalidatesTags: ["attendance"],
    }),

    getAttendanceDetail: builder.query({
      query: () => ({
        url: "/employee/attendance/get/monthly/detail",
        method: "GET",
      }),
      providesTags: ["attendance"],
    }),

    getWeeklayChar:builder.query({
            query:()=>({
              url:"/employee/attendance/weekly/attendance/chart",
              method:"GET",
            }),
            providesTags:["attendance"],
    }),

    attendanceFilter: builder.query({
      query: (range = "all") =>
         ({
        url: `/employee/attendance/filter?${range}`,
        method: "GET",
      }),
      providesTags: ["attendance"],
    }),

    attendanceByMonth: builder.query({
      query: (range = "all") => ({
        url: `/employee/attendance/all/calendar/view?month=${range}`,
        method: "GET",
      }),
      providesTags: ["attendance"],
    }),
    
    employeeAllDetail: builder.mutation({
      query: (id) => (
        console.log("rtk+++", id),
        {
          url: `employee/attendance/all/detail/${id}`,
          method: "GET",
        }
      ),
    }),
    employeeAttendance: builder.query({
      query: ({range, id}) => (
        {
          url: `employee/attendance/individual/${id}?${range}`,
          method: "GET",
        }
      ),
       providesTags: ["employeeAttendance"],
    }),
  }),
});

export const {
  useEmployeeCheckInMutation,
  useEmployeeChekOutMutation,
  useEmployeeAllDetailMutation,
  useGetAttendanceDetailQuery,
  useAttendanceFilterQuery,
  useGetWeeklayCharQuery,
  useAttendanceByMonthQuery,
  useEmployeeAttendanceQuery
} = attendanceDetailApi;
