// src/services/userApi.ts
import { api } from './api';
import { ProfileCreate, ProfileUpdate, ProfileOut } from '@/types/profile';

export const profileApi = api.injectEndpoints({
    endpoints: (builder) => ({
        getMyProfile: builder.query<ProfileOut, void>({
            query: () => '/profiles/me/',
            providesTags: ['Profile']
        }),
        createProfile: builder.mutation<ProfileOut, ProfileCreate>({
            query: (data) => ({
                url: `/profiles/`,
                method: 'POST',
                body: data,
            }),
            invalidatesTags: ['Profile']
        }),
        updateProfile: builder.mutation<ProfileOut, { id: string; data: ProfileUpdate }>({
            query: ({ id, data }) => ({
                url: `/profiles/${id}/`,
                method: 'PATCH',
                body: data,
            }),
            invalidatesTags: ['Profile']
        }),
    }),
});

export const { 
    useGetMyProfileQuery, 
    useCreateProfileMutation,
    useUpdateProfileMutation,
} = profileApi;
