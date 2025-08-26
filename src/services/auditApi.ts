import { api } from './api';
import { FileType } from '@/types';
import { AuditType, FormValues } from '@/types/audit';
import { ReportState } from '@/enums';

export const auditApi = api.injectEndpoints({
    endpoints: (builder) => ({
        getAuditAll: builder.query<AuditType[], void>({
            query: () => '/audit/',
        }),

        getAuditByUser: builder.query<AuditType[], void>({
            query: () => '/audit/user/',
        }),

        getAuditByState: builder.query<AuditType[], string>({
            query: (state: string) => `/audit/state/${state}`,
        }),

        getAudit: builder.query<AuditType, string>({
            query: (id: string) => `/audit/${id}`,
        }),

        addAuditComment: builder.mutation<void, { id: string; comment: string }>({
            query: ({ id, comment }) => ({
                url: `/audit/${id}/comment`,
                method: 'POST',
                body: { comment: comment },
            }),
        }),

        updateAuditState: builder.mutation<void, { id: string; state: ReportState }>({
            query: ({ id, state }) => ({
                url: `/audit/${id}/state`,
                method: 'PATCH',
                body: { state },
            }),
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
    useGetAuditByStateQuery,
    useGetAuditQuery,
    useUpdateAuditMutation,
    useAddAuditFormMutation,
    useDownloadFileMutation,
    useAddAuditCommentMutation,
    useUpdateAuditStateMutation
} = auditApi;