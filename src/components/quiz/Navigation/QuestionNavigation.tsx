import type { BoxQuestionNavProps } from "./BoxQuestionNav";

interface QuestionNavigationProps {
	children: React.ReactElement<BoxQuestionNavProps>[];
	className?: string;
}

const initialClassName = "grid grid-cols-10 gap-1"
const QuestionNavigation = ({ children, className = "" }: QuestionNavigationProps) => {
	const classNav = `${initialClassName} ${className}`
	return (
		<div className={classNav}>
			{children}
		</div>
	)
}

export default QuestionNavigation;