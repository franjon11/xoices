import { useQuizStore } from "../store/useQuizStore";

export const useQuizFilter = () => {
  const quizzes = useQuizStore(state => state.quizzes);
  const getQuizById = (id: string) => quizzes.find(q => q.id === id);

  return {
    getQuizById
  }
}