import { v4 as uuidv4 } from "uuid";

export const parseQuestionsFromText = (text) => {
  const sections = text.split("#").map((sectionText) => sectionText.trim());

  const questions = sections.reduce((acc, sectionText) => {
    const lines = sectionText
      .split("\n")
      .map((line) => line.trim())
      .filter((line) => line !== "");

    let currentQuestion;
    const sectionQuestions = [];

    let tituloSeccion = lines[0];
    for (let i = 1; i < lines.length; i++) {
      const line = lines[i];
      let cantCorrectas = 0;
      if (line.startsWith("$")) {
        // Nueva pregunta
        const questionText = line.substring(1).trim();
        const options = [];

        let j = i + 1;
        while (j < lines.length && !lines[j].startsWith("$")) {
          if (lines[j].endsWith("*")) {
            const optionText = lines[j]
              .substring(0, lines[j].length - 1)
              .trim();
            options.push({
              text: optionText,
              isCorrect: true,
              id: uuidv4(),
            });
            cantCorrectas++;
          } else {
            const optionText = lines[j].trim();
            options.push({
              text: optionText,
              isCorrect: false,
              id: uuidv4(),
            });
          }
          j++;
        }

        currentQuestion = {
          text: questionText,
          options,
          isMultipleChoice: cantCorrectas > 1,
          id: uuidv4(),
        };
        sectionQuestions.push(currentQuestion);
        i = j - 1; // Actualizar el índice externo
      }
    }

    if (sectionQuestions.length > 0) {
      acc.push({
        questions: sectionQuestions,
        text: tituloSeccion,
        totalPreguntas: sectionQuestions.length,
      });
    }

    return acc;
  }, []);

  return questions;
};

export const shuffle = (array) => {
  const shuffledArray = [...array];
  for (let i = shuffledArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffledArray[i], shuffledArray[j]] = [shuffledArray[j], shuffledArray[i]];
  }
  return shuffledArray;
};
