import { LogOut } from "lucide-react";
import { useEffect } from "react";
import { useNavigate, useParams } from "react-router";
import { useSessionStore } from "../store/useSessionStore";
import QuestionCard from "../components/quiz/Player/QuestionCard";
import { useQuizFilter } from "../hooks/useQuizFilter";
import { usePlayer } from "../hooks/usePlayer";
import ProgressSession from "../components/quiz/Player/ProgressHeader";
import Timer from "../components/quiz/Player/Timer";

const QuizPlayer = () => {
  const { quizId = "" } = useParams<{ quizId: string }>();
  
  const { getQuizById } = useQuizFilter();
  const initSession = useSessionStore(state => state.initSession);
  
  useEffect(() => {
    const quiz = getQuizById(quizId);
    if (quiz) initSession(quiz);
  }, [initSession, quizId])

  const navigate = useNavigate();

  const quiz = useSessionStore(state => state.currentQuiz);
  const currentSession = useSessionStore(state => state.currentSession);
  const currentQuestionIndex = useSessionStore(state => state.currentQuestionIdx)
  const setAnswer = useSessionStore(state => state.setAnswer);
  const clearSession = useSessionStore(state => state.clearSession);

  if (!quiz || !currentSession) return null;

  const questions = quiz.questions;
  const currentQuestion = questions[currentQuestionIndex];
  const selectedAnswer = currentSession.answers[currentQuestion.id];
  
  const questionAnswers = Object.keys(currentSession.answers);

  const totalQuestions = questions.length;

  const {
    handleNext,
    handleBack,
    goToQuestion,
    typeQuestion
  } = usePlayer(totalQuestions);
  
  return (
    <div className="max-w-6xl mx-auto space-y-12 pb-20 animate-in fade-in duration-500">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
        <div className="lg:col-span-8">
          <QuestionCard
            currentQuestion={currentQuestion}
            selectedAnswer={selectedAnswer}
            setAnswer={setAnswer}
            handleNext={handleNext}
            handleBack={handleBack}
            typeQuestion={typeQuestion}
          />
        </div>
        <div className="lg:col-span-4 space-y-4">
          <Timer startTime={currentSession.startTime} />

          <ProgressSession
            currentQuestionIndex={currentQuestionIndex}
            totalQuestions={totalQuestions}
            quizTitle={quiz?.title}
            questionAnswers={questionAnswers}
            questions={questions}
            goToQuestion={goToQuestion}
          />

          <div className="flex justify-center sticky top-110">
            <button 
              onClick={() => { if(confirm('¿Salir del quiz? Se perderá el progreso.')) { clearSession(); navigate('/'); } }}
              className="px-6 py-2 rounded-full text-xs font-black text-slate-400 hover:text-red-500 hover:bg-red-50 flex items-center gap-2 transition-all border border-transparent hover:border-red-100"
            >
              <LogOut size={16} />
              TERMINAR SESIÓN
            </button>
          </div>
        </div>
      </div>

      
    </div>
  );
}

export default QuizPlayer