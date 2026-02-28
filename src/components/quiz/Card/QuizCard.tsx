import { BookMarked, Play } from "lucide-react";
import type { Quiz } from "../../../types/types";
import Badge from "../../ui/Badge";
import Button from "../../ui/Button";
import ToolBar from "./ToolBar";

export type HandleQuiz = (quizId: string) => void
type HandleQuizStart = (quizId: string, questions?: number) => void
export type InternalHandleQuiz = (e: React.MouseEvent<HTMLButtonElement>) => void

interface QuizCardProps {
  quiz: Quiz;
  onStart: HandleQuizStart;
  onDelete: HandleQuiz;
  onEdit: HandleQuiz;
  onFavorite: HandleQuiz;
}

const QuizCard = ({ quiz, onStart, onDelete, onEdit, onFavorite }: QuizCardProps) => {
  
  const handleDelete = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation()
    if (confirm("¿Estás seguro de que quieres eliminar este quiz?")) {
      onDelete(quiz.id)
    }
  }

  const handleEdit = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation()
    onEdit(quiz.id)
  }

  const handleFavorite = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation()
    onFavorite(quiz.id)
  }

  const cantidadPreguntas = quiz.questions.length;

  return (
    <div className="bg-white rounded-3xl p-8 shadow-sm border border-sage/10 hover:shadow-2xl hover:-translate-y-2 transition-all group flex flex-col relative overflow-hidden dark:bg-slate-700 dark:border-sage-light">
    
      <ToolBar creatorId={quiz.creator?.id} onDelete={handleDelete} onEdit={handleEdit} onFavorite={handleFavorite} />
    
      <div className="flex items-center gap-4 mb-6">
        <div className="size-14 bg-sage/10 rounded-2xl flex items-center justify-center">
          <BookMarked className="text-sage size-8" strokeWidth={2.5} />
        </div>
        <div className="flex-1 min-w-0">
          <h3 className="text-xl font-black text-slate-800 truncate dark:text-white">{quiz.title}</h3>
            <Badge>{cantidadPreguntas} Pregunta{cantidadPreguntas > 1 && "s"}</Badge>
        </div>
      </div>

      <p className="text-slate-500 text-sm mb-8 flex-1 line-clamp-3 font-medium leading-relaxed italic dark:text-slate-300">
        {quiz.description || "Este examen no tiene descripción."}
      </p>
      
      <Button onClick={() => onStart(quiz.id, cantidadPreguntas)} icon={{component: Play}} fullWidth>
        INICIAR EXAMEN
      </Button>
  </div>
  )
}

export default QuizCard