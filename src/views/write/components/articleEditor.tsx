import React, { useEffect, useState, useMemo } from 'react'

import Placeholder from '@tiptap/extension-placeholder'
import Image from '@tiptap/extension-image'
import { Color } from '@tiptap/extension-color'
import ListItem from '@tiptap/extension-list-item'
import TextStyle from '@tiptap/extension-text-style'
import { EditorProvider, useCurrentEditor } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import { useFileUploader } from '@/hooks/useFileUploader'
import { ARTICLE_STORAGE_KEY } from '@/constants/article'


import '@/assets/styles/editor.scss'


const MenuBar: React.FC = () => {
    const { editor } = useCurrentEditor()
    const { upload } = useFileUploader()

    if (!editor) return null

    return (
        <div className="control-group mb-6">
            <div className="button-group flex gap-2 flex-wrap">
                {[
                    { label: 'Bold', action: () => editor.chain().focus().toggleBold().run(), isActive: editor.isActive('bold'), canRun: editor.can().chain().focus().toggleBold().run() },
                    { label: 'Italic', action: () => editor.chain().focus().toggleItalic().run(), isActive: editor.isActive('italic'), canRun: editor.can().chain().focus().toggleItalic().run() },
                    { label: 'Strike', action: () => editor.chain().focus().toggleStrike().run(), isActive: editor.isActive('strike'), canRun: editor.can().chain().focus().toggleStrike().run() },
                    { label: 'Code', action: () => editor.chain().focus().toggleCode().run(), isActive: editor.isActive('code'), canRun: editor.can().chain().focus().toggleCode().run() },
                ].map(({ label, action, isActive, canRun }) => (
                    <button
                        key={label}
                        onClick={action}
                        disabled={!canRun}
                        className={isActive ? 'is-active' : 'not-active'}
                    >
                        <span className='text-md'>{label}</span>
                    </button>
                ))}

                <button onClick={() => editor.chain().focus().unsetAllMarks().run()} className='not-active'>Clear marks</button>
                <button onClick={() => editor.chain().focus().clearNodes().run()} className='not-active'>Clear nodes</button>

                {([1, 2, 3, 4, 5, 6] as const).map(level => (
                    <button
                        key={`H${level}`}
                        onClick={() => editor.chain().focus().toggleHeading({ level }).run()}
                        className={editor.isActive('heading', { level }) ? 'is-active' : 'not-active'}
                    >
                        H{level}
                    </button>
                ))}

                <button
                    onClick={() => editor.chain().focus().setParagraph().run()}
                    className={editor.isActive('paragraph') ? 'is-active' : 'not-active'}>
                    Paragraph
                </button>
                <button
                    onClick={() => editor.chain().focus().toggleBulletList().run()}
                    className={editor.isActive('bulletList') ? 'is-active' : 'not-active'}
                >
                    Bullet list
                </button>
                <button
                    onClick={() => editor.chain().focus().toggleOrderedList().run()}
                    className={editor.isActive('orderedList') ? 'is-active' : 'not-active'}
                >
                    Ordered list
                </button>
                <button
                    onClick={() => editor.chain().focus().toggleCodeBlock().run()}
                    className={editor.isActive('codeBlock') ? 'is-active' : 'not-active'}
                >
                    Code block
                </button>
                <button
                    onClick={() => editor.chain().focus().toggleBlockquote().run()}
                    className={editor.isActive('blockquote') ? 'is-active' : 'not-active'}
                >
                    Blockquote
                </button>
                <button onClick={() => editor.chain().focus().setHorizontalRule().run()} className='py-1.5 px-2 rounded-medium bg-console-card border'>Horizontal rule</button>
                <button onClick={() => editor.chain().focus().setHardBreak().run()} className='py-1.5 px-2 rounded-medium bg-console-card border'>Hard break</button>
                <button
                    onClick={() => {
                        const url = window.prompt('Enter image URL')
                        if (url) {
                            editor.chain().focus().setImage({ src: url }).run()
                        }
                    }}
                    className='not-active'
                >
                    Insert Image
                </button>
                <button
                    onClick={() => editor.chain().focus().undo().run()}
                    disabled={!editor.can().chain().focus().undo().run()}
                    className='py-1.5 px-2 rounded-medium bg-console-card border'
                >
                    Undo
                </button>
                <button
                    onClick={() => editor.chain().focus().redo().run()}
                    disabled={!editor.can().chain().focus().redo().run()}
                    className='py-1.5 px-2 rounded-medium bg-console-card border'
                >
                    Redo
                </button>
                <button
                    onClick={() => editor.chain().focus().setColor('#958DF1').run()}
                    className={editor.isActive('textStyle', { color: '#958DF1' }) ? 'is-active' : 'not-active'}
                >
                    Purple
                </button>
                <input
                    type="file"
                    accept="image/*"
                    id="image-upload"
                    style={{ display: 'none' }}
                    onChange={async (e) => {
                        const file = e.target.files?.[0]
                        if (file) {
                            try {
                                const uploaded = await upload(file, 'articles')
                                console.log(uploaded)
                                if (uploaded.url) {
                                    editor.chain().focus().setImage({ src: uploaded.url }).run()
                                }
                            } catch (err) {
                                // Already handled by toast
                            }
                        }
                    }}
                />

                <button
                    onClick={() => document.getElementById('image-upload')?.click()}
                    className='py-1.5 px-2 rounded-medium bg-console-card border'
                >
                    Upload Image
                </button>
            </div>
        </div>
    )
}

const extensions = [
    Placeholder.configure({
        placeholder: 'Start typing...',
        emptyEditorClass: 'is-editor-empty', // Optional: apply a class when empty
    }),
    Color.configure({ types: [TextStyle.name, ListItem.name] }),
    StarterKit.configure({
        bulletList: {
            keepMarks: true,
            keepAttributes: false,
        },
        orderedList: {
            keepMarks: true,
            keepAttributes: false,
        },
    }),
    Image.configure({
        inline: false,
        allowBase64: true, 
    }),
]

interface Props {
    onContentChange: (html: string) => void;
    resetSignal?: boolean;
}

const ArticleEditor: React.FC<Props> = ({ onContentChange, resetSignal }) => {
    const [initialContent, setInitialContent] = useState<string>('');

    useEffect(() => {
        const saved = localStorage.getItem(ARTICLE_STORAGE_KEY);
        if (saved) {
            setInitialContent(saved);
            onContentChange(saved);
        }
    }, []);

    useEffect(() => {
        console.log('resetSignal', resetSignal)
        if (resetSignal) {
            setInitialContent('');
            localStorage.removeItem(ARTICLE_STORAGE_KEY);
            onContentChange('');
        }
    }, [resetSignal]);


    return (
        <div className="tiptap-wrapper tiptap">
            <EditorProvider
                key={initialContent}
                slotBefore={<MenuBar />}
                extensions={extensions}
                content={initialContent}
                onUpdate={({ editor }) => {
                    const html = editor.getHTML();
                    localStorage.setItem(ARTICLE_STORAGE_KEY, html);
                    onContentChange(html);
                }}
            />
        </div>
    );
};

export default ArticleEditor;


// const content = `
// <h2>
//   Hi there,
// </h2>
// <p>
//   this is a <em>basic</em> example of <strong>Tiptap</strong>. Sure, there are all kind of basic text styles you’d probably expect from a text editor. But wait until you see the lists:
// </p>
// <ul>
//   <li>
//     That’s a bullet list with one …
//   </li>
//   <li>
//     … or two list items.
//   </li>
// </ul>
// <p>
//   Isn’t that great? And all of that is editable. But wait, there’s more. Let’s try a code block:
// </p>
// <pre><code class="language-css">body {
//   display: none;
// }</code></pre>
// <p>
//   I know, I know, this is impressive. It’s only the tip of the iceberg though. Give it a try and click a little bit around. Don’t forget to check the other examples too.
// </p>
// <blockquote>
//   Wow, that’s amazing. Good work, boy! 👏
//   <br />
//   — Mom
// </blockquote>
// `