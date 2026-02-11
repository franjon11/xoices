import type { LucideIcon, LucideProps } from "lucide-react";

interface IconButtonProps {
  component: LucideIcon
  size?: LucideProps['size']
  animate?: 'pulse' | 'bounce' | 'spin' | 'none'
}

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger';
  size?: 'sm' | 'md' | 'lg' | 'xl';
  icon?: IconButtonProps;
  fullWidth?: boolean;
}

const baseStyles = "inline-flex items-center justify-center gap-2 font-black transition-all active:scale-95 disabled:opacity-40 disabled:scale-100";
  
const variants = {
  primary: "bg-sage text-white shadow-lg shadow-sage/20 hover:bg-sage-dark",
  secondary: "bg-sage/10 text-sage hover:bg-sage/20",
  outline: "border-2 border-sage text-sage hover:bg-sage/5",
  ghost: "text-slate-500 hover:text-sage hover:bg-sage/5",
  danger: "text-red-400 hover:text-red-500 hover:bg-red-50"
};

const sizes = {
  sm: "px-3 py-1.5 text-xs rounded-lg",
  md: "px-6 py-3 text-sm rounded-xl",
  lg: "px-8 py-4 text-base rounded-2xl",
  xl: "px-10 py-5 text-lg rounded-3xl"
};

const Button = ({ 
  children, 
  variant = 'primary', 
  size = 'md', 
  icon, 
  fullWidth,
  className = '',
  ...props 
}: ButtonProps) => {
  
  const { component: Icon, size: sizeIcon, animate = 'none' } = icon ?? {};

  const isAnimate = animate !== 'none';
  const groupAnimate = isAnimate ? 'group/btn' : '';

  return (
    <button 
      className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${fullWidth ? 'w-full' : ''} ${className} ${groupAnimate}`}
      {...props}
    >
      {Icon && <Icon size={sizeIcon} strokeWidth={2.5} className={isAnimate ? `group-hover/btn:animate-${animate}` : ''} />}
      {children}
    </button>
  );
}

export default Button
