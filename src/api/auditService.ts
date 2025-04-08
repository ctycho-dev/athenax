// src/api/wishlistService.js
import apiClient from './axios';
import { FormValues } from '@/types/audit';
import { FileType } from '@/types';

export default {

  getAuditAll() {
    return apiClient.get('/audit/');
  },

  addAuditForm(form: FormValues) {

    return apiClient.post('/audit/', { steps: form });
  },

  async downloadFile(fileData: FileType) {
    try {
      const response = await apiClient.post(
        '/audit/download/',
        fileData,
        {
          responseType: 'blob', // This makes response.data a Blob
          headers: {
            'Content-Type': 'application/json; charset=utf-8'
          }
        }
      );

      const url = window.URL.createObjectURL(response.data);
      const a = document.createElement('a');
      a.href = url;
      a.download = fileData.original_filename;
      document.body.appendChild(a);
      a.click();
      
      window.URL.revokeObjectURL(url);
      a.remove();
      
      return true;
    } catch (error) {
      console.error('Download failed:', error);
      throw error;
    }
  }

};