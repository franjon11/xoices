import { useSessionStore } from "../store/useSessionStore"
import { useNavigate } from "react-router"
import type { TypeQuestion } from "../types/types";

export const usePlayer = (totalQuestions: number) => {
  const navigate = useNavigate();

  const currentQuestionIndex = useSessionStore(state => state.currentQuestionIdx)
  const completeSession = useSessionStore(state => state.completeSession)
  const setCurrentQuestionIndex = useSessionStore(state => state.setCurrentQuestionIdx)

  const handleNext = () => {
    if (currentQuestionIndex < totalQuestions - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      completeSession();
      navigate('/results');
    }
  };

  const handleBack = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
    }
  };

  const goToQuestion = (idxQuestion: number) => {
    if (idxQuestion < 0 || idxQuestion >= totalQuestions) return;
    setCurrentQuestionIndex(idxQuestion);
  }

  const isFirstQuestion = currentQuestionIndex === 0
  const isLastQuestion = currentQuestionIndex === totalQuestions - 1

  const typeQuestion = isFirstQuestion ? "first" : (isLastQuestion ? "last" : "middle")

  return {
    currentQuestionIndex,
    handleNext,
    handleBack,
    goToQuestion,
    typeQuestion: typeQuestion as TypeQuestion
  }
}