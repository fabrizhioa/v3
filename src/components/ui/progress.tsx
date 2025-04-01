import React, { forwardRef, HTMLAttributes } from "react";

import { cn } from "@/lib/utils";

interface ProgressProps extends HTMLAttributes<HTMLDivElement> {
  value?: number;
  indicatorClassName?: string;
}

const Progress = forwardRef<HTMLDivElement, ProgressProps>(
  ({ className, value, indicatorClassName, ...props }, ref) => {
    const progressBarStyle = {
      transform: `translateX(-${100 - (value || 0)}%)`,
    };

    return (
      <div
        ref={ref}
        className={cn(
          "relative h-2 w-full overflow-hidden rounded-full bg-secondary",
          className
        )}
        {...props}
      >
        <div
          className={cn(
            "h-full w-full flex-1 bg-primary transition-all",
            indicatorClassName
          )}
          style={progressBarStyle}
        />
      </div>
    );
  }
);

Progress.displayName = "Progress";

export { Progress };
