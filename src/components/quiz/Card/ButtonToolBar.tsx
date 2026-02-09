import { Heart, Pencil, Trash2 } from "lucide-react";
import type { InternalHandleQuiz } from "./QuizCard";

const classNameButtonToolBar = "p-2 text-slate-300 transition-colors bg-white rounded-full shadow-md"
type TypeToolBar = 'trash' | 'edit' | 'favorite'
const classNameBtnToolBar = {
  trash: 'hover:text-red-300',
  edit: 'hover:text-almond',
  favorite: 'hover:text-sage'
}

const IconToolBar = {
  trash: Trash2,
  edit: Pencil,
  favorite: Heart
}

interface ButtonToolBarProps {
  onClick: InternalHandleQuiz;
  type: TypeToolBar;
}

const ButtonToolBar = ({ onClick, type }: ButtonToolBarProps) => {
  const Icon = IconToolBar[type]
  
  return (
    <button 
      onClick={onClick}
      className={`${classNameButtonToolBar} ${classNameBtnToolBar[type]}`}
    >
      <Icon size={18} />
    </button>
  )
}

export default ButtonToolBar