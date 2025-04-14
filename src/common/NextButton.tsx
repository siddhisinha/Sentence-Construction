import { Button } from "@/components/ui/button";

interface NextButtonProps {
  disabled: boolean;
  onClick: () => void;
  isLastQuestion: boolean;
}

export const NextButton = ({ disabled, onClick, isLastQuestion }: NextButtonProps) => (
  <div className="text-center">
    <Button
      onClick={onClick}
      disabled={disabled}
      className="bg-blue-500 text-white hover:bg-blue-600"
    >
      {isLastQuestion ? "Finish" : "Next"}
    </Button>
  </div>
);