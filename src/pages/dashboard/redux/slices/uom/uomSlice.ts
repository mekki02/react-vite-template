import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import type { ApiResponse, CrudParameters, UOM } from '../../../types'

export const uomApi = createApi({
    reducerPath: 'uomApi',
    baseQuery: fetchBaseQuery({
        baseUrl: 'http://localhost:5001/api',
        prepareHeaders: (headers) => {
            const token = sessionStorage.getItem('token')
            if (token) {
                headers.set('authorization', `Bearer ${token}`)
            }
            return headers
        },
    }),
    tagTypes: ['UOM'],
    endpoints: builder => ({
        getUOMs: builder.query<
            ApiResponse<UOM[]>,
            CrudParameters & { organizationId: string }
        >({
            query: ({ organizationId, ...params }) => ({
                url: `/organizations/${organizationId}/uoms`,
                params,
            }),
            providesTags: ['UOM'],
        }),
        getUOMById: builder.query<ApiResponse<UOM>, string>({
            query: id => `uoms/${id}`,
            providesTags: ['UOM'],
        }),
        createUOM: builder.mutation<ApiResponse<UOM>, Partial<UOM>>({
            query: newUOM => ({
                url: 'uoms',
                method: 'POST',
                body: newUOM,
            }),
            invalidatesTags: ['UOM'],
        }),
        updateUOM: builder.mutation<void, Partial<UOM> & { id: string }>({
            query: ({ id, ...patch }) => ({
                url: `uoms/${id}`,
                method: 'PUT',
                body: patch,
            }),
            invalidatesTags: ['UOM'],
        }),
        deleteUOM: builder.mutation<{ success: boolean; id: string }, string>({
            query: id => ({
                url: `uoms/${id}`,
                method: 'DELETE',
            }),
            invalidatesTags: ['UOM'],
        }),
    }),
})

export const {
    useGetUOMsQuery,
    useGetUOMByIdQuery,
    useCreateUOMMutation,
    useUpdateUOMMutation,
    useDeleteUOMMutation,
} = uomApi;
