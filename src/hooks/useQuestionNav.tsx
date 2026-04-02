import type { TypeQuestion } from "../types/types";

export const useQuestionNav = (totalQuestions: number, currentQuestionIndex: number, setCurrentQuestionIndex: (idx: number) => void, finishSession: () => void) => {
  const handleNext = () => {
    if (currentQuestionIndex < totalQuestions - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      finishSession();
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

  const typeQuestion = isLastQuestion ? "last" : (isFirstQuestion ? "first" : "middle")

  return {
    currentQuestionIndex,
    handleNext,
    handleBack,
    goToQuestion,
    typeQuestion: typeQuestion as TypeQuestion,
    finishSession
  }
}