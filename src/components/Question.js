import { useState } from "react";
import styles from "../styles/question.module.css";

const Question = ({
  question,
  selectedOptions,
  onOptionSelect,
  onNextQuestion,
  onPreviousQuestion,
  onSubmit,
  isLastQuestion,
  isFirstQuestion,
}) => {
  const { id, text, options, isMultipleChoice } = question;
  const [selectedOptionIds, setSelectedOptionIds] = useState(selectedOptions);

  const handleOptionSelect = (optionId) => {
    let updatedSelectedOptions;

    if (isMultipleChoice) {
      if (selectedOptionIds.includes(optionId)) {
        updatedSelectedOptions = selectedOptionIds.filter(
          (id) => id !== optionId
        );
      } else {
        updatedSelectedOptions = [...selectedOptionIds, optionId];
      }
    } else {
      updatedSelectedOptions = [optionId];
    }

    setSelectedOptionIds(updatedSelectedOptions);
    onOptionSelect(updatedSelectedOptions);
  };

  return (
    <div className={styles.questionContainer}>
      <h2 className={styles.question}>{text}</h2>
      <ul className={styles.options}>
        {options.map((option) => (
          <li key={option.id} className={styles.option}>
            <label>
              <input
                type={isMultipleChoice ? "checkbox" : "radio"}
                name={`question_${id}`}
                value={option.id}
                checked={selectedOptionIds.includes(option.id)}
                onChange={() => handleOptionSelect(option.id)}
              />
              {option.text}
            </label>
          </li>
        ))}
      </ul>
      <div className={styles.navigation}>
        {!isFirstQuestion && (
          <button
            className={styles.previousButton}
            onClick={onPreviousQuestion}
          >
            Anterior
          </button>
        )}
        {isLastQuestion ? (
          <button className={styles.submitButton} onClick={onSubmit}>
            Enviar
          </button>
        ) : (
          <button
            className={styles.nextButton}
            onClick={onNextQuestion}
            disabled={selectedOptionIds.length === 0}
          >
            Siguiente
          </button>
        )}
      </div>
    </div>
  );
};

export default Question;
