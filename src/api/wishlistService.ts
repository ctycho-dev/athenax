// src/api/wishlistService.js
import apiClient from './axios';

export default {
  addToWishlist(email: string) {
    return apiClient.post('/wishlist/', { email });
  },
  
  getWishlist() {
    return apiClient.get('/wishlist/');
  },
  
};