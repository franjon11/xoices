import { Check, Lightbulb, X } from "lucide-react";
import type { Question } from "../../../types/types";

interface CardAnswerProps {
  q: Question;
  idx: number;
  userAnswerId: string;
}

const CardAnswer = ({ q, idx, userAnswerId }: CardAnswerProps) => {

  const { correctOptionId, options, prompt, explanation } = q;
  const answerIndex = options.findIndex(option => option.id === userAnswerId);
  const correctOptionIndex = options.findIndex(option => option.id === correctOptionId);
  const isCorrect = userAnswerId === correctOptionId;

  return (
    <div className={`bg-white rounded-3xl p-8 shadow-sm border-l-8 transition-all hover:shadow-lg dark:bg-slate-700/80 ${isCorrect ? 'border-sage ring-1 ring-sage/5' : 'border-red-400 ring-1 ring-red-400/5'}`}>
      <div className="flex flex-col sm:flex-row justify-between gap-6 mb-8">
        <div className="flex items-start gap-5">
          <div className={`size-10 rounded-2xl shrink-0 flex items-center justify-center font-black text-lg ${isCorrect ? 'bg-sage/10 text-sage' : 'bg-red-50 text-red-500'}`}>
            {idx + 1}
          </div>
          <div className="text-xl font-bold text-slate-700 leading-tight dark:text-white">
            {prompt}
          </div>
        </div>
        <div className={`shrink-0 flex items-center self-start gap-2 px-4 py-2 rounded-full font-black uppercase text-[10px] tracking-widest shadow-sm ${isCorrect ? 'bg-sage text-white' : 'bg-red-400 text-white'}`}>
          {isCorrect ? <Check size={14} strokeWidth={4} /> : <X size={14} strokeWidth={4} />}
          {isCorrect ? 'CORRECTA' : 'INCORRECTA'}
        </div>
        {/* TODO: AGREGAR TIEMPO */}
        {/* <div className="flex items-center gap-3">
          <div className="size-12 bg-sage/10 rounded-2xl flex items-center justify-center text-sage">
            <Timer size={24} strokeWidth={2.5} />
          </div>
          <div>
            <p className="text-[10px] text-slate-400 font-black uppercase tracking-widest">Tiempo</p>
            <p className="text-2xl font-black text-slate-800">{q.timeLimit}s</p>
          </div>
        </div> */}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 ml-0 sm:ml-14">
        <div className={`flex flex-col gap-1 p-5 rounded-2xl border-2 ${isCorrect ? 'bg-sage/5 border-sage/20 shadow-sm dark:bg-sage/40 dark:border-sage/70' : 'bg-red-50/30 border-red-100'}`}>
          <p className="text-[10px] font-black text-slate-400 dark:text-slate-700 uppercase tracking-widest">Tu Selección</p>
          <p className={`text-lg font-black ${isCorrect ? 'text-sage dark:text-white' : 'text-red-400/70 line-through'}`}>
            {options[answerIndex]?.text ?? "Sin respuesta"}
          </p>
        </div>
        
        {!isCorrect && (
          <div className="flex flex-col gap-1 p-5 rounded-2xl bg-sage/10 border-2 border-sage/30 shadow-md dark:bg-sage/40 dark:border-sage/70">
            <p className="text-[10px] font-black text-sage uppercase tracking-widest dark:text-white/60">Solución Correcta</p>
            <p className="text-lg font-black text-slate-800 dark:text-slate-200">{options[correctOptionIndex]?.text}</p>
          </div>
        )}
      </div>

      {explanation && (
        <div className="flex items-center gap-3 mt-6 p-6 rounded-2xl bg-slate-50 border-2 border-slate-100 dark:bg-sage/40 dark:border-sage/70">
          <div className="size-12 bg-sage/10 rounded-2xl flex items-center justify-center text-sage">
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