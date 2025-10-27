import { TabType } from "..";

const ArticleCard: React.FC<{ article: any; activeTab: TabType }> = ({ article, activeTab }) => {
    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric'
        });
    };

    const handleEdit = () => {
        window.location.href = `/article/${article.id}/edit`;
    };

    const handleView = () => {
        window.location.href = `/article/${article.slug}`;
    };

    return (
        <div className="border-b p-6 hover:shadow-md transition-shadow">
            <div className="flex justify-between items-start mb-4">
                <div className="flex-1">
                    <h3 className="text-lg font-semibold text-white mb-2">
                        {article.title}
                    </h3>
                    {article.summary && (
                        <p className="text-gray-600 text-sm mb-2 line-clamp-2">
                            {article.summary}
                        </p>
                    )}
                    <div className="text-xs text-gray-500">
                        {activeTab === 'drafts' ? 'Last edited' : 'Published'} on {formatDate(article.updatedAt)}
                    </div>
                </div>

                {article.coverImage && (
                    <div className="ml-4 flex-shrink-0">
                        <img
                            src={article.coverImage}
                            alt="Cover"
                            className="w-16 h-16 object-cover rounded"
                        />
                    </div>
                )}
            </div>

            <div className="flex justify-between items-center">
                <div className="flex items-center space-x-4 text-xs text-gray-500">
                    <span className={`px-2 py-1 rounded text-xs ${activeTab === 'drafts'
                            ? 'bg-yellow-100 text-yellow-800'
                            : 'bg-green-100 text-green-800'
                        }`}>
                        {activeTab === 'drafts' ? 'Draft' : 'Published'}
                    </span>
                </div>

                <div className="flex space-x-2">
                    {activeTab === 'drafts' ? (
                        <button
                            onClick={handleEdit}
                            className="px-3 py-1 text-sm bg-blue-100 text-blue-700 rounded hover:bg-blue-200"
                        >
                            Edit
                        </button>
                    ) : (
                        <button
                            onClick={handleView}
                            className="px-3 py-1 text-sm bg-green-100 text-green-700 rounded hover:bg-green-200"
                        >
                            View
                        </button>
                    )}

                    <button className="px-3 py-1 text-sm bg-red-100 text-red-700 rounded hover:bg-red-200">
                        Delete
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ArticleCard;