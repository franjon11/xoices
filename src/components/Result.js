import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Layout from "./Layout";
import styles from "../styles/result.module.css";
import stylesQ from "../styles/question.module.css";

const Result = ({ questions, selectedOptions }) => {
  const [totalQuestions, setTotalQuestions] = useState(0);
  const router = useRouter();

  useEffect(() => {
    setTotalQuestions(
      questions.reduce((acc, s) => {
        return acc + s.totalPreguntas;
      }, 0)
    );
  }, []);

  const handleRetakeExam = () => {
    router.push("/exam");
  };

  const correctAnswers = selectedOptions.filter((option) => {
    let question;
    for (let index = 0; index < questions.length; index++) {
      const s = questions[index];
      const questionAux = s.questions.find((q) => q.id === option.questionId);
      if (questionAux !== undefined && questionAux !== null) {
        question = questionAux;
        break;
      }
    }
    const selectedOptionIds = option.optionIds.sort();
    const correctOptionIds = question.options
      .filter((o) => o.isCorrect)
      .map((o) => o.id)
      .sort();
    return (
      JSON.stringify(selectedOptionIds) === JSON.stringify(correctOptionIds)
    );
  });

  const result = Math.floor((correctAnswers.length / totalQuestions) * 100);
  return (
    <Layout section="Resultado del Examen">
      <div className={styles.resultContainer}>
        <div className={styles.summary}>
          <p>
            Preguntas acertadas: {correctAnswers.length} / {totalQuestions}
          </p>
          <p>Resultado: {result}%</p>
        </div>
        <button className={styles.retakeButton} onClick={handleRetakeExam}>
          Rehacer Examen
        </button>
        <div className={styles.details}>
          {questions.map((s) => {
            return (
              <div key={s.text} className={stylesQ.questionContainer}>
                <h1 className={styles.title}>{s.text}</h1>
                <div>
                  {s.questions.map((question) => {
                    const selectedOption = selectedOptions.find(
                      (option) => option.questionId === question.id
                    );
                    const isCorrect =
                      selectedOption &&
                      question.options
                        .filter((option) => option.isCorrect)
                        .every((option) =>
                          selectedOption.optionIds.includes(option.id)
                        );
                    return (
                      <div
                        key={question.id}
                        className={`${styles.question} ${
                          isCorrect ? styles.correct : styles.incorrect
                        }`}
                      >
                        <h3>{question.text}</h3>
                        <ul>
                          {question.options.map((option) => (
                            <li
                              key={option.id}
                              className={`${styles.option} ${
                                option.isCorrect ? styles.correctOption : ""
                              }`}
                            >
                              {option.text}
                            </li>
                          ))}
                        </ul>
                      </div>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </Layout>
  );
};

export default Result;
