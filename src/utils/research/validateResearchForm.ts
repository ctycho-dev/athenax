// utils/validateResearchForm.ts
import { FileType } from "@/types";

export const formValidationRules = {
  step1: {
    name: (value: string) => (value.trim().length === 0 ? 'Please make sure the field is correct' : null),
    tagline: (value: string) => (value.trim().length === 0 ? 'Please make sure the field is correct' : null),
    launchDate: (value: string) => (!value ? 'Please make sure the field is correct' : null),
    contactEmail: (value: string) => (!value.includes('@') ? 'Please make sure the field is correct' : null),
    primaryContactName: (value: string) => (value.trim().length === 0 ? 'Please make sure the field is correct' : null),
    primaryContactRole: (value: string) => (value.trim().length === 0 ? 'Please make sure the field is correct' : null),
  },
  step2: {
    foundersAndCoreTeam: (value: string) => (value.trim().length === 0 ? 'Please make sure the field is correct' : null),
    advisors: (value: string) => (value.trim().length === 0 ? 'Please make sure the field is correct' : null),
    orgStructure: (value: string) => (value.trim().length === 0 ? 'Please make sure the field is correct' : null),
    governance: (value: string) => (value.trim().length === 0 ? 'Please make sure the field is correct' : null),
  },
  step3: {
    productDesc: (value: string) => (value.trim().length === 0 ? 'Please make sure the field is correct' : null),
    useCases: (value: string) => (value.trim().length === 0 ? 'Please make sure the field is correct' : null),
    techArchitecture: (value: string) => (value.trim().length === 0 ? 'Please make sure the field is correct' : null),
    integrations: (value: string) => (value.trim().length === 0 ? 'Please make sure the field is correct' : null),
  },
  step4: {
    tokenDetails: (value: string) => (value.trim().length === 0 ? 'Please make sure the field is correct' : null),
    utilities: (value: string) => (value.trim().length === 0 ? 'Please make sure the field is correct' : null),
    supply: (value: string) => (value.trim().length === 0 ? 'Please make sure the field is correct' : null),
    distribution: (value: string) => (value.trim().length === 0 ? 'Please make sure the field is correct' : null),
    emission: (value: string) => (value.trim().length === 0 ? 'Please make sure the field is correct' : null),
  },
  step5: {
    funding: (value: string) => (value.trim().length === 0 ? 'Please make sure the field is correct' : null),
    revenue: (value: string) => (value.trim().length === 0 ? 'Please make sure the field is correct' : null),
    treasury: (value: string) => (value.trim().length === 0 ? 'Please make sure the field is correct' : null),
    runway: (value: string) => (value.trim().length === 0 ? 'Please make sure the field is correct' : null),
  },
  step6: {
    metrics: (value: string) => (value.trim().length === 0 ? 'Please make sure the field is correct' : null),
    tvl: (value: string) => (value.trim().length === 0 ? 'Please make sure the field is correct' : null),
    partnerships: (value: string) => (value.trim().length === 0 ? 'Please make sure the field is correct' : null),
    community: (value: string) => (value.trim().length === 0 ? 'Please make sure the field is correct' : null),
  },
  step7: {
    legalEntity: (value: string) => (value.trim().length === 0 ? 'Please make sure the field is correct' : null),
    compliance: (value: string) => (value.trim().length === 0 ? 'Please make sure the field is correct' : null),
    audits: (value: string) => (value.trim().length === 0 ? 'Please make sure the field is correct' : null),
  },
  step8: {
    risks: (value: string) => (value.trim().length === 0 ? 'Please make sure the field is correct' : null),
    strategies: (value: string) => (value.trim().length === 0 ? 'Please make sure the field is correct' : null),
  },
  step9: {
    mediaCoverage: (value: string) => (value.trim().length === 0 ? 'Please make sure the field is correct' : null),
    communityContent: (value: string) => (value.trim().length === 0 ? 'Please make sure the field is correct' : null),
    brand: (value: string) => (value.trim().length === 0 ? 'Please make sure the field is correct' : null),
    brandLink: (value: string) => (value.trim().length === 0 ? 'Please make sure the field is correct' : null),
    brandZip: (value: FileType | null) => (!value ? 'Please upload the file' : null),
  },
  step10: {
    whitepaper: (value: string) => (value.trim().length === 0 ? 'Please make sure the field is correct' : null),
    whitepaperLink: (value: string) => (value.trim().length === 0 ? 'Please make sure the field is correct' : null),
    whitepaperZip: (value: FileType | null) => (!value ? 'Please upload the file' : null),
    faq: (value: string) => (value.trim().length === 0 ? 'Please make sure the field is correct' : null),
    faqLink: (value: string) => (value.trim().length === 0 ? 'Please make sure the field is correct' : null),
    faqZip: (value: FileType | null) => (!value ? 'Please upload the file' : null),
    materials: (value: string) => (value.trim().length === 0 ? 'Please make sure the field is correct' : null),
    materialsLink: (value: string) => (value.trim().length === 0 ? 'Please make sure the field is correct' : null),
    materialsZip: (value: FileType | null) => (!value ? 'Please upload the file' : null),
  },
}



export const validateCurrentStep = (currentStep: number, form: any) => {
  switch (currentStep) {
    case 1:
      return (
        form.validateField('step1.name').hasError ||
        form.validateField('step1.tagline').hasError ||
        form.validateField('step1.launchDate').hasError ||
        form.validateField('step1.contactEmail').hasError ||
        form.validateField('step1.primaryContactName').hasError ||
        form.validateField('step1.primaryContactRole').hasError
      );
    case 2:
      return form.validateField('step2.foundersAndCoreTeam').hasError ||
        form.validateField('step2.advisors').hasError ||
        form.validateField('step2.orgStructure').hasError ||
        form.validateField('step2.governance').hasError
    case 3:
      return (
        form.validateField('step3.productDesc').hasError ||
        form.validateField('step3.useCases').hasError ||
        form.validateField('step3.techArchitecture').hasError ||
        form.validateField('step3.integrations').hasError
      );
    case 4:
      return (
        form.validateField('step4.tokenDetails').hasError ||
        form.validateField('step4.utilities').hasError ||
        form.validateField('step4.supply').hasError ||
        form.validateField('step4.distribution').hasError ||
        form.validateField('step4.emission').hasError
      );
    case 5:
      return (
        form.validateField('step5.funding').hasError ||
        form.validateField('step5.revenue').hasError ||
        form.validateField('step5.treasury').hasError ||
        form.validateField('step5.runway').hasError
      );
    case 6:
      return (
        form.validateField('step6.metrics').hasError ||
        form.validateField('step6.tvl').hasError ||
        form.validateField('step6.partnerships').hasError ||
        form.validateField('step6.community').hasError
      );
    case 7:
      return (
        form.validateField('step7.legalEntity').hasError ||
        form.validateField('step7.compliance').hasError ||
        form.validateField('step7.audits').hasError
      );
    case 8:
      return (
        form.validateField('step8.risks').hasError ||
        form.validateField('step8.strategies').hasError
      );
    case 9:
      console.log(form.values.step9)
      return (
        form.validateField('step9.mediaCoverage').hasError ||
        form.validateField('step9.communityContent').hasError ||
        form.validateField('step9.brand').hasError ||
        (form.values.step9.brand == 'link' && form.validateField('step9.brandLink').hasError) ||
        (form.values.step9.brand == 'zip' && form.validateField('step9.brandZip').hasError)
      );
    case 10:
      console.log(form.values.step10)
      return (
        form.validateField('step10.whitepaper').hasError ||
        (form.values.step10.whitepaper == 'link' && form.validateField('step10.whitepaperLink').hasError) ||
        (form.values.step10.whitepaper == 'zip' && form.validateField('step10.whitepaperZip').hasError) ||
        form.validateField('step10.faq').hasError ||
        (form.values.step10.faq == 'link' && form.validateField('step10.faqLink').hasError) ||
        (form.values.step10.faq == 'zip' && form.validateField('step10.faqZip').hasError) ||
        form.validateField('step10.materials').hasError ||
        (form.values.step10.materials == 'link' && form.validateField('step10.materialsLink').hasError) ||
        (form.values.step10.materials == 'zip' && form.validateField('step10.materialsZip').hasError)
      );
    default:
      return false;
  }
};