import { Link, useNavigate } from "react-router-dom";
import { StepsCompletion } from '@/types';
import { Step } from "@/types";


interface CheckIconProps {
  active: boolean;
}

interface StepItemProps {
  step: number
  label: string;
  active: boolean;
  isFirst: boolean;
  stepCompleted: boolean
  updateParam: (value: string) => void
}

interface StepsProps {
  steps: Step[]
  currentStep: number
  stepsCompleted: StepsCompletion | null
  updateParam: (value: string) => void
}

const CheckIcon: React.FC<CheckIconProps> = ({ active }) => (
  <svg
    width="12"
    height="12"
    viewBox="0 0 12 12"
    fill="none"
    className={`fill-[#949FA8] ${active ? 'fill-white' : ''}`}
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M6 12C9.31371 12 12 9.31371 12 6C12 2.68629 9.31371 0 6 0C2.68629 0 0 2.68629 0 6C0 9.31371 2.68629 12 6 12ZM9.69615 4.7179C10.0926 4.33343 10.1024 3.70034 9.7179 3.30385C9.33343 2.90737 8.70034 2.89763 8.30385 3.2821L4.875 6.60705L3.69615 5.46392C3.29966 5.07945 2.66657 5.08919 2.2821 5.48567C1.89763 5.88216 1.90737 6.51525 2.30385 6.89972L4.17885 8.7179C4.56674 9.09403 5.18326 9.09403 5.57115 8.7179L9.69615 4.7179Z"
    />
  </svg>
);

const StepItem: React.FC<StepItemProps> = ({ step, label, active, isFirst, stepCompleted, updateParam }) => (
  <button
    onClick={() => { updateParam(step.toString()) }}
    className={`flex gap-x-2 items-center ${isFirst ? 'group' : ''} hover:cursor-pointer`}
    style={{ lineHeight: '40px' }}
  >
    {stepCompleted && <CheckIcon active={active} />}
    <span className={active ? 'text-white font-semibold' : ''}>{label}</span>
  </button>
);

export const Steps: React.FC<StepsProps> = ({ steps, currentStep, stepsCompleted, updateParam }) => (
  <div>
    {steps.map((step, index) => (
      <StepItem
        key={step.id}
        step={step.id}
        label={step.label}
        active={currentStep === step.id}
        isFirst={index === 0}
        stepCompleted={stepsCompleted ? stepsCompleted[step.id] : false}
        updateParam={updateParam}
      />
    ))}
  </div>
);