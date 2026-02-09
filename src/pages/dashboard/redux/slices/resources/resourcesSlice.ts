import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import type { Resource } from '../../../types';

export const resourcesApi = createApi({
    reducerPath: 'resourcesApi',
    baseQuery: fetchBaseQuery({
        baseUrl: 'http://localhost:5001/api',
    }),
    tagTypes: ['Resources'],
    endpoints: builder => ({
        getResources: builder.query<
            { data: Resource[]; totalCount: number },
            { page: number; pageSize: number; search: string }
        >({
            query: params => ({
                url: 'resources',
                params,
            }),
            providesTags: ['Resources'],
        }),
        createResource: builder.mutation<Resource, Partial<Resource>>({
            query: newUser => ({
                url: 'resources',
                method: 'POST',
                body: newUser,
            }),
            invalidatesTags: ['Resources'],
        }),
        updateResource: builder.mutation<Resource, Partial<Resource> & { id: string }>({
            query: ({ id, ...patch }) => ({
                url: `resources/${id}`,
                method: 'PUT',
                body: patch,
            }),
            invalidatesTags: ['Resources'],
        }),
        deleteResource: builder.mutation<{ success: boolean; id: string }, string>({
            query: id => ({
                url: `resources/${id}`,
                method: 'DELETE',
            }),
            invalidatesTags: ['Resources'],
        }),
    }),
})

export const { useGetResourcesQuery, useCreateResourceMutation, useUpdateResourceMutation, useDeleteResourceMutation } = resourcesApi
