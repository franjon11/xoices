import { X } from "lucide-react";

interface ModalHeaderProps {
    title?: string;
    onClose?: () => void;
}

const ModalHeader = ({ title = "", onClose }: ModalHeaderProps) => {
    return (
      <div className="flex justify-between items-center">
        <h2 className="text-lg font-bold">{title}</h2>
        {onClose && <button onClick={onClose} className="absolute top-2 right-2 text-gray-500 hover:text-gray-700">
          <X className="w-6 h-6" />
        </button>}
      </div>
    )
}

export default ModalHeader