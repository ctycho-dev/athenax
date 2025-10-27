import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { skipToken } from '@reduxjs/toolkit/query/react';
import { usePageColorScheme } from '@/hooks/usePageTheme';
import { Toaster, toast } from 'sonner';
import { RootState } from '@/store/store';
import { useSelector } from 'react-redux';
import {
  useCreateArticleMutation,
  useUpdateArticleMutation,
  useGetArticleQuery,
  usePublishArticleMutation
} from '@/services/articleApi';
import PageHeader from '@/components/ui/header';
import { SaveStatusDisplay } from './components/SaveStatusDisplay';
import { TitleInput } from './components/TitleInput';
import { useAutoSave } from '@/hooks/useAutoSave';
import '@/assets/styles/editor.scss';
import '@/assets/styles/article-title.scss'
import MediumEditor from './components/articleEditor';

export type SaveStatus = 'saved' | 'saving' | 'unsaved' | 'error';

const WriteArticle: React.FC = () => {
  usePageColorScheme('light');
  const navigate = useNavigate();
  const { id } = useParams<{ id?: string }>();
  const articleId = id ? Number(id) : undefined;
  const isEditingExisting = Boolean(id);
  const privyToken = useSelector((state: RootState) => state.auth.privyToken);

  // Article state
  const [title, setTitle] = useState<string>('');
  const [content, setContent] = useState<string>('');
  const [draftId, setDraftId] = useState<number | null>(null);
  const [saveStatus, setSaveStatus] = useState<SaveStatus>('saved');

  // ✅ Simple loading state directly in component
  const [isLoadingData, setIsLoadingData] = useState(false);
  const [initialDataLoaded, setInitialDataLoaded] = useState(false);

  // API hooks
  const [createArticle] = useCreateArticleMutation();
  const [updateArticle] = useUpdateArticleMutation();
  const [publishArticle] = usePublishArticleMutation();

  // Load specific article if editing
  const { data: existingArticle, isSuccess } = useGetArticleQuery(articleId ?? skipToken);

  useEffect(() => {
    if (!privyToken) return;
    if (isEditingExisting && isSuccess && existingArticle) {
      setTitle(existingArticle.title ?? '');
      setContent(existingArticle.htmlContent ?? '');
      setDraftId(existingArticle.id);
    }
  }, [privyToken, isEditingExisting, isSuccess, existingArticle]);

  const { saveDraft, retrySave } = useAutoSave({
    title,
    content,
    draftId,
    privyToken,
    existingArticle,
    createArticle,
    updateArticle,
    setDraftId,
    setSaveStatus,
    navigate,
  });

  // Handle publish - will open modal instead of direct publish
  const handlePublish = async () => {
    if (!title.trim()) {
      toast.warning('Please add a title to your article');
      return;
    }

    if (!content.trim()) {
      toast.warning('Please add content to your article');
      return;
    }

    if (!draftId) {
      toast.error('Please save your draft first');
      return;
    }

    // TODO: Open publish modal here
    // For now, just show a message
    toast.info('Publish modal will open here (cover image + summary required)');

    // This will be replaced with modal logic:
    // setShowPublishModal(true);
  };

  return (
    <>
      <PageHeader title="">
        <div className="flex items-center gap-4">
          <SaveStatusDisplay
            saveStatus={saveStatus}
            draftId={draftId}
            isEditingExisting={isEditingExisting}
            onRetry={retrySave}
          />
          <div className="flex gap-3">
            <button className="px-4 py-1.5 border border-gray-300 text-gray-700 rounded hover:bg-gray-50">
              Preview
            </button>
            <button
              onClick={handlePublish}
              disabled={!title.trim() || !content.trim() || saveStatus === 'saving' || !draftId}
              className="px-4 py-1.5 bg-green-600 text-white rounded hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Publish
            </button>
          </div>
        </div>
      </PageHeader>

      <div className="medium-editor-wrapper mx-auto px-6 py-8">
        <TitleInput
          title={title}
          onChange={setTitle}
        />

        {/* Editor Component */}
        <div className="prose-wrapper">
          <MediumEditor
            content={content}
            onChange={setContent}
            placeholder="Tell your story..."
          />
        </div>
      </div>

      <Toaster richColors position="top-center" />
    </>
  );
};

export default WriteArticle;
