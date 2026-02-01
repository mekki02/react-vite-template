import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import type { Company } from '../../../types';

export const companiesApi = createApi({
    reducerPath: 'companiesApi',
    baseQuery: fetchBaseQuery({
        baseUrl: '/api',
    }),
    tagTypes: ['Companies', 'Company'],
    endpoints: builder => ({
        getCompanies: builder.query<
            { data: Company[]; totalCount: number },
            { page: number; pageSize: number; search: string }
        >({
            query: params => ({
                url: 'companies',
                params,
            }),
            providesTags: ['Companies'],
        }),
        getCompanyById: builder.query<Company, string>({
            query: id => `companies/${id}`,
            providesTags: ['Company'],
        }),
        createCompany: builder.mutation<Company, Partial<Company>>({
            query: newUser => ({
                url: 'companies',
                method: 'POST',
                body: newUser,
            }),
            invalidatesTags: ['Companies'],
        }),
        updateCompany: builder.mutation<Company, Partial<Company> & { id: string }>({
            query: ({ id, ...patch }) => ({
                url: `companies/${id}`,
                method: 'PUT',
                body: patch,
            }),
            invalidatesTags: ['Companies'],
        }),
        deleteCompany: builder.mutation<{ success: boolean; id: string }, string>({
            query: id => ({
                url: `companies/${id}`,
                method: 'DELETE',
            }),
            invalidatesTags: ['Companies'],
        }),
    }),
})

export const { useGetCompaniesQuery, useCreateCompanyMutation, useUpdateCompanyMutation, useDeleteCompanyMutation, useGetCompanyByIdQuery } = companiesApi
