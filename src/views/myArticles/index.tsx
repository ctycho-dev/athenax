import React, { useState } from 'react';
import PageHeader from "@/components/ui/header";
import { useGetArticleByUserQuery } from '@/services/articleApi';
import { ArticleState } from '@/enums';
import { RootState } from '@/store/store';
import { useSelector } from 'react-redux';
import ArticleCard from './components/ArticleCard';

export type TabType = 'drafts' | 'published';

const MyArticles: React.FC = () => {
    const [activeTab, setActiveTab] = useState<TabType>('drafts');
    const privyToken = useSelector((state: RootState) => state.auth.privyToken);

    // API calls for both tabs
    const { data: drafts = [], isLoading: draftsLoading } = useGetArticleByUserQuery(
        { state: ArticleState.DRAFT },
        { skip: !privyToken }
    );

    const { data: published = [], isLoading: publishedLoading } = useGetArticleByUserQuery(
        { state: ArticleState.PUBLISHED },
        { skip: !privyToken }
    );

    const isLoading = activeTab === 'drafts' ? draftsLoading : publishedLoading;
    const articles = activeTab === 'drafts' ? drafts : published;

    return (
        <>
            <PageHeader title="My Articles">
            </PageHeader>

            <div className="max-w-4xl mx-auto px-6 py-8">
                {/* Tabs Navigation */}
                <div className="border-b mb-6">
                    <nav className="-mb-px flex space-x-8">
                        <button
                            onClick={() => setActiveTab('drafts')}
                            className={`py-2 px-1 border-b-2 font-medium text-sm ${activeTab === 'drafts'
                                    ? 'border-white text-white'
                                    : 'border-transparent text-gray-500 hover:text-white hover:border-white'
                                }`}
                        >
                            Drafts {drafts.length}
                        </button>
                        <button
                            onClick={() => setActiveTab('published')}
                            className={`py-2 px-1 border-b-2 font-medium text-sm ${activeTab === 'published'
                                    ? 'border-white text-white'
                                    : 'border-transparent text-gray-500 hover:text-white hover:border-white'
                                }`}
                        >
                            Published {published.length}
                        </button>
                    </nav>
                </div>

                {/* Tab Content */}
                <div className="min-h-96">
                    {isLoading ? (
                        <LoadingState />
                    ) : articles.length === 0 ? (
                        <EmptyState activeTab={activeTab} />
                    ) : (
                        <ArticlesList articles={articles} activeTab={activeTab} />
                    )}
                </div>
            </div>
        </>
    );
};

// Loading Component
const LoadingState: React.FC = () => (
    <div className="space-y-4">
        {[1, 2, 3].map((i) => (
            <div key={i} className="border rounded-lg p-6 animate-pulse">
                <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
                <div className="h-3 bg-gray-200 rounded w-1/2 mb-4"></div>
                <div className="h-3 bg-gray-200 rounded w-1/4"></div>
            </div>
        ))}
    </div>
);

// Empty State Component
const EmptyState: React.FC<{ activeTab: TabType }> = ({ activeTab }) => (
    <div className="text-center py-12">
        <div className='leading-10'>
            You have no published stories yet.<br />
            We can't wait to see what you write!
        </div>
    </div>
);

// Articles List Component
const ArticlesList: React.FC<{ articles: any[]; activeTab: TabType }> = ({ articles, activeTab }) => (
    <div className="space-y-4">
        {articles.map((article) => (
            <ArticleCard key={article.id} article={article} activeTab={activeTab} />
        ))}
    </div>
);


export default MyArticles;
