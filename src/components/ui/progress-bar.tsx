interface ProgressBarProps {
  currentPhase: number;
  currentQuestionIndex: number;
  totalQuestions: number;
  phase2Questions: any[];
}

export function ProgressBar({
  currentPhase,
  currentQuestionIndex,
  totalQuestions,
  phase2Questions,
}: ProgressBarProps) {
  const phase1Progress =
    currentPhase === 1 ? (currentQuestionIndex / totalQuestions) * 100 : 100;

  const phase2Progress =
    currentPhase === 2
      ? (currentQuestionIndex / phase2Questions.length) * 100
      : 0;

  return (
    <div className="mb-8">
      <div className="flex justify-between mb-2 text-sm font-medium">
        <span
          className={
            currentPhase === 1 ? "text-primary" : "text-muted-foreground"
          }
        >
          Phase 1
        </span>
        <span
          className={
            currentPhase === 2 ? "text-primary" : "text-muted-foreground"
          }
        >
          Phase 2
        </span>
      </div>
      <div className="flex w-full">
        <div className="flex w-[48%] h-2 bg-muted rounded-full overflow-hidden">
          <div
            className="h-full bg-primary transition-all duration-300"
            style={{ width: `${phase1Progress / 2}%` }}
          />
          {/* <div className="h-full w-[8px] bg-background" />
        <div
          className="h-full bg-primary transition-all duration-300"
          style={{ width: `${phase2Progress / 2}%` }}
        /> */}
        </div>
        <div className="flex w-[48%] h-2 bg-muted rounded-full overflow-hidden">
          {/* <div
          className="h-full bg-primary transition-all duration-300"
          style={{ width: `${phase1Progress / 2}%` }}
        /> */}
          <div className="h-full w-[8px] bg-background" />
          <div
            className="h-full bg-primary transition-all duration-300"
            style={{ width: `${phase2Progress / 2}%` }}
          />
        </div>
      </div>
    </div>
  );
}
