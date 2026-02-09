import QuizCard from "../components/quiz/Card/QuizCard";
import Button from "../components/ui/Button";
import { useNavigate } from "react-router";
import { useQuizStore } from "../store/useQuizStore";
import { PAGES } from "../types/constants";
import { Archive, FileUp, Plus } from "lucide-react";

const Home = () => {
  const { quizzes, deleteQuiz } = useQuizStore();
  const navigate = useNavigate();

  const handleStartQuiz = (id: string) => {
    navigate(`/play/${id}`);
  };

  const goTo = (path: string) => () => {
    navigate(path);
  };

  const handleEditQuiz = (id: string) => {
    navigate(`/details/${id}`);
  };

  const handleFavoriteQuiz = (id: string) => {
    // TODO: Implementar la lógica de favorito
  };

  if (quizzes.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-24 text-center">
        <div className="size-24 rounded-full bg-sage/10 flex items-center justify-center text-sage mb-6 animate-pulse">
          <Archive size={48} strokeWidth={2} />
        </div>
        <h2 className="text-3xl font-black text-slate-800 mb-3">Tu biblioteca está vacía</h2>
        <p className="text-slate-500 max-w-md mb-10 text-lg">Crea tu primer examen manualmente o importa desde un archivo de texto.</p>
        <div className="flex flex-col sm:flex-row gap-4">
          <Button onClick={goTo("/details")} size="lg" icon={{component: Plus}}>Crear Manualmente</Button>
          <Button onClick={goTo(PAGES.IMPORT_QUIZ)} size="lg" variant="outline" icon={{component: FileUp}}>Importar .TXT</Button>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-10 animate-in fade-in duration-500">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-4xl font-black text-slate-800 tracking-tight">Biblioteca</h2>
          <p className="text-slate-500 font-medium">Gestiona y realiza tus exámenes personalizados.</p>
        </div>
        <div className="bg-white border border-sage/20 px-4 py-2 rounded-full shadow-sm self-start">
          <span className="text-sm font-black text-sage uppercase tracking-widest">{quizzes.length} Exámenes</span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {quizzes.map((quiz) => (
          <QuizCard 
            key={quiz.id} 
            quiz={quiz} 
            onStart={handleStartQuiz} 
            onDelete={deleteQuiz} 
            onEdit={handleEditQuiz}
            onFavorite={handleFavoriteQuiz}
          />
        ))}
      </div>
    </div>
  );
}

export default Home