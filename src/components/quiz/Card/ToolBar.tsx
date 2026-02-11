import { useAuthStore } from "../../../store/useAuthStore"
import type { InternalHandleQuiz } from "./QuizCard";
import ToolBarOwner from "./ToolBarOwner";
import ToolBarPublic from "./ToolBarPublic"

interface ToolBarProps {
  creatorId: string;
  onDelete: InternalHandleQuiz;
  onEdit: InternalHandleQuiz;
  onFavorite: InternalHandleQuiz;
}

const transition = "opacity-100 md:opacity-0 md:group-hover:opacity-100 md:transition-opacity"

const ToolBar = ({ creatorId, onDelete, onEdit, onFavorite }: ToolBarProps) => {
  const user = useAuthStore((state) => state.user)

  const isOwner = user?.id === creatorId
  return (
    <div className={`absolute top-0 right-0 p-4 ${transition}`}>
      <div className={`flex gap-2 p-4 ${transition}`}>
        <ToolBarPublic onFavorite={onFavorite} />
        <ToolBarOwner isOwner={isOwner}  onDelete={onDelete} onEdit={onEdit} />
      </div>
    </div>
  )
}

export default ToolBar