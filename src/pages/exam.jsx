import React, { useContext } from "react";
import Layout from "../components/Layout";
import Exam from "../components/Exam";
import { QuestionContext } from "../utils/QuestionContext";

const ExamPage = () => {
  const { questions } = useContext(QuestionContext);
  return (
    <Layout>
      <Exam questions={questions} />
    </Layout>
  );
};

export default ExamPage;