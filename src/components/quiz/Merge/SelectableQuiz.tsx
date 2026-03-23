import { ArrowBigLeftDash, BookText, CalendarPlus } from "lucide-react"
import { totalQuestionsToStr } from "../../../helpers/utils"
import type { Quiz } from "../../../types/types"

type SelectableQuizProps = Pick<Quiz, "title" | "createdAt"> & {
  totalQuestions: number
  onSelected: () => void
}

const SelectableQuiz = ({ title, totalQuestions, createdAt, onSelected }: SelectableQuizProps) => {
  return (
    <div className="group cursor-pointer p-3 rounded-lg bg-white dark:bg-sage-dark border border-transparent hover:border-sage/50 shadow-sm transition-all lg:hover:-translate-x-5 lg:hover:translate-y-0 hover:-translate-y-3" onClick={onSelected}>
      <div className="flex items-start justify-between">
        <p className="text-sm font-semibold text-slate-800 truncate">{title}</p>
        <span className="text-neutral-400 dark:text-sage-light group-hover:text-sage dark:group-hover:text-almond transition-colors text-lg group-hover:animate-pulse group-hover:scale-150 rotate-90 lg:rotate-0">
          <ArrowBigLeftDash size={20} strokeWidth={3} />
        </span>
      </div>
      <div className="flex items-center gap-2 mt-2 text-[10px] text-neutral-500 dark:text-slate-700">
        <span className="flex items-center gap-1">
          <span className="text-[12px]">
            <BookText size={12} strokeWidth={2.5} />
          </span> 
          {totalQuestionsToStr(totalQuestions)}
        </span>
        <span>•</span>
        <span className="flex items-center gap-1">
          <span className="text-[12px]">
            <CalendarPlus size={12} strokeWidth={2.5} />
          </span> 
          {new Date(createdAt).toLocaleDateString()}
        </span>
      </div>
    </div>
  )
}

export default SelectableQuiz;