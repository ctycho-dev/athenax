import React, { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import { useSearchParams, useNavigate, useParams } from 'react-router-dom';
import { Toaster, toast } from 'sonner';
import { useForm } from '@mantine/form';
import { RootState } from "@/store/store";
import { useSelector } from 'react-redux';

import { FormHeader } from '@/components/form/formHeader';
import { FormNavigation } from '@/components/form/formNavigation';

import { Steps } from '@/components/form/steps';
import { Step1 } from '@/views/submit/research/components/step1';
import { Step2 } from '@/views/submit/research/components/step2';
import { Step3 } from '@/views/submit/research/components/step3';
import { Step4 } from '@/views/submit/research/components/step4';
import { Step5 } from '@/views/submit/research/components/step5';
import { Step6 } from '@/views/submit/research/components/step6';
import { Step7 } from '@/views/submit/research/components/step7';
import { Step8 } from '@/views/submit/research/components/step8';
import { Step9 } from '@/views/submit/research/components/step9';
import { Step10 } from '@/views/submit/research/components/step10';

import { ResearchSteps } from "@/data/researchSteps";
import { FormValues, StepsCompletionResearch } from '@/types/research';
import { getStepErrors, formValidationRules } from '@/utils/research/validateResearchForm';
import { initializeStepsCompletion } from '@/utils/research/initializeStepsCompletion';
import {
    useAddResearchFormMutation,
    useGetResearchQuery,
    useUpdateResearchMutation
} from '@/services/researchApi';

import { initializeForm } from '@/utils/research/initializeResearchForm';
import { getLocalStorageObject } from '@/utils/useLocalStorage';
import { FORM_STORAGE_KEY, STEPS_STORAGE_KEY, numberOfSteps } from '@/constants/research';
import { usePageColorScheme } from '@/hooks/usePageTheme';


interface ResearchFormProps { }

export const ResearchForm: React.FC<ResearchFormProps> = () => {
    usePageColorScheme('light')
    const { id: recordId } = useParams();
    const privyToken = useSelector((state: RootState) => state.auth.privyToken);
    const [searchParams, setSearchParams] = useSearchParams();
    const navigate = useNavigate();
    const isFirstRender = useRef(true);
    const [stepsCompleted, setStepsCompleted] = useState<StepsCompletionResearch>(initializeStepsCompletion);

    // Initialize step from URL or default to 1
    const [currentStep, setCurrentStep] = useState(() => {
        const stepParam = searchParams.get('step') || '1';
        return numberOfSteps.includes(+stepParam) ? parseInt(stepParam, 10) : 1;
    });

    // Form state
    const form = useForm<FormValues>({
        initialValues: initializeForm(recordId),
        validate: formValidationRules
    });

    // API hooks
    const [addResearchForm] = useAddResearchFormMutation();
    const [updateRecord, { isLoading: isUpdating }] = useUpdateResearchMutation();
    const { data: record, isLoading: isAuditLoading } = useGetResearchQuery(recordId || '', {
        skip: !privyToken || !recordId
    });

    // Memoized values
    const isLastStep = useMemo(() => currentStep === numberOfSteps[numberOfSteps.length - 1], [currentStep]);

    useEffect(() => {
        if (record) {
            const editableSteps = JSON.parse(JSON.stringify(record.steps));
            if (record.steps.step1.launchDate) {
                editableSteps.step1.launchDate = new Date(record.steps.step1.launchDate)
            }
            form.setValues(editableSteps);
        }
    }, [record])


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
        if (!recordId) {
            localStorage.setItem(FORM_STORAGE_KEY, JSON.stringify(form.values));
        }
    }, [form.values]);

    // Update URL when step changes
    useEffect(() => {
        setSearchParams({ step: currentStep.toString() });
    }, [currentStep, setSearchParams]);


    // Update a parameter
    const updateParam = useCallback((step: string) => {
        setSearchParams({ step });
        setCurrentStep(+step);
    }, [setSearchParams]);


    useEffect(() => {
        if (!recordId) {
            localStorage.setItem(STEPS_STORAGE_KEY, JSON.stringify(stepsCompleted))
        }
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
        const { hasErrors, errors } = getStepErrors(currentStep, form);
        if (hasErrors) {
            form.setErrors(errors);
            setStepsCompleted(prev => ({ ...prev, [currentStep]: false }));
            return
        }

        if (!recordId) {
            setStepsCompleted(prev => ({ ...prev, [currentStep]: true }));
        }

        if (isLastStep) {
            try {
                for (let i = 0; i < numberOfSteps.length; i++) {
                    const { hasErrors } = getStepErrors(numberOfSteps[i], form)
                    if (hasErrors) {
                        if (!recordId) {
                            setStepsCompleted(prev => ({ ...prev, [currentStep]: false }));
                        }
                        toast.error("Not all required section fields are filled.")
                        return
                    }
                }

                if (recordId && record) {
                    await updateRecord({
                        id: recordId,
                        data: form.values
                    }).unwrap();
                    toast.success('Research updated successfully', {
                        onAutoClose: () => navigate('/submit_materials')
                    });
                }
                else {
                    console.log(form.values)
                    const response = await addResearchForm(form.values).unwrap();
    
                    if (response && response.success) {
                        localStorage.removeItem(FORM_STORAGE_KEY);
                        localStorage.removeItem(STEPS_STORAGE_KEY);
                        navigate('/submited');
                    } else {
                        toast.error('Something went wrong, try again in a few minutes.');
                    }
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
                            <Steps recordId={recordId} steps={ResearchSteps} currentStep={currentStep} stepsCompleted={stepsCompleted} updateParam={updateParam} />
                        </div>

                        <div className='relative flex-1'>
                            <div className="pl-16 border-l-[1px] border-gray-2">
                                {renderStep()}
                            </div>

                            <FormNavigation
                                recordId={recordId}
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