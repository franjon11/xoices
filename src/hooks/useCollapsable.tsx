import { useRef } from "react";

const useCollapsable = () => {
  const refSection = useRef<HTMLDivElement>(null);
  const toggleCollapse = () => {
    const main = refSection.current?.querySelector("main");
    if (!main) return;
    const collapse = main.getAttribute("data-collapse");
    if (collapse === "true") {
      main.setAttribute("data-collapse", "false");
    } else {
      main.setAttribute("data-collapse", "true");
    }

    const iconBtn = refSection.current?.querySelector("header > button > svg");
    if (!iconBtn) return;
    iconBtn.classList.toggle("rotate-180");
  };

  return {
    refSection,
    toggleCollapse,
  };
}

export default useCollapsable;