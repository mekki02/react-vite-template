import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import type { Invitation } from '../../../types';

export const invitationsApi = createApi({
    reducerPath: 'invitationsApi',
    baseQuery: fetchBaseQuery({
        baseUrl: '/api',
    }),
    tagTypes: ['Invitations'],
    endpoints: builder => ({
        getInvitations: builder.query<
            { data: Invitation[]; totalCount: number },
            { page: number; pageSize: number; search: string }
        >({
            query: params => ({
                url: 'invitations',
                params,
            }),
            providesTags: ['Invitations'],
        }),
        getInvitationById: builder.query<Invitation, string>({
            query: id => `invitations/${id}`,
            providesTags: ['Invitations'],
        }),
        createInvitation: builder.mutation<Invitation, Partial<Invitation>>({
            query: newInvitation => ({
                url: 'invitations',
                method: 'POST',
                body: newInvitation,
            }),
            invalidatesTags: ['Invitations'],
        }),
        updateInvitation: builder.mutation<Invitation, Partial<Invitation> & { id: string }>({
            query: ({ id, ...patch }) => ({
                url: `invitations/${id}`,
                method: 'PUT',
                body: patch,
            }),
            invalidatesTags: ['Invitations'],
        }),
        deleteInvitation: builder.mutation<{ success: boolean; id: string }, string>({
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
