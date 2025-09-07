// src/services/articleApi.ts
import { api } from './api';
import { ArticleResponse, ArticleCreatePayload } from '@/types/article';
import { ArticleState } from '@/enums';

export const articleApi = api.injectEndpoints({
    endpoints: (builder) => ({
        // GET /article/
        getArticleAll: builder.query<ArticleResponse[], void>({
            query: () => '/article/',
        }),

        // GET /article/user/
        getArticleByUser: builder.query<ArticleResponse[], void>({
            query: () => '/article/user/',
        }),

        // GET /article/user/drafts
        getDrafts: builder.query<ArticleResponse[], void>({
            query: () => '/article/user/drafts',
        }),

        // GET /article/state/{state}
        getArticleByState: builder.query<ArticleResponse[], ArticleState>({
            query: (state) => `/article/state/${state}`,
        }),

        // GET /article/{id}
        getArticle: builder.query<ArticleResponse, string>({
            query: (id) => `/article/${id}`,
        }),

        // POST /article/
        addArticle: builder.mutation<ArticleResponse, ArticleCreatePayload>({
            query: (form) => ({
                url: '/article/',
                method: 'POST',
                body: form,
            }),
        }),

        // PUT /article/{id}
        updateArticle: builder.mutation<ArticleResponse, { id: string } & Partial<ArticleCreatePayload>>({
            query: ({ id, ...body }) => ({
                url: `/article/${id}`,
                method: 'PUT',
                body,
            }),
        }),
    }),
});

export const {
    useGetArticleAllQuery,
    useGetArticleByUserQuery,
    useGetDraftsQuery,
    useGetArticleByStateQuery,
    useGetArticleQuery,
    useAddArticleMutation,
    useUpdateArticleMutation,
} = articleApi;