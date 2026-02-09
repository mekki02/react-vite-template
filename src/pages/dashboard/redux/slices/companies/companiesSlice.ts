import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import type { Company } from '../../../types';
import type { ApiResponse } from '../../../types';
import type { CrudParameters } from '../../../types';

export const companiesApi = createApi({
    reducerPath: 'companiesApi',
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
    tagTypes: ['Companies', 'Company'],
    endpoints: builder => ({
        getCompanies: builder.query<
            ApiResponse<Company[]>,  
            CrudParameters
        >({
            query: params => ({
                url: 'companies',
                params,
            }),
            providesTags: ['Companies'],
        }),
        getCompanyById: builder.query<ApiResponse<Company>, string>({
            query: id => `companies/${id}`,
            providesTags: ['Company'],
        }),
        createCompany: builder.mutation<ApiResponse<Company>, Partial<Company & { organizationId: string }>>({
            query: newUser => ({
                url: 'companies',
                method: 'POST',
                body: newUser,
            }),
            invalidatesTags: ['Companies'],
        }),
        updateCompany: builder.mutation<ApiResponse<Company>, Partial<Company> & { id: string }>({
            query: ({ id, ...patch }) => ({
                url: `companies/${id}`,
                method: 'PUT',
                body: patch,
            }),
            invalidatesTags: ['Companies'],
        }),
        deleteCompany: builder.mutation<void, string>({
            query: id => ({
                url: `companies/${id}`,
                method: 'DELETE',
            }),
            invalidatesTags: ['Companies'],
        }),
    }),
})

export const { useGetCompaniesQuery, useCreateCompanyMutation, useUpdateCompanyMutation, useDeleteCompanyMutation, useGetCompanyByIdQuery } = companiesApi
