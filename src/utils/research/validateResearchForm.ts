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


export const getStepErrors = (currentStep: number, form: any) => {
  const errors: Record<string, string> = {};

  switch (currentStep) {
    case 1:
      if (form.validateField('step1.name').hasError) errors['step1.name'] = form.validateField('step1.name').error;
      if (form.validateField('step1.tagline').hasError) errors['step1.tagline'] = form.validateField('step1.tagline').error;
      if (form.validateField('step1.launchDate').hasError) errors['step1.launchDate'] = form.validateField('step1.launchDate').error;
      if (form.validateField('step1.contactEmail').hasError) errors['step1.contactEmail'] = form.validateField('step1.contactEmail').error;
      if (form.validateField('step1.primaryContactName').hasError) errors['step1.primaryContactName'] = form.validateField('step1.primaryContactName').error;
      if (form.validateField('step1.primaryContactRole').hasError) errors['step1.primaryContactRole'] = form.validateField('step1.primaryContactRole').error;
      break;

    case 2:
      if (form.validateField('step2.foundersAndCoreTeam').hasError) errors['step2.foundersAndCoreTeam'] = form.validateField('step2.foundersAndCoreTeam').error;
      if (form.validateField('step2.advisors').hasError) errors['step2.advisors'] = form.validateField('step2.advisors').error;
      if (form.validateField('step2.orgStructure').hasError) errors['step2.orgStructure'] = form.validateField('step2.orgStructure').error;
      if (form.validateField('step2.governance').hasError) errors['step2.governance'] = form.validateField('step2.governance').error;
      break;

    case 3:
      if (form.validateField('step3.productDesc').hasError) errors['step3.productDesc'] = form.validateField('step3.productDesc').error;
      if (form.validateField('step3.useCases').hasError) errors['step3.useCases'] = form.validateField('step3.useCases').error;
      if (form.validateField('step3.techArchitecture').hasError) errors['step3.techArchitecture'] = form.validateField('step3.techArchitecture').error;
      if (form.validateField('step3.integrations').hasError) errors['step3.integrations'] = form.validateField('step3.integrations').error;
      break;

    case 4:
      if (form.validateField('step4.tokenDetails').hasError) errors['step4.tokenDetails'] = form.validateField('step4.tokenDetails').error;
      if (form.validateField('step4.utilities').hasError) errors['step4.utilities'] = form.validateField('step4.utilities').error;
      if (form.validateField('step4.supply').hasError) errors['step4.supply'] = form.validateField('step4.supply').error;
      if (form.validateField('step4.distribution').hasError) errors['step4.distribution'] = form.validateField('step4.distribution').error;
      if (form.validateField('step4.emission').hasError) errors['step4.emission'] = form.validateField('step4.emission').error;
      break;

    case 5:
      if (form.validateField('step5.funding').hasError) errors['step5.funding'] = form.validateField('step5.funding').error;
      if (form.validateField('step5.revenue').hasError) errors['step5.revenue'] = form.validateField('step5.revenue').error;
      if (form.validateField('step5.treasury').hasError) errors['step5.treasury'] = form.validateField('step5.treasury').error;
      if (form.validateField('step5.runway').hasError) errors['step5.runway'] = form.validateField('step5.runway').error;
      break;

    case 6:
      if (form.validateField('step6.metrics').hasError) errors['step6.metrics'] = form.validateField('step6.metrics').error;
      if (form.validateField('step6.tvl').hasError) errors['step6.tvl'] = form.validateField('step6.tvl').error;
      if (form.validateField('step6.partnerships').hasError) errors['step6.partnerships'] = form.validateField('step6.partnerships').error;
      if (form.validateField('step6.community').hasError) errors['step6.community'] = form.validateField('step6.community').error;
      break;

    case 7:
      if (form.validateField('step7.legalEntity').hasError) errors['step7.legalEntity'] = form.validateField('step7.legalEntity').error;
      if (form.validateField('step7.compliance').hasError) errors['step7.compliance'] = form.validateField('step7.compliance').error;
      if (form.validateField('step7.audits').hasError) errors['step7.audits'] = form.validateField('step7.audits').error;
      break;

    case 8:
      if (form.validateField('step8.risks').hasError) errors['step8.risks'] = form.validateField('step8.risks').error;
      if (form.validateField('step8.strategies').hasError) errors['step8.strategies'] = form.validateField('step8.strategies').error;
      break;

    case 9:
      if (form.validateField('step9.mediaCoverage').hasError) errors['step9.mediaCoverage'] = form.validateField('step9.mediaCoverage').error;
      if (form.validateField('step9.communityContent').hasError) errors['step9.communityContent'] = form.validateField('step9.communityContent').error;
      if (form.validateField('step9.brand').hasError) errors['step9.brand'] = form.validateField('step9.brand').error;
      if (form.values.step9.brand === 'link' && form.validateField('step9.brandLink').hasError) {
        errors['step9.brandLink'] = form.validateField('step9.brandLink').error;
      }
      if (form.values.step9.brand === 'zip' && form.validateField('step9.brandZip').hasError) {
        errors['step9.brandZip'] = form.validateField('step9.brandZip').error;
      }
      break;

    case 10:
      if (form.validateField('step10.whitepaper').hasError) errors['step10.whitepaper'] = form.validateField('step10.whitepaper').error;
      if (form.values.step10.whitepaper === 'link' && form.validateField('step10.whitepaperLink').hasError) {
        errors['step10.whitepaperLink'] = form.validateField('step10.whitepaperLink').error;
      }
      if (form.values.step10.whitepaper === 'zip' && form.validateField('step10.whitepaperZip').hasError) {
        errors['step10.whitepaperZip'] = form.validateField('step10.whitepaperZip').error;
      }
      if (form.validateField('step10.faq').hasError) errors['step10.faq'] = form.validateField('step10.faq').error;
      if (form.values.step10.faq === 'link' && form.validateField('step10.faqLink').hasError) {
        errors['step10.faqLink'] = form.validateField('step10.faqLink').error;
      }
      if (form.values.step10.faq === 'zip' && form.validateField('step10.faqZip').hasError) {
        errors['step10.faqZip'] = form.validateField('step10.faqZip').error;
      }
      if (form.validateField('step10.materials').hasError) errors['step10.materials'] = form.validateField('step10.materials').error;
      if (form.values.step10.materials === 'link' && form.validateField('step10.materialsLink').hasError) {
        errors['step10.materialsLink'] = form.validateField('step10.materialsLink').error;
      }
      if (form.values.step10.materials === 'zip' && form.validateField('step10.materialsZip').hasError) {
        errors['step10.materialsZip'] = form.validateField('step10.materialsZip').error;
      }
      break;
  }

  return {
    hasErrors: Object.keys(errors).length > 0,
    errors
  };
};