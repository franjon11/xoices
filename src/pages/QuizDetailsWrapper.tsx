import { useParams } from "react-router";
import QuizDetails from "./QuizDetails";
import { useMemo } from "react";
import { useQuizFilter } from "../hooks/useQuizFilter";

const QuizDetailsWrapper = () => {
  const { quizId = "" } = useParams();

  const { getQuizById } = useQuizFilter();
  
  const quiz = useMemo(() => getQuizById(quizId), [quizId]);
  
  return <QuizDetails key={quizId} quiz={quiz} />;
}

export default QuizDetailsWrapper