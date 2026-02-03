import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import type { 
  LoginCredentials, 
  RegisterData, 
  ForgotPasswordData, 
  ResetPasswordData,
  AuthResponse,
  VerifyEmailResponse,
  ForgotPasswordResponse,
  ResetPasswordResponse,
  User 
} from '../../../types'

export const authApi = createApi({
    reducerPath: 'authApi',
    baseQuery: fetchBaseQuery({
        baseUrl: '/api/auth',
        prepareHeaders: (headers) => {
            const token = localStorage.getItem('token')
            if (token) {
                headers.set('authorization', `Bearer ${token}`)
            }
            return headers
        },
    }),
    tagTypes: ['Auth'],
    endpoints: builder => ({
        login: builder.mutation<AuthResponse, LoginCredentials>({
            query: (credentials) => ({
                url: 'login',
                method: 'POST',
                body: credentials,
            }),
        }),
        register: builder.mutation<AuthResponse, RegisterData>({
            query: (userData) => ({
                url: 'register',
                method: 'POST',
                body: userData,
            }),
        }),
        verifyEmail: builder.mutation<VerifyEmailResponse, { token: string }>({
            query: ({ token }) => ({
                url: `verify-email?token=${encodeURIComponent(token)}`,
                method: 'GET',
            }),
        }),
        forgotPassword: builder.mutation<ForgotPasswordResponse, ForgotPasswordData>({
            query: (data) => ({
                url: 'forgot-password',
                method: 'POST',
                body: data,
            }),
        }),
        resetPassword: builder.mutation<ResetPasswordResponse, ResetPasswordData>({
            query: (data) => ({
                url: 'reset-password',
                method: 'POST',
                body: data,
            }),
        }),
        refreshToken: builder.mutation<{ token: string; refreshToken: string }, void>({
            query: () => ({
                url: 'refresh-token',
                method: 'POST',
            }),
        }),
        getCurrentUser: builder.query<User, void>({
            query: () => 'me',
            providesTags: ['Auth'],
        }),
        logout: builder.mutation<{ success: boolean }, void>({
            query: () => ({
                url: 'logout',
                method: 'POST',
            }),
        }),
    }),
})

export const {
    useLoginMutation,
    useRegisterMutation,
    useVerifyEmailMutation,
    useForgotPasswordMutation,
    useResetPasswordMutation,
    useRefreshTokenMutation,
    useGetCurrentUserQuery,
    useLogoutMutation,
} = authApi
