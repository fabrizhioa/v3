"use client";

import * as React from "react";

import { cn } from "@/lib/utils";

interface TabsProps extends React.HTMLAttributes<HTMLDivElement> {
  defaultValue?: string;
  value?: string;
  onValueChange?: (value: string) => void;
  children: React.ReactNode;
  className?: string;
}

interface TabsListProps extends React.HTMLAttributes<HTMLDivElement> {
  className?: string;
}

interface TabsTriggerProps extends React.HTMLAttributes<HTMLButtonElement> {
  value: string;
  children?: React.ReactNode;
  className?: string;
  "data-state"?: string;
}

interface TabsContentProps extends React.HTMLAttributes<HTMLDivElement> {
  value: string;
  className?: string;
}

const Tabs = ({
  defaultValue,
  value,
  onValueChange,
  children,
  className,
}: TabsProps) => {
  const [currentValue, setCurrentValue] = React.useState(
    value || defaultValue || ""
  );

  React.useEffect(() => {
    if (value !== undefined) {
      setCurrentValue(value);
    }
  }, [value]);

  const handleValueChange = (newValue: string) => {
    if (onValueChange) {
      onValueChange(newValue);
    }
    setCurrentValue(newValue);
  };

  const tabsList = React.Children.toArray(children).find(
    (child) => React.isValidElement(child) && child.type === TabsList
  ) as React.ReactElement<TabsListProps> | undefined;

  const triggers = React.Children.toArray(tabsList?.props.children).filter(
    (child) => React.isValidElement(child) && child.type === TabsTrigger
  ) as React.ReactElement<TabsTriggerProps>[];

  const contents = React.Children.toArray(children).filter(
    (child) => React.isValidElement(child) && child.type === TabsContent
  ) as React.ReactElement<TabsContentProps>[];

  return (
    <div className={className}>
      {tabsList &&
        React.cloneElement(tabsList, {
          children: triggers.map((trigger) =>
            React.cloneElement(trigger, {
              onClick: () => handleValueChange(trigger.props.value),
              "data-state":
                currentValue === trigger.props.value ? "active" : "inactive",
            })
          ),
        })}
      {contents.map(
        (content) =>
          currentValue === content.props.value && React.cloneElement(content)
      )}
    </div>
  );
};

const TabsList = ({ className, children, ...props }: TabsListProps) => (
  <div
    className={cn(
      "inline-flex h-10 items-center justify-center rounded-md bg-muted p-1 text-muted-foreground",
      className
    )}
    {...props}
  >
    {children}
  </div>
);

const TabsTrigger = ({
  className,
  value,
  children,
  ...props
}: TabsTriggerProps) => (
  <button
    type="button"
    className={cn(
      "inline-flex items-center justify-center whitespace-nowrap rounded-sm px-3 py-1.5 text-sm font-medium ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 data-[state=active]:bg-background data-[state=active]:text-foreground data-[state=active]:shadow-sm",
      className
    )}
    value={value}
    {...props}
  >
    {children}
  </button>
);

const TabsContent = ({
  className,
  value,
  children,
  ...props
}: TabsContentProps) => (
  <div
    className={cn(
      "mt-2 ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
      className
    )}
    data-value={value}
    {...props}
  >
    {children}
  </div>
);

export { Tabs, TabsList, TabsTrigger, TabsContent };
