// src/services/wishlistApi.ts
import { api } from './api';

export const wishlistApi = api.injectEndpoints({
    endpoints: (builder) => ({
        getWishlist: builder.query({
            query: () => '/wishlist/',
        }),
        addToWishlist: builder.mutation({
            query: (email) => ({
                url: '/wishlist/',
                method: 'POST',
                body: { email },
            }),
        }),
    }),
});

export const { 
    useGetWishlistQuery,
    useAddToWishlistMutation
} = wishlistApi;