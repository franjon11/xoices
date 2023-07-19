import { useState } from "react";
import { useRouter } from "next/router";
import Layout from "./Layout";
import Question from "./Question";
import Result from "./Result";

const Exam = ({ questions }) => {
  const [currentSectionIndex, setCurrentSectionIndex] = useState(0);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedOptions, setSelectedOptions] = useState([]);
  const router = useRouter();

  const currentSection = questions[currentSectionIndex];
  const currentQuestion = currentSection.questions[currentQuestionIndex];

  const handleOptionSelect = (optionIds) => {
    setSelectedOptions((prevSelectedOptions) => {
      const updatedSelectedOptions = prevSelectedOptions.filter(
        (option) => option.questionId < currentQuestion.id
      );
      updatedSelectedOptions.push({
        questionId: currentQuestion.id,
        optionIds,
      });
      return updatedSelectedOptions;
    });
  };

  const handleNextQuestion = () => {
    if (currentQuestionIndex < currentSection.questions.length - 1) {
      setCurrentQuestionIndex((prevQuestionIndex) => prevQuestionIndex + 1);
    } else if (currentSectionIndex < questions.length - 1) {
      setCurrentSectionIndex((prevSectionIndex) => prevSectionIndex + 1);
      setCurrentQuestionIndex(0);
    } else {
      // No hay más preguntas, mostrar resultados
      router.push("/result");
    }
  };

  const handlePreviousQuestion = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex((prevQuestionIndex) => prevQuestionIndex - 1);
    } else if (currentSectionIndex > 0) {
      setCurrentSectionIndex((prevSectionIndex) => prevSectionIndex - 1);
      const prevSection = questions[currentSectionIndex - 1];
      setCurrentQuestionIndex(prevSection.questions.length - 1);
    }
  };

  const handleSubmit = () => {
    // Aquí puedes realizar cualquier lógica adicional antes de mostrar los resultados

    router.push("/result");
  };

  return (
    <Layout section={currentSection.text}>
      {currentQuestion ? (
        <Question
          question={currentQuestion}
          selectedOptions={selectedOptions}
          onOptionSelect={handleOptionSelect}
          onNextQuestion={handleNextQuestion}
          onPreviousQuestion={handlePreviousQuestion}
          onSubmit={handleSubmit}
          isLastQuestion={
            currentSectionIndex === questions.length - 1 &&
            currentQuestionIndex === currentSection.questions.length - 1
          }
          isFirstQuestion={
            currentSectionIndex === 0 && currentQuestionIndex === 0
          }
        />
      ) : (
        <Result
          selectedOptions={selectedOptions}
          questions={questions}
          onRetakeExam={() => {
            setSelectedOptions([]);
            setCurrentSectionIndex(0);
          }}
        />
      )}
    </Layout>
  );
};

export default Exam;
