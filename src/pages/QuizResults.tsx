import { LayoutDashboard } from "lucide-react";
import CardAnswer from "../components/quiz/Results/CardAnswer";
import SectionContainer from "../components/ui/SectionContainer";
import PieChart from "../components/quiz/Results/PieChart";
import HeaderSummary from "../components/quiz/Results/HeaderSummary";
import { useResultSummary } from "../hooks/useResultSummary";

const QuizResults = () => {
  
  const summary = useResultSummary();
  if (!summary) return null;

  const {
    handleFinishRevision,
    questions,
    answers,
    score,
    totalQuestions,
    percentage,
    spentMinutes,
    spentSeconds
  } = summary;

  return (
    <div className="max-w-4xl mx-auto space-y-12 pb-24 animate-in fade-in duration-700">
      <SectionContainer className="border border-sage/10 flex flex-col md:flex-row items-center gap-12 relative overflow-hidden p-5">
        <div className="absolute top-0 right-0 size-64 bg-sage/5 rounded-full -mr-32 -mt-32 blur-3xl"></div>
        
        <PieChart percentage={percentage} />

        <HeaderSummary
          percentage={percentage}
          score={score}
          totalQuestions={totalQuestions}
          spentMinutes={spentMinutes}
          spentSeconds={spentSeconds}
        />
      </SectionContainer>

      <div className="space-y-6">
        <h3 className="text-2xl font-black text-slate-800 px-2 flex items-center gap-3">
          Análisis Detallado
          <div className="h-px bg-sage/20 flex-1"></div>
        </h3>
        <div className="grid grid-cols-1 gap-6">
          {questions.map((q, idx) =>
            <CardAnswer
              key={q.id}
              q={q}
              idx={idx}
              userAnswer={answers[q.id]}
            />)
          }
        </div>
      </div>

      <div className="flex justify-center pt-8">
        <button 
          onClick={handleFinishRevision}
          className="px-12 py-5 bg-sage text-white rounded-[2rem] font-black shadow-2xl shadow-sage/30 hover:scale-105 active:scale-95 transition-all flex items-center gap-3 text-lg"
        >
          <LayoutDashboard size={24} strokeWidth={2.5} />
          TERMINAR REVISION
        </button>
      </div>
    </div>
  );
}

export default QuizResults
