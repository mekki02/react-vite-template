import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import type { UOM } from '../../../types'

export const uomApi = createApi({
    reducerPath: 'uomApi',
    baseQuery: fetchBaseQuery({
        baseUrl: '/api',
    }),
    tagTypes: ['UOM'],
    endpoints: builder => ({
        getUOMs: builder.query<
            { data: UOM[]; totalCount: number },
            { page: number; pageSize: number; search: string }
        >({
            query: params => ({
                url: 'uom',
                params,
            }),
            providesTags: ['UOM'],
        }),
        getUOMById: builder.query<UOM, string>({
            query: id => `uom/${id}`,
            providesTags: ['UOM'],
        }),
        createUOM: builder.mutation<UOM, Partial<UOM>>({
            query: newUOM => ({
                url: 'uom',
                method: 'POST',
                body: newUOM,
            }),
            invalidatesTags: ['UOM'],
        }),
        updateUOM: builder.mutation<UOM, Partial<UOM> & { id: string }>({
            query: ({ id, ...patch }) => ({
                url: `uom/${id}`,
                method: 'PUT',
                body: patch,
            }),
            invalidatesTags: ['UOM'],
        }),
        deleteUOM: builder.mutation<{ success: boolean; id: string }, string>({
            query: id => ({
                url: `uom/${id}`,
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
