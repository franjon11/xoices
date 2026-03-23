import CheckBox from "../../ui/CheckBox"

interface QuestionQuizProps {
  title: string
  selected?: boolean
  setSelected: (checked: boolean) => void
}

const initialClassQQuiz = "flex items-start gap-3 p-3 rounded-lg border border-sage/20"
const selectedClass = "bg-almond"
const notSelectedClass = "bg-almond/80"
const QuestionQuiz = ({ title, selected = false, setSelected }: QuestionQuizProps) => {
  const claseState = selected ? selectedClass : notSelectedClass;
  return <div className={`${initialClassQQuiz} ${claseState}`}>
          <CheckBox checked={selected} onChange={(e) => setSelected(e.target.checked)} />
          <div className="flex-1">
            <p className="text-xs font-semibold tracking-wider text-sage">{title}</p>
          </div>
        </div>
}

export default QuestionQuiz;