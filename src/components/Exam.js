import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { shuffle } from "@/utils/question";
import Layout from "./Layout";
import Question from "./Question";
import Result from "./Result";

const Exam = ({
  questions,
  setQuestions,
  selectedOptions,
  setSelectedOptions,
}) => {
  const [currentSectionIndex, setCurrentSectionIndex] = useState(0);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [currentSelectedOptions, setCurrentSelectedOptions] = useState([]);
  const router = useRouter();

  useEffect(() => {
    // Mezclar preguntas dentro de cada sección al iniciar el examen o rehacerlo
    const shuffledQuestions = questions.map((section) => ({
      ...section,
      questions: shuffle(section.questions),
    }));
    setQuestions(shuffledQuestions);

    setSelectedOptions([]);
    setCurrentSectionIndex(0);
    setCurrentQuestionIndex(0);
    setCurrentSelectedOptions([]);
  }, []);

  const currentSection = questions[currentSectionIndex];
  const currentQuestion = currentSection.questions[currentQuestionIndex];
  const optionsSelectedQ = selectedOptions.find(
    (x) => x.questionId === currentQuestion.id
  );

  useEffect(() => {
    setCurrentSelectedOptions(
      optionsSelectedQ === undefined ? [] : optionsSelectedQ.optionIds
    );
  }, [currentQuestionIndex]);

  const handleOptionSelect = (optionIds) => {
    setSelectedOptions((prevSelectedOptions) => {
      const updatedSelectedOptions = prevSelectedOptions.filter(
        (option) => option.questionId != currentQuestion.id
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

    const optionsSelectedQ = selectedOptions.find(
      (x) => x.questionId === currentQuestion.id
    );

    setCurrentSelectedOptions(
      optionsSelectedQ === undefined ? [] : optionsSelectedQ.optionIds
    );
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
          selectedOptions={currentSelectedOptions}
          setSelectedOptions={setCurrentSelectedOptions}
          onOptionSelect={handleOptionSelect}
          onNextQuestion={handleNextQuestion}
          onPreviousQuestion={handlePreviousQuestion}
          onSubmit={handleSubmit}
          isLastQuestion={
            currentSectionIndex === questions.length - 1 &&
            currentQuestionIndex === currentSection.questions.length - 1
          }
          isFirstQuestion={
            currentQuestionIndex === 0 && currentSectionIndex === 0
          }
        />
      ) : (
        <Result />
      )}
    </Layout>
  );
};

export default Exam;
