import { createApi } from "@reduxjs/toolkit/query/react";
import axiosBaseQuery from "./axiosBaseQuery";
export const logiDetail = createApi({
  reducerPath: "authApi",
  baseQuery: axiosBaseQuery,
  tagTypes: ["userSession"],
  endpoints: (builder) => ({
    loginApi: builder.mutation({
      query: (data) => (
        {
        url: "/admin/login",
        method: "POST",
        data,
        credentials: "include",
      }),
      invalidatesTags: ["userSession"],
    }),

    isLogin: builder.query({
      query: () => ({
        url: "/admin/isLogin",
        method: "GET",
        credentials: "include",
      }),
      providesTags: ["userSession"],
      // keepUnusedDataFor: 3000,
      // refetchOnMountOrArgChange: true,
    }),

    
    isLogout: builder.mutation({
      query: () => ({
        url: "/admin/logout",
        method: "POST",
        credentials: "include",
      }),
      invalidatesTags: ["userSession"],
    }),
  }),
});

export const { useLoginApiMutation, useIsLoginQuery, useIsLogoutMutation } =
  logiDetail;
