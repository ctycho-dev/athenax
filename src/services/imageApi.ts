// src/services/userApi.ts
import { api } from './api';
import { ImageOut } from '@/types/image';

export const imageApi = api.injectEndpoints({
    endpoints: (builder) => ({
        uploadImageFile: builder.mutation<ImageOut, {
            imageType: 'article' | 'profile';
            bucket: string;
            file: File;
        }>({
            query: ({ imageType, bucket, file }) => {
                const formData = new FormData();
                formData.append('file', file);

                return {
                    url: `/image/${imageType}/${bucket}`,
                    method: 'POST',
                    body: formData,
                };
            },
        }),
    }),
});

export const {
    useUploadImageFileMutation
} = imageApi;
