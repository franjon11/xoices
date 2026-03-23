import ModalContainer from "../ui/Modal/ModalContainer";
import ModalBody from "../ui/Modal/ModalBody";
import ModalHeader from "../ui/Modal/ModalHeader";
import ModalFooter from "../ui/Modal/ModalFooter";
import { useState } from "react";

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

const MIN_VALUE_QUESTIONS = 1;

const ModalStartPlay = ({ open, onClose, onStart, totalQuestions = 0 }: ModalStartPlayProps) => {

  const [questionsToPlay, setQuestionsToPlay] = useState<number>(() => totalQuestions);

  const [time, setTime] = useState<number>(hoursToSeconds(2));

  const handleStart = () => {
    onStart(questionsToPlay, time);
  };

  const hours = Math.floor(secondsToHours(time));
  const minutes = secondsToMinutes(time) % 60;

  const isWithTime = time > 0;

  const handleStepDown = () => setQuestionsToPlay(state => state - 1);
  const handleStepUp = () => setQuestionsToPlay(state => state + 1);
  const handleChangeQuestion = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    const valueInt = +value;
    if (valueInt < MIN_VALUE_QUESTIONS) setQuestionsToPlay(MIN_VALUE_QUESTIONS);
    else if (valueInt > totalQuestions) setQuestionsToPlay(totalQuestions);
    else {
      setQuestionsToPlay(valueInt);
    }
  }

  return (
    <ModalContainer open={open} >
      <ModalHeader title="Configuración del Examen" onClose={onClose} />
      <ModalBody>
        <div className="flex flex-col items-center gap-1">
          <label htmlFor="questions" className="dark:text-sage-light tracking-tighter font-medium">Cantidad de preguntas</label>
          <div className="flex items-center gap-2">
            <button onClick={handleStepDown} className="border border-sage/20 bg-sage-light/40 rounded-md p-2 w-10 h-10">-</button>
            <input onChange={handleChangeQuestion} value={questionsToPlay} type="number" id="questions" min={1} max={totalQuestions} className="border border-sage/20 rounded-md py-2 text-center dark:text-sage-light focus:border-almond-dark focus:outline-none" />
            <button onClick={handleStepUp} className="border border-sage/20 bg-sage-light/40 rounded-md p-2 w-10 h-10">+</button>
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
