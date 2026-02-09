import type { Question } from "../types/types";

export const getCharForIdx = (idx: number) => {
  return String.fromCharCode(65 + idx);
}

export const randomizeQuestions = (questions: Question[]) => {
  return questions.sort(() => Math.random() * 3 - 1);
}