import { createApi } from "@reduxjs/toolkit/query/react";
import axiosBaseQuery from "./axiosBaseQuery";

export const employeeDetailApi = createApi({
    reducerPath: "employee",
    baseQuery: axiosBaseQuery,
    tagTypes: ["employee"], 

    endpoints: (builder) => ({
        getAllEmployee: builder.query({
            query: () => ({
                url: "/employee/all",
                method: "GET",
            }),
            providesTags: ["employee"], 
        }), 

        getAllEmployeeDetail: builder.query({
            query: ({id}) => ({
                url: `/employee/all/detail/${id}`,
                method: "GET",
            }),
            providesTags: ["employee"], 
        }), 

        getEmployeeProfile: builder.query({
            query: () => ({
                url: "/employee/profile",
                method: "GET",
            }),
            providesTags: ["employee"], 
        }), 
        addEmployee:builder.mutation(
            {
            query:(formData)=>(
                {
                url:"employee/add",
                method:"POST",
                data:formData,
            }),
            invalidatesTags:["employee"],
        }),
        deleteEmployee:builder.mutation({
            query:(id)=>({
               url:`employee/delete/${id}`,
               method:"DELETE",
            }),
            invalidatesTags:["employee"],
         }) ,
          employeeEdit:builder.mutation({
            query:({id,formData})=>(
                   console.log("rtk",id),
                {
                url:`employee/update/${id}`,
                method:"PUT",
                data:formData
            }),
            invalidatesTags:["employee"],
        }),

        employeeLogin:builder.mutation({
            query:(data)=>(
                {
                url:`employee/login`,
                method:"POST",
                data
            }),
            invalidatesTags:["employee"],
        }),
        getOneEmployee: builder.query({
            query: ({id}) => (
                //  console.log("rtk",id),
                 
                {
                url: `/employee/get/${id}`,
                method: "GET",
            }),
            providesTags: ["employee"], 
        }), 
    }),
});

export const {useGetAllEmployeeQuery,
    useAddEmployeeMutation,
    useDeleteEmployeeMutation,
    useEmployeeEditMutation,
    useEmployeeLoginMutation,
    useGetOneEmployeeQuery,
    useGetEmployeeProfileQuery,
    useGetAllEmployeeDetailQuery
} = employeeDetailApi;
