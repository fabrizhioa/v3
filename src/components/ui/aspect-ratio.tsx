"use client";

import * as React from "react";

interface AspectRatioProps extends React.HTMLAttributes<HTMLDivElement> {
  ratio: number;
  children: React.ReactNode;
}

const AspectRatio = React.forwardRef<HTMLDivElement, AspectRatioProps>(
  ({ ratio, children, ...props }, ref) => {
    const paddingTop = (1 / ratio) * 100 + "%";

    return (
      <div ref={ref} style={{ position: "relative", paddingTop }} {...props}>
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
          }}
        >
          {children}
        </div>
      </div>
    );
  }
);

AspectRatio.displayName = "AspectRatio";

export { AspectRatio };
