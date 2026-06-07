import type { Question } from "../types/types";

export const getCharForIdx = (idx: number) => {
  return String.fromCharCode(65 + idx);
}

const fisherYates = <T>(arr: T[]): T[] => {
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
};

export const randomizeQuestions = (questions: Question[], limit?: number) => {
  const shuffled = fisherYates(structuredClone(questions));

  if (limit) shuffled.splice(limit);

  shuffled.forEach(q => { q.options = fisherYates(q.options); });

  return shuffled;
}

export const getPreferedTheme = () => window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';

export const totalQuestionsToStr = (totalQuestions: number) => `${totalQuestions} Pregunta${totalQuestions > 1 && "s"}`