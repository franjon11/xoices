interface QuestionNavProps {
  title: string;
  index: number;
  isSidebarOpen: boolean;
  selected?: boolean;
  isNew?: boolean;
  onClick?: () => void;
}

const initialClassQuestionNav = "w-full flex items-center gap-3 px-2 py-3 rounded-xl transition-all group";
const initialClassIconQuestionNav = "text-xs font-bold size-6 rounded-full flex items-center justify-center p-2"
const QuestionNav = ({ title, index, isSidebarOpen, selected = false, isNew = false, onClick }: QuestionNavProps) => {
  
  const classOpenSideBar = isSidebarOpen ? "justify-start" : "justify-center";
  const classSelectedBtn = selected ? "bg-white/20 border border-white/20 shadow-sm" : "";
  const classNew = isNew ? "border border-dashed border-white/30" : "hover:scale-105 hover:bg-white/10";

  const textNew = isNew ? "text-white/40 italic" : "text-white/90";

  const classSelectedIcon = selected ? "bg-white text-sage" : "bg-sage-dark/50 text-white/80";
  
  return (
    <button
      disabled={isNew}
      className={`${initialClassQuestionNav} ${classOpenSideBar} ${classSelectedBtn} ${classNew}`}
      onClick={onClick}>
      <span className={`${initialClassIconQuestionNav} ${classSelectedIcon}`}>{index}</span>
      {isSidebarOpen && <span className={`${textNew} text-sm font-medium truncate text-left`}>{title}</span>}
    </button>
  )
}

export default QuestionNav
