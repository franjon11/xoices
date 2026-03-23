import type { ReactNode } from "react";
import type { ConfigCollapsable } from "../../../hooks/useCollapsable";

interface MainSectionProps {
  collapsable?: ConfigCollapsable | boolean
  children: ReactNode
}

function instanceOf<T>(object: any): object is T {
  return Object.keys(object).some(k => k in object);
}

const initialClass = "overflow-hidden dark:bg-slate-700/80 ";
const classCollapsable = "transition-all duration-500 ease-in-out delay-100 slide-in-from-top-4 data-[collapse=true]:max-h-0 data-[collapse=false]:max-h-[1000px]"
const MainSection = ({ children, collapsable }: MainSectionProps) => {
  const classCollapse = collapsable ? classCollapsable : "";
  return <main
        data-collapse={instanceOf<ConfigCollapsable>(collapsable) && collapsable.defaultOpen ? "true" : "false"}
        className={initialClass + classCollapse}>
          {children}
    </main>
}

export default MainSection;