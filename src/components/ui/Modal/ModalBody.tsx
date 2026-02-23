
interface ModalBodyProps {
    children: React.ReactNode;
}

const ModalBody = ({ children }: ModalBodyProps) => {
  return (
    <div className="px-10 py-4 space-y-4 w-full">
      {children}
    </div>
  )
}

export default ModalBody