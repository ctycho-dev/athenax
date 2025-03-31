interface Step {
    id: number;
    label: string;
  }
  
  interface CheckIconProps {
    active: boolean;
  }
  
  interface StepItemProps {
    label: string;
    active: boolean;
    isFirst: boolean;
  }
  
  interface StepsProps {
    currentStep: number;
  }
  
  const steps: Step[] = [
    { id: 1, label: "Basic Info" },
    { id: 2, label: "Smart Contract Details" },
    { id: 3, label: "Technical Documentation" },
    { id: 4, label: "Testing and Development" },
  ];
  
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
  
  const StepItem: React.FC<StepItemProps> = ({ label, active, isFirst }) => (
    <div 
      className={`flex gap-x-2 items-center ${isFirst ? 'group' : ''}`} 
      style={{ lineHeight: '40px' }}
    >
      <CheckIcon active={active} />
      <span className={active ? 'text-white' : ''}>{label}</span>
    </div>
  );
  
  export const Steps: React.FC<StepsProps> = ({ currentStep }) => (
    <div>
      {steps.map((step, index) => (
        <StepItem 
          key={step.id}
          label={step.label}
          active={currentStep === step.id}
          isFirst={index === 0}
        />
      ))}
    </div>
  );