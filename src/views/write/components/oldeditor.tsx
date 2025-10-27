// components/MediumEditor.tsx
import React, { useEffect, useState } from 'react'
import { Editor, EditorContent, useEditor } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import Image from '@tiptap/extension-image'
import Placeholder from '@tiptap/extension-placeholder'
import { useUploadImageFileMutation } from '@/services/imageApi'
import { toast } from 'sonner'

interface MediumEditorProps {
    content: string;
    onChange: (content: string) => void;
    placeholder?: string;
}

const MediumEditor: React.FC<MediumEditorProps> = ({
    content,
    onChange,
    placeholder = "Tell your story..."
}) => {
    const [uploadImage] = useUploadImageFileMutation();
    const [showToolbar, setShowToolbar] = useState(false);
    const [toolbarPosition, setToolbarPosition] = useState({ top: 0, left: 0 });
    const [showPlusMenu, setShowPlusMenu] = useState(false);
    const [plusPosition, setPlusPosition] = useState({ top: 0, left: 0 });
    const [currentParagraph, setCurrentParagraph] = useState<HTMLElement | null>(null);

    const editor = useEditor({
        extensions: [
            StarterKit.configure({
                heading: {
                    levels: [2, 3, 4, 5, 6],
                },
                paragraph: {
                    HTMLAttributes: {
                        class: 'medium-paragraph',
                    },
                },
            }),
            Image.configure({
                HTMLAttributes: {
                    class: 'medium-image',
                },
            }),
            Placeholder.configure({
                placeholder,
                showOnlyWhenEditable: true,
                showOnlyCurrent: false,
            }),
        ],
        content,
        editorProps: {
            attributes: {
                class: 'medium-editor-content',
            },
            handlePaste: (view, event) => {
                const items = Array.from(event.clipboardData?.items || []);
                const imageItem = items.find(item => item.type.indexOf('image') === 0);

                if (imageItem) {
                    event.preventDefault();
                    const file = imageItem.getAsFile();
                    if (file) {
                        handleImageUpload(file);
                    }
                    return true;
                }
                return false;
            },
        },
        onUpdate: ({ editor }) => {
            onChange(editor.getHTML());
            updatePlusButtonPosition();
        },
        onSelectionUpdate: ({ editor }) => {
            updateToolbarPosition();
            updatePlusButtonPosition();
        },
        onFocus: () => {
            updateToolbarPosition();
            updatePlusButtonPosition();
        },
        onBlur: ({ event }) => {
            const relatedTarget = event.relatedTarget as Element;
            if (!relatedTarget?.closest('.medium-toolbar') && !relatedTarget?.closest('.plus-menu')) {
                setShowToolbar(false);
                setShowPlusMenu(false);
            }
        },
    });

    // Update toolbar position to appear above selected text
    const updateToolbarPosition = () => {
        if (!editor || !editor.view.hasFocus()) {
            setShowToolbar(false);
            return;
        }

        const { from, to } = editor.view.state.selection;

        // Only show toolbar if there's a selection (not just cursor)
        if (from === to) {
            setShowToolbar(false);
            return;
        }

        const start = editor.view.coordsAtPos(from);
        const end = editor.view.coordsAtPos(to);

        setToolbarPosition({
            top: start.top - 60, // Position above the selection
            left: (start.left + end.left) / 2, // Center between selection
        });

        setShowToolbar(true);
    };

    // Update plus button position to be beside current paragraph
      const updatePlusButtonPosition = () => {
        if (!editor || !editor.view.hasFocus()) {
          setCurrentParagraph(null);
          return;
        }

        const { from } = editor.view.state.selection;
        const pos = editor.view.coordsAtPos(from);

        // Find the current paragraph element
        const domAtPos = editor.view.domAtPos(from);
        let paragraph = domAtPos.node as HTMLElement;

        // Navigate up to find the paragraph element
        while (paragraph && paragraph.tagName !== 'P' && paragraph.parentElement) {
          paragraph = paragraph.parentElement;
        }

        if (paragraph && paragraph.tagName === 'P') {
          const rect = paragraph.getBoundingClientRect();
          const editorRect = editor.view.dom.getBoundingClientRect();

          setPlusPosition({
            top: rect.top + rect.height / 2,
            left: editorRect.left - 60, // Position to the left of content
          });

          setCurrentParagraph(paragraph);
        }
      };

    // Handle image upload
    const handleImageUpload = async (file: File) => {
        try {
            const result = await uploadImage({
                imageType: "article",
                bucket: "scholarx-article",
                file: file,
            }).unwrap();

            if (editor && result.publicUrl) {
                editor.chain().focus().setImage({ src: result.publicUrl }).run();
                toast.success('Image uploaded successfully');
            }
        } catch (error) {
            toast.error('Failed to upload image');
        }
        setShowPlusMenu(false);
    };

    // Update content when prop changes
    useEffect(() => {
        if (editor && content !== editor.getHTML()) {
            editor.commands.setContent(content, false);
        }
    }, [content, editor]);

    useEffect(() => {
        const handleScroll = () => {
            if (showToolbar) updateToolbarPosition();
            if (currentParagraph) updatePlusButtonPosition();
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, [showToolbar, currentParagraph, editor]);

    if (!editor) return null;

    return (
        <div className="medium-editor-wrapper">
            {/* Floating Toolbar - appears above selection */}
            {showToolbar && (
                <div
                    className="medium-toolbar"
                    style={{
                        position: 'fixed',
                        top: `${toolbarPosition.top}px`,
                        left: `${toolbarPosition.left}px`,
                        transform: 'translateX(-50%)',
                    }}
                >
                    <FloatingToolbar editor={editor} onImageUpload={handleImageUpload} />
                </div>
            )}

            {/* Plus Button - beside current paragraph */}
            {currentParagraph && (
                <div
                    className="plus-button-container"
                    style={{
                        position: 'fixed',
                        top: `${plusPosition.top}px`,
                        left: `${plusPosition.left}px`,
                        transform: 'translateY(-50%)',
                    }}
                >
                    <button
                        className="plus-button"
                        onClick={() => setShowPlusMenu(!showPlusMenu)}
                    >
                        <PlusIcon />
                    </button>

                    {showPlusMenu && (
                        <div className="plus-menu">
                            <button
                                onClick={() => {
                                    const input = document.createElement('input');
                                    input.type = 'file';
                                    input.accept = 'image/*';
                                    input.onchange = (e) => {
                                        const file = (e.target as HTMLInputElement).files?.[0];
                                        if (file) handleImageUpload(file);
                                    };
                                    input.click();
                                }}
                                className="menu-item"
                            >
                                <ImageIcon /> Photo
                            </button>
                            <button
                                onClick={() => {
                                    editor.chain().focus().setHorizontalRule().run();
                                    setShowPlusMenu(false);
                                }}
                                className="menu-item"
                            >
                                <DividerIcon /> Divider
                            </button>
                        </div>
                    )}
                </div>
            )}

            {/* Editor Content */}
            <EditorContent
                editor={editor}
                className="medium-editor"
            />
        </div>
    );
};

// Floating Toolbar Component (simplified)
const FloatingToolbar: React.FC<{
    editor: Editor;
    onImageUpload: (file: File) => void;
}> = ({ editor }) => {
    return (
        <div className="toolbar-content">
            <button
                onClick={() => editor.chain().focus().toggleBold().run()}
                className={`toolbar-btn ${editor.isActive('bold') ? 'active' : ''}`}
                title="Bold (Cmd+B)"
            >
                <BoldIcon />
            </button>

            <button
                onClick={() => editor.chain().focus().toggleItalic().run()}
                className={`toolbar-btn ${editor.isActive('italic') ? 'active' : ''}`}
                title="Italic (Cmd+I)"
            >
                <ItalicIcon />
            </button>

            <button
                onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
                className={`toolbar-btn ${editor.isActive('heading', { level: 2 }) ? 'active' : ''}`}
                title="Heading"
            >
                H2
            </button>

            <button
                onClick={() => editor.chain().focus().toggleBlockquote().run()}
                className={`toolbar-btn ${editor.isActive('blockquote') ? 'active' : ''}`}
                title="Quote"
            >
                <QuoteIcon />
            </button>

            <button
                onClick={() => editor.chain().focus().toggleBulletList().run()}
                className={`toolbar-btn ${editor.isActive('bulletList') ? 'active' : ''}`}
                title="Bullet List"
            >
                <ListIcon />
            </button>
        </div>
    );
};

// ... (keep all the icon components the same)
const BoldIcon = () => (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
        <path d="M4 2h4.5c1.5 0 2.5 1 2.5 2.5S10 7 8.5 7h1c1.5 0 2.5 1 2.5 2.5S11 12 9.5 12H4V2zm2 4.5h2.5c.3 0 .5-.2.5-.5s-.2-.5-.5-.5H6v1zm0 3h3.5c.3 0 .5-.2.5-.5s-.2-.5-.5-.5H6v1z" />
    </svg>
);

const ItalicIcon = () => (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
        <path d="M6 2h6v2H9.5l-2 8H10v2H4v-2h2.5l2-8H6V2z" />
    </svg>
);

const QuoteIcon = () => (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
        <path d="M2 4h12v1H2V4zm0 3h12v1H2V7zm0 3h8v1H2v-1z" />
    </svg>
);

const ImageIcon = () => (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
        <path d="M2 3h12c.6 0 1 .4 1 1v8c0 .6-.4 1-1 1H2c-.6 0-1-.4-1-1V4c0-.6.4-1 1-1zm1 2v6h10V5H3zm2 4l1.5-2 1 1.3L9 6.5l3 3.8H5V9z" />
    </svg>
);

const ListIcon = () => (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
        <circle cx="3" cy="4" r="1" />
        <circle cx="3" cy="8" r="1" />
        <circle cx="3" cy="12" r="1" />
        <path d="M6 3h8v2H6V3zm0 4h8v2H6V7zm0 4h8v2H6v-2z" />
    </svg>
);

const PlusIcon = () => (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor">
        <path d="M10 4v12M4 10h12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    </svg>
);

const DividerIcon = () => (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
        <path d="M2 8h12v1H2V8z" />
    </svg>
);

export default MediumEditor;
