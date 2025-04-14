interface StepperProps {
  currentStep: number;
  totalSteps: number;
  className?: string;
}

export const Stepper = ({ currentStep, totalSteps, className = "" }: StepperProps) => {
  return (
    <div className={className}>
      {[...Array(totalSteps)].map((_, index) => (
        <div
          key={index}
          className={`h-2 rounded-full ${
            index <= currentStep ? "bg-[#F2A531]" : "bg-gray-200"
          }`}
        />
      ))}
    </div>
  );
};