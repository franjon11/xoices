import { useRef, useState } from "react";
import type { Question, QuestionFormAddProps } from "../types/types";

type HookQuestionDetailsProps = Omit<QuestionFormAddProps, 'currentQuestionIdx'>;

export const useQuestionDetails = ({ question, addQuestionToQuiz }: HookQuestionDetailsProps) => {
  const [correctOptionIdx, setCorrectOptionIdx] = useState(() => question.correctOptionIndex);

  const refPrompt = useRef<HTMLTextAreaElement>(null);
  const refExplanation = useRef<HTMLTextAreaElement>(null);
  const refOptions = useRef<HTMLInputElement[]>([]);

  const handleAddQuestion = () => {
    const prompt = refPrompt.current?.value || "";
    const explanation = refExplanation.current?.value || "";
    const options = refOptions.current?.map(input => input.value) ?? [];
    const correctOptionIndex = correctOptionIdx;

    const newQuestion: Question = {
      id: question.id,
      prompt,
      explanation,
      options,
      correctOptionIndex
    };

    if (!addQuestionToQuiz(newQuestion)) alert("Debe escribir un enunciado y al menos una opción de respuesta.");
  }

  const addRefOption = (el: HTMLInputElement | null, idx: number) => {
    if (!el || refOptions.current.includes(el)) return;
    refOptions.current.splice(idx, 0, el);
  }

  return {
    refPrompt,
    refExplanation,
    correctOptionIdx,
    setCorrectOptionIdx,
    handleAddQuestion,
    addRefOption
  };
}