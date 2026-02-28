import { useEffect } from 'react';
import { useConfigStore } from '../store/useConfigStore';
import { getPreferedTheme } from '../helpers/utils';

export const ThemeProvider = ({ children }: { children: React.ReactNode }) => {
  const theme = useConfigStore((state) => state.theme);

  useEffect(() => {
    const root = window.document.documentElement;
    
    if (theme === 'dark') {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
  }, [theme]);

  useEffect(() => { 
    const root = window.document.documentElement; 
    const preferedTheme = getPreferedTheme();

    if (preferedTheme === "dark" && theme === preferedTheme && !root.classList.contains("dark")) root.classList.add("dark")
    if (preferedTheme === "light" && theme === preferedTheme && root.classList.contains("dark")) root.classList.remove("dark");
    
  }, []);

  return <>{children}</>;
};