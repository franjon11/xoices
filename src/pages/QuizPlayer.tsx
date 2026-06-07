import { FlagTriangleRight } from "lucide-react";
import { useEffect } from "react";
import { useNavigate, useParams } from "react-router";
import { useSessionStore } from "../store/useSessionStore";
import QuestionCard from "../components/quiz/Player/QuestionCard";
import { useQuizFilter } from "../hooks/useQuizFilter";
import { usePlayer } from "../hooks/usePlayer";
import ProgressSession from "../components/quiz/Player/ProgressHeader";
import Timer from "../components/quiz/Player/Timer";
import MainContainer from "../components/layout/MainContainter";
import CountdownTimer from "../components/quiz/Player/ContdownTimer";

const QuizPlayer = () => {
  const { quizId } = useParams<{ quizId: string }>();
  const { getQuizById } = useQuizFilter();
  const initSession = useSessionStore(state => state.initSession);
  const currentSession = useSessionStore(state => state.currentSession);
  const clearSession = useSessionStore(state => state.clearSession);

  useEffect(() => {
    clearSession();
  }, [clearSession]);

  useEffect(() => {
    if (currentSession != null) return;
    const quiz = quizId && getQuizById(quizId);

    const urlParams = new URLSearchParams(window.location.search);
    const questionsParam = urlParams.get('questions') ?? undefined;
    const timeParam = urlParams.get('time') ?? undefined;

    if (quiz) initSession(quiz, questionsParam, timeParam);
  }, [initSession, quizId, getQuizById, currentSession]);

  const navigate = useNavigate();

  const quiz = useSessionStore(state => state.currentQuiz);
  
  const currentQuestionIndex = useSessionStore(state => state.currentQuestionIdx);
  const setAnswer = useSessionStore(state => state.setAnswer);
  
  const totalQuestions = quiz?.questions?.length || 0;

  const {
    handleNext,
    handleBack,
    goToQuestion,
    typeQuestion,
    finishSession
  } = usePlayer(totalQuestions);

  if (!quiz || !currentSession) return null;

  const questions = quiz.questions;
  const currentQuestion = questions[currentQuestionIndex];
  const selectedAnswer = currentSession.answers[currentQuestion.id];
  const questionAnswers = Object.keys(currentSession.answers);

  return (
    <MainContainer>
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
        <div className="lg:col-span-8">
          <div className="lg:hidden mb-4">
            {currentSession.timeLimit ?
              <CountdownTimer timeLimit={currentSession.timeLimit} onTimeUp={finishSession} /> :
              <Timer startTime={currentSession.startTime} />
            }
          </div>
          <QuestionCard
            currentQuestion={currentQuestion}
            selectedAnswerId={selectedAnswer}
            setAnswer={setAnswer}
            handleNext={handleNext}
            handleBack={handleBack}
            typeQuestion={typeQuestion}
          />
        </div>
        <div className="lg:col-span-4 space-y-4">
          <div className="hidden lg:block sticky top-20">
            {currentSession.timeLimit ?
              <CountdownTimer timeLimit={currentSession.timeLimit} onTimeUp={finishSession} /> :
              <Timer startTime={currentSession.startTime} />
            }
          </div>

          <ProgressSession
            currentQuestionIndex={currentQuestionIndex}
            totalQuestions={totalQuestions}
            quizTitle={quiz?.title}
            questionAnswers={questionAnswers}
            questions={questions}
            goToQuestion={goToQuestion}
          />

          <div className="flex justify-center sticky top-150">
            <button
              onClick={() => { if (confirm('¿Finalizar el cuestionario? Las preguntas sin respuesta quedarán como no respondidas.')) finishSession(); }}
              className="px-6 py-2 rounded-full text-xs font-black text-slate-400 hover:text-sage hover:bg-sage/10 flex items-center gap-2 transition-all border border-transparent hover:border-sage/20"
            >
              <FlagTriangleRight size={16} />
              FINALIZAR CUESTIONARIO
            </button>
          </div>
        </div>
      </div>
    </MainContainer>
  );
}

export default QuizPlayer