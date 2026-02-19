import type { Question } from "../../../types/types";
import SectionContainer from "../../layout/SectionContainer";

interface ProgressHeaderProps {
  currentQuestionIndex: number;
  questions: Question[];
  questionAnswers: string[];
  totalQuestions: number;
  quizTitle?: string;
  goToQuestion: (idxQuestion: number) => void;
}

const ProgressSession = ({ currentQuestionIndex, totalQuestions, quizTitle = '', questionAnswers, questions, goToQuestion }: ProgressHeaderProps) => {
  const cantRespondidas = questionAnswers.length;
  const progress = (cantRespondidas / totalQuestions) * 100;
  return (
    <SectionContainer className="sticky p-6 top-40 space-y-5">
      <div className="flex justify-between items-end">
        <div className="flex flex-col gap-1">
          <span className="text-xs font-black text-sage uppercase tracking-widest">Pregunta {currentQuestionIndex + 1} de {totalQuestions}</span>
          <h2 className="text-2xl font-black text-slate-800 leading-none">{quizTitle}</h2>
        </div>
        <div className="flex flex-col items-end">
          <span className="text-sage font-black text-2xl">{Math.round(progress)}%</span>
          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-tighter">Progreso</span>
        </div>
      </div>
      <div className="h-4 w-full bg-sage/10 rounded-full overflow-hidden p-1 border border-sage/5">
        <div 
          className="h-full bg-sage transition-all duration-700 ease-out rounded-full shadow-inner"
          style={{ width: `${progress}%` }}
        />
      </div>

      <div className="grid grid-cols-10 gap-2">
        {
          questions.map(({ id: questionId }, index) => (
            <button
              key={`nav_${questionId}`}
              onClick={() => questionAnswers.includes(questionId) && goToQuestion(index)}
              className={`w-full aspect-square p-3 rounded-md ${
                currentQuestionIndex === index
                  ? 'bg-almond-dark'
                  : (questionAnswers.includes(questionId) ? 'bg-sage' : 'bg-sage/20')
              }`}
            />
          ))
        }
      </div>
    </SectionContainer>
  )
}

export default ProgressSession