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



// import { fetchBaseQuery } from '@reduxjs/toolkit/query/react';

// const rawBaseQuery = fetchBaseQuery({
//   baseUrl: import.meta.env.VITE_API_BASE_URL,
//   prepareHeaders: (headers, { extra }) => {
//     if (extra?.token) {
//       headers.set('Authorization', `Bearer ${extra.token}`);
//     }
//     return headers;
//   },
// });

// export const fetchUserDirectly = async (token: string) => {
//   const result = await rawBaseQuery(
//     { url: '/users/me/', method: 'GET' },
//     undefined,
//     { token }
//   );

//   if (result.error) throw result.error;
//   return result.data;
// };