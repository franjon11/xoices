import { Sun, Moon } from 'lucide-react';
import { useConfigStore } from "../../store/useConfigStore";
import type { Theme } from '../../types/types';


const switchClassXTheme : Record<Theme, string> = {
  light: "bg-sage/20 text-sage",
  dark: "bg-sage text-sage-light"
}

const iconClassXTheme : Record<Theme, string> = {
  light: "translate-x-11 bg-white",
  dark: "translate-x-1 bg-slate-700/80"
}

const SwitchTheme = () => {
  const { theme, toggleTheme } = useConfigStore();

  const isDark = theme === 'dark';

  return (
    <button
      onClick={toggleTheme}
      className={`
        relative inline-flex h-10 w-20 items-center rounded-full 
        transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-sage
        ${switchClassXTheme[theme]}
      `}
      aria-label="Toggle theme"
    >
      <span
        className={`
          flex h-8 w-8 items-center justify-center rounded-full shadow-md
          transition-transform duration-300 ease-in-out
          ${iconClassXTheme[theme]}
        `}
      >
        {isDark ? (
          <Moon className="h-5 w-5 text-sage fill-sage transition-all duration-300" />
        ) : (
          <Sun className="h-5 w-5 text-sage fill-sage transition-all duration-300" />
        )}
      </span>
    </button>
  );
};

export default SwitchTheme
