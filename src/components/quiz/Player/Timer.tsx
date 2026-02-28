import { useEffect, useState } from "react";
import { Hourglass } from "lucide-react";
import SectionContainer from "../../layout/SectionContainer"

const Timer = ({ startTime }: { startTime: number }) => {
  const [currentTime, setCurrentTime] = useState(() => 0);

  useEffect(() => {
    const interval = setInterval(() => {
      const time = Date.now() - startTime;
      setCurrentTime(time);
    }, 1000);
    return () => clearInterval(interval);
  }, [startTime]);

  return (
    <SectionContainer className="p-4 dark:bg-slate-700 dark:border-sage/10">
      <div className="flex items-center justify-center gap-2">
        <span className="bg-sage/20 p-2 rounded-lg text-sage-dark dark:bg-sage/20 dark:text-sage">
          <Hourglass size={20} strokeWidth={3} className="animate-pulse" />
        </span>
        <h2 className="text-2xl font-black text-sage-dark leading-none dark:text-sage">
          {new Date(currentTime).toISOString().split('T')[1].split('.')[0]}
        </h2>
      </div>
    </SectionContainer>
  )
}

export default Timer