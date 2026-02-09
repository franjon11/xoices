interface KeyboardProps {
  KBD: string;
  bg?: string;
  textColor?: string;
  className?: string;
}

const initialBg = 'bg-sage/10';
const initialTextColor = 'text-sage';
const initialClassName = 'size-6 rounded flex items-center justify-center font-black shrink-0';
const Keyboard = ({ KBD, bg = initialBg, textColor = initialTextColor, className = initialClassName }: KeyboardProps) => {
  return <div
    className={
      `${initialClassName} ${bg} ${textColor} ${className}`
    }>
    {KBD}
  </div>
}

export default Keyboard