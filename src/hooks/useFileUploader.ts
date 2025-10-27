// src/hooks/useFileUploader.ts
import { useUploadImageFileMutation } from '@/services/imageApi';
import { toast } from 'sonner';

import { ImageOut } from '@/types/image';

export const useFileUploader = () => {
  const [uploadImage, { isLoading }] = useUploadImageFileMutation();

  /**
   * Unified upload function
   * @param file - File object to upload
   * @param bucket - Target R2 bucket (e.g., 'scholarx-profile', 'articles')
   * @param imageType - Type/category of image (e.g., 'profile', 'article-cover')
   * @returns Promise<ImageOut> with at least `url`
   */
  const upload = async (
    file: File,
    bucket: string,
    imageType: 'article' | 'profile' = 'article'
  ): Promise<ImageOut> => {
    try {
      const result = await uploadImage({
        file,
        bucket,
        imageType,
      }).unwrap();

      // Extract clean URL (trim whitespace)
      const publicUrl = result.publicUrl?.trim();

      // Return standardized shape
      return result;
    } catch (error: any) {
      const errorMsg = error?.data?.message || 'Upload failed';
      toast.error(errorMsg);
      throw error;
    }
  };

  return {
    upload,
    isUploading: isLoading,
  };
};