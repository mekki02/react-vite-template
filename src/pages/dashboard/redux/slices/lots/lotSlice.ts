import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import type { Lot } from '../../../types';

export const lotsApi = createApi({
    reducerPath: 'lotsApi',
    baseQuery: fetchBaseQuery({
        baseUrl: '/api',
    }),
    tagTypes: ['Lots'],
    endpoints: builder => ({
        getLots: builder.query<
            { data: Lot[]; totalCount: number },
            { page: number; pageSize: number; search: string; productId?: string }
        >({
            query: params => ({
                url: 'lots',
                params,
            }),
            providesTags: ['Lots'],
        }),
        getLotById: builder.query<Lot, string>({
            query: id => `lots/${id}`,
            providesTags: ['Lots'],
        }),
        getLotsByProductId: builder.query<Lot[], string>({
            query: productId => `lots?productId=${productId}`,
            providesTags: ['Lots'],
        }),
        createLot: builder.mutation<Lot, Partial<Lot>>({
            query: newLot => ({
                url: 'lots',
                method: 'POST',
                body: newLot,
            }),
            invalidatesTags: ['Lots'],
        }),
        updateLot: builder.mutation<Lot, Partial<Lot> & { id: string }>({
            query: ({ id, ...patch }) => ({
                url: `lots/${id}`,
                method: 'PUT',
                body: patch,
            }),
            invalidatesTags: ['Lots'],
        }),
        deleteLot: builder.mutation<{ success: boolean; id: string }, string>({
            query: id => ({
                url: `lots/${id}`,
                method: 'DELETE',
            }),
            invalidatesTags: ['Lots'],
        }),
    }),
})

export const {
    useGetLotsQuery,
    useGetLotByIdQuery,
    useGetLotsByProductIdQuery,
    useCreateLotMutation,
    useUpdateLotMutation,
    useDeleteLotMutation,
} = lotsApi;
