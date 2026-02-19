import QuestionNavigator from "../components/quiz/Details/QuestionNavigator";
import QuizInfo from "../components/quiz/Details/QuizInfo";
import QuestionDetails from "../components/quiz/Details/QuestionDetails";
import useQuizDetails, { initialQuestion } from "../hooks/useQuizDetails";
import { Save } from "lucide-react";
import Button from "../components/ui/Button";
import type { Quiz } from "../types/types";
import MainContainer from "../components/layout/MainContainter";

interface QuizDetailsProps {
  quiz: Quiz | undefined;
}

const QuizDetails = ({ quiz }: QuizDetailsProps) => {

  const {
    refTitle,
    refDescription,
    questions,
    currentQuestionIdx,
    setCurrentQuestionIdx,
    addQuestionToQuiz,
    handleSaveQuiz
  } = useQuizDetails(quiz);

  const currentQuestion = questions.length > currentQuestionIdx ? questions[currentQuestionIdx] : initialQuestion;

  const handleSelectQuestion = (idx: number) => {
    setCurrentQuestionIdx(idx);
  }

  const handleAddNewQuestion = () => {
    setCurrentQuestionIdx(questions.length);
  }

  return (
    <MainContainer>
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
        <div className="lg:col-span-8 space-y-6">
          <QuizInfo
            title={{ ref: refTitle, value: quiz?.title }}
            description={{ ref: refDescription, value: quiz?.description }}
          />
          
          <QuestionDetails question={currentQuestion} currentQuestionIdx={currentQuestionIdx} addQuestionToQuiz={addQuestionToQuiz} />
          <Button onClick={handleSaveQuiz} variant="primary" icon={{ component: Save, size: 20 }} fullWidth>
            {quiz ? "GUARDAR CUESTIONARIO" : "PUBLICAR CUESTIONARIO"}
          </Button>
        </div>

        <QuestionNavigator
          questions={questions}
          currentQuestionIdx={currentQuestionIdx}
          handleSelectQuestion={handleSelectQuestion}
          handleAddNewQuestion={handleAddNewQuestion}
        />
      </div>
    </MainContainer>
  );
}

export default QuizDetails