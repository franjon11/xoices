import { Check } from "lucide-react";
import type { SetAnswerFunction } from "../../../store/useSessionStore";

interface OptionAnswerProps {
  option: string;
  idx: number;
  setAnswer: SetAnswerFunction;
  questionId: string;
  selected?: boolean;
}

const OptionAnswer = ({ option, idx, setAnswer, questionId, selected = false }: OptionAnswerProps) => {
  
  const handleSelectOption = () => {
    setAnswer(questionId, idx);
  }

  return (
    <label 
      className={`group flex items-center gap-5 rounded-2xl border-2 py-4 px-6 cursor-pointer transition-all duration-300 ${
        selected
          ? 'border-sage bg-sage/5 ring-4 ring-sage/10' 
          : 'border-slate-100 bg-slate-50 hover:border-sage/40 hover:bg-white'
      }`}
    >
      <input 
        type="radio" 
        className="sr-only"
        name="option"
        checked={selected}
        onChange={handleSelectOption}
      />
      <div className={`size-8 rounded-full border-2 flex items-center justify-center transition-all ${
        selected ? 'border-sage bg-white scale-110' : 'border-slate-300'
      }`}>
        {selected && <Check className="text-sage size-4 animate-in zoom-in-50" strokeWidth={4} />}
        {!selected && <span className="text-[10px] font-black text-slate-300">{String.fromCharCode(65 + idx)}</span>}
      </div>
      <div className="flex-1">
        <p className={`text-sm ${selected ? 'font-black text-slate-800' : 'font-bold text-slate-600'}`}>
          {option}
        </p>
      </div>
    </label>
  )
}

export default OptionAnswer