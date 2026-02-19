import { Check, ChevronDown, FilePlus } from "lucide-react";
import Button from "../../ui/Button";
import type { QuestionFormAddProps } from "../../../types/types";
import { getCharForIdx } from "../../../helpers/utils";
import SectionContainer from "../../layout/SectionContainer";
import FormInputElement from "../../ui/FormInput";
import useCollapsable from "../../../hooks/useCollapsable";
import { useQuestionDetails } from "../../../hooks/useQuestionDetails";

const QuestionDetails = ({ question, currentQuestionIdx, addQuestionToQuiz }: QuestionFormAddProps) => {
  
  const {
    refPrompt,
    refExplanation,
    correctOptionIdx,
    setCorrectOptionIdx,
    handleAddQuestion,
    addRefOption
  } = useQuestionDetails({ question, addQuestionToQuiz });

  const { refSection, toggleCollapse } = useCollapsable();

  return (
    <SectionContainer ref={refSection} bordered>
      <header className="bg-almond/40 px-6 py-4 flex items-center justify-between border-b border-sage/10">
        <div className="flex items-center gap-3">
          <span className="bg-sage text-white px-4 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest">Pregunta {currentQuestionIdx + 1}</span>
        </div>
        <button onClick={toggleCollapse} className="text-sage p-2 rounded-full" title="Expandir/Colapsar">
          <ChevronDown size={20} strokeWidth={2.5} className="animate-in transition-all duration-500" />
        </button>
      </header>
    
      <main
        data-collapse="false"
        className="overflow-hidden transition-all duration-500 ease-in-out delay-100 slide-in-from-top-4
          data-[collapse=true]:max-h-0
          data-[collapse=false]:max-h-[1000px]
        ">
        <div className="p-8 space-y-8">
          <div className="space-y-4">
            <FormInputElement
              key={`${question.id}-${currentQuestionIdx}-prompt`}
              label="Enunciado"
              defaultValue={question.prompt}
              ref={refPrompt}
              as="textarea"
              rows={4}
              placeholder="Escribe la pregunta..."
            />
          </div>

          <div className="space-y-4">
            <FormInputElement
              key={`${question.id}-${currentQuestionIdx}-explanation`}
              label="Explicación"
              defaultValue={question.explanation}
              ref={refExplanation}
              as="textarea"
              rows={2}
              placeholder="Escribe la explicación..."
            />
          </div>

          <div className="space-y-6">
            <label className="block text-[10px] font-black text-sage uppercase tracking-[0.2em]">Opciones de Respuesta</label>
            <div className="grid grid-cols-1 gap-4">  
              {question.options.map((option, idx) => (
                <div key={`${question.id}-${currentQuestionIdx}-option-${idx}`} className="flex items-center gap-4 group">
                  <button 
                    onClick={() => setCorrectOptionIdx(idx)}
                    className={`size-8 rounded-2xl border-2 flex items-center justify-center transition-all duration-300 ${
                      correctOptionIdx === idx 
                        ? 'border-sage bg-sage text-white shadow-lg shadow-sage/30 scale-110' 
                        : 'border-slate-100 bg-slate-50 text-slate-300 hover:border-sage/50'
                    }`}
                    title="Marcar como correcta"
                  >
                    {correctOptionIdx === idx ? <Check size={10} strokeWidth={3} /> : ""}
                  </button>
                  <input 
                    type="text"
                    defaultValue={option}
                    ref={el => addRefOption(el, idx)}
                    className="flex-1 bg-almond/10 border-2 border-sage/10 rounded-2xl px-6 py-3 text-sm focus:ring-4 focus:ring-sage/20 focus:border-sage outline-none transition-all"
                    placeholder={`Opción ${getCharForIdx(idx)}`}
                  />
                </div>
              ))}
            </div>
          </div>

          <Button onClick={handleAddQuestion} variant="secondary" icon={{ component: FilePlus, size: 18 }} fullWidth>
            Guardar Pregunta
          </Button>
        </div>
      </main>
    </SectionContainer>
  )
}

export default QuestionDetails