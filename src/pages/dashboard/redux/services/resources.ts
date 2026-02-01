// import { createAsyncThunk } from "@reduxjs/toolkit";
// import type { Resource } from "../../types";
// import type { DashboardStoreState } from "../store";

// export const fetchResources = createAsyncThunk<
//   { data: Resource[]; totalCount: number },
//   void,
//   { state: DashboardStoreState }
// >('resources/fetchResources', async (_, { getState }) => {
//   const { page, pageSize, search } = getState().resources;

//   const params = new URLSearchParams({
//     page: String(page),
//     pageSize: String(pageSize),
//     search,
//   })

//   const res = await fetch(`/api/resources?${params}`);
//   return res.json()
// })