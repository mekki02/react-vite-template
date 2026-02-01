import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import type { User } from '../../../types';

export const usersApi = createApi({
    reducerPath: 'usersApi',
    baseQuery: fetchBaseQuery({
        baseUrl: '/api',
    }),
    tagTypes: ['Users'],
    endpoints: builder => ({
        getUsers: builder.query<
            { data: User[]; totalCount: number },
            { page: number; pageSize: number; search: string }
        >({
            query: params => ({
                url: 'users',
                params,
            }),
            providesTags: ['Users'],
        }),
        getUserById: builder.query<User, string>({
            query: id => `users/${id}`,
            providesTags: ['Users'],
        }),
        createUser: builder.mutation<User, Partial<User>>({
            query: newUser => ({
                url: 'users',
                method: 'POST',
                body: newUser,
            }),
            invalidatesTags: ['Users'],
        }),
        updateUser: builder.mutation<User, Partial<User> & { id: string }>({
            query: ({ id, ...patch }) => ({
                url: `users/${id}`,
                method: 'PUT',
                body: patch,
            }),
            invalidatesTags: ['Users'],
        }),
        deleteUser: builder.mutation<{ success: boolean; id: string }, string>({
            query: id => ({
                url: `users/${id}`,
                method: 'DELETE',
            }),
            invalidatesTags: ['Users'],
        }),
    }),
})

export const { useGetUsersQuery, useCreateUserMutation, useUpdateUserMutation, useDeleteUserMutation, useGetUserByIdQuery } = usersApi
