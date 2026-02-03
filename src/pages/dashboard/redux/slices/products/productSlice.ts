import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import type { Product } from '../../../types';

export const productsApi = createApi({
    reducerPath: 'productsApi',
    baseQuery: fetchBaseQuery({
        baseUrl: '/api',
    }),
    tagTypes: ['Products'],
    endpoints: builder => ({
        getProducts: builder.query<
            { data: Product[]; totalCount: number },
            { page: number; pageSize: number; search: string }
        >({
            query: params => ({
                url: 'products',
                params,
            }),
            providesTags: ['Products'],
        }),
        getProductById: builder.query<Product, string>({
            query: id => `products/${id}`,
            providesTags: ['Products'],
        }),
        createProduct: builder.mutation<Product, Partial<Product>>({
            query: newProduct => ({
                url: 'products',
                method: 'POST',
                body: newProduct,
            }),
            invalidatesTags: ['Products'],
        }),
        updateProduct: builder.mutation<Product, Partial<Product> & { id: string }>({
            query: ({ id, ...patch }) => ({
                url: `products/${id}`,
                method: 'PUT',
                body: patch,
            }),
            invalidatesTags: ['Products'],
        }),
        deleteProduct: builder.mutation<{ success: boolean; id: string }, string>({
            query: id => ({
                url: `products/${id}`,
                method: 'DELETE',
            }),
            invalidatesTags: ['Products'],
        }),
    }),
})

export const {
    useGetProductsQuery,
    useGetProductByIdQuery,
    useCreateProductMutation,
    useUpdateProductMutation,
    useDeleteProductMutation,
} = productsApi;
