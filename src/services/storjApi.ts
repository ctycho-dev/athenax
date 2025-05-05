import { api } from './api';
import { UploadResponse, FileType, BucketListResponse } from '@/types';

export const storjApi = api.injectEndpoints({
    endpoints: (builder) => ({
        uploadToS3: builder.mutation<FileType, { bucket: string, file: File }>({
            query: ({ bucket, file }) => {
                const formData = new FormData();
                formData.append('file', file);

                return {
                    url: `/s3/${bucket}`,
                    method: 'POST',
                    body: formData,
                };
            },
        }),
        getBuckets: builder.query<BucketListResponse, void>({
            query: () => '/s3/',
        }),
    }),
});

export const { 
    useUploadToS3Mutation, 
    useGetBucketsQuery 
  } = storjApi;