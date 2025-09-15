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
            invalidatesTags: ['Profile', 'User']
        }),
        updateProfile: builder.mutation<ProfileOut, { id: number; data: ProfileUpdate }>({
            query: ({ id, data }) => ({
                url: `/profiles/${id}/`,
                method: 'PATCH',
                body: data,
            }),
            onQueryStarted: async ({ id, data }, { dispatch, queryFulfilled }) => {
                // Optimistically update the cache immediately
                const patchResult = dispatch(
                    profileApi.util.updateQueryData('getMyProfile', undefined, (draft) => {
                        Object.assign(draft, data);
                    })
                );
                
                try {
                    // Wait for the mutation to complete
                    const { data: updatedProfile } = await queryFulfilled;
                    
                    // Update cache with the actual server response
                    dispatch(
                        profileApi.util.updateQueryData('getMyProfile', undefined, (draft) => {
                            Object.assign(draft, updatedProfile);
                        })
                    );
                } catch {
                    // Rollback the optimistic update on failure
                    patchResult.undo();
                }
            },
            // invalidatesTags: ['Profile']
        }),
    }),
});

export const { 
    useGetMyProfileQuery, 
    useCreateProfileMutation,
    useUpdateProfileMutation,
} = profileApi;
