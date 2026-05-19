const SlotIndicator = ({ slots, totalSlots }) => {
  const percentage = totalSlots > 0 ? (slots / totalSlots) * 100 : 0;
  const radius = 28;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (percentage / 100) * circumference;

  const getColor = () => {
    if (slots === 0) return "text-destructive";
    if (percentage <= 50) return "text-yellow-500";
    return "text-primary";
  };

  return (
    <div className="flex flex-col items-center gap-2">
      <div className="relative flex size-20 items-center justify-center">
        <svg className="size-20 -rotate-90" viewBox="0 0 64 64">
          <circle
            cx="32"
            cy="32"
            r={radius}
            fill="none"
            stroke="currentColor"
            strokeWidth="4"
            className="text-muted"
          />
          <circle
            cx="32"
            cy="32"
            r={radius}
            fill="none"
            stroke="currentColor"
            strokeWidth="4"
            strokeLinecap="round"
            strokeDasharray={circumference}
            strokeDashoffset={strokeDashoffset}
            className={`transition-all duration-500 ${getColor()}`}
          />
        </svg>
        <span className={`absolute text-xl font-bold ${getColor()}`}>
          {slots}
        </span>
      </div>
      <span className="text-sm text-muted-foreground">slots remaining</span>
    </div>
  );
};

export default SlotIndicator;
