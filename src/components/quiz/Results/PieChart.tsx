interface PieChartProps {
  percentage: number;
}

const circumference = 540.35;

const PieChart = ({ percentage }: PieChartProps) => {
  return (
    <div className="relative size-48 shrink-0">
      <svg className="size-full -rotate-90">
        <circle cx="96" cy="96" r="86" fill="transparent" stroke="currentColor" strokeWidth="16" className="text-sage/10 dark:text-slate-800/10" />
        <circle 
          cx="96" cy="96" r="86" fill="transparent" stroke="currentColor" strokeWidth="16" 
          strokeDasharray={circumference} 
          strokeDashoffset={circumference - (circumference * percentage) / 100} 
          className="text-sage transition-all duration-[1.5s] ease-out stroke-round dark:text-slate-700"
        />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span className="text-5xl font-black text-slate-800 dark:text-slate-200">{percentage}%</span>
        <span className="text-[10px] font-black text-sage uppercase tracking-[0.2em] dark:text-slate-700">Score</span>
      </div>
    </div>
  )
}

export default PieChart