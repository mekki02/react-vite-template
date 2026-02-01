import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import type { Warehouse } from '../../../types';

export const warehousesApi = createApi({
    reducerPath: 'warehousesApi',
    baseQuery: fetchBaseQuery({
        baseUrl: '/api',
    }),
    tagTypes: ['Warehouses'],
    endpoints: builder => ({
        getWarehouses: builder.query<
            { data: Warehouse[]; totalCount: number },
            { page: number; pageSize: number; search: string }
        >({
            query: params => ({
                url: 'warehouses',
                params,
            }),
            providesTags: ['Warehouses'],
        }),
        getWarehouseById: builder.query<Warehouse, string>({
            query: id => `warehouses/${id}`,
            providesTags: ['Warehouses'],
        }),
        createWarehouse: builder.mutation<Warehouse, Partial<Warehouse>>({
            query: newWarehouse => ({
                url: 'warehouses',
                method: 'POST',
                body: newWarehouse,
            }),
            invalidatesTags: ['Warehouses'],
        }),
        updateWarehouse: builder.mutation<Warehouse, Partial<Warehouse> & { id: string }>({
            query: ({ id, ...patch }) => ({
                url: `warehouses/${id}`,
                method: 'PUT',
                body: patch,
            }),
            invalidatesTags: ['Warehouses'],
        }),
        deleteWarehouse: builder.mutation<{ success: boolean; id: string }, string>({
            query: id => ({
                url: `warehouses/${id}`,
                method: 'DELETE',
            }),
            invalidatesTags: ['Warehouses'],
        }),
    }),
})

export const { useGetWarehousesQuery, useCreateWarehouseMutation, useUpdateWarehouseMutation, useDeleteWarehouseMutation, useGetWarehouseByIdQuery } = warehousesApi
