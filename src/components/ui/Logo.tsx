import { Link } from "react-router";
import logo from "../../assets/logo.png";
import { PAGES } from "../../types/constants";

interface LogoProps {
  className?: string;
}

const Logo = ({ className = "" }: LogoProps) => {
  return (
    <Link to={PAGES.HOME} className={`flex items-center gap-2 text-sage group ${className}`}>
      <img src={logo} alt="Logo" className="size-10 group-hover:rotate-12 transition-transform object-contain" />
      <h1 className="text-2xl font-black tracking-tighter text-slate-800 uppercase">Xoices</h1>
    </Link>
  );
}

export default Logo;