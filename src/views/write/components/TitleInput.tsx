// components/TitleInput.tsx
import React, { useRef, useEffect } from 'react';

interface TitleInputProps {
  title: string;
  onChange: (title: string) => void;
}

export const TitleInput: React.FC<TitleInputProps> = ({ title, onChange }) => {
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  // Auto-resize textarea based on content
  const adjustHeight = () => {
    const textarea = textareaRef.current;
    if (textarea) {
      textarea.style.height = 'auto';
      textarea.style.height = `${textarea.scrollHeight}px`;
    }
  };

  // Adjust height when title changes
  useEffect(() => {
    adjustHeight();
  }, [title]);

  // Handle key press - prevent Enter key
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      // Focus on editor instead
      const editor = document.querySelector('.ProseMirror') as HTMLElement;
      if (editor) {
        editor.focus();
      }
    }
  };

  return (
    <div className="title-input-wrapper">
      <textarea
        ref={textareaRef}
        value={title}
        onChange={(e) => onChange(e.target.value)}
        onInput={adjustHeight}
        onKeyDown={handleKeyDown}
        placeholder="Title"
        className="title-input"
        maxLength={200}
        rows={1}
      />
      <div className="title-counter">
        <span className={title.length > 180 ? 'text-red-400' : 'text-gray-500'}>
          {title.length}/200
        </span>
      </div>
    </div>
  );
};
