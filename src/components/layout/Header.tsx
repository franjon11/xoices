import { Link, NavLink } from "react-router";
import { PAGES } from "../../types/constants";
import { BookOpenText, Menu, User } from "lucide-react";

const navItemClass = ({ isActive }: { isActive: boolean }) => 
  `text-sm font-bold transition-all px-2 py-1 ${isActive ? 'text-sage border-b-2 border-sage' : 'text-slate-500 hover:text-sage'}`;

const Header = ({ toggleSidebar }: { toggleSidebar: () => void }) => {
  return (
    <header className="sticky top-0 z-50 w-full bg-white/80 backdrop-blur-md border-b border-sage/20 px-6 py-4">
      <div className="flex sm:hidden items-center">
        <button className="p-2 text-slate-600 hover:text-sage" onClick={toggleSidebar}>
          <Menu size={24} strokeWidth={2.5} />
        </button>
      </div>

      <div className="hidden sm:flex items-center justify-between">
        <Link to={PAGES.HOME} className="flex items-center gap-2 text-sage group">
          <BookOpenText className="size-8 group-hover:rotate-12 transition-transform" strokeWidth={2.5} />
          <h1 className="text-xl font-black tracking-tighter text-slate-800 uppercase">QuizMaster</h1>
        </Link>

        <nav className="flex items-center gap-6">
          <NavLink to={PAGES.HOME} className={navItemClass}>Library</NavLink>
          <NavLink to="/details/0" className={navItemClass}>Create</NavLink>
          <NavLink to={PAGES.IMPORT_QUIZ} className={navItemClass}>Import</NavLink>
        </nav>

        <div className="flex items-center gap-3">
          <div className="size-10 rounded-full border-2 border-sage bg-sage/10 flex items-center justify-center text-sage">
            <User size={20} strokeWidth={2.5} />
          </div>
        </div>
      </div>
        
    </header>
  );
}

export default Header
