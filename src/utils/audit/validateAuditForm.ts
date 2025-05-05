// utils/validateResearchForm.ts
import { FileType } from "@/types";

export const formValidationRules = {
  step1: {
    name: (value: string) => (value.trim().length === 0 ? 'Please make sure the field is correct' : null),
    website: (value: string) => (value.trim().length === 0 ? 'Please make sure the field is correct' : null),
    contactName: (value: string) => (value.trim().length === 0 ? 'Please make sure the field is correct' : null),
    contactEmail: (value: string) => (!value.includes('@') ? 'Please make sure the field is correct' : null),
    ecosystem: (value: string) => (value.trim().length === 0 ? 'Please make sure the field is correct' : null),
    blockchain: (value: string) => (value.trim().length === 0 ? 'Please make sure the field is correct' : null),
    description: (value: string) => (value.trim().length === 0 ? 'Please make sure the field is correct' : null)
  },
  step2: {
    codebase: (value: string) => (value.trim().length === 0 ? 'Please make sure the field is correct' : null),
    gitLink: (value: string) => (value.trim().length === 0 ? 'Please make sure the field is correct' : null),
    gitHash: (value: string) => (value.trim().length === 0 ? 'Please make sure the field is correct' : null),
    gitBranch: (value: string) => (value.trim().length === 0 ? 'Please make sure the field is correct' : null),
    codebaseZip: (value: FileType | null) => (!value ? 'Please upload the file' : null),
    listOfSmartContracts: (value: string) => (!value || value.trim().length === 0 ? 'Please make sure the field is correct' : null),
    contractUpgradeable: (value: string) => (value.trim().length === 0 ? 'Please make sure the field is correct' : null),
    contractUpgradeableDesc: (value: string) => (value.trim().length === 0 ? 'Please make sure the field is correct' : null),
    deployed: (value: string) => (value.trim().length === 0 ? 'Please make sure the field is correct' : null),
    deployedDesc: (value: string) => (value.trim().length === 0 ? 'Please make sure the field is correct' : null),
    thirdParty: (value: string) => (!value || value.trim().length === 0 ? 'Please make sure the field is correct' : null),

  },
  step3: {
    whitepaper: (value: string) => (value.trim().length === 0 ? 'Please make sure the field is correct' : null),
    whitepaperLink: (value: string) => (value.trim().length === 0 ? 'Please make sure the field is correct' : null),
    whitepaperZip: (value: FileType | null) => (!value ? 'Please upload the file' : null),
    techDocs: (value: string) => (value.trim().length === 0 ? 'Please make sure the field is correct' : null),
    techDocsLink: (value: string) => (value.trim().length === 0 ? 'Please make sure the field is correct' : null),
    techDocsZip: (value: FileType | null) => (!value ? 'Please upload the file' : null),
    tokenomics: (value: string) => (value.trim().length === 0 ? 'Please make sure the field is correct' : null),
    tokenomicsLink: (value: string) => (value.trim().length === 0 ? 'Please make sure the field is correct' : null),
    tokenomicsZip: (value: FileType | null) => (!value ? 'Please upload the file' : null),
    smartContract: (value: string) => (value.trim().length === 0 ? 'Please make sure the field is correct' : null),
    smartContractLink: (value: string) => (value.trim().length === 0 ? 'Please make sure the field is correct' : null),
    smartContractZip: (value: FileType | null) => (!value ? 'Please upload the file' : null),
  },
  step4: {
    framework: (value: string) => (value.trim().length === 0 ? 'Please make sure the field is correct' : null),
    test: (value: string) => (value.trim().length === 0 ? 'Please make sure the field is correct' : null),
    testDesc: (value: string) => (value.trim().length === 0 ? 'Please make sure the field is correct' : null),
    testnet: (value: string) => (value.trim().length === 0 ? 'Please make sure the field is correct' : null),
    testnetLink: (value: string) => (value.trim().length === 0 ? 'Please make sure the field is correct' : null),
    thread: (value: string) => (value.trim().length === 0 ? 'Please make sure the field is correct' : null),
  },
}


export const getStepErrors = (currentStep: number, form: any) => {
  const errors: Record<string, string> = {};

  switch (currentStep) {
    case 1:
      if (form.validateField('step1.name').hasError) errors['step1.name'] = form.validateField('step1.name').error;
      if (form.validateField('step1.website').hasError) errors['step1.website'] = form.validateField('step1.website').error;
      if (form.validateField('step1.contactName').hasError) errors['step1.contactName'] = form.validateField('step1.contactName').error;
      if (form.validateField('step1.contactEmail').hasError) errors['step1.contactEmail'] = form.validateField('step1.contactEmail').error;
      if (form.validateField('step1.ecosystem').hasError) errors['step1.ecosystem'] = form.validateField('step1.ecosystem').error;
      if (form.validateField('step1.blockchain').hasError) errors['step1.blockchain'] = form.validateField('step1.blockchain').error;
      if (form.validateField('step1.description').hasError) errors['step1.description'] = form.validateField('step1.description').error;
      break;
      
    case 2:
      if (form.validateField('step2.codebase').hasError) errors['step2.codebase'] = form.validateField('step2.codebase').error;
      
      if (form.values.step2.codebase === 'github') {
        if (form.validateField('step2.gitLink').hasError) errors['step2.gitLink'] = form.validateField('step2.gitLink').error;
        if (form.validateField('step2.gitHash').hasError) errors['step2.gitHash'] = form.validateField('step2.gitHash').error;
        if (form.validateField('step2.gitBranch').hasError) errors['step2.gitBranch'] = form.validateField('step2.gitBranch').error;
      } else if (form.values.step2.codebase === 'zip') {
        if (form.validateField('step2.codebaseZip').hasError) errors['step2.codebaseZip'] = form.validateField('step2.codebaseZip').error;
      }
      
      if (form.validateField('step2.listOfSmartContracts').hasError) errors['step2.listOfSmartContracts'] = form.validateField('step2.listOfSmartContracts').error;
      if (form.validateField('step2.contractUpgradeable').hasError) errors['step2.contractUpgradeable'] = form.validateField('step2.contractUpgradeable').error;
      
      if (form.values.step2.contractUpgradeable === 'yes' && form.validateField('step2.contractUpgradeableDesc').hasError) {
        errors['step2.contractUpgradeableDesc'] = form.validateField('step2.contractUpgradeableDesc').error;
      }
      
      if (form.validateField('step2.deployed').hasError) errors['step2.deployed'] = form.validateField('step2.deployed').error;
      
      if (form.values.step2.deployed === 'yes' && form.validateField('step2.deployedDesc').hasError) {
        errors['step2.deployedDesc'] = form.validateField('step2.deployedDesc').error;
      }
      
      if (form.validateField('step2.thirdParty').hasError) errors['step2.thirdParty'] = form.validateField('step2.thirdParty').error;
      break;
      
    case 3:
      if (form.validateField('step3.whitepaper').hasError) errors['step3.whitepaper'] = form.validateField('step3.whitepaper').error;
      
      if (form.values.step3.whitepaper === 'link' && form.validateField('step3.whitepaperLink').hasError) {
        errors['step3.whitepaperLink'] = form.validateField('step3.whitepaperLink').error;
      } else if (form.values.step3.whitepaper === 'zip' && form.validateField('step3.whitepaperZip').hasError) {
        errors['step3.whitepaperZip'] = form.validateField('step3.whitepaperZip').error;
      }
      
      if (form.validateField('step3.techDocs').hasError) errors['step3.techDocs'] = form.validateField('step3.techDocs').error;
      
      if (form.values.step3.techDocs === 'link' && form.validateField('step3.techDocsLink').hasError) {
        errors['step3.techDocsLink'] = form.validateField('step3.techDocsLink').error;
      } else if (form.values.step3.techDocs === 'zip' && form.validateField('step3.techDocsZip').hasError) {
        errors['step3.techDocsZip'] = form.validateField('step3.techDocsZip').error;
      }
      
      if (form.validateField('step3.tokenomics').hasError) errors['step3.tokenomics'] = form.validateField('step3.tokenomics').error;
      
      if (form.values.step3.tokenomics === 'link' && form.validateField('step3.tokenomicsLink').hasError) {
        errors['step3.tokenomicsLink'] = form.validateField('step3.tokenomicsLink').error;
      } else if (form.values.step3.tokenomics === 'zip' && form.validateField('step3.tokenomicsZip').hasError) {
        errors['step3.tokenomicsZip'] = form.validateField('step3.tokenomicsZip').error;
      }
      
      if (form.validateField('step3.smartContract').hasError) errors['step3.smartContract'] = form.validateField('step3.smartContract').error;
      
      if (form.values.step3.smartContract === 'link' && form.validateField('step3.smartContractLink').hasError) {
        errors['step3.smartContractLink'] = form.validateField('step3.smartContractLink').error;
      } else if (form.values.step3.smartContract === 'zip' && form.validateField('step3.smartContractZip').hasError) {
        errors['step3.smartContractZip'] = form.validateField('step3.smartContractZip').error;
      }
      break;
      
    case 4:
      if (form.validateField('step4.framework').hasError) errors['step4.framework'] = form.validateField('step4.framework').error;
      if (form.validateField('step4.test').hasError) errors['step4.test'] = form.validateField('step4.test').error;
      
      if (form.values.step4.test === 'yes' && form.validateField('step4.testDesc').hasError) {
        errors['step4.testDesc'] = form.validateField('step4.testDesc').error;
      }
      
      if (form.validateField('step4.testnet').hasError) errors['step4.testnet'] = form.validateField('step4.testnet').error;
      
      if (form.values.step4.testnet === 'yes' && form.validateField('step4.testnetLink').hasError) {
        errors['step4.testnetLink'] = form.validateField('step4.testnetLink').error;
      }
      
      if (form.validateField('step4.thread').hasError) errors['step4.thread'] = form.validateField('step4.thread').error;
      break;
  }

  return {
    hasErrors: Object.keys(errors).length > 0,
    errors
  };
};