import { FileType } from ".";
import { ReportState } from "@/enums";

export type FileFields = {
    'step9.brandZip': FileType | null;
    'step10.whitepaperZip': FileType | null;
    'step10.faqZip': FileType | null;
    'step10.materialsZip': FileType | null;
};


export type FormValues = {
    step1: {
        name: string;
        tagline: string;
        launchDate: string;
        contactEmail: string;
        primaryContactName: string;
        primaryContactRole: string;
        twitter: string;
        discord: string;
        telegram: string;
        github: string;
    };
    step2: {
        foundersAndCoreTeam: string;
        advisors: string;
        orgStructure: string;
        governance: string;
    };
    step3: {
        productDesc: string;
        useCases: string;
        techArchitecture: string;
        integrations: string;
    };
    step4: {
        tokenDetails: string;
        utilities: string;
        supply: string;
        distribution: string;
        emission: string;
    };
    step5: {
        funding: string;
        revenue: string;
        treasury: string;
        runway: string;
    };
    step6: {
        metrics: string;
        tvl: string;
        partnerships: string;
        community: string;
    };
    step7: {
        legalEntity: string;
        compliance: string;
        audits: string;
    };
    step8: {
        risks: string;
        strategies: string;
    };
    step9: {
        mediaCoverage: string;
        communityContent: string;
        brand: string;
        brandLink: string;
        brandZip: FileType | null;
    };
    step10: {
        whitepaper: string;
        whitepaperLink: string;
        whitepaperZip: FileType | null;
        faq: string;
        faqLink: string;
        faqZip: FileType | null;
        materials: string;
        materialsLink: string;
        materialsZip: FileType | null;
    };
    id?: string
    created_at?: string
    updated_at?: string
};

export type StepsCompletionResearch = {
    [key: number]: boolean;
    1: boolean
    2: boolean
    3: boolean
    4: boolean
    5: boolean
    6: boolean
    7: boolean
    8: boolean
    9: boolean
    10: boolean
}


export type ResearchType = {
    steps: FormValues
    id: string
    state: ReportState
    user_privy_id: string
    comments?: string
    created_at: string
    updated_at: string
}