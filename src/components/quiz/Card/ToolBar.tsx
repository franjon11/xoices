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

const ToolBar = ({ creatorId, onDelete, onEdit, onFavorite }: ToolBarProps) => {
  const user = useAuthStore((state) => state.user)

  const isOwner = user?.id === creatorId
  return (
    <div className="flex gap-2 p-4 opacity-0 group-hover:opacity-100 transition-opacity">
      <ToolBarPublic onFavorite={onFavorite} />
      <ToolBarOwner isOwner={isOwner}  onDelete={onDelete} onEdit={onEdit} />
    </div>
  )
}

export default ToolBar