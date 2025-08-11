import { createApi } from '@reduxjs/toolkit/query/react';
import axiosBaseQuery from './axiosBaseQuery';
export const workDetailApi = createApi({
  reducerPath: 'workApi',
  baseQuery: axiosBaseQuery,
  tagTypes: ['work'],
  endpoints: (builder) => ({
    workAdd: builder.mutation({
      query: ({ data, id }) => ({
        url: `/employee/work/add/${id}`,
        method: 'POST',
        data,
        credentials: 'include'
      }),
      invalidatesTags: ['work']
    }),
    workEdit: builder.mutation({
      query: ({ data, id }) => ({
        url: `/employee/work/update/${id}`,
        method: 'PUT',
        data,
        credentials: 'include'
      }),
      invalidatesTags: ['work']
    }),

    getOneEmployeeWork: builder.query({
      query: ({ id }) => (
        console.log('rtk', id),
        {
          url: `/employee/work/get/${id}`,
          method: 'GET'
        }
      ),
      providesTags: ['work']
    }),

    getAllEmployeeWork: builder.query({
      query: () => (
        console.log('rtk'),
        {
          url: `/employee/work/alldata`,
          method: 'GET'
        }
      ),
      providesTags: ['work']
    })
  })
});
export const { useWorkAddMutation, useWorkEditMutation, useGetOneEmployeeWorkQuery,useGetAllEmployeeWorkQuery } = workDetailApi;
