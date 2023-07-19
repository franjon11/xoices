import React, { useState, createContext } from "react";

export const QuestionContext = createContext();

export const QuestionProvider = ({ children }) => {
  const [questions, setQuestions] = useState([]);
  const [selectedOptions, setSelectedOptions] = useState([]);

  return (
    <QuestionContext.Provider
      value={{ questions, setQuestions, selectedOptions, setSelectedOptions }}
    >
      {children}
    </QuestionContext.Provider>
  );
};
