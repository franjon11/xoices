import { FilePlus2, Plus, Upload } from "lucide-react";
import { PAGES } from "../../../types/constants";
import { useNavigate } from "react-router";

const EmptyLibraryAlert = () => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center justify-center p-6 border-2 border-dashed border-sage/30 rounded-xl bg-sage/5 dark:bg-sage/10 transition-colors">
      <div className="bg-sage/10 dark:bg-sage/20 p-3 rounded-full mb-3">
        <FilePlus2 className="text-sage h-6 w-6" />
      </div>
      
      <p className="text-sm font-medium text-slate-600 dark:text-sage-light/80 text-center mb-4">
        No hay mas examenes por seleccionar. <br />
        ¡Crea uno nuevo!
      </p>

      <div className="flex flex-col gap-2 w-full px-5">
        <button
          onClick={() => navigate(PAGES.CREATE_QUIZ)}
          className="flex items-center justify-center gap-2 px-4 py-2 bg-sage hover:bg-sage-dark text-white text-xs font-bold rounded-lg transition-all transform hover:scale-105 active:scale-95 shadow-md shadow-sage/20"
        >
          <Plus size={16} strokeWidth={3} />
          NUEVO EXAMEN
        </button>
        <button
          onClick={() => navigate(PAGES.IMPORT_QUIZ)}
          className="flex items-center justify-center gap-2 px-4 py-2 bg-almond-dark/50 hover:bg-almond-dark/70 text-white text-xs font-bold rounded-lg transition-all transform hover:scale-105 active:scale-95 shadow-md shadow-sage/20"
        >
          <Upload size={16} strokeWidth={3} />
          IMPORTAR
        </button>
      </div>
    </div>
  );
};

export default EmptyLibraryAlert;