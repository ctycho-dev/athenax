import React, { useState, useEffect, useRef } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { Toaster, toast } from 'sonner';
import { useForm } from '@mantine/form';

import { FormHeader } from '@/components/form/formHeader';
import { FormNavigation } from '@/components/form/formNavigation';

import { Steps } from '@/components/form/steps';
import { Step1 } from '@/components/research/step1';
import { Step2 } from '@/components/research/step2';
import { Step3 } from '@/components/research/step3';
import { Step4 } from '@/components/research/step4';
import { Step5 } from '@/components/research/step5';
import { Step6 } from '@/components/research/step6';
import { Step7 } from '@/components/research/step7';
import { Step8 } from '@/components/research/step8';
import { Step9 } from '@/components/research/step9';
import { Step10 } from '@/components/research/step10';

import { ResearchSteps } from "@/store/researchSteps";
import { FormValues, StepsCompletionResearch } from '@/types/research';
import { validateCurrentStep, formValidationRules } from '@/utils/research/validateResearchForm';
import { initializeStepsCompletion } from '@/utils/research/initializeStepsCompletion';
import researchService from '@/api/researchService';

import { initializeForm } from '@/utils/research/initializeResearchForm';
import { getLocalStorageObject } from '@/utils/useLocalStorage';
import { FORM_STORAGE_KEY, STEPS_STORAGE_KEY, numberOfSteps } from '@/constants/research';


interface ResearchFormProps { }

export const ResearchForm: React.FC<ResearchFormProps> = () => {
    const [searchParams, setSearchParams] = useSearchParams();
    const navigate = useNavigate();
    const isFirstRender = useRef(true);
    const [stepsCompleted, setStepsCompleted] = useState<StepsCompletionResearch>(initializeStepsCompletion);


    const form = useForm<FormValues>({
        initialValues: initializeForm(),
        validate: formValidationRules
    });

    // Initialize step from URL or default to 1
    const [currentStep, setCurrentStep] = useState(() => {
        const stepParam = searchParams.get('step') || '1';
        return numberOfSteps.includes(+stepParam) ? parseInt(stepParam, 10) : 1;
    });

    // Load saved steps completion status
    useEffect(() => {
        const savedSteps = getLocalStorageObject(STEPS_STORAGE_KEY);
        if (savedSteps) {
            setStepsCompleted(savedSteps);
        }
    }, []);

    // Save form values when they change
    useEffect(() => {
        if (isFirstRender.current) {
            isFirstRender.current = false;
            return;
        }
        localStorage.setItem(FORM_STORAGE_KEY, JSON.stringify(form.values));
    }, [form.values]);

    // Update URL when step changes
    useEffect(() => {
        setSearchParams({ step: currentStep.toString() });
    }, [currentStep, setSearchParams]);

    useEffect(() => {
        localStorage.setItem(STEPS_STORAGE_KEY, JSON.stringify(stepsCompleted))
    }, [stepsCompleted])

    const renderStep = () => {
        switch (currentStep) {
            case 1: return <Step1 form={form} />;
            case 2: return <Step2 form={form} />;
            case 3: return <Step3 form={form} />;
            case 4: return <Step4 form={form} />;
            case 5: return <Step5 form={form} />;
            case 6: return <Step6 form={form} />;
            case 7: return <Step7 form={form} />;
            case 8: return <Step8 form={form} />;
            case 9: return <Step9 form={form} />;
            case 10: return <Step10 form={form} />;
            default: return null;
        }
    };

    const nextStep = async () => {
        if (validateCurrentStep(currentStep, form)) {
            toast.error('Please fill up all the fields.')
            setStepsCompleted(prev => ({ ...prev, [currentStep]: false }));
            return;
        }

        setStepsCompleted(prev => ({ ...prev, [currentStep]: true }));

        if (currentStep === numberOfSteps[numberOfSteps.length - 1]) {
            try {
                const response = await researchService.addResearchForm(form.values);
                if (response.status === 200) {
                    localStorage.removeItem(FORM_STORAGE_KEY);
                    localStorage.removeItem(STEPS_STORAGE_KEY);
                    navigate('/submited');
                } else {
                    toast.error('Something went wrong, try again in a few minutes.');
                }
            } catch (error) {
                toast.error('Failed to submit form. Please try again.');
                console.error('Submission error:', error);
            }
        } else {
            setCurrentStep(currentStep + 1);
        }
    };

    const prevStep = () => {
        setCurrentStep(prev => Math.max(1, prev - 1));
    };

    return (
        <>
            <main className="bg-gray-1 min-h-screen px-4 pt-[48px] text-white">
                <div className="max-w-5xl m-auto">
                    <FormHeader
                        title="Add Your Project Info"
                        description={
                            <>
                                This form will automatically save all the info that you've entered.<br />
                                The process will take approximately 10-15 minutes
                            </>
                        }
                    />
                    <div className="flex h-full">
                        <div className="pr-16 text-gray-3">
                            <div className="text-xs font-normal mb-2">content</div>
                            <Steps steps={ResearchSteps} currentStep={currentStep} stepsCompleted={stepsCompleted} />
                        </div>

                        <div className='relative flex-1'>
                            <div className="pl-16 border-l-[1px] border-gray-2">
                                {renderStep()}
                            </div>

                            <FormNavigation
                                currentStep={currentStep}
                                onPrev={prevStep}
                                onNext={nextStep}
                                stepsCompleted={stepsCompleted}
                            />
                        </div>
                    </div>
                </div>
            </main>
            <Toaster richColors position="top-right" />
        </>
    );
};