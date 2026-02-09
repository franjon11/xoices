import DropZone from './DropZone';
import SuccessFileUpload from './SuccessFileUpload';
import { useFileUpload } from '../../../hooks/useFileUpload';
import type { FileDropZoneProps } from '../../../types/types';

const FileDropZone = ({ onFileSelect, onError }: FileDropZoneProps) => {
  const { isDragging,
    fileName,
    fileInputRef,
    handleFileInput,
    handleDragOver,
    handleDragLeave,
    handleDrop,
    setFileName } = useFileUpload({ onFileSelect, onError });

  return (
    <div
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
      onClick={() => !fileName && fileInputRef.current?.click()}
      className={`flex flex-col items-center gap-6 rounded-xl border-2 border-dashed transition-all px-6 py-14 
          ${fileName ? 'border-sage bg-sage/5 cursor-default' : 'border-sage/40 bg-almond/5 hover:border-sage/60 hover:bg-almond/10 cursor-pointer'}
          ${isDragging ? 'border-sage bg-sage/10 scale-[0.98]' : ''}`}
    >
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileInput}
        accept=".txt"
        className="hidden"
      />
      {fileName ?
        <SuccessFileUpload
          fileName={fileName}
          setFileName={setFileName}
          fileInputRef={fileInputRef} />
        :
        <DropZone isDragging={isDragging} />
      }
    </div>
  );
};

export default FileDropZone;