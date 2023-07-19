import { useRouter } from "next/router";
import Layout from "./Layout";
import styles from "../styles/result.module.css";

const Result = ({ questions, selectedOptions }) => {
  const router = useRouter();

  const handleRetakeExam = () => {
    router.push("/");
  };

  const correctAnswers = selectedOptions.filter((option) => {
    const question = questions.find((q) => q.id === option.questionId);
    const selectedOptionIds = option.optionIds.sort();
    const correctOptionIds = question.options
      .filter((o) => o.isCorrect)
      .map((o) => o.id)
      .sort();
    return (
      JSON.stringify(selectedOptionIds) === JSON.stringify(correctOptionIds)
    );
  });

  const result = Math.floor((correctAnswers.length / questions.length) * 100);

  return (
    <Layout>
      <div className={styles.resultContainer}>
        <h2 className={styles.title}>Resultado del Examen</h2>
        <div className={styles.summary}>
          <p>
            Preguntas acertadas: {correctAnswers.length} / {questions.length}
          </p>
          <p>Resultado: {result}%</p>
        </div>
        <div className={styles.details}>
          {questions.map((question) => {
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
        <button className={styles.retakeButton} onClick={handleRetakeExam}>
          Rehacer Examen
        </button>
      </div>
    </Layout>
  );
};

export default Result;
