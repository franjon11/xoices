export interface BoxQuestionNavProps {
	children: React.ReactNode;
	questionId: string;
	onClick: () => void;
	className?: string;
}

const initialClassName = "w-full aspect-square p-2 rounded-md text-[9px] flex justify-center items-center"

const BoxQuestionNav = ({ children, questionId, onClick, className = ""}: BoxQuestionNavProps) => {
	const boxClassName = `${initialClassName} ${className}`;
	return (
		<button
			key={`nav_${questionId}`}
			onClick={onClick}
			className={boxClassName}
		>
			{children}
		</button>
	)
}

export default BoxQuestionNav;