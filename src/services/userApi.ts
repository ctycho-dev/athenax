// src/services/userApi.ts
import { api } from './api';

export const userApi = api.injectEndpoints({
    endpoints: (builder) => ({
        getMe: builder.query({
            query: () => '/users/me/',
        }),
        getUsers: builder.query({
            query: () => '/users/',
        }),
        createUser: builder.mutation({
            query: (userData) => ({
                url: '/users/',
                method: 'POST',
                body: userData,
            }),
        }),
        updateUser: builder.mutation({
            query: (data) => ({
                url: '/users/',
                method: 'PATCH',
                body: data,
            }),
        }),
    }),
});

export const { 
    useLazyGetMeQuery, 
    useGetUsersQuery,
    useCreateUserMutation,
    useUpdateUserMutation 
} = userApi;