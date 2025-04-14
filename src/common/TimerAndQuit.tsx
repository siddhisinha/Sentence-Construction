import { Button } from "@/components/ui/button";

interface TimerProps {
  seconds: number;
  onQuit: () => void;
}

export const TimerAndQuit = ({ seconds, onQuit }: TimerProps) => {
  const formatTime = (totalSeconds: number) => {
    const mins = Math.floor(totalSeconds / 60);
    const secs = totalSeconds % 60;
    return `${mins}:${secs < 10 ? `0${secs}` : secs}`;
  };

  return (
    <div className="flex justify-between items-center mb-4">
      <span className="text-lg font-medium">{formatTime(seconds)}</span>
      <Button onClick={onQuit} variant="outline">Quit</Button>
    </div>
  );
};