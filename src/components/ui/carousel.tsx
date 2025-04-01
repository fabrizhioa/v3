/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import * as React from "react";
import { ArrowLeft, ArrowRight } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

interface CarouselProps {
  children: React.ReactNode;
  orientation?: "horizontal" | "vertical";
}

const CarouselContext = React.createContext<{
  scrollPrev: () => void;
  scrollNext: () => void;
  canScrollPrev: boolean;
  canScrollNext: boolean;
  orientation: "horizontal" | "vertical";
} | null>(null);

function useCarousel() {
  const context = React.useContext(CarouselContext);
  if (!context) {
    throw new Error("useCarousel must be used within a <Carousel />");
  }
  return context;
}

const Carousel = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & CarouselProps
>(({ children, orientation = "horizontal", className, ...props }, ref) => {
  const [scrollPosition, setScrollPosition] = React.useState(0);
  const [canScrollPrev, setCanScrollPrev] = React.useState(false);
  const [canScrollNext, setCanScrollNext] = React.useState(false);
  const contentRef = React.useRef<HTMLDivElement>(null);
  const itemRefs = React.useRef<HTMLDivElement[]>([]);

  const scrollPrev = () => {
    if (contentRef.current) {
      const itemWidth = itemRefs.current[0].offsetWidth;
      const newPosition = scrollPosition - itemWidth;
      setScrollPosition(newPosition);
      contentRef.current.style.transform = `translateX(${newPosition}px)`;
    }
  };

  const scrollNext = () => {
    if (contentRef.current) {
      const itemWidth = itemRefs.current[0].offsetWidth;
      const newPosition = scrollPosition + itemWidth;
      setScrollPosition(newPosition);
      contentRef.current.style.transform = `translateX(${newPosition}px)`;
    }
  };

  React.useEffect(() => {
    if (contentRef.current && itemRefs.current.length > 0) {
      const contentWidth = contentRef.current.scrollWidth;
      const containerWidth = contentRef.current.offsetWidth;
      setCanScrollPrev(scrollPosition < 0);
      setCanScrollNext(scrollPosition + containerWidth < contentWidth);
    }
  }, [scrollPosition, itemRefs.current.length]);

  const contextValue = React.useMemo(
    () => ({
      scrollPrev,
      scrollNext,
      canScrollPrev,
      canScrollNext,
      orientation,
    }),
    [scrollPrev, scrollNext, canScrollPrev, canScrollNext, orientation]
  );

  return (
    <CarouselContext.Provider value={contextValue}>
      <div ref={ref} className={cn("relative", className)} {...props}>
        <div
          ref={contentRef}
          style={{ display: "flex", transition: "transform 0.3s ease-in-out" }}
        >
          {React.Children.map(children, (child) => {
            if (React.isValidElement(child)) {
              return React.cloneElement(child, {
                // ref: (el: HTMLDivElement | null) => {
                //   itemRefs.current[index] = el as HTMLDivElement;
                // },
              });
            }
            return child;
          })}
        </div>
      </div>
    </CarouselContext.Provider>
  );
});
Carousel.displayName = "Carousel";

const CarouselContent = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => {
  return (
    <div ref={ref} className="overflow-hidden">
      <div className={cn("flex", className)} {...props} />
    </div>
  );
});
CarouselContent.displayName = "CarouselContent";

const CarouselItem = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => {
  return (
    <div
      ref={ref}
      className={cn("min-w-0 shrink-0 grow-0 basis-full", className)}
      {...props}
    />
  );
});
CarouselItem.displayName = "CarouselItem";

const CarouselPrevious = React.forwardRef<
  HTMLButtonElement,
  React.ComponentProps<typeof Button>
>(({ className, variant = "outline", size = "icon", ...props }, ref) => {
  const { orientation, scrollPrev, canScrollPrev } = useCarousel();

  return (
    <Button
      ref={ref}
      variant={variant}
      size={size}
      className={cn(
        "absolute h-8 w-8 rounded-full",
        orientation === "horizontal"
          ? "-left-12 top-1/2 -translate-y-1/2"
          : "-top-12 left-1/2 -translate-x-1/2 rotate-90",
        className
      )}
      disabled={!canScrollPrev}
      onClick={scrollPrev}
      {...props}
    >
      <ArrowLeft className="h-4 w-4" />
      <span className="sr-only">Previous slide</span>
    </Button>
  );
});
CarouselPrevious.displayName = "CarouselPrevious";

const CarouselNext = React.forwardRef<
  HTMLButtonElement,
  React.ComponentProps<typeof Button>
>(({ className, variant = "outline", size = "icon", ...props }, ref) => {
  const { orientation, scrollNext, canScrollNext } = useCarousel();

  return (
    <Button
      ref={ref}
      variant={variant}
      size={size}
      className={cn(
        "absolute h-8 w-8 rounded-full",
        orientation === "horizontal"
          ? "-right-12 top-1/2 -translate-y-1/2"
          : "-bottom-12 left-1/2 -translate-x-1/2 rotate-90",
        className
      )}
      disabled={!canScrollNext}
      onClick={scrollNext}
      {...props}
    >
      <ArrowRight className="h-4 w-4" />
      <span className="sr-only">Next slide</span>
    </Button>
  );
});
CarouselNext.displayName = "CarouselNext";

export {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselPrevious,
  CarouselNext,
};
