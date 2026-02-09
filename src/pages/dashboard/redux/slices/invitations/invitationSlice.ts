import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import type { ApiResponse, Invitation } from '../../../types';
import type { CrudParameters } from '../../../types';

export const invitationsApi = createApi({
    reducerPath: 'invitationsApi',
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
    tagTypes: ['Invitations'],
    endpoints: builder => ({
        getInvitations: builder.query<
            ApiResponse<Invitation[]>,
            CrudParameters
        >({
            query: params => ({
                url: 'invitations',
                params,
            }),
            providesTags: ['Invitations'],
        }),
        getInvitationById: builder.query<ApiResponse<Invitation>, string>({
            query: id => `invitations/${id}`,
            providesTags: ['Invitations'],
        }),
        createInvitation: builder.mutation<ApiResponse<Invitation>, Partial<Invitation>>({
            query: newInvitation => ({
                url: 'invitations',
                method: 'POST',
                body: newInvitation,
            }),
            invalidatesTags: ['Invitations'],
        }),
        updateInvitation: builder.mutation<ApiResponse<Invitation>, Partial<Invitation> & { id: string }>({
            query: ({ id, ...patch }) => ({
                url: `invitations/${id}`,
                method: 'PUT',
                body: patch,
            }),
            invalidatesTags: ['Invitations'],
        }),
        deleteInvitation: builder.mutation<void, string>({
            query: id => ({
                url: `invitations/${id}`,
                method: 'DELETE',
            }),
            invalidatesTags: ['Invitations'],
        }),
    }),
})

export const {
    useGetInvitationsQuery,
    useGetInvitationByIdQuery,
    useCreateInvitationMutation,
    useUpdateInvitationMutation,
    useDeleteInvitationMutation,
} = invitationsApi;
