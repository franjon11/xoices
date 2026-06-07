import { useNavigate } from "react-router";
import { useSessionStore } from "../store/useSessionStore";
import { useEffect, useState } from "react";
import { useQuestionNav } from "./useQuestionNav";

export const useResultSummary = () => {
  const navigate = useNavigate();

  const currentSession = useSessionStore(state => state.currentSession);
  const currentQuiz = useSessionStore(state => state.currentQuiz);
  const clearSession = useSessionStore(state => state.clearSession);

  useEffect(() => {
    if (!currentQuiz || !currentSession || !currentSession.isCompleted) {
      navigate('/');
    }
  }, [currentQuiz, currentSession, navigate]);

  const questions = currentQuiz?.questions ?? []
  const answers = currentSession?.answers ?? {}
  const endTimeSession = currentSession?.endTime ?? new Date().getTime()
  const startTime = currentSession?.startTime ?? 0

  const score = questions.reduce((acc, q) => acc + (answers[q.id] === q.correctOptionId ? 1 : 0), 0);
  const unanswered = questions.reduce((acc, q) => acc + (!answers[q.id] ? 1 : 0), 0);
  const incorrect = questions.length - score - unanswered;

  const totalQuestions = questions.length
  const percentage = Math.round((score / totalQuestions) * 100);

  const timeSpent = Math.floor((endTimeSession - startTime) / 1000);
  const spentMinutes = Math.floor(timeSpent / 60);
  const spentSeconds = timeSpent % 60;

  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const handleFinishRevision = () => {
    clearSession();
    navigate('/');
  }

  const { handleNext, handleBack, goToQuestion, typeQuestion } = useQuestionNav(
      totalQuestions, currentQuestionIndex, setCurrentQuestionIndex, handleFinishRevision);

  return {
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
  }
}
  