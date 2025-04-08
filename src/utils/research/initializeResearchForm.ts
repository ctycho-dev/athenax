
import { FormValues } from "@/types/research";
import { FORM_STORAGE_KEY } from "@/constants/research";
import { getLocalStorageObject } from "../useLocalStorage";

// Initialize form with either saved values or defaults
export const initializeForm = (): FormValues => {
    const savedData = getLocalStorageObject(FORM_STORAGE_KEY);
    if (savedData) {
        if (savedData.step1 && savedData.step1.launchDate) {
            savedData.step1.launchDate = new Date(savedData.step1.launchDate)
        }
        return savedData
    }
    return {
        step1: {
            name: '',
            tagline: '',
            launchDate: '',
            contactEmail: '',
            primaryContactName: '',
            primaryContactRole: '',
            twitter: '',
            discord: '',
            telegram: '',
            github: '',
        },
        step2: {
            foundersAndCoreTeam: '',
            advisors: '',
            orgStructure: '',
            governance: '',
        },
        step3: {
            productDesc: '',
            useCases: '',
            techArchitecture: '',
            integrations: '',
        },
        step4: {
            tokenDetails: '',
            utilities: '',
            supply: '',
            distribution: '',
            emission: '',
        },
        step5: {
            funding: '',
            revenue: '',
            treasury: '',
            runway: '',
        },
        step6: {
            metrics: '',
            tvl: '',
            partnerships: '',
            community: '',
        },
        step7: {
            legalEntity: '',
            compliance: '',
            audits: '',
        },
        step8: {
            risks: '',
            strategies: '',
        },
        step9: {
            mediaCoverage: '',
            communityContent: '',
            brand: '',
            brandLink: '',
            brandZip: null,
        },
        step10: {
            whitepaper: '',
            whitepaperLink: '',
            whitepaperZip: null,
            faq: '',
            faqLink: '',
            faqZip: null,
            materials: '',
            materialsLink: '',
            materialsZip: null,
        }
    };
};