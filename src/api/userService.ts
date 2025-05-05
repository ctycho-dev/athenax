// src/api/userService.js
import { apiClient } from "./axios";

export default {
  getMe() {
    return apiClient.post('/me/');
  },
  
  getUsers() {
    return apiClient.get('/');
  },

  getUserById(id: string) {
    return apiClient.get(`/${id}`);
  },
  
};