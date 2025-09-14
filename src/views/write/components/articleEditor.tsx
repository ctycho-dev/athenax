// // import React, { useEffect, useState, useMemo } from 'react'

// // import Placeholder from '@tiptap/extension-placeholder'
// // import Image from '@tiptap/extension-image'
// // import { Color } from '@tiptap/extension-color'
// // import ListItem from '@tiptap/extension-list-item'
// // import TextStyle from '@tiptap/extension-text-style'
// // import { EditorProvider, useCurrentEditor } from '@tiptap/react'
// // import StarterKit from '@tiptap/starter-kit'
// // import { useFileUploader } from '@/hooks/useFileUploader'
// // import { ARTICLE_STORAGE_KEY } from '@/constants/article'


// // import '@/assets/styles/editor.scss'


// // const MenuBar: React.FC = () => {
// //     const { editor } = useCurrentEditor()
// //     const { upload } = useFileUploader()

// //     if (!editor) return null

// //     return (
// //         <div className="control-group mb-6">
// //             <div className="button-group flex gap-2 flex-wrap">
// //                 {[
// //                     { label: 'Bold', action: () => editor.chain().focus().toggleBold().run(), isActive: editor.isActive('bold'), canRun: editor.can().chain().focus().toggleBold().run() },
// //                     { label: 'Italic', action: () => editor.chain().focus().toggleItalic().run(), isActive: editor.isActive('italic'), canRun: editor.can().chain().focus().toggleItalic().run() },
// //                     { label: 'Strike', action: () => editor.chain().focus().toggleStrike().run(), isActive: editor.isActive('strike'), canRun: editor.can().chain().focus().toggleStrike().run() },
// //                     { label: 'Code', action: () => editor.chain().focus().toggleCode().run(), isActive: editor.isActive('code'), canRun: editor.can().chain().focus().toggleCode().run() },
// //                 ].map(({ label, action, isActive, canRun }) => (
// //                     <button
// //                         key={label}
// //                         onClick={action}
// //                         disabled={!canRun}
// //                         className={isActive ? 'is-active' : 'not-active'}
// //                     >
// //                         <span className='text-md'>{label}</span>
// //                     </button>
// //                 ))}

// //                 <button onClick={() => editor.chain().focus().unsetAllMarks().run()} className='not-active'>Clear marks</button>
// //                 <button onClick={() => editor.chain().focus().clearNodes().run()} className='not-active'>Clear nodes</button>

// //                 {([1, 2, 3, 4, 5, 6] as const).map(level => (
// //                     <button
// //                         key={`H${level}`}
// //                         onClick={() => editor.chain().focus().toggleHeading({ level }).run()}
// //                         className={editor.isActive('heading', { level }) ? 'is-active' : 'not-active'}
// //                     >
// //                         H{level}
// //                     </button>
// //                 ))}

// //                 <button
// //                     onClick={() => editor.chain().focus().setParagraph().run()}
// //                     className={editor.isActive('paragraph') ? 'is-active' : 'not-active'}>
// //                     Paragraph
// //                 </button>
// //                 <button
// //                     onClick={() => editor.chain().focus().toggleBulletList().run()}
// //                     className={editor.isActive('bulletList') ? 'is-active' : 'not-active'}
// //                 >
// //                     Bullet list
// //                 </button>
// //                 <button
// //                     onClick={() => editor.chain().focus().toggleOrderedList().run()}
// //                     className={editor.isActive('orderedList') ? 'is-active' : 'not-active'}
// //                 >
// //                     Ordered list
// //                 </button>
// //                 <button
// //                     onClick={() => editor.chain().focus().toggleCodeBlock().run()}
// //                     className={editor.isActive('codeBlock') ? 'is-active' : 'not-active'}
// //                 >
// //                     Code block
// //                 </button>
// //                 <button
// //                     onClick={() => editor.chain().focus().toggleBlockquote().run()}
// //                     className={editor.isActive('blockquote') ? 'is-active' : 'not-active'}
// //                 >
// //                     Blockquote
// //                 </button>
// //                 <button onClick={() => editor.chain().focus().setHorizontalRule().run()} className='py-1.5 px-2 rounded-medium bg-console-card border'>Horizontal rule</button>
// //                 <button onClick={() => editor.chain().focus().setHardBreak().run()} className='py-1.5 px-2 rounded-medium bg-console-card border'>Hard break</button>
// //                 <button
// //                     onClick={() => {
// //                         const url = window.prompt('Enter image URL')
// //                         if (url) {
// //                             editor.chain().focus().setImage({ src: url }).run()
// //                         }
// //                     }}
// //                     className='not-active'
// //                 >
// //                     Insert Image
// //                 </button>
// //                 <button
// //                     onClick={() => editor.chain().focus().undo().run()}
// //                     disabled={!editor.can().chain().focus().undo().run()}
// //                     className='py-1.5 px-2 rounded-medium bg-console-card border'
// //                 >
// //                     Undo
// //                 </button>
// //                 <button
// //                     onClick={() => editor.chain().focus().redo().run()}
// //                     disabled={!editor.can().chain().focus().redo().run()}
// //                     className='py-1.5 px-2 rounded-medium bg-console-card border'
// //                 >
// //                     Redo
// //                 </button>
// //                 <button
// //                     onClick={() => editor.chain().focus().setColor('#958DF1').run()}
// //                     className={editor.isActive('textStyle', { color: '#958DF1' }) ? 'is-active' : 'not-active'}
// //                 >
// //                     Purple
// //                 </button>
// //                 <input
// //                     type="file"
// //                     accept="image/*"
// //                     id="image-upload"
// //                     style={{ display: 'none' }}
// //                     onChange={async (e) => {
// //                         const file = e.target.files?.[0]
// //                         if (file) {
// //                             try {
// //                                 const uploaded = await upload(file, 'articles')
// //                                 console.log(uploaded)
// //                                 if (uploaded.url) {
// //                                     editor.chain().focus().setImage({ src: uploaded.url }).run()
// //                                 }
// //                             } catch (err) {
// //                                 // Already handled by toast
// //                             }
// //                         }
// //                     }}
// //                 />

// //                 <button
// //                     onClick={() => document.getElementById('image-upload')?.click()}
// //                     className='py-1.5 px-2 rounded-medium bg-console-card border'
// //                 >
// //                     Upload Image
// //                 </button>
// //             </div>
// //         </div>
// //     )
// // }

// // const extensions = [
// //     Placeholder.configure({
// //         placeholder: 'Start typing...',
// //         emptyEditorClass: 'is-editor-empty', // Optional: apply a class when empty
// //     }),
// //     Color.configure({ types: [TextStyle.name, ListItem.name] }),
// //     StarterKit.configure({
// //         bulletList: {
// //             keepMarks: true,
// //             keepAttributes: false,
// //         },
// //         orderedList: {
// //             keepMarks: true,
// //             keepAttributes: false,
// //         },
// //     }),
// //     Image.configure({
// //         inline: false,
// //         allowBase64: true, 
// //     }),
// // ]

// // interface Props {
// //     onContentChange: (html: string) => void;
// //     resetSignal?: boolean;
// // }

// // const ArticleEditor: React.FC<Props> = ({ onContentChange, resetSignal }) => {
// //     const [initialContent, setInitialContent] = useState<string>('');

// //     useEffect(() => {
// //         const saved = localStorage.getItem(ARTICLE_STORAGE_KEY);
// //         if (saved) {
// //             setInitialContent(saved);
// //             onContentChange(saved);
// //         }
// //     }, []);

// //     useEffect(() => {
// //         console.log('resetSignal', resetSignal)
// //         if (resetSignal) {
// //             setInitialContent('');
// //             localStorage.removeItem(ARTICLE_STORAGE_KEY);
// //             onContentChange('');
// //         }
// //     }, [resetSignal]);


// //     return (
// //         <div className="tiptap-wrapper tiptap">
// //             <EditorProvider
// //                 key={initialContent}
// //                 slotBefore={<MenuBar />}
// //                 extensions={extensions}
// //                 content={initialContent}
// //                 onUpdate={({ editor }) => {
// //                     const html = editor.getHTML();
// //                     localStorage.setItem(ARTICLE_STORAGE_KEY, html);
// //                     onContentChange(html);
// //                 }}
// //             />
// //         </div>
// //     );
// // };

// // export default ArticleEditor;


// // src/components/ArticleEditor.tsx
// import React, { useEffect, useState, useImperativeHandle, forwardRef } from 'react'
// import Placeholder from '@tiptap/extension-placeholder'
// import Image from '@tiptap/extension-image'
// import { Color } from '@tiptap/extension-color'
// import ListItem from '@tiptap/extension-list-item'
// import TextStyle from '@tiptap/extension-text-style'
// import { EditorProvider, useCurrentEditor } from '@tiptap/react'
// import StarterKit from '@tiptap/starter-kit'
// import { useFileUploader } from '@/hooks/useFileUploader'
// import { toast } from 'sonner'

// import '@/assets/styles/editor.scss'

// const MenuBar: React.FC = () => {
//     const { editor } = useCurrentEditor()
//     const { upload } = useFileUploader()

//     if (!editor) return null

//     const handleImageUpload = async (file: File) => {
//         try {
//             const uploaded = await upload(file, 'articles')
//             if (uploaded.url) {
//                 editor.chain().focus().setImage({ src: uploaded.url }).run()
//                 toast.success('Image uploaded successfully')
//             }
//         } catch (err) {
//             console.error('Image upload failed:', err)
//             toast.error('Failed to upload image')
//         }
//     }

//     return (
//         <div className="control-group mb-6">
//             <div className="button-group flex gap-2 flex-wrap">
//                 {/* Text Formatting */}
//                 {[
//                     { 
//                         label: 'Bold', 
//                         action: () => editor.chain().focus().toggleBold().run(), 
//                         isActive: editor.isActive('bold'), 
//                         canRun: editor.can().chain().focus().toggleBold().run() 
//                     },
//                     { 
//                         label: 'Italic', 
//                         action: () => editor.chain().focus().toggleItalic().run(), 
//                         isActive: editor.isActive('italic'), 
//                         canRun: editor.can().chain().focus().toggleItalic().run() 
//                     },
//                     { 
//                         label: 'Strike', 
//                         action: () => editor.chain().focus().toggleStrike().run(), 
//                         isActive: editor.isActive('strike'), 
//                         canRun: editor.can().chain().focus().toggleStrike().run() 
//                     },
//                     { 
//                         label: 'Code', 
//                         action: () => editor.chain().focus().toggleCode().run(), 
//                         isActive: editor.isActive('code'), 
//                         canRun: editor.can().chain().focus().toggleCode().run() 
//                     },
//                 ].map(({ label, action, isActive, canRun }) => (
//                     <button
//                         key={label}
//                         onClick={action}
//                         disabled={!canRun}
//                         className={`py-1.5 px-2 rounded-md border transition-colors ${
//                             isActive 
//                                 ? 'bg-blue-500 text-white border-blue-500' 
//                                 : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 border-gray-300 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700'
//                         }`}
//                     >
//                         <span className='text-sm'>{label}</span>
//                     </button>
//                 ))}

//                 {/* Clear Actions */}
//                 <button 
//                     onClick={() => editor.chain().focus().unsetAllMarks().run()} 
//                     className='py-1.5 px-2 rounded-md bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 border border-gray-300 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors'
//                 >
//                     Clear marks
//                 </button>
//                 <button 
//                     onClick={() => editor.chain().focus().clearNodes().run()} 
//                     className='py-1.5 px-2 rounded-md bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 border border-gray-300 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors'
//                 >
//                     Clear nodes
//                 </button>

//                 {/* Headings */}
//                 {([1, 2, 3, 4, 5, 6] as const).map(level => (
//                     <button
//                         key={`H${level}`}
//                         onClick={() => editor.chain().focus().toggleHeading({ level }).run()}
//                         className={`py-1.5 px-2 rounded-md border transition-colors ${
//                             editor.isActive('heading', { level })
//                                 ? 'bg-blue-500 text-white border-blue-500' 
//                                 : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 border-gray-300 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700'
//                         }`}
//                     >
//                         H{level}
//                     </button>
//                 ))}

//                 {/* Block Elements */}
//                 <button
//                     onClick={() => editor.chain().focus().setParagraph().run()}
//                     className={`py-1.5 px-2 rounded-md border transition-colors ${
//                         editor.isActive('paragraph')
//                             ? 'bg-blue-500 text-white border-blue-500' 
//                             : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 border-gray-300 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700'
//                     }`}
//                 >
//                     Paragraph
//                 </button>
//                 <button
//                     onClick={() => editor.chain().focus().toggleBulletList().run()}
//                     className={`py-1.5 px-2 rounded-md border transition-colors ${
//                         editor.isActive('bulletList')
//                             ? 'bg-blue-500 text-white border-blue-500' 
//                             : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 border-gray-300 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700'
//                     }`}
//                 >
//                     Bullet list
//                 </button>
//                 <button
//                     onClick={() => editor.chain().focus().toggleOrderedList().run()}
//                     className={`py-1.5 px-2 rounded-md border transition-colors ${
//                         editor.isActive('orderedList')
//                             ? 'bg-blue-500 text-white border-blue-500' 
//                             : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 border-gray-300 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700'
//                     }`}
//                 >
//                     Ordered list
//                 </button>
//                 <button
//                     onClick={() => editor.chain().focus().toggleCodeBlock().run()}
//                     className={`py-1.5 px-2 rounded-md border transition-colors ${
//                         editor.isActive('codeBlock')
//                             ? 'bg-blue-500 text-white border-blue-500' 
//                             : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 border-gray-300 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700'
//                     }`}
//                 >
//                     Code block
//                 </button>
//                 <button
//                     onClick={() => editor.chain().focus().toggleBlockquote().run()}
//                     className={`py-1.5 px-2 rounded-md border transition-colors ${
//                         editor.isActive('blockquote')
//                             ? 'bg-blue-500 text-white border-blue-500' 
//                             : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 border-gray-300 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700'
//                     }`}
//                 >
//                     Blockquote
//                 </button>

//                 {/* Special Elements */}
//                 <button 
//                     onClick={() => editor.chain().focus().setHorizontalRule().run()} 
//                     className='py-1.5 px-2 rounded-md bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 border border-gray-300 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors'
//                 >
//                     Horizontal rule
//                 </button>
//                 <button 
//                     onClick={() => editor.chain().focus().setHardBreak().run()} 
//                     className='py-1.5 px-2 rounded-md bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 border border-gray-300 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors'
//                 >
//                     Hard break
//                 </button>

//                 {/* Image Actions */}
//                 <button
//                     onClick={() => {
//                         const url = window.prompt('Enter image URL')
//                         if (url) {
//                             editor.chain().focus().setImage({ src: url }).run()
//                         }
//                     }}
//                     className='py-1.5 px-2 rounded-md bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 border border-gray-300 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors'
//                 >
//                     Insert Image URL
//                 </button>

//                 {/* Hidden file input for image upload */}
//                 <input
//                     type="file"
//                     accept="image/*"
//                     id="image-upload"
//                     style={{ display: 'none' }}
//                     onChange={async (e) => {
//                         const file = e.target.files?.[0]
//                         if (file) {
//                             await handleImageUpload(file)
//                         }
//                         // Reset input value so same file can be selected again
//                         e.target.value = ''
//                     }}
//                 />

//                 <button
//                     onClick={() => document.getElementById('image-upload')?.click()}
//                     className='py-1.5 px-2 rounded-md bg-green-500 text-white border border-green-500 hover:bg-green-600 transition-colors'
//                 >
//                     Upload Image
//                 </button>

//                 {/* History Actions */}
//                 <button
//                     onClick={() => editor.chain().focus().undo().run()}
//                     disabled={!editor.can().chain().focus().undo().run()}
//                     className='py-1.5 px-2 rounded-md bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 border border-gray-300 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors'
//                 >
//                     Undo
//                 </button>
//                 <button
//                     onClick={() => editor.chain().focus().redo().run()}
//                     disabled={!editor.can().chain().focus().redo().run()}
//                     className='py-1.5 px-2 rounded-md bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 border border-gray-300 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors'
//                 >
//                     Redo
//                 </button>

//                 {/* Color */}
//                 <button
//                     onClick={() => editor.chain().focus().setColor('#958DF1').run()}
//                     className={`py-1.5 px-2 rounded-md border transition-colors ${
//                         editor.isActive('textStyle', { color: '#958DF1' })
//                             ? 'bg-purple-500 text-white border-purple-500' 
//                             : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 border-gray-300 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700'
//                     }`}
//                 >
//                     Purple
//                 </button>
//             </div>
//         </div>
//     )
// }

// const extensions = [
//     Placeholder.configure({
//         placeholder: 'Start writing your article... Use H1 for the main title.',
//         emptyEditorClass: 'is-editor-empty',
//     }),
//     Color.configure({ types: [TextStyle.name, ListItem.name] }),
//     StarterKit.configure({
//         bulletList: {
//             keepMarks: true,
//             keepAttributes: false,
//         },
//         orderedList: {
//             keepMarks: true,
//             keepAttributes: false,
//         },
//     }),
//     Image.configure({
//         inline: false,
//         allowBase64: false, // Disable base64 to encourage proper uploads
//         HTMLAttributes: {
//             class: 'article-image',
//         },
//     }),
// ]

// export interface ArticleEditorRef {
//     getContent: () => string;
//     setContent: (content: string) => void;
//     clearContent: () => void;
// }

// interface Props {
//     onContentChange: (html: string) => void;
//     resetSignal?: boolean;
//     initialContent?: string;
// }

// const ArticleEditor = forwardRef<ArticleEditorRef, Props>(({ 
//     onContentChange, 
//     resetSignal, 
//     initialContent = '' 
// }, ref) => {
//     const [content, setContent] = useState<string>(initialContent);
//     const [editorKey, setEditorKey] = useState<number>(0);

//     // Handle reset signal
//     useEffect(() => {
//         if (resetSignal) {
//             setContent('');
//             setEditorKey(prev => prev + 1); // Force re-render of editor
//         }
//     }, [resetSignal]);

//     // Handle initial content changes
//     useEffect(() => {
//         if (initialContent !== content) {
//             setContent(initialContent);
//             setEditorKey(prev => prev + 1); // Force re-render with new content
//         }
//     }, [initialContent]);

//     // Expose editor methods via ref
//     useImperativeHandle(ref, () => ({
//         getContent: () => content,
//         setContent: (newContent: string) => {
//             setContent(newContent);
//             setEditorKey(prev => prev + 1);
//         },
//         clearContent: () => {
//             setContent('');
//             setEditorKey(prev => prev + 1);
//         },
//     }));

//     return (
//         <div className="tiptap-wrapper">
//             <EditorProvider
//                 key={editorKey}
//                 slotBefore={<MenuBar />}
//                 extensions={extensions}
//                 content={content}
//                 onUpdate={({ editor }) => {
//                     const html = editor.getHTML();
//                     setContent(html);
//                     onContentChange(html);
//                 }}
//                 editorProps={{
//                     attributes: {
//                         class: 'prose dark:prose-invert prose-sm sm:prose-base lg:prose-lg xl:prose-2xl mx-auto focus:outline-none min-h-[400px] p-4 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-800',
//                     },
//                 }}
//             />
//         </div>
//     );
// });

// ArticleEditor.displayName = 'ArticleEditor';

// export default ArticleEditor;
