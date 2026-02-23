import { useEffect, useRef, useState } from "react";
import type { Question, QuestionFormAddProps } from "../types/types";

type HookQuestionDetailsProps = Omit<QuestionFormAddProps, 'currentQuestionIdx'>;

export const useQuestionDetails = ({ question, addQuestionToQuiz }: HookQuestionDetailsProps) => {
  const getCorrectOptionIdx = () => {
    const idx = question.options.findIndex(o => o.id === question.correctOptionId);
    return idx !== -1 ? idx : 0;
  }
  const [correctOptionIdx, setCorrectOptionIdx] = useState(getCorrectOptionIdx);

  useEffect(() => {
    setCorrectOptionIdx(getCorrectOptionIdx());
  }, [question.id]);

  const refPrompt = useRef<HTMLTextAreaElement>(null);
  const refExplanation = useRef<HTMLTextAreaElement>(null);
  const refOptions = useRef<HTMLInputElement[]>([]);

  const handleAddQuestion = () => {
    const prompt = refPrompt.current?.value || "";
    const explanation = refExplanation.current?.value || "";
    const options = refOptions.current?.map((input) => ({ id: crypto.randomUUID(), text: input.value })) ?? [];

    const newQuestion: Question = {
      id: question.id,
      prompt,
      explanation,
      options,
      correctOptionId: options[correctOptionIdx].id
    };

    if (!addQuestionToQuiz(newQuestion)) alert("Debe escribir un enunciado y al menos una opción de respuesta.");
  }

  const addRefOption = (el: HTMLInputElement | null, idx: number) => {
    if (!el || refOptions.current.includes(el)) return;
    refOptions.current.splice(idx, 4, el);
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