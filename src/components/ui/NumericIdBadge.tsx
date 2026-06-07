interface NumericIdBadgeProps {
  numericId: string;
  className?: string;
}

const NumericIdBadge = ({ numericId, className = "" }: NumericIdBadgeProps) => (
  <span className={`inline-block self-start bg-violet-100 text-violet-600 dark:bg-violet-900/40 dark:text-violet-300 px-3 py-1 rounded-full text-[10px] font-black tracking-widest ${className}`}>
    {numericId}
  </span>
);

export default NumericIdBadge;
