interface CodeProps {
  label: string;
  className?: string;
  bg?: string;
  textColor?: string;
}

const initialClassName = 'px-1 rounded font-black';
const initialBg = 'bg-sage/20 dark:bg-slate-200';
const initialTextColor = 'text-slate-800 dark:text-sage';
const Code = ({ label, className = initialClassName, bg = initialBg, textColor = initialTextColor }: CodeProps) => {
  return (
    <code className={`${initialClassName} ${bg} ${textColor} ${className}`}>
      {label}
    </code>
  )
}

export default Code