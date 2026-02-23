
import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { Quiz, QuizSession } from '../types/types';
import { randomizeQuestions } from '../helpers/utils';

export type SetAnswerFunction = (questionId: string, answerId: string) => void;

interface SessionState {
  currentQuiz: Quiz | null;
  currentQuestionIdx: number;
  currentSession: QuizSession | null;
  initSession: (quiz: Quiz, questions?: string, time?: string) => void;
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

      initSession: (quiz, questionsParam, timeParam) => {
        const { questions, ...rest } = quiz;

        const questionsLimit = questionsParam ? parseInt(questionsParam) : questions.length;
        const timeLimit = timeParam ? parseInt(timeParam) : 0;

        set({
          currentQuiz: {
            ...rest,
            questions: randomizeQuestions(questions, questionsLimit)
          },
          currentQuestionIdx: 0,
          currentSession: {
            quizId: quiz.id,
            answers: {},
            isCompleted: false,
            startTime: Date.now(),
            timeLimit: timeLimit > 0 ? timeLimit : undefined
          }
      })},

      setAnswer: (questionId, answerId) => set((state) => {
        if (!state.currentSession) return state;

        return {
          currentSession: {
            ...state.currentSession,
            answers: {
              ...state.currentSession.answers,
              [questionId]: answerId
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
