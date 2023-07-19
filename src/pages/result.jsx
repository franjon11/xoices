import { useContext } from "react";
import Result from "../components/Result";
import { QuestionContext } from "@/utils/QuestionContext";

const ResultPage = () => {
  const { questions } = useContext(QuestionContext);
  return (
    questions.length > 0 && (
      <Result selectedOptions={[]} questions={questions} />
    )
  );
};

export default ResultPage;
