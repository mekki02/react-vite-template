import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import type { ApiResponse, CrudParameters, Lot } from '../../../types';

export const lotsApi = createApi({
    reducerPath: 'lotsApi',
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
    tagTypes: ['Lots'],
    endpoints: builder => ({
        getLots: builder.query<
            ApiResponse<Lot[]>,
            CrudParameters & { organizationId: string }
        >({
            query: ({organizationId, ...params}) => {
                return ({
                    url: `/organizations/${organizationId}/lots`,
                    params,
                })
            },
            providesTags: ['Lots'],
        }),
        getLotById: builder.query<ApiResponse<Lot>, string>({
            query: id => `lots/${id}`,
            providesTags: ['Lots'],
        }),
        getLotsByProductId: builder.query<ApiResponse<Lot[]>, string>({
            query: productId => `lots?productId=${productId}`,
            providesTags: ['Lots'],
        }),
        createLot: builder.mutation<ApiResponse<Lot>, Partial<Lot>>({
            query: newLot => ({
                url: 'lots',
                method: 'POST',
                body: newLot,
            }),
            invalidatesTags: ['Lots'],
        }),
        updateLot: builder.mutation<ApiResponse<Lot>, Partial<Lot> & { id: string }>({
            query: ({ id, ...patch }) => ({
                url: `lots/${id}`,
                method: 'PUT',
                body: patch,
            }),
            invalidatesTags: ['Lots'],
        }),
        deleteLot: builder.mutation<void, string>({
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
