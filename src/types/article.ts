// src/types/article.ts
import { ArticleState } from '@/enums';

export interface ArticleResponse {
  id: number;
  title: string;
  htmlContent: string;
  summary?: string;
  slug?: string;
  coverImage?: string | null;
  tags?: string[];
  state: ArticleState;
  userId: number;
  createdAt: string;
  updatedAt: string;
}

export interface ArticleCreatePayload {
  title: string;
  htmlContent: string;
  summary?: string;
  tags?: string[];
}

export interface ArticleUpdatePayload {
  title?: string;
  htmlContent?: string;
  coverImage: string | null
  summary?: string;
  tags?: string[];
  state?: ArticleState;
}

export interface CreateDraftRequest {
  title: string;
}
