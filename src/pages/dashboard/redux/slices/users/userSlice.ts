import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import type { CrudParameters, User } from '../../../types';
import { type ApiResponse } from '../../../types';

export const usersApi = createApi({
    reducerPath: 'usersApi',
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
    tagTypes: ['Users'],
    endpoints: builder => ({
        getUsers: builder.query<
            ApiResponse<User[]>,
            CrudParameters
        >({
            query: params => ({
                url: 'users',
                params,
            }),
            providesTags: ['Users'],
        }),
        getUserById: builder.query<ApiResponse<User>, string>({
            query: id => `users/${id}`,
            providesTags: ['Users'],
        }),
        createUser: builder.mutation<ApiResponse<User>, Partial<User>>({
            query: newUser => ({
                url: 'users',
                method: 'POST',
                body: newUser,
            }),
            invalidatesTags: ['Users'],
        }),
        updateUser: builder.mutation<ApiResponse<User>, Partial<User> & { id: string }>({
            query: ({ id, ...patch }) => ({
                url: `users/${id}`,
                method: 'PATCH',
                body: patch,
            }),
            invalidatesTags: ['Users'],
        }),
        deleteUser: builder.mutation<void, string>({
            query: id => ({
                url: `users/${id}`,
                method: 'DELETE',
            }),
            invalidatesTags: ['Users'],
        }),
    }),
})

export const { useGetUsersQuery, useCreateUserMutation, useUpdateUserMutation, useDeleteUserMutation, useGetUserByIdQuery } = usersApi
