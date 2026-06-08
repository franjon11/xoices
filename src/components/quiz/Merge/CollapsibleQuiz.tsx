import { Trash } from "lucide-react";
import HeaderSection from "../../layout/Section/HeaderSection";
import SectionContainer from "../../layout/Section/SectionContainer";
import CheckBox from "../../ui/CheckBox";
import QuestionQuiz from "./QuestionQuiz";
import { totalQuestionsToStr } from "../../../helpers/utils";
import MainSection from "../../layout/Section/MainSection";
import type { QuizSelectable } from "../../../types/types";
import useCollapsable from "../../../hooks/useCollapsable";

type CollapsibleQuizProps = Pick<QuizSelectable, "title" | "questions" > & {
  open?: boolean
  onSelectQuestion: (select: boolean, questionId?: string) => void
  onRemove: () => void;
}

const CollapsibleQuiz = ({ title, questions, onSelectQuestion, onRemove, open = false }: CollapsibleQuizProps) => {  
  // questionId = undefined => select/unselect all
  const handleSelect = (checked: boolean, questionId?: string) => {
    onSelectQuestion(checked, questionId);
  }

  const { refSection, toggleCollapse } = useCollapsable();

  const allSelected = questions.every(x => x.selected);
  return (
    <SectionContainer ref={refSection} bordered>
      {/* Header */}
      <HeaderSection
        collapsable={{ toggleCollapse: toggleCollapse, posIcon: "init", defaultOpen: open }}
        toolbar={
          <>
            <label className="flex items-center gap-2 cursor-pointer">
              <CheckBox 
                checked={allSelected} 
                onChange={(e) => handleSelect(e.target.checked)}
              />
              <span className="text-xs font-bold text-sage">
                {allSelected ? "Desmarcar" : "Marcar"} todos
              </span>
            </label>
            <button onClick={onRemove} className="text-almond-dark hover:scale-110 hover:bg-sage-light/20 rounded-full p-2 flex items-center justify-center">
              <Trash size={20} strokeWidth={2.5} />
            </button>
          </>
        }
        >
        <>
          <h3 className="font-bold text-sage-dark dark:text-sage-light">{title}</h3>
          <span className="bg-sage/20 text-sage text-[10px] font-bold px-2 py-0.5 rounded-full uppercase">{totalQuestionsToStr(questions.length)}</span>
        </>
      </HeaderSection>

      {/* Body Animado con useRef */}
      <MainSection collapsable={{ defaultOpen: open }}>
        <div className="p-4 flex flex-col gap-3 max-h-96 overflow-y-auto custom-scrollbar">
          {
            questions.map(qe => 
              <QuestionQuiz
                key={`question-${qe.id}`}
                title={qe.prompt}
                selected={qe.selected}
                setSelected={(chk) => handleSelect(chk, qe.id)}
              />
            )
          }
        </div>
      </MainSection>
    </SectionContainer>
  );
};

export default CollapsibleQuiz;
