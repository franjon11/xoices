import { CheckCircle2, RefreshCcw } from "lucide-react";

interface SuccessFileUploadProps {
  fileName: string;
  setFileName: (fileName: string | null) => void;
  fileInputRef: React.RefObject<HTMLInputElement | null>;
}

const SuccessFileUpload = ({ fileName, setFileName, fileInputRef }: SuccessFileUploadProps) => {
  return (
    <div className="flex flex-col items-center gap-4 animate-in fade-in zoom-in duration-300">
      <div className="size-20 rounded-full bg-sage/30 flex items-center justify-center text-sage-dark shadow-inner dark:bg-white/80">
        <CheckCircle2 size={48} strokeWidth={2.5} />
      </div>
      <div className="flex flex-col items-center gap-1">
        <p className="text-green-800 dark:text-white/80 text-lg font-bold text-center">¡Archivo cargado!</p>
        <p className="text-sage dark:text-white/80 font-mono text-sm bg-sage/10 px-3 py-1 rounded-md">{fileName}</p>
      </div>
      <button 
        onClick={(e) => {
          e.stopPropagation(); // Evitar disparar el click del padre
          setFileName(null);
          fileInputRef.current?.click();
        }}
        className="mt-2 flex items-center gap-2 text-sage text-sm font-bold hover:text-sage/70 hover:bg-sage/10 px-4 py-2 rounded-md transition-colors dark:bg-white/80 dark:hover:bg-white/60"
      >
        <RefreshCcw size={16} />
        Cargar otro archivo
      </button>
    </div>
  );
};

export default SuccessFileUpload;