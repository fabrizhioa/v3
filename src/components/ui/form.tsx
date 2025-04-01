"use client";

import * as React from "react";

import { cn } from "@/lib/utils";
import { Label } from "@/components/ui/label";

// Simple Form Context
const FormContext = React.createContext<{
  register: (name: string) => {
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    name: string;
  };
  errors: Record<string, string>;
  setValue: (name: string, value: string | number) => void;
}>({
  register: () => ({ onChange: () => {}, name: "" }),
  errors: {},
  setValue: () => {},
});

// Simple Form Provider
const Form = ({
  children,
  onSubmit,
  initialValues = {},
}: {
  children: React.ReactNode;
  onSubmit: (data: Record<string, string | number>) => void;
  initialValues?: Record<string, string | number>;
}) => {
  const [values, setValues] =
    React.useState<Record<string, string | number>>(initialValues);
  const [errors, setErrors] = React.useState<Record<string, string>>({});

  const register = (name: string) => ({
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => {
      setValues({ ...values, [name]: e.target.value });
      setErrors({ ...errors, [name]: "" }); // Clear error on change
    },
    name,
  });

  const setValue = (name: string, value: string | number) => {
    setValues({ ...values, [name]: value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(values);
  };

  return (
    <form onSubmit={handleSubmit}>
      <FormContext.Provider value={{ register, errors, setValue }}>
        {children}
      </FormContext.Provider>
    </form>
  );
};

const useFormContext = () => React.useContext(FormContext);

// Form Field Context
const FormFieldContext = React.createContext<{ name: string }>({ name: "" });

const FormField = ({
  name,
  children,
}: {
  name: string;
  children: React.ReactNode;
}) => {
  return (
    <FormFieldContext.Provider value={{ name }}>
      {children}
    </FormFieldContext.Provider>
  );
};

const useFormField = () => {
  const fieldContext = React.useContext(FormFieldContext);
  const { errors } = useFormContext();

  if (!fieldContext) {
    throw new Error("useFormField should be used within <FormField>");
  }

  return {
    name: fieldContext.name,
    error: errors[fieldContext.name],
  };
};

// Form Item Context
const FormItemContext = React.createContext<{ id: string }>({ id: "" });

const FormItem = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, children, ...props }, ref) => {
  const id = React.useId();

  return (
    <FormItemContext.Provider value={{ id }}>
      <div ref={ref} className={cn("space-y-2", className)} {...props}>
        {children}
      </div>
    </FormItemContext.Provider>
  );
});

FormItem.displayName = "FormItem";

const FormLabel = React.forwardRef<
  React.ElementRef<typeof Label>,
  React.ComponentPropsWithoutRef<typeof Label>
>(({ className, ...props }, ref) => {
  const { error } = useFormField();

  return (
    <Label
      ref={ref}
      className={cn(error && "text-destructive", className)}
      {...props}
    />
  );
});

FormLabel.displayName = "FormLabel";

const FormControl = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ children, ...props }, ref) => {
  return (
    <div ref={ref} {...props}>
      {children}
    </div>
  );
});

FormControl.displayName = "FormControl";

const FormDescription = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => {
  return (
    <p
      ref={ref}
      className={cn("text-sm text-muted-foreground", className)}
      {...props}
    />
  );
});

FormDescription.displayName = "FormDescription";

const FormMessage = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, children, ...props }, ref) => {
  const { error } = useFormField();
  const body = error ? String(error) : children;

  if (!body) {
    return null;
  }

  return (
    <p
      ref={ref}
      className={cn("text-sm font-medium text-destructive", className)}
      {...props}
    >
      {body}
    </p>
  );
});

FormMessage.displayName = "FormMessage";

export {
  useFormField,
  Form,
  FormItem,
  FormLabel,
  FormControl,
  FormDescription,
  FormMessage,
  FormField,
};
