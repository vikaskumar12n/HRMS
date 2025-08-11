import { createApi } from '@reduxjs/toolkit/query/react';
import axiosBaseQuery from './axiosBaseQuery';

export const docDetailApi = createApi({
  reducerPath: 'DocApi',
  baseQuery: axiosBaseQuery,
  tagTypes: ['doc'],
  endpoints: (builder) => ({
    docAdd: builder.mutation({
      query: ({ formData, id }) => ({
        url: `/employee/document/add/${id}`,
        method: 'POST',
        data: formData,
        credentials: 'include'
      }),
      invalidatesTags: ['doc']
    }),

    docUpdate: builder.mutation({
      query: ({ formData, id }) => ({
        url: `/employee/document/update/${id}`,
        method: 'PUT',
        data: formData,
        credentials: 'include'
      }),
      invalidatesTags: ['doc']
    }),

    getEmployeedoc: builder.query({
      query: ({ id }) => ({
        url: `/employee/document/get/${id}`,
        method: 'GET'
      }),
      providesTags: ['doc']
    }),

    // Optional All-doc API
    // getAllEmployeedoc: builder.query({
    //   query: () => ({
    //     url: `/employee/doc/allformData`,
    //     method: 'GET'
    //   }),
    //   providesTags: ['doc']
    // })
  })
});

export const {
  useDocAddMutation,
  useGetEmployeedocQuery,
  useDocUpdateMutation
} = docDetailApi;
