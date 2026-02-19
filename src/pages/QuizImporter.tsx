import { useRef } from "react";
import { useQuizStore } from "../store/useQuizStore";
import { parseQuizTxt } from "../helpers/parser";
import { useNavigate } from "react-router";
import { Info, Terminal } from "lucide-react";
import Button from "../components/ui/Button";
import FileDropZone from "../components/ui/FileUpload/FileDropZone";
import QuizInfo from "../components/quiz/Details/QuizInfo";
import SectionContainer from "../components/layout/SectionContainer";
import Keyboard from "../components/ui/Keyboard";
import Code from "../components/ui/Code";
import MainContainer from "../components/layout/MainContainter";

const QuizImporter = () => {
  const navigate = useNavigate();
  
  const titleRef = useRef<HTMLInputElement>(null);
  const descriptionRef = useRef<HTMLTextAreaElement>(null);
  const textRef = useRef<string>("");

  const { addQuiz } = useQuizStore();

  const handleImport = () => {
    if (!titleRef.current?.value || !textRef.current) return alert('El título y el contenido son obligatorios');
    
    const parsedData = parseQuizTxt(textRef.current);
    if (!parsedData.questions || parsedData.questions.length === 0) {
      return alert('No se encontraron preguntas válidas. Por favor, verifica el formato estrictamente.');
    }

    addQuiz({
      title: titleRef.current?.value,
      description: descriptionRef.current?.value ?? "",
      questions: parsedData.questions
    });
    navigate('/');
  };

  const handleFileUpload = (file: File) => {
    if (!file) return;
    
    const reader = new FileReader();
    reader.onload = (event) => {
      const content = event.target?.result as string;
      textRef.current = content;
    };
    reader.readAsText(file);
  };

  return (
    <MainContainer>
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
        <div className="lg:col-span-8 space-y-6">
          <QuizInfo
            title={{ ref: titleRef, value: titleRef.current?.value }}
            description={{ ref: descriptionRef, value: descriptionRef.current?.value }}
          />
          
          <SectionContainer className="p-4">
            <FileDropZone onFileSelect={handleFileUpload} />
          </SectionContainer>
          
          <Button onClick={handleImport} size="lg" icon={{ component: Terminal }} className="px-12" fullWidth>
            PROCESAR Y GENERAR
          </Button>
        </div>

        <aside className="lg:col-span-4 space-y-8">
          <SectionContainer className="sticky p-6 top-20">
            <h3 className="text-sm font-black text-slate-800 flex items-center gap-3 mb-6 uppercase tracking-widest">
              <div className="size-8 bg-sage rounded-lg flex items-center justify-center text-white">
                <Info size={16} strokeWidth={3} />
              </div>
              Guía de Sintaxis
            </h3>
            <div className="space-y-6 text-xs font-medium text-slate-500 leading-loose">
              <div className="flex gap-4">
                <Keyboard KBD="Q" />
                <p>Inicia cada pregunta con <Code label="Q:" /> seguido del enunciado.</p>
              </div>
              <div className="flex gap-4">
                <Keyboard KBD="O" />
                <p>Lista opciones con etiquetas <Code label="A)" />. Hasta 26 opciones.</p>
              </div>
              <div className="flex gap-4">
                <Keyboard KBD="*" />
                <p>Marca la opción correcta con un <Code label="*" /> al final.</p>
              </div>
              <div className="flex gap-4">
                <Keyboard KBD="E" />
                <p>Agrega una explicación con la etiqueta <Code label="E:" /> al final.</p>
              </div>
              
              <div className="bg-almond/20 p-6 rounded-2xl border border-sage/10 font-mono text-[11px] text-slate-600 shadow-inner">
                <p className="mb-2 text-sage/60 uppercase tracking-tighter">Ejemplo de código</p>
                Q: ¿Cuánto es 5 + 5? <br/>
                A) 12 <br/>
                B) 10* <br/>
                C) 8 <br/>
                E) Es 10 porque 5 + 5 es 10.
              </div>

              {/* TODO: Implementar imagenes */}
              {/* <div className="bg-sage/5 p-6 rounded-2xl border border-sage/20">
                <p className="font-black text-sage uppercase tracking-widest mb-2 flex items-center gap-1">
                  <ImageIcon size={14} strokeWidth={3} />
                  Contenido Rico
                </p>
                <p className="italic text-[10px]">
                  Puedes incluir etiquetas <code className="bg-white/50 px-1 rounded">HTML</code> en el enunciado para insertar imágenes o dar formato.
                </p>
              </div> */}
            </div>
          </SectionContainer>
        </aside>
      </div>
    </MainContainer>
  );
}

export default QuizImporter