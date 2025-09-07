// src/types/article.ts

import { ArticleState } from '@/enums';

/**
 * Response model for an article (camelCase, from backend via Pydantic)
 */
export interface ArticleResponse {
  id: string;
  title: string;
  slug: string;
  htmlContent: string;
  coverImage: string | null;
  type: 'audit' | 'research';
  state: ArticleState;
  createdBy: string;
  createdAt: string; // ISO date string
  updatedAt: string; // ISO date string
}

/**
 * Payload for creating or updating an article (camelCase)
 * All fields optional to support partial updates (e.g. auto-save)
 */
export interface ArticleCreatePayload {
  title?: string;
  slug?: string;
  htmlContent?: string;
  coverImage?: string | null;
  type?: 'audit' | 'research';
  state?: ArticleState;
  relatedAuditIds?: string[];
  relatedResearchIds?: string[];
}