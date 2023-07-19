const Result = ({ selectedOptions, questions, onRetakeExam }) => {
  const totalQuestions = questions.length;
  const totalCorrect = selectedOptions.reduce((count, option) => {
    const question = questions.find((q) => q.id === option.questionId);
    const correctOption = question.options.find((opt) => opt.isCorrect);
    return correctOption.id === option.optionId ? count + 1 : count;
  }, 0);
  const percentageCorrect = (totalCorrect / totalQuestions) * 100;

  return (
    <>
      <h2>Resultado del examen</h2>
      <p>Preguntas totales: {totalQuestions}</p>
      <p>Respuestas correctas: {totalCorrect}</p>
      <p>Porcentaje de respuestas correctas: {percentageCorrect.toFixed(2)}%</p>
      <button onClick={onRetakeExam}>Rehacer Examen</button>
    </>
  );
};

export default Result;
