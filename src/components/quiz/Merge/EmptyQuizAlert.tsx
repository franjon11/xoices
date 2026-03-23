import { Info } from "lucide-react"

const EmptyQuizAlert = () => {
  return (
    <div className="flex flex-col items-center justify-center p-10 border-2 border-dashed border-sage/30 rounded-2xl bg-sage/20 transition-all duration-300">
      <div className="bg-sage/10 p-4 rounded-full mb-4">
        <Info className="text-sage h-8 w-8" />
      </div>
      <h3 className="text-lg font-bold text-sage-dark mb-2">
        No hay exámenes seleccionados
      </h3>
      <p className="text-sm text-slate-500 text-center max-w-xs mb-6">
        Selecciona uno o varios exámenes del listado lateral para comenzar a mezclarlos y crear uno nuevo.
      </p>
    </div>
  )
}

export default EmptyQuizAlert;