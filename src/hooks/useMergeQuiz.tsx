import { useNavigate } from "react-router";
import { useQuizStore } from "../store/useQuizStore";
import type { NewQuiz, QuizSelectable } from "../types/types";
import { useRef, useState } from "react";
import { formatNumericId, MAX_QUESTIONS } from "../helpers/parser";

const useMergeQuiz = () => {
	const navigate = useNavigate();

	const refTitle = useRef<HTMLInputElement>(null);
  const refDescription = useRef<HTMLTextAreaElement>(null);

  const quizzes = useQuizStore(state => state.quizzes);
  const addQuiz = useQuizStore(state => state.addQuiz);
  const [quizzesSelected, setQuizzesSelected] = useState<QuizSelectable[]>([])

  const handleSelectQuiz = (id: string) => () => {
    const q = quizzes.find(x => x.id == id);
    if (q) {
      const { questions, ...restOfQuiz } = q

      setQuizzesSelected(state => [...state,
        { ...restOfQuiz, questions: structuredClone(questions), selected: true }
      ]);
    }
  }

  const handleRemoveQuiz = (quizId: string) => () => {
    setQuizzesSelected(prev => prev.filter(q => q.id !== quizId));
  };

  const handleSelectQuestion = (quizId: string) => (select: boolean, questionId?: string) => {
    setQuizzesSelected(prevQuizzes => 
      prevQuizzes.map(quiz => {
        if (quiz.id !== quizId) return quiz;
        return {
          ...quiz,
          questions: quiz.questions.map(question => {
            if (questionId && question.id !== questionId) return question;
            return { ...question, selected: select };
          })
        };
      })
    );
  };

  const handleAddNewQuiz = () => {
    const questionSelected = quizzesSelected.flatMap(x => x.questions.filter(y => y.selected));
    if (!refTitle.current?.value || questionSelected.length === 0) {
      alert('Se requiere al menos un título y una pregunta seleccionada.');
      return;
    }
    if (questionSelected.length > MAX_QUESTIONS) {
      alert(`No se pueden combinar más de ${MAX_QUESTIONS} preguntas.`);
      return;
    }

    const questionsWithIds = questionSelected.map((q, idx) => ({
      ...q,
      numericId: formatNumericId(idx + 1)
    }));

    const quizData: NewQuiz = {
      title: refTitle.current.value,
      description: refDescription.current?.value ?? '',
      questions: questionsWithIds
    };

    addQuiz(quizData);
    navigate('/');
	}
	
	const selectableQuizzes = quizzes.filter(q => !quizzesSelected.some(qS => qS.id === q.id));

	return {
		refTitle,
		refDescription,
		quizzesSelected,
		selectableQuizzes,
		handleSelectQuiz,
		handleSelectQuestion,
		handleRemoveQuiz,
		handleAddNewQuiz
	}
}

export default useMergeQuiz;