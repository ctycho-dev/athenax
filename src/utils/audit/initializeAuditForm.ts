import { FormValues } from "@/types/audit";
import { FORM_STORAGE_KEY } from "@/constants/audit";
import { getLocalStorageObject } from "../useLocalStorage";


// Initialize form with either saved values or defaults
export const initializeForm = (auditId: string | undefined): FormValues => {
    if (!auditId) {
        const savedData = getLocalStorageObject(FORM_STORAGE_KEY);
        if (savedData) {
            return savedData
        }
    }
    return {
        step1: {
            name: '',
            website: '',
            contactName: '',
            contactEmail: '',
            telegram: '',
            ecosystem: '',
            blockchain: '',
            description: '',
        },
        step2: {
            codebase: '',
            gitLink: '',
            gitHash: '',
            gitBranch: '',
            codebaseZip: null,
            listOfSmartContracts: '',
            contractUpgradeable: '',
            contractUpgradeableDesc: '',
            deployed: '',
            deployedDesc: '',
            thirdParty: '',
        },
        step3: {
            whitepaper: '',
            whitepaperLink: '',
            whitepaperZip: null,
            techDocs: '',
            techDocsLink: '',
            techDocsZip: null,
            tokenomics: '',
            tokenomicsLink: '',
            tokenomicsZip: null,
            smartContract: '',
            smartContractLink: '',
            smartContractZip: null,
        },
        step4: {
            framework: '',
            test: '',
            testDesc: '',
            testnet: '',
            testnetLink: '',
            thread: '',
        }
    };
};