import { Check, Minus, X, Lightbulb } from "lucide-react";
import type { Question } from "../../../types/types";
import NumericIdBadge from "../../ui/NumericIdBadge";

interface CardAnswerProps {
  q: Question;
  idx: number;
  userAnswerId: string | undefined;
}

const CardAnswer = ({ q, idx, userAnswerId }: CardAnswerProps) => {

  const { correctOptionId, options, prompt, explanation } = q;
  const correctOptionIndex = options.findIndex(option => option.id === correctOptionId);
  const unanswered = !userAnswerId;
  const isCorrect = !unanswered && userAnswerId === correctOptionId;

  const borderColor = unanswered ? 'border-slate-300 ring-1 ring-slate-200' : isCorrect ? 'border-sage ring-1 ring-sage/5' : 'border-red-400 ring-1 ring-red-400/5';
  const numberBg = unanswered ? 'bg-slate-100 text-slate-400' : isCorrect ? 'bg-sage/10 text-sage' : 'bg-red-50 text-red-500';
  const badgeBg = unanswered ? 'bg-slate-200 text-slate-500' : isCorrect ? 'bg-sage text-white' : 'bg-red-400 text-white';

  return (
    <div className={`bg-white rounded-3xl p-8 shadow-sm border-l-8 transition-all hover:shadow-lg dark:bg-slate-700/80 ${borderColor}`}>
      <div className="flex flex-col sm:flex-row justify-between gap-6 mb-8">
        <div className="flex items-start gap-5">
          <div className={`size-10 rounded-2xl shrink-0 flex items-center justify-center font-black text-lg ${numberBg}`}>
            {idx + 1}
          </div>
          <div className="flex flex-col gap-1.5">
            {q.numericId && <NumericIdBadge numericId={q.numericId} />}
            <div className="text-xl font-bold text-slate-700 leading-tight dark:text-white">
              {prompt}
            </div>
          </div>
        </div>
        <div className={`shrink-0 flex items-center self-start gap-2 px-4 py-2 rounded-full font-black uppercase text-[10px] tracking-widest shadow-sm ${badgeBg}`}>
          {unanswered ? <Minus size={14} strokeWidth={4} /> : isCorrect ? <Check size={14} strokeWidth={4} /> : <X size={14} strokeWidth={4} />}
          {unanswered ? 'SIN RESPUESTA' : isCorrect ? 'CORRECTA' : 'INCORRECTA'}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {!unanswered && (
          <div className={`flex flex-col gap-1 p-5 rounded-2xl border-2 ${isCorrect ? 'bg-sage/5 border-sage/20 shadow-sm dark:bg-sage/40 dark:border-sage/70' : 'bg-red-50/30 border-red-100'}`}>
            <p className="text-[10px] font-black text-slate-400 dark:text-slate-700 uppercase tracking-widest">Tu Selección</p>
            <p className={`text-lg font-black ${isCorrect ? 'text-sage dark:text-white' : 'text-red-400/70 line-through'}`}>
              {options.find(o => o.id === userAnswerId)?.text}
            </p>
          </div>
        )}

        {(unanswered || !isCorrect) && (
          <div className="flex flex-col gap-1 p-5 rounded-2xl bg-sage/10 border-2 border-sage/30 shadow-md dark:bg-sage/40 dark:border-sage/70">
            <p className="text-[10px] font-black text-sage uppercase tracking-widest dark:text-white/60">Solución Correcta</p>
            <p className="text-lg font-black text-slate-800 dark:text-slate-200">{options[correctOptionIndex]?.text}</p>
          </div>
        )}
      </div>

      {explanation && (
        <div className="flex items-center gap-3 mt-6 p-6 rounded-2xl bg-slate-50 border-2 border-slate-100 dark:bg-blue-500/20 dark:border-blue-300/70">
          <div className="size-12 bg-sage/10 rounded-2xl flex items-center justify-center text-blue-200">
            <Lightbulb size={24} strokeWidth={2.5} />
          </div>
          <div>
            <p className="text-[10px] text-slate-400 font-black uppercase tracking-widest">Explicación</p>
            <p className="text-2xl font-black text-slate-800 dark:text-white/60">{explanation}</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default CardAnswer;
