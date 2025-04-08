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



export const validateCurrentStep = (currentStep: number, form: any) => {
  switch (currentStep) {
    case 1:
      return (
        form.validateField('step1.name').hasError ||
        form.validateField('step1.website').hasError ||
        form.validateField('step1.contactName').hasError ||
        form.validateField('step1.contactEmail').hasError ||
        form.validateField('step1.ecosystem').hasError ||
        form.validateField('step1.blockchain').hasError ||
        form.validateField('step1.description').hasError
      );
    case 2:
      return form.validateField('step2.codebase').hasError ||
        (form.values.step2.codebase == 'github' && (form.validateField('step2.gitLink').hasError ||
          form.validateField('step2.gitHash').hasError || form.validateField('step2.gitBranch').hasError)) ||
        (form.values.step2.codebase == 'zip' && form.validateField('step2.codebaseZip').hasError) ||
        form.validateField('step2.listOfSmartContracts').hasError ||
        form.validateField('step2.contractUpgradeable').hasError ||
        (form.values.step2.contractUpgradeable == 'yes' && form.validateField('step2.contractUpgradeableDesc').hasError) ||
        form.validateField('step2.deployed').hasError ||
        (form.values.step2.deployed == 'yes' && form.validateField('step2.deployedDesc').hasError) ||
        form.validateField('step2.thirdParty').hasError;
    case 3:
      return (
        form.validateField('step3.whitepaper').hasError ||
        (form.values.step3.whitepaper == 'link' && form.validateField('step3.whitepaperLink').hasError) ||
        (form.values.step3.whitepaper == 'zip' && form.validateField('step3.whitepaperZip').hasError) ||
        form.validateField('step3.techDocs').hasError ||
        (form.values.step3.techDocs == 'link' && form.validateField('step3.techDocsLink').hasError) ||
        (form.values.step3.techDocs == 'zip' && form.validateField('step3.techDocsZip').hasError) ||
        form.validateField('step3.tokenomics').hasError ||
        (form.values.step3.tokenomics == 'link' && form.validateField('step3.tokenomicsLink').hasError) ||
        (form.values.step3.tokenomics == 'zip' && form.validateField('step3.tokenomicsZip').hasError) ||
        form.validateField('step3.smartContract').hasError ||
        (form.values.step3.smartContract == 'link' && form.validateField('step3.smartContractLink').hasError) ||
        (form.values.step3.smartContract == 'zip' && form.validateField('step3.smartContractZip').hasError)
      );
    case 4:
      return form.validateField('step4.framework').hasError ||
        form.validateField('step4.test').hasError ||
        (form.values.step4.test == 'yes' && form.validateField('step4.testDesc').hasError) ||
        form.validateField('step4.testnet').hasError ||
        (form.values.step4.testnet == 'yes' && form.validateField('step4.testnetLink').hasError) ||
        form.validateField('step4.thread').hasError
    default:
      return false;
  }
};