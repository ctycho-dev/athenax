// import React, { useEffect, useState } from 'react';
// import { usePageColorScheme } from '@/hooks/usePageTheme';
// import { Toaster, toast } from 'sonner';
// import { RootState } from '@/store/store';
// import { useSelector } from 'react-redux';
// import { useAddArticleMutation, useGetDraftsQuery, useUpdateArticleMutation } from '@/services/articleApi';
// import { useUploadImageFileMutation } from '@/services/imageApi';
// import ArticleEditor from './components/articleEditor';
// import PageHeader from '@/components/ui/header';
// import { useFileUploader } from '@/hooks/useFileUploader';

// import '@/assets/styles/editor.scss';

// const WriteArticle: React.FC = () => {
//   usePageColorScheme('light');

//   const privyToken = useSelector((state: RootState) => state.auth.privyToken);
//   const [content, setContent] = useState<string>('');
//   const [summary, setSummary] = useState<string>('');
//   const [tags, setTags] = useState<string[]>([]);
//   const [title, setTitle] = useState<string>('');
//   const [coverImage, setCoverImage] = useState<string | null>(null);
//   const [isSaving, setIsSaving] = useState<boolean>(false);
//   const [resetEditor, setResetEditor] = useState(false);

//   // Draft state
//   const [draftId, setDraftId] = useState<string | null>(null);

//   // API
//   const [createArticle] = useAddArticleMutation();
//   const [updateArticle] = useUpdateArticleMutation();
//   const { data: drafts = [] } = useGetDraftsQuery(undefined, { skip: !privyToken });

//   // Auto-save timer
//   const [saveTimer, setSaveTimer] = useState<NodeJS.Timeout | null>(null);

//   // Constants
//   const DRAFT_KEY = 'article_draft_v1';

//   // --- Auto-Save Logic ---
//   const saveDraft = async () => {
//     if (!htmlContent.trim() || !privyToken) return;

//     setIsSaving(true);

//     // Extract title from H1
//     const parser = new DOMParser();
//     const doc = parser.parseFromString(htmlContent, 'text/html');
//     const h1 = doc.querySelector('h1');
//     const extractedTitle = h1?.textContent?.trim() || 'Untitled';

//     // Generate slug
//     const slug = extractedTitle
//       .toLowerCase()
//       .replace(/[^\w\s-]/g, '')
//       .replace(/\s+/g, '-')
//       .replace(/-+/g, '-')
//       || 'untitled';

//     // ✅ Use camelCase payload to match frontend types
//     const payload = {
//       title: extractedTitle,
//       slug,
//       htmlContent,
//       coverImage,
//       type: 'research' as const,
//       relatedAuditIds: [],
//       relatedResearchIds: [],
//       state: 'draft' as const,
//     };

//     try {
//       let result;
//       if (draftId) {
//         result = await updateArticle({ id: draftId, ...payload }).unwrap();
//         toast.success('Draft updated');
//       } else {
//         result = await createArticle(payload).unwrap();
//         setDraftId(result.id);
//         toast.success('Draft saved');
//       }

//       // Save to localStorage
//       localStorage.setItem(
//         DRAFT_KEY,
//         JSON.stringify({
//           id: result?.id || draftId,
//           content: htmlContent,
//           title: extractedTitle,
//           coverImage,
//           updatedAt: Date.now(),
//         })
//       );
//     } catch (err) {
//       console.error('Save draft error:', err);
//       toast.error('Failed to save draft');
//     } finally {
//       setIsSaving(false);
//     }
//   };

//   // Debounced auto-save
//   const debouncedSave = () => {
//     if (saveTimer) clearTimeout(saveTimer);
//     const timer = setTimeout(() => {
//       saveDraft();
//     }, 5000);
//     setSaveTimer(timer);
//   };

//   // Cleanup timer
//   useEffect(() => {
//     return () => {
//       if (saveTimer) clearTimeout(saveTimer);
//     };
//   }, [saveTimer]);

//   // --- Load Draft on Mount ---
//   useEffect(() => {
//     if (!privyToken) return;

//     const loadDraft = () => {
//       // 1. Try localStorage
//       const local = localStorage.getItem(DRAFT_KEY);
//       if (local) {
//         const parsed = JSON.parse(local);
//         setHtmlContent(parsed.content || '');
//         setTitle(parsed.title || '');
//         setCoverImage(parsed.coverImage || null);
//         setDraftId(parsed.id || null);
//         return;
//       }

//       // 2. Try backend drafts
//       if (drafts.length > 0) {
//         // Sort by updated_at (newest first)
//         const latest = drafts
//           .slice()
//           .sort((a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime())[0];

//         setHtmlContent(latest.htmlContent || '');
//         setTitle(latest.title || 'Untitled');
//         setCoverImage(latest.coverImage || null);
//         setDraftId(latest.id);

//         // Cache in localStorage
//         localStorage.setItem(
//           DRAFT_KEY,
//           JSON.stringify({
//             id: latest.id,
//             content: latest.htmlContent,
//             title: latest.title,
//             coverImage: latest.coverImage,
//             updatedAt: Date.now(),
//           })
//         );
//       }
//     };

//     loadDraft();
//   }, [privyToken, drafts]);

//   // --- Trigger auto-save ---
//   useEffect(() => {
//     debouncedSave();
//   }, [htmlContent, coverImage]);

//   // Save on tab switch
//   useEffect(() => {
//     const handleVisibilityChange = () => {
//       if (document.visibilityState === 'hidden') {
//         saveDraft();
//       }
//     };
//     document.addEventListener('visibilitychange', handleVisibilityChange);
//     return () => document.removeEventListener('visibilitychange', handleVisibilityChange);
//   }, []);

//   // --- Handle Publish ---
//   const handleSubmit = async () => {
//     const parser = new DOMParser();
//     const doc = parser.parseFromString(htmlContent, 'text/html');
//     const h1 = doc.querySelector('h1');

//     if (!h1 || !h1.textContent?.trim()) {
//       toast.warning('Please add an <h1> heading to set the article title.');
//       return;
//     }

//     const rawTitle = h1.textContent.trim();
//     const slug = rawTitle
//       .toLowerCase()
//       .replace(/[^\w\s-]/g, '')
//       .replace(/\s+/g, '-')
//       .replace(/-+/g, '-');

//     const payload = {
//       title: rawTitle,
//       slug,
//       htmlContent,
//       coverImage,
//       type: 'research' as const,
//       relatedAuditIds: [],
//       relatedResearchIds: [],
//       state: 'published' as const,
//     };

//     try {
//       if (draftId) {
//         await updateArticle({ id: draftId, ...payload }).unwrap();
//       } else {
//         await createArticle(payload).unwrap();
//       }
//       toast.success('Article published successfully!');
//       localStorage.removeItem(DRAFT_KEY);
//       setHtmlContent('');
//       setCoverImage(null);
//       setResetEditor(true);
//     } catch (err) {
//       console.error('Publish error:', err);
//       toast.error('Failed to publish article.');
//     }
//   };

//   return (
//     <>
//       <PageHeader title="Write Article">
//         <div className="flex gap-3">
//           <button className="px-4 py-1.5 border border-white text-white rounded hover:cursor-pointer">
//             Preview
//           </button>
//           <button
//             onClick={handleSubmit}
//             disabled={!htmlContent || isSaving}
//             className="px-4 py-1.5 bg-blue-600 text-white rounded hover:bg-blue-700 hover:cursor-pointer disabled:opacity-50 disabled:pointer-events-none"
//           >
//             {isSaving ? 'Saving...' : 'Publish Article'}
//           </button>
//         </div>
//       </PageHeader>

//       <div className="max-w-3xl m-auto p-6">
//         {/* Cover Image Upload */}
//         <div className="mb-6">
//           <label className="block text-sm font-medium mb-2">Cover Image</label>
//           <CoverImageUploader onUpload={setCoverImage} currentImage={coverImage} />
//         </div>

//         {/* Editor */}
//         <ArticleEditor onContentChange={setHtmlContent} resetSignal={resetEditor} />

//         {/* Saving Indicator */}
//         {isSaving && <p className="text-sm text-gray-500 mt-4">Auto-saving...</p>}
//       </div>

//       <Toaster richColors />
//     </>
//   );
// };

// // --- Cover Image Uploader ---
// const CoverImageUploader: React.FC<{
//   onUpload: (url: string | null) => void;
//   currentImage: string | null;
// }> = ({ onUpload, currentImage }) => {
//   // const { upload } = useFileUploader(); // ✅ Now works — hook imported
//   const [uploadImage] = useUploadImageFileMutation();

//   const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
//     const file = e.target.files?.[0];
//     if (!file) return;

//     try {
//       const uploadResult = await uploadImage({
//         imageType: "article",
//         bucket: "scholarx-article",
//         file: file,
//       }).unwrap();
//       toast.success('Cover image uploaded');
//     } catch (err) {
//     toast.error('Upload failed');
//   }
// };

// const handleRemove = () => {
//   onUpload(null);
//   toast.info('Cover image removed');
// };

// return (
//   <div>
//     {currentImage ? (
//       <div className="relative inline-block">
//         <img src={currentImage} alt="Cover" className="h-32 object-cover rounded" />
//         <button
//           onClick={handleRemove}
//           className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm"
//         >
//           ×
//         </button>
//       </div>
//     ) : (
//       <>
//         <input
//           type="file"
//           accept="image/*"
//           id="cover-upload"
//           style={{ display: 'none' }}
//           onChange={handleUpload}
//         />
//         <button
//           onClick={() => document.getElementById('cover-upload')?.click()}
//           className="px-4 py-2 bg-gray-100 dark:bg-gray-800 rounded text-sm"
//         >
//           Upload Cover Image
//         </button>
//       </>
//     )}
//   </div>
// );
// };

// export default WriteArticle;



// src/pages/WriteArticle.tsx
import React, { useEffect, useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { usePageColorScheme } from '@/hooks/usePageTheme';
import { Toaster, toast } from 'sonner';
import { RootState } from '@/store/store';
import { useSelector } from 'react-redux';
import { 
  useAddArticleMutation, 
  useGetDraftsQuery, 
  useUpdateArticleMutation,
  usePublishArticleMutation 
} from '@/services/articleApi';
import { useUploadImageFileMutation } from '@/services/imageApi';
import ArticleEditor, { ArticleEditorRef } from './components/articleEditor';
import PageHeader from '@/components/ui/header';
import { ArticleState } from '@/enums';
import { ArticleCreatePayload, ArticleUpdatePayload } from '@/types/article';

import '@/assets/styles/editor.scss';

const WriteArticle: React.FC = () => {
  usePageColorScheme('light');
  const navigate = useNavigate();
  const editorRef = useRef<ArticleEditorRef>(null);

  const privyToken = useSelector((state: RootState) => state.auth.privyToken);
  
  // Content state - updated to match backend
  const [content, setContent] = useState<string>('');
  const [title, setTitle] = useState<string>('');
  const [summary, setSummary] = useState<string>('');
  const [tags, setTags] = useState<string[]>([]);
  const [coverImage, setCoverImage] = useState<string | null>(null);
  
  // UI state
  const [isSaving, setIsSaving] = useState<boolean>(false);
  const [isPublishing, setIsPublishing] = useState<boolean>(false);
  const [resetEditor, setResetEditor] = useState(false);
  const [draftId, setDraftId] = useState<number | null>(null);

  // API hooks
  const [createArticle] = useAddArticleMutation();
  const [updateArticle] = useUpdateArticleMutation();
  const [publishArticle] = usePublishArticleMutation();
  const { 
    data: drafts = [], 
    error: draftsError, 
    isLoading: draftsLoading 
  } = useGetDraftsQuery(undefined, { skip: !privyToken });

  // Auto-save timer
  const [saveTimer, setSaveTimer] = useState<NodeJS.Timeout | null>(null);

  // Constants
  const DRAFT_KEY = 'article_draft_v2';

  // --- Auto-Save Logic ---
  const saveDraft = async (showToast = true) => {
    if (!content.trim() || !privyToken) return;

    setIsSaving(true);

    // Extract title from H1
    const parser = new DOMParser();
    const doc = parser.parseFromString(content, 'text/html');
    const h1 = doc.querySelector('h1');
    const extractedTitle = h1?.textContent?.trim() || title || 'Untitled';

    // Update title state if extracted from content
    if (extractedTitle !== title) {
      setTitle(extractedTitle);
    }

    // Prepare payload for backend
    const payload: ArticleCreatePayload = {
      title: extractedTitle,
      content,
      summary: summary || undefined,
      tags: tags.length > 0 ? tags : undefined,
    };

    try {
      let result;
      if (draftId) {
        // Update existing draft
        const updatePayload: ArticleUpdatePayload = payload;
        result = await updateArticle({ id: draftId, ...updatePayload }).unwrap();
        if (showToast) toast.success('Draft updated');
      } else {
        // Create new draft
        result = await createArticle(payload).unwrap();
        setDraftId(result.id);
        if (showToast) toast.success('Draft saved');
      }

      // Save to localStorage for offline access
      localStorage.setItem(DRAFT_KEY, JSON.stringify({
        id: result?.id || draftId,
        content,
        title: extractedTitle,
        summary,
        tags,
        coverImage,
        updatedAt: Date.now(),
      }));
    } catch (err: any) {
      console.error('Save draft error:', err);
      const errorMessage = err?.data?.detail || 'Failed to save draft';
      if (showToast) toast.error(errorMessage);
    } finally {
      setIsSaving(false);
    }
  };

  // Debounced auto-save
  const debouncedSave = () => {
    if (saveTimer) clearTimeout(saveTimer);
    const timer = setTimeout(() => {
      saveDraft(false); // Don't show toast for auto-save
    }, 3000);
    setSaveTimer(timer);
  };

  // Cleanup timer
  useEffect(() => {
    return () => {
      if (saveTimer) clearTimeout(saveTimer);
    };
  }, [saveTimer]);

  // --- Load Draft on Mount ---
  useEffect(() => {
    if (!privyToken) return;

    const loadDraft = () => {
      // 1. Try localStorage first
      const localDraft = localStorage.getItem(DRAFT_KEY);
      if (localDraft) {
        try {
          const parsed = JSON.parse(localDraft);
          setContent(parsed.content || '');
          setTitle(parsed.title || '');
          setSummary(parsed.summary || '');
          setTags(parsed.tags || []);
          setCoverImage(parsed.coverImage || null);
          if (parsed.id) setDraftId(parsed.id);
          return;
        } catch (e) {
          console.error('Failed to parse local draft:', e);
          localStorage.removeItem(DRAFT_KEY);
        }
      }

      // 2. Try backend drafts
      if (drafts.length > 0) {
        // Sort by updated_at (newest first)
        const latest = drafts
          .slice()
          .sort((a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime())[0];

        setContent(latest.content || '');
        setTitle(latest.title || 'Untitled');
        setSummary(latest.summary || '');
        setTags(latest.tags || []);
        setDraftId(latest.id);

        // Cache in localStorage
        localStorage.setItem(DRAFT_KEY, JSON.stringify({
          id: latest.id,
          content: latest.content,
          title: latest.title,
          summary: latest.summary,
          tags: latest.tags,
          coverImage: null,
          updatedAt: Date.now(),
        }));
      }
    };

    loadDraft();
  }, [privyToken, drafts]);

  // --- Trigger auto-save when content changes ---
  useEffect(() => {
    if (content.trim()) {
      debouncedSave();
    }
  }, [content, summary, tags]);

  // Save on tab switch/close
  useEffect(() => {
    const handleVisibilityChange = () => {
      if (document.visibilityState === 'hidden' && content.trim()) {
        saveDraft(false);
      }
    };

    const handleBeforeUnload = (e: BeforeUnloadEvent) => {
      if (content.trim()) {
        saveDraft(false);
        e.preventDefault();
        e.returnValue = '';
      }
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);
    window.addEventListener('beforeunload', handleBeforeUnload);

    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  }, [content]);

  // --- Handle Publish ---
  const handlePublish = async () => {
    const parser = new DOMParser();
    const doc = parser.parseFromString(content, 'text/html');
    const h1 = doc.querySelector('h1');

    if (!h1 || !h1.textContent?.trim()) {
      toast.warning('Please add an <h1> heading to set the article title.');
      return;
    }

    const extractedTitle = h1.textContent.trim();

    try {
      setIsPublishing(true);

      if (draftId) {
        // Use dedicated publish endpoint for existing draft
        await publishArticle(draftId).unwrap();
      } else {
        // Create and publish in one step
        const payload: ArticleCreatePayload = {
          title: extractedTitle,
          content,
          summary: summary || undefined,
          tags: tags.length > 0 ? tags : undefined,
        };
        
        const result = await createArticle(payload).unwrap();
        await publishArticle(result.id).unwrap();
      }

      toast.success('Article published successfully!');
      
      // Clear local state and storage
      localStorage.removeItem(DRAFT_KEY);
      clearEditor();
      
      // Navigate to stories page after publish
      navigate('/stories?tab=published');
      
    } catch (err: any) {
      console.error('Publish error:', err);
      const errorMessage = err?.data?.detail || 'Failed to publish article';
      toast.error(errorMessage);
    } finally {
      setIsPublishing(false);
    }
  };

  // --- Handle Manual Save ---
  const handleManualSave = () => {
    saveDraft(true);
  };

  // --- Clear Editor ---
  const clearEditor = () => {
    setContent('');
    setTitle('');
    setSummary('');
    setTags([]);
    setCoverImage(null);
    setDraftId(null);
    setResetEditor(true);
    setTimeout(() => setResetEditor(false), 100);
  };

  // --- Handle New Article ---
  const handleNewArticle = () => {
    if (content.trim()) {
      const confirmNew = window.confirm('You have unsaved changes. Start a new article?');
      if (!confirmNew) return;
    }

    localStorage.removeItem(DRAFT_KEY);
    clearEditor();
    toast.info('Started new article');
  };

  // --- Tag Management ---
  const addTag = (tag: string) => {
    const trimmedTag = tag.trim().toLowerCase();
    if (trimmedTag && !tags.includes(trimmedTag)) {
      setTags([...tags, trimmedTag]);
    }
  };

  const removeTag = (tagToRemove: string) => {
    setTags(tags.filter(tag => tag !== tagToRemove));
  };

  return (
    <>
      <PageHeader title="Write Article">
        <div className="flex gap-3">
          <button 
            onClick={handleNewArticle}
            className="px-4 py-1.5 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
          >
            New Article
          </button>
          <button 
            onClick={handleManualSave}
            disabled={!content.trim() || isSaving}
            className="px-4 py-1.5 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded hover:bg-gray-50 dark:hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            {isSaving ? 'Saving...' : 'Save Draft'}
          </button>
          <button 
            onClick={handlePublish}
            disabled={!content.trim() || isSaving || isPublishing}
            className="px-4 py-1.5 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            {isPublishing ? 'Publishing...' : 'Publish Article'}
          </button>
        </div>
      </PageHeader>

      <div className="max-w-4xl mx-auto p-6">
        {/* Draft Loading State */}
        {draftsLoading && (
          <div className="mb-4 p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
            <p className="text-sm text-blue-700 dark:text-blue-300">Loading drafts...</p>
          </div>
        )}

        {/* Draft Status */}
        {draftId && (
          <div className="mb-4 p-3 bg-green-50 dark:bg-green-900/20 rounded-lg">
            <p className="text-sm text-green-700 dark:text-green-300">
              Working on draft #{draftId} • Auto-save enabled
            </p>
          </div>
        )}

        {/* Article Metadata */}
        <div className="mb-6 space-y-4">
          {/* Title Input */}
          <div>
            <label className="block text-sm font-medium mb-2">Article Title</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Enter article title or use H1 in content"
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
            />
          </div>

          {/* Summary Input */}
          <div>
            <label className="block text-sm font-medium mb-2">Summary (Optional)</label>
            <textarea
              value={summary}
              onChange={(e) => setSummary(e.target.value)}
              placeholder="Brief summary of the article..."
              rows={3}
              maxLength={500}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
            />
            <p className="text-xs text-gray-500 mt-1">{summary.length}/500 characters</p>
          </div>

          {/* Tags Input */}
          <div>
            <label className="block text-sm font-medium mb-2">Tags</label>
            <TagInput tags={tags} onAddTag={addTag} onRemoveTag={removeTag} />
          </div>

          {/* Cover Image Upload */}
          <div>
            <label className="block text-sm font-medium mb-2">Cover Image (Optional)</label>
            <CoverImageUploader onUpload={setCoverImage} currentImage={coverImage} />
          </div>
        </div>

        {/* Editor */}
        <div className="mb-6">
          <label className="block text-sm font-medium mb-2">Content</label>
          <ArticleEditor 
            ref={editorRef}
            onContentChange={setContent} 
            resetSignal={resetEditor}
            initialContent={content}
          />
        </div>

        {/* Status Bar */}
        <div className="flex justify-between items-center text-sm text-gray-500">
          <div>
            {isSaving ? (
              <span className="text-blue-600">Auto-saving...</span>
            ) : (
              <span>Changes saved automatically</span>
            )}
          </div>
          <div>
            Words: {content.split(/\s+/).filter(word => word.length > 0).length}
          </div>
        </div>
      </div>

      <Toaster richColors position="top-right" />
    </>
  );
};

// --- Tag Input Component ---
const TagInput: React.FC<{
  tags: string[];
  onAddTag: (tag: string) => void;
  onRemoveTag: (tag: string) => void;
}> = ({ tags, onAddTag, onRemoveTag }) => {
  const [inputValue, setInputValue] = useState('');

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' || e.key === ',') {
      e.preventDefault();
      if (inputValue.trim()) {
        onAddTag(inputValue.trim());
        setInputValue('');
      }
    }
  };

  return (
    <div>
      <div className="flex flex-wrap gap-2 mb-2">
        {tags.map((tag) => (
          <span
            key={tag}
            className="inline-flex items-center px-2 py-1 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 text-sm rounded-md"
          >
            {tag}
            <button
              onClick={() => onRemoveTag(tag)}
              className="ml-1 text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-200"
            >
              ×
            </button>
          </span>
        ))}
      </div>
      <input
        type="text"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder="Add tags (press Enter or comma to add)"
        className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
      />
    </div>
  );
};

// --- Cover Image Uploader Component ---
const CoverImageUploader: React.FC<{
  onUpload: (url: string | null) => void;
  currentImage: string | null;
}> = ({ onUpload, currentImage }) => {
  const [uploadImage, { isLoading: uploading }] = useUploadImageFileMutation();

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      const uploadResult = await uploadImage({
        imageType: "article",
        bucket: "scholarx-article",
        file: file,
      }).unwrap();
      
      onUpload(uploadResult.url);
      toast.success('Cover image uploaded');
    } catch (err: any) {
      console.error('Upload error:', err);
      const errorMessage = err?.data?.detail || 'Upload failed';
      toast.error(errorMessage);
    }
  };

  const handleRemove = () => {
    onUpload(null);
    toast.info('Cover image removed');
  };

  return (
    <div>
      {currentImage ? (
        <div className="relative inline-block">
          <img 
            src={currentImage} 
            alt="Cover" 
            className="h-32 w-48 object-cover rounded-lg border border-gray-300 dark:border-gray-600" 
          />
          <button
            onClick={handleRemove}
            className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm hover:bg-red-600 transition-colors"
          >
            ×
          </button>
        </div>
      ) : (
        <>
          <input
            type="file"
            accept="image/*"
            id="cover-upload"
            style={{ display: 'none' }}
            onChange={handleUpload}
            disabled={uploading}
          />
          <button
            onClick={() => document.getElementById('cover-upload')?.click()}
            disabled={uploading}
            className="px-4 py-2 bg-gray-100 dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-md text-sm hover:bg-gray-200 dark:hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            {uploading ? 'Uploading...' : 'Upload Cover Image'}
          </button>
        </>
      )}
    </div>
  );
};

export default WriteArticle;
