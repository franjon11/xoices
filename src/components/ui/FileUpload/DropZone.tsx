import { FileUp } from "lucide-react";

interface DropZoneProps {
  isDragging: boolean;
}

const DropZone = ({ isDragging }: DropZoneProps) => {
  return (
    <>
      <div className={`size-16 rounded-full bg-sage/20 flex items-center justify-center text-sage ${isDragging ? 'animate-bounce' : 'animate-pulse'}`}>
        <FileUp size={40} strokeWidth={2.5} />
      </div>

      <div className="flex flex-col items-center gap-2">
        <p className="text-black text-lg font-bold leading-tight tracking-[-0.015em] text-center">
          {isDragging ? "Suelta para cargar" : "Arrastra y suelta tu archivo .txt aquí"}
        </p>
        <p className="text-gray-500 text-sm font-normal leading-normal text-center">
          Solo se permiten archivos .txt. Tamaño máximo: 5MB.
        </p>
      </div>

      <button 
        type="button"
        className="flex items-center justify-center rounded-lg h-10 px-6 bg-sage/20 text-sage text-sm font-bold leading-normal tracking-[0.015em] shadow-md hover:scale-105 transition-all"
      >
        Buscar archivo
      </button>
    </>
  );
};

export default DropZone;