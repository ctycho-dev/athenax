import React, { useState, useEffect, useRef } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { Link } from "react-router-dom";
import { Toaster, toast } from 'sonner';
import { useForm } from '@mantine/form';
// import { Dropzone, DropzoneProps, IMAGE_MIME_TYPE } from '@mantine/dropzone';
import {
    Radio,
    Group,
    Stepper,
    Input,
    InputWrapper,
    Textarea
} from '@mantine/core';

import { Steps } from '@/components/audit/steps';
import { Step1 } from '@/components/audit/step1';
import { Step2 } from '@/components/audit/step2';
import { Step3 } from '@/components/audit/step3';
import { Step4 } from '@/components/audit/step4';

import arrowLeft from '@/assets/audit/arrow-left.svg'
import radioCheck from '@/assets/audit/radio-icon.svg'
import { FormValues } from '@/types';


const FORM_STORAGE_KEY = 'multiStepFormData';


interface AuditFormProps { }


export const AuditForm: React.FC<AuditFormProps> = ({ }) => {
    const [searchParams, setSearchParams] = useSearchParams(); // Access search params
    const navigate = useNavigate();
    const isFirstRender = useRef(true);

    const form = useForm<FormValues>({
        initialValues: {
            one: {
                name: '',
                website: '',
                contactName: '',
                contactEmail: '',
                telegram: '',
                ecosystem: '',
                blockchain: '',
                description: '',
            },
            two: {
                codebase: '',
                gitLink: '',
                gitHash: '',
                gitBranch: '',
                codebaseZip: '',
                listOfSmartContracts: '',
                contractUpgradeable: '',
                contractUpgradeableDesc: '',
                deployed: '',
                deployedDesc: '',
                thirdParty: '',
            },
            three: {
                whitepaper: '',
                whitepaperLink: '',
                whitepaperZip: '',
                techDocs: '',
                techDocsLink: '',
                techDocsZip: '',
                tokenomics: '',
                tokenomicsLink: '',
                tokenomicsZip: '',
                smartContract: '',
                smartContractLink: '',
                smartContractZip: '',
            },
            four: {
                framework: '',
                test: '',
                testDesc: '',
                testnet: '',
                testnetLink: '',
                thread: '',
            }
        },

        validate: {
            one: {
                name: (value) => (value.trim().length === 0 ? 'Required' : null),
                website: (value) => (value.trim().length === 0 ? 'Required' : null),
                contactName: (value) =>  (value.trim().length === 0 ? 'Required' : null),
                contactEmail: (value) =>  (!value.includes('@') ? 'Required' : null),
                ecosystem: (value) =>  (value.trim().length === 0 ? 'Required' : null),
                blockchain: (value) =>  (value.trim().length === 0 ? 'Required' : null),
                description: (value) =>  (value.trim().length === 0 ? 'Required' : null)
            },
            two: {
                codebase: (value) =>  (value.trim().length === 0 ? 'Required' : null),
                gitLink: (value) =>  (value.trim().length === 0 ? 'Required' : null),
                gitHash: (value) =>  (value.trim().length === 0 ? 'Required' : null),
                gitBranch: (value) =>  (value.trim().length === 0 ? 'Required' : null),
                listOfSmartContracts: (value) =>  (!value || value.trim().length === 0 ? 'Required' : null),
                contractUpgradeable: (value) =>  (value.trim().length === 0 ? 'Required' : null),
                contractUpgradeableDesc: (value) =>  (value.trim().length === 0 ? 'Required' : null),
                deployed: (value) =>  (value.trim().length === 0 ? 'Required' : null),
                deployedDesc: (value) =>  (value.trim().length === 0 ? 'Required' : null),
                thirdParty: (value) =>  (!value || value.trim().length === 0 ? 'Required' : null),

            },
            three: {
                whitepaper: (value) => (value.trim().length === 0 ? 'Required' : null),
                whitepaperLink: (value) => (value.trim().length === 0 ? 'Required' : null),
                whitepaperZip: (value) => (value.trim().length === 0 ? 'Required' : null),
                techDocs: (value) => (value.trim().length === 0 ? 'Required' : null),
                techDocsLink: (value) => (value.trim().length === 0 ? 'Required' : null),
                techDocsZip: (value) => (value.trim().length === 0 ? 'Required' : null),
                tokenomics: (value) => (value.trim().length === 0 ? 'Required' : null),
                tokenomicsLink: (value) => (value.trim().length === 0 ? 'Required' : null),
                tokenomicsZip: (value) => (value.trim().length === 0 ? 'Required' : null),
                smartContract: (value) => (value.trim().length === 0 ? 'Required' : null),
                smartContractLink: (value) => (value.trim().length === 0 ? 'Required' : null),
                smartContractZip: (value) => (value.trim().length === 0 ? 'Required' : null),
            },
            four: {
                framework: (value) => (value.trim().length === 0 ? 'Required' : null),
            },
        },

        // // Alternative validation approach if you need step-specific validation
        // validateInputOnBlur: true,
    });

    // Extract step from search params, default to 1 if not present
    const [currentStep, setCurrentStep] = useState(() => {
        let stepParam = searchParams.get('step') || '1';
        if (!['1', '2', '3', '4'].includes(stepParam)) return 1
        return parseInt(stepParam || '1', 10);
    });

    useEffect(() => {
        const savedData = localStorage.getItem(FORM_STORAGE_KEY);
        if (savedData) {
            try {
                const parsedData = JSON.parse(savedData);
                form.setValues(parsedData);
            } catch (e) {
                localStorage.removeItem(FORM_STORAGE_KEY)
                console.error('Failed to parse saved form data', e);

            }
        }
    }, []);

    useEffect(() => {
        if (isFirstRender.current) {
            isFirstRender.current = false;
            return;
        }
        localStorage.setItem(FORM_STORAGE_KEY, JSON.stringify(form.values));
    }, [form.values]);

    useEffect(() => {
        setSearchParams({ step: currentStep.toString() });
    }, [currentStep, setSearchParams]);

    const renderStep = () => {
        switch (currentStep) {
            case 1:
                return <Step1 form={form} />;
            case 2:
                return <Step2 form={form} />;
            case 3:
                return <Step3 form={form} />;
            case 4:
                return <Step4 form={form} />;
            default:
                return null;
        }
    };

    const validateCurrentStep = () => {
        if (currentStep === 1) {
            return (
                form.validateField('one.name').hasError ||
                form.validateField('one.website').hasError ||
                form.validateField('one.contactName').hasError ||
                form.validateField('one.contactEmail').hasError ||
                form.validateField('one.ecosystem').hasError ||
                form.validateField('one.blockchain').hasError ||
                form.validateField('one.description').hasError
            )
        }
        if (currentStep === 2) {
            return form.validateField('two.codebase').hasError ||
                (form.values.two.codebase == 'github' && (form.validateField('two.gitLink').hasError || form.validateField('two.gitHash').hasError || form.validateField('two.gitBranch').hasError)) || 
                form.validateField('two.listOfSmartContracts').hasError ||
                form.validateField('two.contractUpgradeable').hasError ||
                (form.values.two.contractUpgradeable == 'yes' && form.validateField('two.contractUpgradeableDesc').hasError) ||
                form.validateField('two.deployed').hasError ||
                (form.values.two.deployed == 'yes' && form.validateField('two.deployedDesc').hasError) ||
                form.validateField('two.thirdParty').hasError
        }
        if (currentStep === 3) {
            // if (form.validateField('three.whitepaper').hasError) {
            //     toast.warning('white')
            // }
            return (
                form.validateField('three.whitepaper').hasError ||
                form.validateField('three.techDocs').hasError ||
                form.validateField('three.tokenomics').hasError ||
                form.validateField('three.smartContract').hasError
            )
        }
        if (currentStep === 3) {
            return form.validateField('four.termsAccepted').hasError;
        }
        return false;
    };

    // Handle next step
    const nextStep = () => {
        if (validateCurrentStep()) {
            toast.error('Please fill up all the fileds.')
            return;
        }
        const newStep = currentStep + 1;
        setCurrentStep(newStep);
    };

    // Handle previous step
    const prevStep = () => {
        const newStep = currentStep - 1;
        setCurrentStep(newStep);
    };

    // const nextStep = () => {
    //     const { hasErrors } = form.validate();
    //     if (hasErrors) return;

    //     setActive((current) => (current < 4 ? current + 1 : current));
    // };

    // const prevStep = () => setActive((current) => (current > 0 ? current - 1 : current));

    // const handleSubmit = () => {
    //     setLoading(true);
    //     // Simulate API call
    //     setTimeout(() => {
    //         setLoading(false);
    //         showNotification({
    //             title: 'Success!',
    //             message: 'Your form has been submitted',
    //             color: 'green',
    //             icon: <IconCheck />,
    //         });
    //         // Clear localStorage after submission
    //         localStorage.removeItem('multiStepFormData');
    //         setActive(4); // Show completion step
    //     }, 1500);
    // };


    return (
        <>
            <main className="bg-gray-1 min-h-screen px-4 pt-[48px] text-white">
                <div className="max-w-5xl m-auto">
                    <div className="mb-12">
                        <Link to={'/audit'} className="group flex gap-x-2 items-center">
                            <img src={arrowLeft} alt="" className="group-hover:stroke-[#fff]" />
                            <span className="text-sm font-normal">Exit Editing</span>
                        </Link>
                    </div>
                    <div className="mb-12">
                        <h2 className="text-[22px] font-semibold mb-4">Add Your Project Info</h2>
                        <div className="text-gray-3" style={{ lineHeight: '28px' }}>This form will automatically save all the info that you’ve entered.<br />
                            The process will take approximately 10-15 minutes</div>
                    </div>
                    <div className="flex h-full">
                        <div className="pr-16 text-gray-3">
                            <div className="text-xs font-normal mb-2">content</div>
                            <Steps currentStep={currentStep} />
                        </div>
                        <div className='flex-1'>
                            <div className="pl-16 border-l-[1px] border-gray-2 ">
                                {renderStep()}
                            </div>
                            <div className='my-14'>
                                <div className='flex justify-center items-center gap-x-12'>
                                    {currentStep > 1 && (
                                        <button onClick={prevStep} className='font-semibold text-base hover:cursor-pointer'>Previous Screen</button>
                                    )}
                                    <button onClick={nextStep} className='font-semibold text-base bg-light-blue-3 hover:bg-light-blue-2 py-2.5 px-16 rounded-[8px] hover:cursor-pointer'>Continue</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
            <Toaster richColors position="top-right" />
        </>
    )
} 