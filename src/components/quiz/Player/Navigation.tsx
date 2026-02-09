import { ArrowLeft, ArrowRight, ArrowRightFromLine, type LucideIcon } from "lucide-react";

type TypeBtn = "prev" | "next" | "finish"

interface NavigationProps {
  handleBack: () => void;
  handleNext: () => void;
  isFirstQuestion: boolean;
  isLastQuestion: boolean;
  selectedAnswer: number | undefined;
}

const ConfigBtn: Record<TypeBtn, { icon: LucideIcon, label: string }> = {
  prev: { icon: ArrowLeft, label: "ANTERIOR" },
  next: { icon: ArrowRight, label: "SIGUIENTE" },
  finish: { icon: ArrowRightFromLine, label: "TERMINAR QUIZ" }
}

const IconBtnType = ({ typeBtn }: { typeBtn: TypeBtn }) => {
  const { icon: Icon } = ConfigBtn[typeBtn]
  return <Icon size={20} strokeWidth={3} />
}

const Navigation = ({ handleBack, handleNext, isFirstQuestion, isLastQuestion, selectedAnswer }: NavigationProps) => {
  return (
    <div className="px-10 pb-12 flex items-center justify-between gap-3">
      <button 
        onClick={handleBack}
        disabled={isFirstQuestion}
        className="grow flex items-center justify-center gap-2 px-8 h-14 rounded-2xl border-2 border-sage text-sage font-black hover:bg-sage/5 transition-all disabled:opacity-20"
      >
        <IconBtnType typeBtn="prev" />
        <span className="hidden sm:inline">{ConfigBtn.prev.label}</span>
      </button>
      
      <button 
        onClick={handleNext}
        disabled={selectedAnswer === undefined}
        className="grow flex items-center justify-center gap-3 px-8 h-14 rounded-2xl bg-sage text-white font-black hover:bg-sage-dark shadow-xl shadow-sage/20 transition-all disabled:opacity-40 disabled:scale-100 active:scale-95"
      >
        <span className="hidden sm:inline">{isLastQuestion ? ConfigBtn.finish.label : ConfigBtn.next.label}</span>
        <IconBtnType typeBtn={isLastQuestion ? "finish" : "next"} />
      </button>
    </div>
  )
}

export default Navigation