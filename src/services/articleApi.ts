// src/services/articleApi.ts
import { api } from './api';
import { ArticleResponse, ArticleCreatePayload, ArticleUpdatePayload } from '@/types/article';
import { ArticleState } from '@/enums';

export const articleApi = api.injectEndpoints({
  endpoints: (builder) => ({
    // GET /articles/ - Get all published articles (public)
    getArticleAll: builder.query<ArticleResponse[], void>({
      query: () => '/articles/',
      providesTags: ['Article'],
    }),

    // GET /articles/search?q=term
    searchArticles: builder.query<ArticleResponse[], string>({
      query: (searchTerm) => `/articles/search?q=${encodeURIComponent(searchTerm)}`,
      providesTags: ['Article'],
    }),

    // GET /articles/user/ - Get current user's articles
    getArticleByUser: builder.query<ArticleResponse[], void>({
      query: () => '/articles/user/',
      providesTags: ['UserArticle'],
    }),

    // GET /articles/user/drafts - Get current user's drafts
    getDrafts: builder.query<ArticleResponse[], void>({
      query: () => '/articles/user/drafts',
      providesTags: ['UserDraft'],
    }),

    // GET /articles/state/{state} - Get articles by state (admin)
    getArticleByState: builder.query<ArticleResponse[], ArticleState>({
      query: (state) => `/articles/state/${state}`,
      providesTags: ['Article'],
    }),

    // GET /articles/{id} - Get single article
    getArticle: builder.query<ArticleResponse, number>({
      query: (id) => `/articles/${id}`,
      providesTags: (result, error, id) => [{ type: 'Article', id }],
    }),

    // POST /articles/ - Create new article
    addArticle: builder.mutation<ArticleResponse, ArticleCreatePayload>({
      query: (payload) => ({
        url: '/articles/',
        method: 'POST',
        body: payload,
      }),
      invalidatesTags: ['UserArticle', 'UserDraft'],
    }),

    // PUT /articles/{id} - Update article
    updateArticle: builder.mutation<ArticleResponse, { id: number } & ArticleUpdatePayload>({
      query: ({ id, ...body }) => ({
        url: `/articles/${id}`,
        method: 'PUT',
        body,
      }),
      invalidatesTags: (result, error, { id }) => [
        { type: 'Article', id },
        'UserArticle',
        'UserDraft',
      ],
    }),

    // PATCH /articles/{id}/publish - Publish article
    publishArticle: builder.mutation<ArticleResponse, number>({
      query: (id) => ({
        url: `/articles/${id}/publish`,
        method: 'PATCH',
      }),
      invalidatesTags: (result, error, id) => [
        { type: 'Article', id },
        'UserArticle',
        'UserDraft',
      ],
    }),

    // PATCH /articles/{id}/unpublish - Unpublish article
    unpublishArticle: builder.mutation<ArticleResponse, number>({
      query: (id) => ({
        url: `/articles/${id}/unpublish`,
        method: 'PATCH',
      }),
      invalidatesTags: (result, error, id) => [
        { type: 'Article', id },
        'UserArticle',
        'UserDraft',
      ],
    }),

    // DELETE /articles/{id} - Delete article
    deleteArticle: builder.mutation<void, number>({
      query: (id) => ({
        url: `/articles/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: (result, error, id) => [
        { type: 'Article', id },
        'UserArticle',
        'UserDraft',
      ],
    }),
  }),
});

export const {
  useGetArticleAllQuery,
  useSearchArticlesQuery,
  useGetArticleByUserQuery,
  useGetDraftsQuery,
  useGetArticleByStateQuery,
  useGetArticleQuery,
  useAddArticleMutation,
  useUpdateArticleMutation,
  usePublishArticleMutation,
  useUnpublishArticleMutation,
  useDeleteArticleMutation,
} = articleApi;
