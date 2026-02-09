import { useNavigate } from "react-router";
import { useSessionStore } from "../store/useSessionStore";
import { useEffect } from "react";

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

  if (!currentSession || !currentQuiz) return null;

  const score = currentQuiz.questions.reduce((acc, q) => {
    return acc + (currentSession.answers[q.id] === q.correctOptionIndex ? 1 : 0);
  }, 0);

  const totalQuestions = currentQuiz.questions.length
  const percentage = Math.round((score / totalQuestions) * 100);
  
  const timeSpent = Math.floor(((currentSession.endTime ?? Date.now()) - currentSession.startTime) / 1000);
  const spentMinutes = Math.floor(timeSpent / 60);
  const spentSeconds = timeSpent % 60;

  const handleFinishRevision = () => {
    clearSession();
    navigate('/');
  }

  return {
    handleFinishRevision,
    questions: currentQuiz.questions,
    answers: currentSession.answers,
    score,
    totalQuestions,
    percentage,
    spentMinutes,
    spentSeconds
  }
}
  