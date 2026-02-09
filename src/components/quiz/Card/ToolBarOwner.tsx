import ButtonToolBar from "./ButtonToolBar";
import type { InternalHandleQuiz } from "./QuizCard";

interface ToolBarOwnerProps {
  isOwner: boolean;
  onDelete: InternalHandleQuiz;
  onEdit: InternalHandleQuiz;
}

const ToolBarOwner = ({ isOwner, onDelete, onEdit }: ToolBarOwnerProps) => {
  return isOwner && (
    <>
      <ButtonToolBar onClick={onEdit} type="edit" />
      <ButtonToolBar onClick={onDelete} type="trash" />
    </>
  )
}

export default ToolBarOwner