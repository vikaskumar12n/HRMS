import { configureStore } from "@reduxjs/toolkit";
import { employeeDetailApi } from "./employeeApi";
import { logiDetail } from "./login";
import { attendanceDetailApi } from "./attendance";
import { workDetailApi } from "./employeeworck";
import { bankDetailApi } from "./employeeBank";
import { policyApi } from "./policy";
import { leaveApi } from "./leaveApi";
import { notificationApi } from "./notification";
import { payroleApi } from "./payroleApi";
import { docDetailApi } from "./employeeDoc";
import { EmployeePayrollApi } from "./employeePayroll";
import { announcementApi } from "./announcementApi";
import { profileApi } from "./profileApi";



export const store = configureStore({
  reducer: {
    [employeeDetailApi.reducerPath]: employeeDetailApi.reducer,
    [logiDetail.reducerPath]: logiDetail.reducer,
    [attendanceDetailApi.reducerPath]: attendanceDetailApi.reducer,
    [workDetailApi.reducerPath]: workDetailApi.reducer,
    [bankDetailApi.reducerPath]: bankDetailApi.reducer,
    [policyApi.reducerPath]: policyApi.reducer,
    [leaveApi.reducerPath]: leaveApi.reducer,
    [notificationApi.reducerPath]: notificationApi.reducer,
    [payroleApi.reducerPath]: payroleApi.reducer,
    [docDetailApi.reducerPath]: docDetailApi.reducer,
    [EmployeePayrollApi.reducerPath]: EmployeePayrollApi.reducer,
    [announcementApi.reducerPath]:announcementApi.reducer,
    [profileApi.reducerPath]:profileApi.reducer
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      employeeDetailApi.middleware,
      logiDetail.middleware,
      attendanceDetailApi.middleware,
      workDetailApi.middleware,
      bankDetailApi.middleware,
      policyApi.middleware,
      leaveApi.middleware,
      notificationApi.middleware,
      payroleApi.middleware,
      docDetailApi.middleware,
      EmployeePayrollApi.middleware,
      announcementApi.middleware,
      profileApi.middleware
    ),
});
