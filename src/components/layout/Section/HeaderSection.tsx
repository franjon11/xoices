import { ChevronDown, ChevronUp } from "lucide-react";
import type { ReactNode } from "react";
import type { ConfigCollapsable } from "../../../hooks/useCollapsable";

interface HeaderSectionProps {
  children: ReactNode
  toolbar?: ReactNode
  collapsable?: ConfigCollapsable
}


const initialClass = "animate-in transition-all duration-500"
const ButtonCollapsableSection = ({ toggleCollapse, defaultOpen }: ConfigCollapsable) => {
  const Icon = defaultOpen ? ChevronUp : ChevronDown;
  return <button onClick={toggleCollapse} className="text-sage p-2 rounded-full btn-collapse" title="Expandir/Colapsar">
    <Icon size={20} strokeWidth={2.5} className={initialClass} />
  </button>
}

const HeaderSection = ({ children, toolbar, collapsable }: HeaderSectionProps) => {

  return (
    <header className="bg-almond/40 px-6 py-4 flex items-center justify-between border-b border-sage/10 dark:bg-slate-700/90">
      <div className="flex items-center gap-3">
        {
          collapsable && collapsable.posIcon === "init" &&
            <ButtonCollapsableSection toggleCollapse={collapsable.toggleCollapse}/>
        }
        {children}
      </div>
      {
        toolbar && <div className="flex items-center gap-4">{toolbar}</div>
      }
      {
        collapsable && collapsable.posIcon === "final" &&
        <ButtonCollapsableSection toggleCollapse={collapsable.toggleCollapse} />
      }
    </header>
  )
}

export default HeaderSection;