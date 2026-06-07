import { useParams } from "react-router";
import QuizDetails from "./QuizDetails";
import { useQuizFilter } from "../hooks/useQuizFilter";

const QuizDetailsWrapper = () => {
  const { quizId = "" } = useParams();

  const { getQuizById } = useQuizFilter();
  const quiz = getQuizById(quizId);

  return <QuizDetails key={quizId} quiz={quiz} />;
}

export default QuizDetailsWrapper