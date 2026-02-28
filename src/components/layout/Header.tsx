import { NavLink } from "react-router";
import { PAGES } from "../../types/constants";
import { Menu, User } from "lucide-react";
import Logo from "../ui/Logo";
import SwitchTheme from "../ui/SwitchTheme";
import { useAuthStore } from "../../store/useAuthStore";

const navItemClass = ({ isActive }: { isActive: boolean }) => 
  `text-sm font-bold transition-all px-2 py-1 ${isActive ? 'text-sage border-b-2 border-sage dark:text-sage-light dark:border-sage-light' : 'text-slate-500 dark:text-slate-400 hover:text-sage'}`;

const Header = ({ toggleSidebar }: { toggleSidebar: () => void }) => {
  const userAvatar = useAuthStore(state => state.user?.avatar ?? "");

  return (
    <header className="sticky top-0 z-50 w-full bg-white/80 backdrop-blur-md border-b border-sage/20 px-4 sm:px-6 py-4 dark:bg-slate-700 dark:border-sage-light">
      <div className="flex sm:hidden items-center justify-center">
        <button className="p-2 text-slate-600 dark:text-sage-light hover:text-sage" onClick={toggleSidebar}>
          <Menu size={24} strokeWidth={2.5} />
        </button>

        <Logo className="mx-auto" />

        <SwitchTheme />
      </div>

      <div className="hidden sm:flex items-center justify-between">
        <Logo />

        <nav className="flex items-center gap-6">
          <NavLink to={PAGES.HOME} className={navItemClass}>Library</NavLink>
          <NavLink to={PAGES.CREATE_QUIZ} className={navItemClass}>Create</NavLink>
          <NavLink to={PAGES.IMPORT_QUIZ} className={navItemClass}>Import</NavLink>
          {/* <NavLink to={PAGES.MERGE_QUIZ} className={navItemClass}>Merge</NavLink> */}
        </nav>

        <div className="flex items-center gap-3">
          <div className="size-10 rounded-full border-2 border-sage bg-sage/10 flex items-center justify-center text-sage overflow-hidden">
            {userAvatar === "" ? <User size={24} strokeWidth={2.5} /> : <img src={userAvatar} alt="avatar"/>}
          </div>
          <SwitchTheme />
        </div>
      </div>
        
    </header>
  );
}

export default Header
