import { forwardRef } from "react";
import { Link, NavLink } from "react-router";
import { PAGES } from "../../types/constants";
import { BookOpenText, X } from "lucide-react";

const navItemClass = ({ isActive }: { isActive: boolean }) => 
  `text-sm py-4 px-6 font-bold rounded-lg transition-all ${isActive ? 'text-sage bg-sage/20' : 'text-slate-500 hover:text-sage'}`;

interface MobileDrawerProps {
  toggleSidebar: () => void;
}

const MobileDrawer = forwardRef<HTMLDivElement, MobileDrawerProps>(({ toggleSidebar }: MobileDrawerProps, ref) => {
  return (
    <div ref={ref} className="fixed z-100 top-0 left-0 h-full w-64 bg-white border-r border-gray-200 transform transition-transform duration-300 ease-out md:hidden -translate-x-full">
      <div className="p-4">
        <Link to={PAGES.HOME} className="flex items-center gap-2 text-sage group">
          <BookOpenText className="size-5 group-hover:rotate-12 transition-transform" strokeWidth={2.5} />
          <h1 className="text-lg font-black tracking-tighter text-slate-800 uppercase">Xoices</h1>
        </Link>
        <button className="absolute top-4 right-4 text-slate-600 hover:text-sage" onClick={toggleSidebar}>
          <X size={24} strokeWidth={2.5} />
        </button>
      </div>
      <nav className="flex flex-col gap-2 p-4"> 
        <NavLink to={PAGES.HOME} className={navItemClass}>Library</NavLink>
        <NavLink to={"/details/"} className={navItemClass}>Create</NavLink>
        <NavLink to={PAGES.IMPORT_QUIZ} className={navItemClass}>Import</NavLink>
      </nav>
    </div>
  );
});

export default MobileDrawer;
