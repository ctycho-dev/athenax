import { StepsCompletion } from "@/types";
import { StepsCompletionResearch } from "@/types/research";

import gradient from '@/assets/audit/gradient.png'

interface FormNavigationProps {
    currentStep: number;
    onPrev: () => void;
    onNext: () => void;
    prevLabel?: string;
    nextLabel?: string;
    stepsCompleted: StepsCompletion | StepsCompletionResearch | null
}

export const FormNavigation = ({
    currentStep,
    onPrev,
    onNext,
    prevLabel = "Previous Screen",
    nextLabel = "Continue",
    stepsCompleted
}: FormNavigationProps) => (
    <>
        <div className='h-[160px]'></div>
        <div className='fixed inset-x-0 bottom-0 h-[180px] pointer-events-none'>
            {/* Gradient overlay (now more precise) */}
            {/* <div
                className="absolute inset-0 h-[200px] -z-10"
                // style={{ background: 'linear-gradient(to top, #1B1B1E 0%, transparent 100%)' }}
            ></div> */}
            <img src={gradient} alt="" className="absolute h-[180px] w-full bottom-0" />

            {/* Content container (enables pointer events) */}
            <div className="relative h-full pointer-events-auto">
                <div className="absolute bottom-0 w-full py-14">
                    {stepsCompleted && stepsCompleted[currentStep] && (
                        <div className="flex justify-center items-center gap-1.5 text-[#4EF467] mb-6">
                            <svg width="12" height="13" viewBox="0 0 12 13" fill="none">
                                <path
                                    fillRule="evenodd"
                                    clipRule="evenodd"
                                    d="M6 12.5C9.31371 12.5 12 9.81371 12 6.5C12 3.18629 9.31371 0.5 6 0.5C2.68629 0.5 0 3.18629 0 6.5C0 9.81371 2.68629 12.5 6 12.5ZM9.69615 5.2179C10.0926 4.83343 10.1024 4.20034 9.7179 3.80385C9.33343 3.40737 8.70034 3.39763 8.30385 3.7821L4.875 7.10705L3.69615 5.96392C3.29966 5.57945 2.66657 5.58919 2.2821 5.98567C1.89763 6.38216 1.90737 7.01525 2.30385 7.39972L4.17885 9.2179C4.56674 9.59403 5.18326 9.59403 5.57115 9.2179L9.69615 5.2179Z"
                                    fill="currentColor"
                                />
                            </svg>
                            <span>All data is saved!</span>
                        </div>
                    )}

                    <div className='flex justify-center items-center'>
                        {currentStep > 1 && (
                            <button
                                onClick={onPrev}
                                className='font-semibold text-base hover:opacity-80 transition-opacity py-2.5 px-16'
                            >
                                {prevLabel}
                            </button>
                        )}
                        <button
                            onClick={onNext}
                            className='font-semibold text-base bg-light-blue-3 hover:bg-light-blue-2 py-2.5 px-16 rounded-lg transition-colors'
                        >
                            {nextLabel}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </>
);