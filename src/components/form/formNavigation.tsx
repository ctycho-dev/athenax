import { StepsCompletion } from "@/types/audit";
import { StepsCompletionResearch } from "@/types/research";


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
    <div className='pl-16 my-14'>
        {stepsCompleted && stepsCompleted[currentStep] &&
            <div className="flex justify-center items-center gap-1.5 text-[#4EF467] mb-6">
                <svg width="12" height="13" viewBox="0 0 12 13" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path fillRule="evenodd" clipRule="evenodd" d="M6 12.5C9.31371 12.5 12 9.81371 12 6.5C12 3.18629 9.31371 0.5 6 0.5C2.68629 0.5 0 3.18629 0 6.5C0 9.81371 2.68629 12.5 6 12.5ZM9.69615 5.2179C10.0926 4.83343 10.1024 4.20034 9.7179 3.80385C9.33343 3.40737 8.70034 3.39763 8.30385 3.7821L4.875 7.10705L3.69615 5.96392C3.29966 5.57945 2.66657 5.58919 2.2821 5.98567C1.89763 6.38216 1.90737 7.01525 2.30385 7.39972L4.17885 9.2179C4.56674 9.59403 5.18326 9.59403 5.57115 9.2179L9.69615 5.2179Z" fill="#4EF467" />
                </svg>
                <span>All data is saved!</span>
            </div>
        }
        <div className='flex justify-center items-center gap-x-12'>
            {currentStep > 1 && (
                <button onClick={onPrev} className='font-semibold text-base hover:cursor-pointer'>
                    {prevLabel}
                </button>
            )}
            <button
                onClick={onNext}
                className='font-semibold text-base bg-light-blue-3 hover:bg-light-blue-2 py-2.5 px-16 rounded-[8px] hover:cursor-pointer'
            >
                {nextLabel}
            </button>
        </div>
    </div>
);