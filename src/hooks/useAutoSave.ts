// hooks/useAutoSave.ts
import { useEffect, useRef, useState } from 'react';
import { toast } from 'sonner';
import { SaveStatus } from '@/enums';

interface UseAutoSaveProps {
  title: string;
  content: string;
  draftId: number | null;
  privyToken: string | null;
  existingArticle: any;
  createArticle: any;
  updateArticle: any;
  setDraftId: (id: number | null) => void;
  setSaveStatus: (status: SaveStatus) => void;
  navigate: (path: string, options?: any) => void;
}

export const useAutoSave = ({
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
}: UseAutoSaveProps) => {
  const [originalData, setOriginalData] = useState<{ title: string; content: string } | null>(null);

  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const latestSaveId = useRef(0);

  // Initialize baseline from server (once)
  useEffect(() => {
    if (existingArticle && !originalData) {
      setOriginalData({
        title: existingArticle.title ?? '',
        content: existingArticle.htmlContent ?? '',
      });
    }
  }, [existingArticle, originalData]);

  const hasDataChanged = () => {
    if (!originalData && !draftId) return Boolean(title.trim() || content.trim()); // brand-new
    if (originalData) return originalData.title !== title || originalData.content !== content;
    return false;
  };

  const saveDraft = async () => {
    if (!privyToken) return;
    if (!hasDataChanged()) return;

    const mySaveId = ++latestSaveId.current;
    const MIN_SAVING_MS = 1500;
    const startedAt = Date.now();

    // ⏱️ show "Saving…" ONLY when the debounced save actually fires
    setSaveStatus('saving');

    const payload = { title: title.trim(), htmlContent: content };

    try {
      let result;
      if (draftId) {
        result = await updateArticle({ id: draftId, ...payload }).unwrap();
      } else {
        result = await createArticle(payload).unwrap();
        setDraftId(result.id);
        navigate(`/article/${result.id}/edit`, { replace: true });
      }

      setOriginalData({ title, content });

      const remaining = Math.max(0, MIN_SAVING_MS - (Date.now() - startedAt));
      setTimeout(() => {
        if (mySaveId === latestSaveId.current) setSaveStatus('saved');
      }, remaining);
    } catch (e) {
      const remaining = Math.max(0, MIN_SAVING_MS - (Date.now() - startedAt));
      setTimeout(() => {
        if (mySaveId === latestSaveId.current) {
          setSaveStatus('error');
          toast.error('Failed to save draft');
        }
      }, remaining);
    }
  };

  // 🔁 Pure 3s debounce: no status change while user is typing
  useEffect(() => {
    if (timerRef.current) clearTimeout(timerRef.current);

    if (hasDataChanged()) {
      timerRef.current = setTimeout(() => {
        void saveDraft();
      }, 3000);
    }

    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [title, content]);

  // Best-effort save on hide/unload
  useEffect(() => {
    const saveOnHide = () => {
      if (hasDataChanged()) void saveDraft();
    };
    const onVisibility = () => {
      if (document.visibilityState === 'hidden') saveOnHide();
    };
    document.addEventListener('visibilitychange', onVisibility);
    window.addEventListener('pagehide', saveOnHide);
    return () => {
      document.removeEventListener('visibilitychange', onVisibility);
      window.removeEventListener('pagehide', saveOnHide);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [title, content, originalData]);

  const retrySave = () => { void saveDraft(); };

  return { saveDraft, retrySave };
};
