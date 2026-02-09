import { useRef, useState } from "react";
import type { FileDropZoneProps } from "../types/types";

export const useFileUpload = ({ onFileSelect, onError }: FileDropZoneProps) => {
  const [isDragging, setIsDragging] = useState(false);
  const [fileName, setFileName] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Procesa el archivo y extrae el texto
  const processFile = (file: File | undefined) => {
    if (!file) return;

    if (file.type !== 'text/plain' && !file.name.endsWith('.txt')) {
      onError?.("Solo se permiten archivos .txt");
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      onError?.("El archivo es demasiado grande (Máx 5MB)");
      return;
    }
    setFileName(file.name);
    onFileSelect(file);
  };

  // Handlers para el Input tradicional
  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    processFile(file);
  };

  // Handlers para Drag and Drop
  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => setIsDragging(false);

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files?.[0];
    processFile(file);
  };
  
  return {
    isDragging,
    fileName,
    fileInputRef,
    handleFileInput,
    handleDragOver,
    handleDragLeave,
    handleDrop,
    setFileName
  }
}