interface ModalContainerProps {
  children: React.ReactNode;
  open?: boolean;
  size?: "sm" | "md" | "lg" | "xl" | "2xl" | "3xl" | "4xl" | "5xl" | "6xl" | "full";
}

const ModalContainer = ({ children, open = false, size = "xl" }: ModalContainerProps) => {

  const sizeMap = {
    sm: "w-sm h-sm",
    md: "w-md h-md",
    lg: "w-lg h-lg",
    xl: "w-xl h-xl",
    "2xl": "w-2xl h-2xl",
    "3xl": "w-3xl h-3xl",
    "4xl": "w-4xl h-4xl",
    "5xl": "w-5xl h-5xl",
    "6xl": "w-6xl h-6xl",
    full: "w-full h-full",
  }

  return open && (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className={`fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-51 dark:bg-slate-700
          flex flex-col items-center justify-between gap-4 p-6
          bg-white rounded-lg shadow-xl ${sizeMap[size]}`}>
        {children}
      </div>
    </div>
  )
}

export default ModalContainer
