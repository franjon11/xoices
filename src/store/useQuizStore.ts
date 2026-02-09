import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { NewQuiz, Quiz } from '../types/types';
import { useAuthStore } from './useAuthStore';

interface QuizState {
  quizzes: Quiz[];
  addQuiz: (quiz: NewQuiz) => void;
  updateQuiz: (id: string, quiz: NewQuiz) => void;
  deleteQuiz: (id: string) => void;
}

export const useQuizStore = create<QuizState>()(
  persist(
    (set, get) => ({
      quizzes: [],
      addQuiz: (quiz: NewQuiz) => {
        const user = useAuthStore.getState().user
        if (!user) return;

        const newQuiz: Quiz = {
          ...quiz,
          id: crypto.randomUUID(),
          createdAt: Date.now(),
          creator: user
        };

        set((state) => ({
          quizzes: [newQuiz, ...state.quizzes]
        }))
      },
      updateQuiz: (id, quiz) => {
        const quizzes = get().quizzes;
        const quizIdx = quizzes.findIndex(q => q.id === id);
        if (quizIdx === -1) return;

        const updatedQuiz: Quiz = {
          ...quizzes[quizIdx],
          ...quiz
        };

        const updatedQuizzes = structuredClone(quizzes);
        updatedQuizzes[quizIdx] = updatedQuiz;

        set({ quizzes: updatedQuizzes });
      },
      deleteQuiz: (id) => set((state) => ({ 
        quizzes: state.quizzes.filter(q => q.id !== id) 
      }))
    }),
    {
      name: 'quizmaster-quizzes',
    }
  )
);