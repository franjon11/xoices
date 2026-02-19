import SectionContainer from "../../layout/SectionContainer";

interface PropertiesProps<T> {
  ref: React.RefObject<T | null>;
  value?: string;
}

interface QuizInfoProps {
  title: PropertiesProps<HTMLInputElement>;
  description: PropertiesProps<HTMLTextAreaElement>;
}

const QuizInfo = ({ title, description }: QuizInfoProps) => {

  const { ref: titleRef, value: titleValue = "" } = title;
  const { ref: descriptionRef, value: descriptionValue = "" } = description;

  return (
    <SectionContainer className="relative p-6">
      <div className="space-y-6">
        <div>
          <label className="block text-[10px] font-black text-sage uppercase tracking-[0.2em] mb-3">Título del Examen</label>
          <input 
            type="text" 
            defaultValue={titleValue}
            ref={titleRef}
            className="w-full bg-almond/20 border-2 border-sage/10 rounded-2xl px-6 py-4 text-md font-black focus:ring-4 focus:ring-sage/20 focus:border-sage outline-none transition-all placeholder:text-slate-300"
            placeholder="Ej: Historia del Arte Moderno"
          />
        </div>
        <div>
          <label className="block text-[10px] font-black text-sage uppercase tracking-[0.2em] mb-3">Descripción / Objetivo</label>
          <textarea 
            defaultValue={descriptionValue}
            ref={descriptionRef}
            className="w-full bg-almond/20 border-2 border-sage/10 rounded-2xl px-6 py-4 text-sm font-medium focus:ring-4 focus:ring-sage/20 focus:border-sage outline-none transition-all resize-none placeholder:text-slate-300"
            placeholder="Describe el alcance de esta evaluación..."
            rows={2}
          />
        </div>
      </div>
    </SectionContainer>
  )
}

export default QuizInfo