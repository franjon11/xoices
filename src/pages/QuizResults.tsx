import { LayoutDashboard } from "lucide-react";
import CardAnswer from "../components/quiz/Results/CardAnswer";
import SectionContainer from "../components/layout/Section/SectionContainer";
import PieChart from "../components/quiz/Results/PieChart";
import HeaderSummary from "../components/quiz/Results/HeaderSummary";
import { useResultSummary } from "../hooks/useResultSummary";
import MainContainer from "../components/layout/MainContainter";
import QuestionNavigation from "../components/quiz/Navigation/QuestionNavigation";
import BoxQuestionNav from "../components/quiz/Navigation/BoxQuestionNav";
import StepNavigation from "../components/quiz/Navigation/StepNavigation";

const QuizResults = () => {
  
  const summary = useResultSummary();
  if (!summary) return null;

  const {
    handleFinishRevision,
    handleNext,
    handleBack,
    goToQuestion,
    typeQuestion,
    currentQuestionIndex,
    questions,
    answers,
    score,
    incorrect,
    unanswered,
    totalQuestions,
    percentage,
    spentMinutes,
    spentSeconds
  } = summary;

  const currentQuestion = questions[currentQuestionIndex];

  const isFirstQuestion = typeQuestion === "first"
  const isLastQuestion = typeQuestion === "last"

  return (
    <MainContainer>
      <SectionContainer className="border border-sage/10 flex flex-col md:flex-row items-center gap-12 relative overflow-hidden p-5 dark:border-sage-dark/10 dark:bg-sage-dark/90">
        <div className="absolute top-0 right-0 size-64 bg-sage/5 rounded-full -mr-32 -mt-32 blur-3xl dark:bg-sage-dark/40"></div>
        
        <PieChart percentage={percentage} />

        <HeaderSummary
          percentage={percentage}
          score={score}
          incorrect={incorrect}
          unanswered={unanswered}
          totalQuestions={totalQuestions}
          spentMinutes={spentMinutes}
          spentSeconds={spentSeconds}
        />
      </SectionContainer>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
        <div className="lg:col-span-12">
          <h3 className="text-2xl font-black text-slate-800 px-2 flex items-center gap-3 dark:text-slate-600">
            Análisis Detallado
            <div className="h-px bg-sage/20 flex-1 dark:bg-sage-dark/20"></div>
          </h3>
        </div>
        <div className="lg:col-span-8 space-y-2">
          <CardAnswer
              key={`answer-${currentQuestion.id}`}
              q={currentQuestion}
              idx={currentQuestionIndex}
              userAnswerId={answers[currentQuestion.id]}
          />

          <StepNavigation
            className="bg-white dark:bg-slate-700/80 shadow-xl rounded-xl"
            handleNext={handleNext}
            handleBack={handleBack}
            isFirstQuestion={isFirstQuestion}
            isLastQuestion={isLastQuestion}
            isPlayer={false}
          />
        </div>
        <div className="lg:col-span-4 space-y-4">
          <QuestionNavigation className="sticky top-20 bg-white dark:bg-sage-dark/50 shadow-lg p-6 rounded-2xl">
            {
              questions.map(({ id: questionId, correctOptionId }, index) => {
                const userAnswer = answers[questionId];
                const boxClass = !userAnswer
                  ? 'bg-slate-300 dark:bg-slate-500'
                  : userAnswer === correctOptionId
                    ? 'bg-sage-dark'
                    : 'bg-red-400/70';
                return (
                  <BoxQuestionNav
                    key={`nav_${questionId}`}
                    questionId={questionId}
                    onClick={() => goToQuestion(index)}
                    className={boxClass}
                  >
                    {index + 1}
                  </BoxQuestionNav>
                );
              })
            }
          </QuestionNavigation>

          <div className="flex justify-center pt-8 sticky top-60">
            <button 
              onClick={handleFinishRevision}
              className="px-12 py-5 bg-sage text-white rounded-4xl font-black shadow-2xl shadow-sage/30 hover:scale-105 active:scale-95 transition-all flex items-center gap-3 text-md"
            >
              <LayoutDashboard size={20} strokeWidth={2.5} />
              TERMINAR REVISION
            </button>
          </div>
        </div>
      </div>
      

      
    </MainContainer>
  );
}

export default QuizResults
