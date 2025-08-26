import { api } from './api';
import { FileType } from '@/types';
import { FormValues, ResearchType } from '@/types/research';
import { ReportState } from '@/enums';


export const researchApi = api.injectEndpoints({
   endpoints: (builder) => ({
      getResearchAll: builder.query<ResearchType[], void>({
         query: () => '/research/',
         providesTags: ['Research'],
      }),

      getResearchByUser: builder.query<ResearchType[], void>({
         query: () => '/research/user/',
      }),

      getResearchByState: builder.query<ResearchType[], string>({
         query: (state: string) => `/research/state/${state}`,
      }),

      getResearch: builder.query<ResearchType, string>({
         query: (id: string) => `/research/${id}`,
      }),

      addResearchComment: builder.mutation<void, { id: string; comment: string }>({
         query: ({ id, comment }) => ({
            url: `/research/${id}/comment`,
            method: 'POST',
            body: { comment: comment },
         }),
      }),

      updateResearchState: builder.mutation<void, { id: string; state: ReportState }>({
         query: ({ id, state }) => ({
            url: `/research/${id}/state`,
            method: 'PATCH',
            body: { state },
         }),
      }),

      updateResearch: builder.mutation<void, { id: string; data: Partial<FormValues> }>({
         query: ({ id, data }) => ({
            url: `/research/${id}`,
            method: 'PATCH',
            body: { steps: data },
         }),
         invalidatesTags: ['Research'],
      }),

      addResearchForm: builder.mutation<any, FormValues>({ // Replace 'any' with your actual response type
         query: (form) => ({
            url: '/research/',
            method: 'POST',
            body: { steps: form },
         }),
         invalidatesTags: ['Research'],
      }),

      downloadResearchFile: builder.mutation<boolean, FileType>({
         query: (fileData) => ({
            url: '/research/download/',
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
   useGetResearchAllQuery,
   useGetResearchByUserQuery,
   useGetResearchByStateQuery,
   useGetResearchQuery,
   useAddResearchCommentMutation,
   useUpdateResearchStateMutation,
   useUpdateResearchMutation,
   useAddResearchFormMutation,
   useDownloadResearchFileMutation
} = researchApi;