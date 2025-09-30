// // components/SaveStatusDisplay.tsx
// import React from 'react';
// import { SaveStatus } from '@/enums';

// interface SaveStatusDisplayProps {
//   saveStatus: SaveStatus;
//   draftId: number | null;
//   isEditingExisting: boolean;
//   onRetry: () => void;
// }

// export const SaveStatusDisplay: React.FC<SaveStatusDisplayProps> = ({
//   saveStatus,
//   draftId,
//   isEditingExisting,
//   onRetry,
// }) => {
//   // Don't show save status for new articles until they're created
//   if (!draftId && !isEditingExisting) return null;

//   switch (saveStatus) {
//     case 'saving':
//       return <span className="text-gray-3 text-sm animate-pulse">Saving...</span>;
//     case 'error':
//       return (
//         <button
//           onClick={onRetry}
//           className="text-gray-3 text-sm hover:cursor-pointer underline"
//         >
//           Save failed - Retry
//         </button>
//       );
//     // case 'unsaved':
//     //   return null;
//       // return <span className="text-gray-3 text-sm">Unsaved changes</span>;
//     case 'saved':
//       return <span className="text-gray-3 text-sm">Saved</span>;
//     default:
//       return null;
//   }
// };

// components/SaveStatusDisplay.tsx
import React from 'react';
import { SaveStatus } from '@/enums';

interface SaveStatusDisplayProps {
  saveStatus: SaveStatus;
  draftId: number | null;
  isEditingExisting: boolean;
  onRetry: () => void;
}

export const SaveStatusDisplay: React.FC<SaveStatusDisplayProps> = ({
  saveStatus,
  draftId,
  isEditingExisting,
  onRetry,
}) => {
  // Hide only when it's a brand-new draft AND nothing to show (already saved & no id yet)
  // console.log('SaveStatusDisplay render:', { saveStatus, draftId, isEditingExisting });
  const isBrandNew = !draftId && !isEditingExisting;
  const shouldHide = isBrandNew && saveStatus === 'saved';

  if (shouldHide) return null;

  const base = 'text-sm text-gray-600';
  const savingText = isBrandNew ? 'Saving draft…' : 'Saving…';

  switch (saveStatus) {
    case 'saving':
      return (
        <span className={`${base} animate-pulse`} aria-live="polite">
          {savingText}
        </span>
      );

    case 'unsaved':
      return (
        <span className={base} aria-live="polite">
          Unsaved changes
        </span>
      );

    case 'error':
      return (
        <button onClick={onRetry} className={`${base} underline`} aria-live="assertive">
          Save failed — Retry
        </button>
      );

    case 'saved':
      return (
        <span className={base} aria-live="polite">
          Saved
        </span>
      );

    default:
      return null;
  }
};
