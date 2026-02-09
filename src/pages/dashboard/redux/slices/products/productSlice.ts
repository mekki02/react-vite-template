import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import type { ApiResponse, CrudParameters, Product } from '../../../types';

export const productsApi = createApi({
    reducerPath: 'productsApi',
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
    tagTypes: ['Products'],
    endpoints: builder => ({
        getProducts: builder.query<
            ApiResponse<Product[]>,
            CrudParameters
        >({
            query: params => ({
                url: 'products',
                params,
            }),
            providesTags: ['Products'],
        }),
        getProductById: builder.query<ApiResponse<Product>, string>({
            query: id => `products/${id}`,
            providesTags: ['Products'],
        }),
        createProduct: builder.mutation<ApiResponse<Product>, Partial<Product>>({
            query: newProduct => ({
                url: 'products',
                method: 'POST',
                body: newProduct,
            }),
            invalidatesTags: ['Products'],
        }),
        updateProduct: builder.mutation<ApiResponse<Product>, Partial<Product> & { id: string }>({
            query: ({ id, ...patch }) => ({
                url: `products/${id}`,
                method: 'PUT',
                body: patch,
            }),
            invalidatesTags: ['Products'],
        }),
        deleteProduct: builder.mutation<void, string>({
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
