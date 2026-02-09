import type { Question, TypeQuestion } from "../../../types/types";
import OptionAnswer from "./OptionAnswer";
import Navigation from "./Navigation";
import type { SetAnswerFunction } from "../../../store/useSessionStore";

interface QuestionCardProps {
  currentQuestion: Question;
  selectedAnswer: number | undefined;
  setAnswer: SetAnswerFunction;
  handleNext: () => void;
  handleBack: () => void;
  typeQuestion: TypeQuestion
}

const QuestionCard = ({ currentQuestion, selectedAnswer, setAnswer, handleNext, handleBack, typeQuestion }: QuestionCardProps) => {

  const { id, prompt, options } = currentQuestion;

  const isFirstQuestion = typeQuestion === "first"
  const isLastQuestion = typeQuestion === "last"

  return (
    <section className="bg-white rounded-[2rem] border-2 border-sage shadow-2xl shadow-sage/10 overflow-hidden">
      <div className="p-5 md:p-10 space-y-5">
        <div className="text-md md:text-lg font-black text-slate-800 leading-tight quiz-prompt">
          {prompt}
        </div>

        <div className="grid grid-cols-1 gap-4">
          {options.map((option, idx) => (
            <OptionAnswer
              key={`${id}-${idx}`}
              option={option}
              idx={idx}
              selected={selectedAnswer === idx}
              setAnswer={setAnswer}
              questionId={id}
            />
          ))}
        </div>
      </div>

      <Navigation
        handleBack={handleBack}
        handleNext={handleNext}
        isFirstQuestion={isFirstQuestion}
        isLastQuestion={isLastQuestion}
        selectedAnswer={selectedAnswer}
      />
    </section>
  )
}

export default QuestionCard
