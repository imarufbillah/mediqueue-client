const CardSlotIndicator = ({ slots, totalSlots }) => {
  const percentage = totalSlots > 0 ? (slots / totalSlots) * 100 : 0;
  const radius = 18;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (percentage / 100) * circumference;

  const getColor = () => {
    if (slots === 0) return "text-destructive";
    if (percentage <= 50) return "text-yellow-500";
    return "text-primary";
  };

  return (
    <div className="flex flex-col items-center gap-1">
      <div className="relative flex size-12 items-center justify-center">
        <svg className="size-12 -rotate-90" viewBox="0 0 44 44">
          <circle
            cx="22"
            cy="22"
            r={radius}
            fill="none"
            stroke="currentColor"
            strokeWidth="3"
            className="text-muted"
          />
          <circle
            cx="22"
            cy="22"
            r={radius}
            fill="none"
            stroke="currentColor"
            strokeWidth="3"
            strokeLinecap="round"
            strokeDasharray={circumference}
            strokeDashoffset={strokeDashoffset}
            className={`transition-all duration-500 ${getColor()}`}
          />
        </svg>
        <span className={`absolute text-sm font-semibold ${getColor()}`}>
          {slots}
        </span>
      </div>
      <span className="text-[0.65rem] uppercase tracking-wider text-muted-foreground">
        slots left
      </span>
    </div>
  );
};

export default CardSlotIndicator;
