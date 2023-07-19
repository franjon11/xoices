import { useContext } from "react";
import { QuestionContext } from "@/utils/QuestionContext";
import Result from "../components/Result";

const ResultPage = () => {
  const { selectedOptions, questions } = useContext(QuestionContext);

  return <Result selectedOptions={selectedOptions} questions={questions} />;
};

export default ResultPage;
