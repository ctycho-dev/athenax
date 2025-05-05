// src/lib/api.ts
import axios from 'axios';
import { usePrivy } from '@privy-io/react-auth';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Accept': 'application/json',
    'Content-Type': 'application/json',
  },
});

apiClient.interceptors.request.use(async (config) => {
  const { getAccessToken } = usePrivy();
  try {
    const token = await getAccessToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
  } catch (error) {
    console.debug('No token available'); // Silent fail (backend will reject if needed)
  }
  return config;
});

// Standardize errors
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    const formattedError = {
      status: error.response?.status,
      message: error.response?.data?.message || error.message,
      data: error.response?.data,
    };
    return Promise.reject(formattedError);
  }
);

// import axios from 'axios';
// import { useAuth } from '@/context/AuthContext';

// const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

// const apiClient = axios.create({
//   baseURL: API_BASE_URL,
//   headers: {
//     'Accept': 'application/json',
//     'Content-Type': 'application/json',
//   },
// });

// // Add request/response interceptors if needed
// apiClient.interceptors.response.use(
//   (response) => response,
//   (error) => {
//     return Promise.reject(error);
//   }
// );

export default apiClient;