import type { Question } from "../../../types/types";
import { FilePlus } from "lucide-react";
import QuestionNav from "./QuestionNav";
import SectionContainer from "../../ui/SectionContainer";

interface QuestionNavigatorProps {
  questions: Question[];
  currentQuestionIdx: number;
  handleSelectQuestion: (idx: number) => void;
  handleAddNewQuestion: () => void;
}

const QuestionNavigator = ({ questions, currentQuestionIdx, handleSelectQuestion, handleAddNewQuestion }: QuestionNavigatorProps) => {
  return (
    <aside className="lg:col-span-4">
      <SectionContainer className="sticky p-4 top-20" bg="sage">
        <header className="flex items-center justify-between mb-4">
          <h3 className="text-xs font-bold uppercase tracking-widest text-white/70">Preguntas</h3>
          <span className="text-xs text-white/90 mt-1">{questions.length} en Total</span>
        </header>
        <main>
          <div className="flex-1 max-h-[calc(100vh-300px)] overflow-y-auto custom-scrollbar space-y-2 m-4 p-2">
            {questions.map((question, idx) => (
              <QuestionNav
                key={`question-${idx}`}
                title={question.prompt}
                index={idx + 1}
                isSidebarOpen
                selected={currentQuestionIdx === idx}
                onClick={() => handleSelectQuestion(idx)}
              />
            ))}
          
            <QuestionNav
              title="Nueva Pregunta"
              index={questions.length + 1}
              isSidebarOpen
              isNew
            />
          </div>
          
          <div className="pt-4 border-t border-white/10">
            <button
              onClick={handleAddNewQuestion}
              className="w-full flex items-center justify-center gap-2 py-3 bg-white text-sage rounded-xl font-bold text-sm shadow-lg hover:bg-almond transition-colors">
              <FilePlus size={18} />
              Agregar Pregunta
            </button>
          </div>
        </main>
      </SectionContainer>
    </aside>
  );
}

export default QuestionNavigator