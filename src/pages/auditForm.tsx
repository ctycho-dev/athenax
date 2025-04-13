import React, { useState, useEffect, useRef } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { Toaster, toast } from 'sonner';
import { useForm } from '@mantine/form';

import { FormHeader } from '@/components/form/formHeader';
import { FormNavigation } from '@/components/form/formNavigation';
import { formValidationRules, getStepErrors } from '@/utils/audit/validateAuditForm';

import { Steps } from '@/components/form/steps';
import { Step1 } from '@/components/audit/step1';
import { Step2 } from '@/components/audit/step2';
import { Step3 } from '@/components/audit/step3';
import { Step4 } from '@/components/audit/step4';

import { AuditSteps } from "@/store/auditSteps";
import { StepsCompletion } from '@/types';
import { FormValues } from '@/types/audit';
import auditService from '@/api/auditService';

import { getLocalStorageObject } from '@/utils/useLocalStorage';
import { initializeStepsCompletion } from '@/utils/audit/initializeStepsCompletion';
import { initializeForm } from '@/utils/audit/initializeAuditForm';
import { FORM_STORAGE_KEY, STEPS_STORAGE_KEY, numberOfSteps } from '@/constants/audit';
import { usePageColorScheme } from '@/hooks/usePageTheme';

interface AuditFormProps { }

export const AuditForm: React.FC<AuditFormProps> = () => {
    usePageColorScheme('light');
    const [searchParams, setSearchParams] = useSearchParams();
    const navigate = useNavigate();
    const isFirstRender = useRef(true);
    const [stepsCompleted, setStepsCompleted] = useState<StepsCompletion>(initializeStepsCompletion);

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
        if (savedSteps) setStepsCompleted(savedSteps);
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


    // Update a parameter
    const updateParam = (step: string) => {
        const newParams = new URLSearchParams(searchParams);

        newParams.set('step', step);

        setSearchParams(newParams);
        setCurrentStep(+step)
    };

    useEffect(() => {
        localStorage.setItem(STEPS_STORAGE_KEY, JSON.stringify(stepsCompleted))
    }, [stepsCompleted])

    const renderStep = () => {
        switch (currentStep) {
            case 1: return <Step1 form={form} />;
            case 2: return <Step2 form={form} />;
            case 3: return <Step3 form={form} />;
            case 4: return <Step4 form={form} />;
            default: return null;
        }
    };

    const nextStep = async () => {
        const lastStep = currentStep === numberOfSteps[numberOfSteps.length - 1]
        const { hasErrors, errors } = getStepErrors(currentStep, form);
        if (hasErrors) {
            form.setErrors(errors);
            setStepsCompleted(prev => ({ ...prev, [currentStep]: false }));
            return
        }

        setStepsCompleted(prev => ({ ...prev, [currentStep]: true }));

        if (lastStep) {
            try {
                for (let i = 0; i < numberOfSteps.length; i++) {
                    const { hasErrors } = getStepErrors(numberOfSteps[i], form)
                    if (hasErrors) {
                        setStepsCompleted(prev => ({ ...prev, [currentStep]: false }));
                        toast.error("Not all required section fields are filled.")
                        return
                    }
                }
                const response = await auditService.addAuditForm(form.values);
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
            <main className="px-4">
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
                            <Steps
                                steps={AuditSteps}
                                currentStep={currentStep}
                                stepsCompleted={stepsCompleted}
                                updateParam={updateParam}
                            />
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