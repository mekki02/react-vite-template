import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import type { Organization } from '../../../types'

export const organizationsApi = createApi({
    reducerPath: 'organizationsApi',
    baseQuery: fetchBaseQuery({
        baseUrl: 'http://localhost:5001/api',
    }),
    tagTypes: ['Organizations'],
    endpoints: builder => ({
        getOrganizations: builder.query<
            { data: Organization[]; totalCount: number },
            { page: number; pageSize: number; search: string }
        >({
            query: params => ({
                url: 'organizations',
                params,
            }),
            providesTags: ['Organizations'],
        }),
        getOrganizationById: builder.query<Organization, string>({
            query: id => `organizations/${id}`,
            providesTags: ['Organizations'],
        }),
        createOrganization: builder.mutation<Organization, Partial<Organization>>({
            query: newOrganization => ({
                url: 'organizations',
                method: 'POST',
                body: newOrganization,
            }),
            invalidatesTags: ['Organizations'],
        }),
        updateOrganization: builder.mutation<Organization, Partial<Organization> & { id: string }>({
            query: ({ id, ...patch }) => ({
                url: `organizations/${id}`,
                method: 'PUT',
                body: patch,
            }),
            invalidatesTags: ['Organizations'],
        }),
        deleteOrganization: builder.mutation<{ success: boolean; id: string }, string>({
            query: id => ({
                url: `organizations/${id}`,
                method: 'DELETE',
            }),
            invalidatesTags: ['Organizations'],
        }),
    }),
})

export const {
    useGetOrganizationsQuery,
    useGetOrganizationByIdQuery,
    useCreateOrganizationMutation,
    useUpdateOrganizationMutation,
    useDeleteOrganizationMutation,
} = organizationsApi;
