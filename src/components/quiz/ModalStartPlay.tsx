import ModalContainer from "../ui/Modal/ModalContainer";
import ModalBody from "../ui/Modal/ModalBody";
import ModalHeader from "../ui/Modal/ModalHeader";
import ModalFooter from "../ui/Modal/ModalFooter";
import { useRef, useState } from "react";

interface ModalStartPlayProps {
  open: boolean;
  onClose: () => void;
  onStart: (questions?: number, time?: number) => void;
  totalQuestions?: number;
}

const minutesToSeconds = (minutes: number) => minutes * 60;
const hoursToSeconds = (hours: number) => hours * 60 * 60;

const secondsToMinutes = (seconds: number) => seconds / 60;
const secondsToHours = (seconds: number) => seconds / 60 / 60;

const ModalStartPlay = ({ open, onClose, onStart, totalQuestions }: ModalStartPlayProps) => {

  const refQuestions = useRef<HTMLInputElement>(null);
  const [time, setTime] = useState<number>(hoursToSeconds(2));

  const handleStart = () => {
    if (refQuestions.current) {
      const questions = parseInt(refQuestions.current.value);
      onStart(questions, time);
    }
  };

  const hours = Math.floor(secondsToHours(time));
  const minutes = secondsToMinutes(time) % 60;

  const isWithTime = time > 0;

  return (
    <ModalContainer open={open} >
      <ModalHeader title="Configuración del Examen" onClose={onClose} />
      <ModalBody>
        <div className="flex flex-col items-center gap-1">
          <label htmlFor="questions" className="dark:text-sage-light tracking-tighter font-medium">Cantidad de preguntas</label>
          <div className="flex items-center gap-2">
            <button onClick={() => refQuestions.current?.stepDown()} className="border border-sage/20 bg-sage-light/40 rounded-md p-2 w-10 h-10">-</button>
            <input ref={refQuestions} defaultValue={totalQuestions ?? ""} disabled type="number" id="questions" min={1} max={totalQuestions} className="border border-sage/20 rounded-md py-2 text-center dark:text-sage-light" />
            <button onClick={() => refQuestions.current?.stepUp()} className="border border-sage/20 bg-sage-light/40 rounded-md p-2 w-10 h-10">+</button>
          </div>
        </div>
        <div className="flex flex-col items-center gap-2">
          <label htmlFor="time" className="dark:text-sage-light tracking-tighter font-medium">Tiempo máximo</label>
          <div className="flex gap-2 text-semibold text-lg text-sage">
            <span className={`bg-sage-light/20 px-2 py-1 rounded-md ${isWithTime ? "" : "opacity-50"}`}>{hours.toString().padStart(2, "0")}</span> :
            <span className={`bg-sage-light/20 px-2 py-1 rounded-md ${isWithTime ? "" : "opacity-50"}`}>{minutes.toString().padStart(2, "0")}</span>
          </div>
          <div className="w-full max-w-lg">
            <input type="range" min={0} max={hoursToSeconds(3)} step={minutesToSeconds(15)} value={time} onChange={(e) => setTime(parseInt(e.target.value))} className="w-full h-2 bg-almond rounded-full appearance-none cursor-pointer accent-sage" />
            <div className="flex justify-between mt-2 text-xs tracking-tighter dark:text-sage-light">
              <button className="text-slate-800 italic -translate-x-4 dark:text-sage-light" onClick={() => setTime(0)}>Sin límite</button>
              <button className="-translate-x-2" onClick={() => setTime(minutesToSeconds(45))}>45min</button>
              <button className="-translate-x-1" onClick={() => setTime(minutesToSeconds(90))}>1hs 30min</button>
              <button className="-translate-x-2" onClick={() => setTime(minutesToSeconds(135))}>2hs 15min</button>
              <button onClick={() => setTime(minutesToSeconds(180))}>3hs</button>
            </div>
          </div>
        </div>
      </ModalBody>
      <ModalFooter
        buttonCancel={{ onClick: onClose }}
        buttonConfirm={{ label: "Comenzar", onClick: handleStart }}
      />
    </ModalContainer>
  )
}

export default ModalStartPlay
