import { Check } from "lucide-react";
import type { InputHTMLAttributes } from "react";

type CheckBoxProps = InputHTMLAttributes<HTMLInputElement>
const initialClassCheck = "rounded peer transition-all appearance-none shadow hover:shadow-md cursor-pointer border border-sage focus:ring-sage checked:bg-sage size-4"
const CheckBox = ({ onChange, checked = false, ...restOfProps}: CheckBoxProps) => {
    return (
        <label className="flex items-center cursor-pointer relative">
          <input {...restOfProps} onChange={onChange} checked={checked} className={initialClassCheck} type="checkbox" />
          <span className="absolute text-white opacity-0 peer-checked:opacity-100 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
            <Check size={15} strokeWidth={4}/>
          </span>
        </label>
    )
}

export default CheckBox;