import Button from "../Button"

interface ButtonProps {
  label?: string;
  onClick: () => void;
}

interface ModalFooterProps {
  buttonCancel?: ButtonProps;
  buttonConfirm?: ButtonProps;
}

const ModalFooter = ({ buttonCancel, buttonConfirm }: ModalFooterProps) => {
  const { label: labelCancel = "Cancelar", onClick: onClickCancel } = buttonCancel ?? { label: "Cancelar", onClick: () => {} };
  const { label: labelConfirm = "Confirmar", onClick: onClickConfirm } = buttonConfirm ?? { label: "Confirmar", onClick: () => {} };

  return (
    <div className="flex justify-end gap-2">
      <Button variant="outline" onClick={onClickCancel}>{labelCancel}</Button>
      <Button onClick={onClickConfirm}>{labelConfirm}</Button>
    </div>
  )
}

export default ModalFooter