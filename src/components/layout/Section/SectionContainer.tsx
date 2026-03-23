type SectionContainerProps = React.HTMLAttributes<HTMLDivElement> & {
  ref?: React.RefObject<HTMLDivElement | null>;
  bordered?: boolean;
  bg?: string;
}

const initialBg = "white"
const initialClass = "rounded-2xl shadow-xl shadow-sage/5 overflow-hidden"
const SectionContainer = ({ children, className, ref, bordered = false, bg = initialBg, ...props }: SectionContainerProps) => {
  return (
    <section
      className={`${initialClass} ${bordered ? "border-2 border-sage" : ""} bg-${bg} ${className}`}
      ref={ref}
      {...props}
    >
      {children}
    </section>
  )
}

export default SectionContainer
