import { useSessionStore } from "../store/useSessionStore"
import { useNavigate } from "react-router"
import type { TypeQuestion } from "../types/types";
import { useQuestionNav } from "./useQuestionNav";

export const usePlayer = (totalQuestions: number) => {
  const navigate = useNavigate();

  const currentQuestionIndex = useSessionStore(state => state.currentQuestionIdx)
  const completeSession = useSessionStore(state => state.completeSession)
  const setCurrentQuestionIndex = useSessionStore(state => state.setCurrentQuestionIdx)

  const finishSession = () => {
    completeSession();
    navigate('/results');
  }

  const { handleNext, handleBack, goToQuestion, typeQuestion } = useQuestionNav(
    totalQuestions, currentQuestionIndex, setCurrentQuestionIndex, finishSession);

  return {
    currentQuestionIndex,
    handleNext,
    handleBack,
    goToQuestion,
    typeQuestion: typeQuestion as TypeQuestion,
    finishSession
  }
}