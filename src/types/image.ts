// types/Image.ts

export enum ImageType {
  Article = 'article',
  Profile = 'profile'
}

export enum ImageStatus {
  Created = 'created',
  Stored = 'stored',
  Published = 'published'
}

export interface ImageOut {
  id: string;
  r2Key: string | null;
  publicUrl: string | null;
  uploadedBy: string;
  status: ImageStatus;
  type: ImageType;
  articleId: string | null;
  filename: string;
  contentType: string;
  createdAt: string; // ISO date string
  updatedAt: string; // ISO date string
}