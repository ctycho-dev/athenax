import { api } from './api';
import { FileType } from '@/types';
import { AuditType, FormValues } from '@/types/audit';

export const auditApi = api.injectEndpoints({
    endpoints: (builder) => ({
        getAuditAll: builder.query<AuditType[], void>({
            query: () => '/audit/',
        }),

        getAuditByUser: builder.query<AuditType[], void>({
            query: () => '/audit/user/',
        }),

        getAudit: builder.query<AuditType, string>({
            query: (id: string) => `/audit/${id}`,
        }),

        updateAudit: builder.mutation<void, { id: string; data: Partial<FormValues> }>({
            query: ({ id, data }) => ({
                url: `/audit/${id}`,
                method: 'PATCH',
                body: { steps: data },
            }),
        }),

        addAuditForm: builder.mutation<any, FormValues>({
            query: (form) => ({
                url: '/audit/',
                method: 'POST',
                body: { steps: form },
            }),
        }),

        downloadFile: builder.mutation<boolean, FileType>({
            query: (fileData) => ({
                url: '/audit/download/',
                method: 'POST',
                body: fileData,
                responseHandler: async (response) => {
                    if (!response.ok) throw new Error('Download failed');

                    const blob = await response.blob();
                    const url = window.URL.createObjectURL(blob);
                    const a = document.createElement('a');
                    a.href = url;
                    a.download = fileData.original_filename;
                    document.body.appendChild(a);
                    a.click();

                    window.URL.revokeObjectURL(url);
                    a.remove();

                    return true;
                },
                cache: 'no-cache', // Important for file downloads
                headers: {
                    'Content-Type': 'application/json; charset=utf-8'
                }
            }),
        }),
    }),
});

export const {
    useGetAuditAllQuery,
    useGetAuditByUserQuery,
    useGetAuditQuery,
    useUpdateAuditMutation,
    useAddAuditFormMutation,
    useDownloadFileMutation
} = auditApi;