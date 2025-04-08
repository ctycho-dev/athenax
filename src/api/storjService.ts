// src/api/wishlistService.js
import apiClient from './axios';
import { FileType } from '@/types';

interface UploadResponse {
  data: FileType
}

interface BucketListResponse {
  buckets: string[];
}

export default {
  async uploadToS3(bucket: string, file: File): Promise<UploadResponse> {
    const formData = new FormData();
    formData.append('file', file);
    
    return apiClient.post(`/s3/${bucket}`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
  },

  getBuckets(): Promise<BucketListResponse> {
    return apiClient.get('/s3/');
  },
};