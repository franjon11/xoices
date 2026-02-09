import { forwardRef } from "react";

const initialClassInput = "w-full bg-almond/10 border-2 border-sage/10 rounded-2xl px-6 py-3 text-sm focus:ring-4 focus:ring-sage/20 focus:border-sage outline-none transition-all";
const initialClassLabel = "block text-[10px] font-black text-sage uppercase tracking-[0.2em]";

interface BaseProps {
  label?: string;
  as?: 'input' | 'textarea';
  error?: string;
}

type FormInputProps = BaseProps & 
  React.InputHTMLAttributes<HTMLInputElement> &
  React.TextareaHTMLAttributes<HTMLTextAreaElement>;

const FormInputElement = forwardRef<HTMLInputElement | HTMLTextAreaElement, FormInputProps>(({
  label,
  as = 'input', 
  error, 
  className = "", 
  id,
  ...props
}: FormInputProps) => {

  const InputElement = as;
  const baseInputClasses = `${initialClassInput} ${className}`;

  return (
    <div className="space-y-2">
      <label htmlFor={id} className={initialClassLabel}>{label}</label>
      <InputElement
        id={id}
        className={baseInputClasses}
        {...props}
      />
    </div>
  );
});

export default FormInputElement;
