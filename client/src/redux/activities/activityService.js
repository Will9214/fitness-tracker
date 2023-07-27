import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const activityApi = createApi({
  reducerPath: "activityApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://127.0.0.1:5000",
    prepareHeaders: (headers, { getState }) => {
      const token = getState().auth.userToken;
      if (token) {
        headers.set("authorization", `Bearer ${token}`);
        return headers;
      }
    },
  }),
  endpoints: (builder) => ({
    getUserActivities: builder.query({
      query: () => ({
        url: "/api/getUserActivities",
        method: "GET",
      }),
    }),
  }),
});

export const { useGetUserActivitiesQuery } = activityApi;