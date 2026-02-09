interface BadgeProps {
  children: React.ReactNode
  className?: string
}

const Badge = ({ children, className = "" }: BadgeProps) => {
  return <span className={`bg-sage/10 text-sage px-3 py-1 rounded-full text-[10px] font-black tracking-widest uppercase ${className}`}>
    {children}
  </span>
}

export default Badge
