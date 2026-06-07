import { Check, Minus, Timer, X } from "lucide-react"

interface HeaderSummaryProps {
  percentage: number;
  score: number;
  incorrect: number;
  unanswered: number;
  totalQuestions: number;
  spentMinutes: number;
  spentSeconds: number;
}

interface StatItemProps {
  icon: React.ReactNode;
  label: string;
  value: React.ReactNode;
  iconBg: string;
  iconColor: string;
}

const StatItem = ({ icon, label, value, iconBg, iconColor }: StatItemProps) => (
  <div className="flex items-center gap-3">
    <div className={`size-12 rounded-2xl flex items-center justify-center ${iconBg} ${iconColor}`}>
      {icon}
    </div>
    <div>
      <p className="text-[10px] text-slate-400 font-black uppercase tracking-widest dark:text-slate-700">{label}</p>
      <p className="text-2xl font-black text-slate-800 dark:text-slate-200">{value}</p>
    </div>
  </div>
);

const HeaderSummary = ({ percentage, score, incorrect, unanswered, totalQuestions, spentMinutes, spentSeconds }: HeaderSummaryProps) => {
  return (
    <div className="flex-1 text-center md:text-left relative">
      <span className="text-sm font-black text-sage uppercase tracking-[0.3em] mb-3 block dark:text-white/60">Resumen Rendimiento</span>
      <h2 className="text-5xl font-black text-slate-800 mb-6 leading-tight dark:text-slate-600">
        {percentage >= 80 ? 'Excelente!' : percentage >= 50 ? 'Buen Progreso!' : 'Segui Practicando!'}
      </h2>

      <div className="flex flex-wrap gap-6 justify-center md:justify-start">
        <StatItem
          icon={<Check size={22} strokeWidth={2.5} />}
          label={`Correctas / ${totalQuestions}`}
          value={score}
          iconBg="bg-sage/10 dark:bg-sage-light/30"
          iconColor="text-sage dark:text-slate-700"
        />
        <StatItem
          icon={<X size={22} strokeWidth={2.5} />}
          label={`Incorrectas / ${totalQuestions}`}
          value={incorrect}
          iconBg="bg-red-50 dark:bg-red-400/20"
          iconColor="text-red-400"
        />
        <StatItem
          icon={<Minus size={22} strokeWidth={2.5} />}
          label={`Sin Respuesta / ${totalQuestions}`}
          value={unanswered}
          iconBg="bg-slate-100 dark:bg-slate-500/30"
          iconColor="text-slate-400 dark:text-slate-400"
        />
        <StatItem
          icon={<Timer size={22} strokeWidth={2.5} />}
          label="Duración"
          value={`${spentMinutes}m ${spentSeconds}s`}
          iconBg="bg-sage/10 dark:bg-sage-light/30"
          iconColor="text-sage dark:text-slate-700"
        />
      </div>
    </div>
  )
}

export default HeaderSummary
