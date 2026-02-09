import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import type { ApiResponse, CrudParameters, Warehouse } from '../../../types';

export const warehousesApi = createApi({
    reducerPath: 'warehousesApi',
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
    tagTypes: ['Warehouses'],
    endpoints: builder => ({
        getWarehouses: builder.query<
            ApiResponse<Warehouse[]>,
            CrudParameters & { organizationId: string }
        >({
            query: ({ organizationId, ...params }) => ({
                url: `/organizations/${organizationId}/warehouses`,
                params,
            }),
            providesTags: ['Warehouses'],
        }),
        getWarehouseById: builder.query<ApiResponse<Warehouse>, string>({
            query: id => `warehouses/${id}`,
            providesTags: ['Warehouses'],
        }),
        createWarehouse: builder.mutation<ApiResponse<Warehouse>, Partial<Warehouse & { organizationId: string }>>({
            query: newWarehouse => ({
                url: 'warehouses',
                method: 'POST',
                body: newWarehouse,
            }),
            invalidatesTags: ['Warehouses'],
        }),
        updateWarehouse: builder.mutation<ApiResponse<Warehouse>, Partial<Warehouse> & { id: string }>({
            query: ({ id, ...patch }) => ({
                url: `warehouses/${id}`,
                method: 'PUT',
                body: patch,
            }),
            invalidatesTags: ['Warehouses'],
        }),
        deleteWarehouse: builder.mutation<void, string>({
            query: id => ({
                url: `warehouses/${id}`,
                method: 'DELETE',
            }),
            invalidatesTags: ['Warehouses'],
        }),
    }),
})

export const { useGetWarehousesQuery, useCreateWarehouseMutation, useUpdateWarehouseMutation, useDeleteWarehouseMutation, useGetWarehouseByIdQuery } = warehousesApi
