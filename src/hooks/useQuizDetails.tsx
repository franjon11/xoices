import { useRef, useState } from "react";
import type { NewQuiz, Question, Quiz } from "../types/types";
import { useQuizStore } from "../store/useQuizStore";
import { useNavigate } from "react-router";

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
    let qIdx = questionsCopy.findIndex(q => q.id === question.id);
    if (qIdx !== -1) {
      questionsCopy[qIdx] = question;
    } else {
      question.id = crypto.randomUUID();
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