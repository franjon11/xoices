import ButtonToolBar from "./ButtonToolBar"
import type { InternalHandleQuiz } from "./QuizCard"


interface ToolBarPublicProps {
  onFavorite: InternalHandleQuiz;
}

const ToolBarPublic = ({ onFavorite }: ToolBarPublicProps) => {
  return (
    <ButtonToolBar onClick={onFavorite} type="favorite" />
  )
}

export default ToolBarPublic