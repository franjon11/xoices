import React, { useContext } from "react";
import Layout from "../components/Layout";
import Exam from "../components/Exam";
import { QuestionContext } from "../utils/QuestionContext";

const ExamPage = () => {
  const { questions, setQuestions, selectedOptions, setSelectedOptions } =
    useContext(QuestionContext);
  return (
    questions.length > 0 && (
      <Exam
        questions={questions}
        setQuestions={setQuestions}
        selectedOptions={selectedOptions}
        setSelectedOptions={setSelectedOptions}
      />
    )
  );
};

export default ExamPage;
