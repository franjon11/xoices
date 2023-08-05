import { useEffect, useState } from "react";
import { shuffle } from "@/utils/question";
import styles from "../styles/question.module.css";

const inciso = (numero) => {
  if (numero >= 1 && numero <= 26) {
    // Obtener el código ASCII de la letra 'A' y sumarle el número menos 1
    return String.fromCharCode(65 + numero - 1).toLowerCase();
  } else {
    // Si el número está fuera del rango válido, devolver null o lanzar un error
    return "";
  }
};

const Question = ({
  question,
  selectedOptions,
  setSelectedOptions,
  onOptionSelect,
  onNextQuestion,
  onPreviousQuestion,
  onSubmit,
  isLastQuestion,
  isFirstQuestion,
}) => {
  const { id, text, options, isMultipleChoice } = question;

  const [optionsQ, setOptionsQ] = useState([]);

  const handleOptionSelect = (optionId) => {
    let updatedSelectedOptions;

    if (isMultipleChoice) {
      if (selectedOptions.includes(optionId)) {
        updatedSelectedOptions = selectedOptions.filter(
          (id) => id !== optionId
        );
      } else {
        updatedSelectedOptions = [...selectedOptions, optionId];
      }
    } else {
      updatedSelectedOptions = [optionId];
    }

    setSelectedOptions(updatedSelectedOptions);
    onOptionSelect(updatedSelectedOptions);
  };

  useEffect(() => {
    setOptionsQ(shuffle(options));
  }, [options]);

  return (
    <div className={styles.questionContainer}>
      <h2 className={styles.question}>{text}</h2>
      <ul className={styles.options}>
        {optionsQ.map((option, idx) => (
          <li key={option.id} className={styles.option}>
            <label>
              <input
                type={isMultipleChoice ? "checkbox" : "radio"}
                name={`question_${id}`}
                value={option.id}
                checked={selectedOptions.includes(option.id)}
                onChange={() => handleOptionSelect(option.id)}
              />
              {inciso(idx + 1) + ")" + option.text}
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
            disabled={selectedOptions.length === 0}
          >
            Siguiente
          </button>
        )}
      </div>
    </div>
  );
};

export default Question;
