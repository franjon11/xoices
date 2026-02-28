import { useEffect, useState } from "react"
import SectionContainer from "../../layout/SectionContainer";
import { Hourglass } from "lucide-react";

interface CountdownTimerProps {
  timeLimit: number;
  onTimeUp: () => void;
}

const CountdownTimer = ({ timeLimit, onTimeUp }: CountdownTimerProps) => {
  const [currentTime, setCurrentTime] = useState(() => timeLimit);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime((prevTime) => prevTime - 1);
    }, 1000);
    return () => clearInterval(interval);
  }, [timeLimit]);

  useEffect(() => {
    if (currentTime <= 0) {
      onTimeUp();
    }
  }, [currentTime, onTimeUp]);

  const percentage = (currentTime / timeLimit) * 100;
  const textColor = percentage < 50 ? 'text-yellow-500' : percentage < 10 ? 'text-red-500' : 'text-sage-dark';
  const bgColor = percentage < 50 ? 'bg-yellow-500/20' : percentage < 10 ? 'bg-red-500/20' : 'bg-sage/20';
  return (
    <SectionContainer className="p-4 dark:bg-slate-700 dark:border-sage/10">
      <div className="flex items-center justify-center gap-2">
        <span className={`${bgColor} p-2 rounded-lg ${textColor}`}>
          <Hourglass size={20} strokeWidth={3} className="animate-pulse" />
        </span>
        <h2 className={`text-2xl font-black ${textColor} leading-none dark:text-sage`}>
          {new Date(currentTime * 1000).toISOString().split('T')[1].split('.')[0]}
        </h2>
      </div>
    </SectionContainer>
  )
}

export default CountdownTimer