import { fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import type { BaseQueryFn, FetchArgs, FetchBaseQueryError } from '@reduxjs/toolkit/query'

export const customBaseQuery: BaseQueryFn<
  string | FetchArgs,
  unknown,
  FetchBaseQueryError
> = async (args, api, extraOptions) => {
  const token = sessionStorage.getItem('token')
  const baseQuery = fetchBaseQuery({
    baseUrl: 'http://localhost:5001/api',
    prepareHeaders: (headers) => {
      if (token) {
        headers.set('authorization', `Bearer ${token}`)
      }
      return headers
    },
  })
  return baseQuery(args, api, extraOptions)
}
