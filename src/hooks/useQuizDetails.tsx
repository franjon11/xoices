import { useRef, useState } from "react";
import type { NewQuiz, Question, Quiz } from "../types/types";
import { useQuizStore } from "../store/useQuizStore";
import { useNavigate } from "react-router";
import { formatNumericId, MAX_QUESTIONS } from "../helpers/parser";

const initialOptions = Array.from({ length: 4 }, () => ({
  id: "",
  text: ""
}));

export const initialQuestion: Question = {
  id: "",
  prompt: '',
  options: initialOptions,
  correctOptionId: ""
};

export const initialCurrentQuestionIdx = 0;

const useQuizDetails = (quiz?: Quiz) => {
  const navigate = useNavigate();
  const addQuiz = useQuizStore(state => state.addQuiz);
  const updateQuiz = useQuizStore(state => state.updateQuiz);

  const [questions, setQuestions] = useState<Question[]>(() => quiz?.questions ?? []);

  const refTitle = useRef<HTMLInputElement>(null);
  const refDescription = useRef<HTMLTextAreaElement>(null);

  const [currentQuestionIdx, setCurrentQuestionIdx] = useState(initialCurrentQuestionIdx);

  const addQuestionToQuiz = (question: Question) => {
    if (!question.prompt || question.options.some(o => !o.text || o.text.trim() === "")) return false

    const questionsCopy = structuredClone(questions);
    const qIdx = questionsCopy.findIndex(q => q.id === question.id);
    if (qIdx !== -1) {
      questionsCopy[qIdx] = question;
    } else {
      if (questionsCopy.length >= MAX_QUESTIONS) {
        alert(`No se pueden agregar más de ${MAX_QUESTIONS} preguntas.`);
        return false;
      }
      question.id = crypto.randomUUID();
      question.numericId = formatNumericId(questionsCopy.length + 1);
      questionsCopy.push(question);
    }
    setQuestions(questionsCopy);
    setCurrentQuestionIdx(questionsCopy.length);
    return true
  };

  const handleSaveQuiz = () => {
    if (!refTitle.current?.value || questions.length === 0) {
      alert('Se requiere al menos un título y una pregunta.');
      return;
    }

    const quizData: NewQuiz = {
      title: refTitle.current.value,
      description: refDescription.current?.value ?? '',
      questions
    };

    if (quiz) {
      updateQuiz(quiz.id, quizData);
    } else {
      addQuiz(quizData);
    }
    
    navigate('/');
  };

  return {
    quiz,
    refTitle,
    refDescription,
    questions,
    currentQuestionIdx,
    setCurrentQuestionIdx,
    addQuestionToQuiz,
    handleSaveQuiz
  };
}

export default useQuizDetails;