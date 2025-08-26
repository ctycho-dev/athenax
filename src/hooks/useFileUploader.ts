import { useUploadToS3Mutation } from '@/services/storjApi'
import { toast } from 'sonner'
import { FileType } from '@/types'

export const useFileUploader = () => {
  const [uploadToS3, { isLoading }] = useUploadToS3Mutation()

  const upload = async (file: File, bucket: string): Promise<FileType> => {
    try {
      const response = await uploadToS3({ file, bucket }).unwrap()
      toast.success('Upload successful')
      return response
    } catch (error: any) {
      toast.error('Upload failed')
      throw error
    }
  }

  return { upload, isUploading: isLoading }
}
