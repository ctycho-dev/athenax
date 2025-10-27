

// import React, { useEffect, useState, useMemo } from 'react'
// import { usePageColorScheme } from '@/hooks/usePageTheme';
// import { Toaster, toast } from 'sonner';
// import { RootState } from "@/store/store";
// import { useSelector } from 'react-redux';
// import { ReportState } from '@/enums';
// import { useGetAuditByStateQuery } from '@/services/auditApi';
// import { useGetResearchByStateQuery } from '@/services/researchApi';
// import { useAddArticleMutation } from '@/services/articleApi'
// import ArticleEditor from './components/articleEditor';

// import PageHeader from '@/components/ui/header'
// import { MultiSelect, Select } from '@mantine/core'
// import { ecosystemCategory, blochainList } from "@/data/index";
// import { ARTICLE_STORAGE_KEY } from '@/constants/article'


// import '@/assets/styles/editor.scss'


// const WriteArticle: React.FC = () => {
//    usePageColorScheme('light')
//    const [articleType, setArticleType] = useState<'audit' | 'research' | null>('research');
//    // const [articleType, setArticleType] = useState<'audit' | 'research' | null>(null);
//    const [selectedRelated, setSelectedRelated] = useState<string[]>([]);
//    const [resetEditor, setResetEditor] = useState(false);
//    const [related, setRelated] = useState<string[]>([]);
//    const [selectedTags, setSelectedTags] = useState<string[]>([]);
//    const privyToken = useSelector((state: RootState) => state.auth.privyToken);
//    const [htmlContent, setHtmlContent] = useState<string>('');

//    const { data: audits = [], isLoading: auditsLoading } = useGetAuditByStateQuery(ReportState.COMPLETED, {
//       skip: articleType !== 'audit' || !privyToken,
//    });
//    const { data: research = [], isLoading: researchLoading } = useGetResearchByStateQuery(ReportState.COMPLETED, {
//       skip: articleType !== 'research' || !privyToken,
//    });

//    const isLoadingRelated = auditsLoading || researchLoading;

//    const [createArticle, { isLoading }] = useAddArticleMutation();

//    const relatedOptions = useMemo(() => {
//       const list = articleType === 'audit' ? audits : articleType === 'research' ? research : [];
//       return list.map((item: any) => ({
//          value: item.id,
//          label: `${item.steps?.step1?.name || 'Untitled'} (${item.steps?.step1?.blockchain || 'N/A'})`,
//       }));
//    }, [audits, research, articleType]);


//    const tagOptions = useMemo(() => [
//       ...blochainList,
//       ...ecosystemCategory,
//    ].map(name => ({
//       value: name.toLowerCase().replace(/\s+/g, '-'),
//       label: name,
//    })), []);

//    const articleTypeOptions = [
//       { value: 'audit', label: 'Audit' },
//       { value: 'research', label: 'Research' }
//    ];

//    const handleSubmit = async () => {
//       if (!articleType) {
//          toast.error('Need to choose article type.')
//          return
//       }

//       const parser = new DOMParser();
//       const doc = parser.parseFromString(htmlContent, 'text/html');
//       const h1 = doc.querySelector('h1');

//       if (!h1 || !h1.textContent?.trim()) {
//          toast.warning('Please add an <h1> heading to set the article title.');
//          return;
//       }

//       const rawTitle = h1.textContent.trim();
//       const slug = rawTitle
//          .toLowerCase()
//          .replace(/[^\w\s-]/g, '') // Remove special characters
//          .replace(/\s+/g, '-')      // Replace whitespace with hyphens
//          .replace(/-+/g, '-');      // Avoid duplicate hyphens

//       const payload = {
//          title: rawTitle,
//          slug,
//          html_content: htmlContent,
//          type: articleType,
//          related_audit_ids: articleType === 'audit' ? selectedRelated : [],
//          related_research_ids: articleType === 'research' ? selectedRelated : [],
//       };

//       try {
//          await createArticle(payload).unwrap();
//          toast.success('Article created successfully!');
//          // Reset everything
//          setHtmlContent('');
//          setResetEditor(true);
//          setSelectedRelated([]);
//          setSelectedTags([]);
//          setArticleType(null);
//       } catch (err) {
//          console.error('Create error:', err);
//          toast.error('Failed to create article.');
//       }
//    };


//    return (
//       <>
//          <PageHeader title='Write Article'>
//             <div className='flex gap-3'>
//                <button className='px-4 py-1.5 border border-white text-white rounded hover:cursor-pointer'>
//                   Preview
//                </button>
//                <button
//                   onClick={handleSubmit}
//                   disabled={!htmlContent || isLoading}
//                   // disabled={!articleType || !htmlContent || isLoading}
//                   className="px-4 py-1.5 bg-blue-600 text-white rounded hover:bg-blue-700 hover:cursor-pointer disabled:opacity-50 disabled:pointer-events-none"
//                >
//                   {isLoading ? 'Submitting...' : 'Submit Article'}
//                </button>
//             </div>
//          </PageHeader>
//          <div className='max-w-3xl m-auto p-6'>
//             {/* <div className="mb-4 grid grid-cols-2 gap-2">
//                <Select
//                   label='Article type'
//                   placeholder='Select type'
//                   data={articleTypeOptions}
//                   value={articleType}
//                   onChange={(value) => {
//                      setArticleType(value as 'audit' | 'research' | null);
//                      setSelectedRelated([]);
//                   }}
//                />
//                <MultiSelect
//                   label="Tags"
//                   placeholder="Select tags"
//                   data={tagOptions}
//                   value={selectedTags}
//                   onChange={setSelectedTags}
//                   searchable
//                   clearable
//                />
//             </div>
//             <div className="mb-6">
//                <MultiSelect
//                   label={`Related ${articleType === 'audit' ? 'Audits' : articleType === 'research' ? 'Research' : 'Items'}`}
//                   placeholder={`Select related ${articleType}`}
//                   data={relatedOptions}
//                   value={selectedRelated}
//                   onChange={setSelectedRelated}
//                   searchable
//                   clearable
//                   disabled={!articleType || isLoadingRelated}
//                />
//             </div> */}
//             <ArticleEditor onContentChange={setHtmlContent} resetSignal={resetEditor} />
//          </div>
//          <Toaster richColors />
//       </>
//    );
// };

// export default WriteArticle
