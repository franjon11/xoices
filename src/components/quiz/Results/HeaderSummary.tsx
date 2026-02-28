import { CheckCircle2, Timer } from "lucide-react"

interface HeaderSummaryProps {
  percentage: number;
  score: number;
  totalQuestions: number;
  spentMinutes: number;
  spentSeconds: number;
}

const HeaderSummary = ({ percentage, score, totalQuestions, spentMinutes, spentSeconds }: HeaderSummaryProps) => {

  return (
    <div className="flex-1 text-center md:text-left relative">
      <span className="text-sm font-black text-sage uppercase tracking-[0.3em] mb-3 block dark:text-white/60">Resumen Rendimiento</span>
      <h2 className="text-5xl font-black text-slate-800 mb-6 leading-tight dark:text-slate-600">
        {percentage >= 80 ? 'Excelente!' : percentage >= 50 ? 'Buen Progreso!' : 'Segui Practicando!'}
      </h2>
      
      <div className="flex flex-wrap gap-8 justify-center md:justify-start">
        <div className="flex items-center gap-3">
          <div className="size-12 bg-sage/10 rounded-2xl flex items-center justify-center text-sage dark:bg-sage-light/30 dark:text-slate-700">
            <CheckCircle2 size={24} strokeWidth={2.5} />
          </div>
          <div>
            <p className="text-[10px] text-slate-400 font-black uppercase tracking-widest dark:text-slate-700">Correct</p>
            <p className="text-2xl font-black text-slate-800 dark:text-slate-200">{score} / {totalQuestions}</p>
          </div>
        </div>
        
        <div className="flex items-center gap-3">
          <div className="size-12 bg-sage/10 rounded-2xl flex items-center justify-center text-sage dark:bg-sage-light/30 dark:text-slate-700">
            <Timer size={24} strokeWidth={2.5} />
          </div>
          <div>
            <p className="text-[10px] text-slate-400 font-black uppercase tracking-widest dark:text-slate-700">Duration</p>
            <p className="text-2xl font-black text-slate-800 dark:text-slate-200">{spentMinutes}m {spentSeconds}s</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default HeaderSummary