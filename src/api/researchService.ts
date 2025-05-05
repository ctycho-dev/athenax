// src/api/wishlistService.js
import apiClient from '@/api/axios'
import { FormValues } from '@/types/research';
import { FileType } from '@/types';

export default {

  getResearchAll() {
    return apiClient.get('/research/');
  },

  addResearchForm(form: FormValues) {

    return apiClient.post('/research/', { steps: form });
  },

  async downloadFile(fileData: FileType) {
    try {
      const response = await apiClient.post(
        '/research/download/',
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