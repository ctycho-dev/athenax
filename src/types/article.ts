// types/article.ts

export interface ArticleResponse {
    id: string;
    title: string;
    slug: string;
    html_content: string;
    type: 'audit' | 'research';
    state: string;
    created_by: string;
    created_at: string;
    updated_at: string;
}

export interface ArticleCreatePayload {
    title: string;
    slug: string;
    html_content: string;
    type: 'audit' | 'research';
    state?: string;
    related_audit_ids?: string[];
    related_research_ids?: string[];
}
