import { useState } from "react";
import type { Question } from "../../../types/types";
import { FilePlus, Search } from "lucide-react";
import QuestionNav from "./QuestionNav";
import SectionContainer from "../../layout/Section/SectionContainer";

interface QuestionNavigatorProps {
  questions: Question[];
  currentQuestionIdx: number;
  handleSelectQuestion: (idx: number) => void;
  handleAddNewQuestion: () => void;
}

const QuestionNavigator = ({ questions, currentQuestionIdx, handleSelectQuestion, handleAddNewQuestion }: QuestionNavigatorProps) => {
  const [search, setSearch] = useState("");

  const paddedSearch = search.trim().padStart(4, '0');
  const filtered = search.trim()
    ? questions.filter(q => q.numericId === paddedSearch)
    : questions;

  return (
    <aside className="lg:col-span-4">
      <SectionContainer className="sticky p-4 top-20" bg="sage">
        <header className="flex items-center justify-between mb-4">
          <h3 className="text-xs font-bold uppercase tracking-widest text-white/70">Preguntas</h3>
          <span className="text-xs text-white/90 mt-1">{questions.length} en Total</span>
        </header>
        <main>
          <div className="flex items-center gap-2 mx-4 mb-2 px-3 py-2 bg-white/10 rounded-xl border border-white/20">
            <Search size={13} className="text-white/50 shrink-0" />
            <input
              type="number"
              min={1}
              max={9999}
              value={search}
              onChange={e => setSearch(e.target.value.slice(0, 4))}
              placeholder="Buscar por ID..."
              className="w-full bg-transparent text-xs text-white placeholder:text-white/40 font-medium outline-none [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
            />
          </div>

          <div className="flex-1 max-h-[calc(100vh-350px)] overflow-y-auto custom-scrollbar space-y-2 m-4 p-2">
            {filtered.map((question) => {
              const idx = questions.indexOf(question);
              return (
                <QuestionNav
                  key={`question-${idx}`}
                  title={question.prompt}
                  index={idx + 1}
                  isSidebarOpen
                  selected={currentQuestionIdx === idx}
                  onClick={() => handleSelectQuestion(idx)}
                />
              );
            })}

            {filtered.length === 0 && (
              <p className="text-center text-white/40 text-xs py-4 italic">Sin resultados</p>
            )}

            {!search.trim() && (
              <QuestionNav
                title="Nueva Pregunta"
                index={questions.length + 1}
                isSidebarOpen
                isNew
              />
            )}
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