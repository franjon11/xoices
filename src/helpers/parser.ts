import type { Question, Quiz } from "../types/types";

/**
 * Parses a string content into a Quiz object.
 * Expected format:
 * Q: Question text?
 * A) Option 1
 * B) Option 2* (asterisk for correct)
 * C) Option 3
 * E: Explanation
 */
export const parseQuizTxt = (text: string): Partial<Quiz> => {
  const lines = text.split('\n').map(l => l.trim()).filter(l => l.length > 0);
  const questions: Question[] = [];

  let currentQuestion: Question | null = null;
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    if (line.toLowerCase().startsWith('q:')) {
      if (currentQuestion && currentQuestion.prompt && currentQuestion.options?.length) {
        questions.push(currentQuestion as Question);
      }
      currentQuestion = {
        id: crypto.randomUUID(),
        prompt: line.substring(2).trim(),
        options: [],
        correctOptionId: "",
        explanation: ""
      };
    } else if (line.match(/^[a-zA-Z]\)/)) {
      if (currentQuestion) {
        let optionText = line.substring(2).trim();
        const isCorrect = optionText.endsWith('*');
        const optionId = crypto.randomUUID();
        if (isCorrect) {
          optionText = optionText.slice(0, -1).trim();
          currentQuestion.correctOptionId = optionId;
        }

        const newOption = { id: optionId, text: optionText };
        currentQuestion.options?.push(newOption);
      }
    } else if (line.toLowerCase().startsWith('e:')) {
      if (currentQuestion) {
        currentQuestion.explanation = line.substring(2).trim();
      }
    }
  }

  if (currentQuestion != null && currentQuestion.prompt && currentQuestion.options?.length) {
    questions.push(currentQuestion);
  }

  return {
    questions
  };
};