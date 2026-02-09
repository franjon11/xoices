
import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { Quiz, QuizSession } from '../types/types';
import { randomizeQuestions } from '../helpers/utils';

export type SetAnswerFunction = (questionId: string, answerIndex: number) => void;

interface SessionState {
  currentQuiz: Quiz | null;
  currentQuestionIdx: number;
  currentSession: QuizSession | null;
  initSession: (quiz: Quiz) => void;
  setAnswer: SetAnswerFunction;
  setCurrentQuestionIdx: (idx: number) => void;
  completeSession: () => void;
  clearSession: () => void;
}

export const useSessionStore = create<SessionState>()(
  persist(
    (set) => ({
      currentQuiz: null,
      currentQuestionIdx: 0,
      currentSession: null,

      initSession: (quiz) => {
        const { questions, ...rest } = quiz;

        set({
          currentQuiz: {
            ...rest,
            questions: randomizeQuestions(questions)
          },
          currentQuestionIdx: 0,
          currentSession: {
            quizId: quiz.id,
            answers: {},
            isCompleted: false,
            startTime: Date.now()
          }
      })},

      setAnswer: (questionId, answerIndex) => set((state) => {
        if (!state.currentSession) return state;

        return {
          currentSession: {
            ...state.currentSession,
            answers: {
              ...state.currentSession.answers,
              [questionId]: answerIndex
            }
          }
        };
      }),

      setCurrentQuestionIdx: (idx) => set({ currentQuestionIdx: idx }),

      completeSession: () => set((state) => {
        if (!state.currentSession) return state;
        return {
          currentSession: {
            ...state.currentSession,
            isCompleted: true,
            endTime: Date.now()
          }
        };
      }),

      clearSession: () => set({ currentSession: null, currentQuiz: null, currentQuestionIdx: 0 })
    }),
    {
      name: 'quizmaster-session',
    }
  )
);
