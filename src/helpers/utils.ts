import type { Question } from "../types/types";

export const getCharForIdx = (idx: number) => {
  return String.fromCharCode(65 + idx);
}

export const randomizeQuestions = (questions: Question[], limit?: number) => {
  const questionsAux = questions.sort(() => Math.random() * 3 - 1);

  if (limit) {
    questionsAux.splice(limit);
  }

  questionsAux.forEach((question) => {
    question.options = question.options.sort(() => Math.random() * 7 - 3);
  });

  return questionsAux;
}