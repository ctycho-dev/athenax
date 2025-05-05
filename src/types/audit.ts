import { FileType } from ".";
import { ReportState } from "@/enums";


export type FileFields = {
    'step2.codebaseZip': FileType | null;
    'step3.whitepaperZip': FileType | null;
    'step3.techDocsZip': FileType | null;
    'step3.tokenomicsZip': FileType | null;
    'step3.smartContractZip': FileType | null;
};


export type FormValues = {
    [key: string]: any;
    step1: {
        name: string;
        website: string;
        contactName: string;
        contactEmail: string;
        telegram: string;
        ecosystem: string;
        blockchain: string;
        description: string;
    };
    step2: {
        codebase: string;
        gitLink: string;
        gitHash: string;
        gitBranch: string;
        codebaseZip: FileType | null;
        listOfSmartContracts: string;
        contractUpgradeable: string;
        contractUpgradeableDesc: string;
        deployed: string;
        deployedDesc: string;
        thirdParty: string;
    };
    step3: {
        whitepaper: string;
        whitepaperLink: string;
        whitepaperZip: FileType | null;
        techDocs: string;
        techDocsLink: string;
        techDocsZip: FileType | null;
        tokenomics: string;
        tokenomicsLink: string;
        tokenomicsZip: FileType | null;
        smartContract: string;
        smartContractLink: string;
        smartContractZip: FileType | null;
    };
    step4: {
        framework: string;
        test: string;
        testDesc: string;
        testnet: string;
        testnetLink: string;
        thread: string;
    };
};


export type AuditType = {
    steps: FormValues
    id: string
    state: ReportState
    user_privy_id: string
    admin_comment?: string
    created_at: string
    updated_at: string
}