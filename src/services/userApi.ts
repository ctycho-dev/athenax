// src/services/userApi.ts
import { api } from './api';

export const userApi = api.injectEndpoints({
    endpoints: (builder) => ({
        getMe: builder.query({
            query: () => '/users/me/',
            providesTags: ['User'] as const,
        }),
        getUsers: builder.query({
            query: () => '/users/',
            providesTags: ['User'] as const,
        }),
        createUser: builder.mutation({
            query: (userData) => ({
                url: '/users/',
                method: 'POST',
                body: userData,
            }),
            invalidatesTags: ['User'] as const,
        }),
        updateUser: builder.mutation({
            query: (data) => ({
                url: '/users/',
                method: 'PATCH',
                body: data,
            }),
            invalidatesTags: ['User'] as const,
        }),
    }),
});

export const { 
    useLazyGetMeQuery, 
    useGetUsersQuery,
    useCreateUserMutation,
    useUpdateUserMutation 
} = userApi;
