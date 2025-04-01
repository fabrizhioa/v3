"use client";
import { useAlertModal } from "@/components/contexts/alert/context";
import { AlertProps } from "@/types/alert";
import {
  CircleAlertIcon,
  CircleCheckIcon,
  CircleMinusIcon,
} from "lucide-react";

const Alert = ({ type, additionalAction, buttonText, message }: AlertProps) => {
  const { clearAlert } = useAlertModal();

  return (
    <div className="fixed w-full top-0 left-0 h-screen flex justify-center items-center bg-black/50 z-50">
      <div className="bg-darkslate text-white shadow flex rounded flex-col gap-4 justify-center items-center p-4 w-3/4 text-sm md:w-1/2 max-h-[calc(100vh-2rem)] overflow-y-auto">
        {type === "error" ? (
          <CircleAlertIcon className="size-16 text-red" />
        ) : type === "warning" ? (
          <CircleMinusIcon className="size-16 text-yellow" />
        ) : (
          <CircleCheckIcon className="size-16 text-primary " />
        )}
        <p className="text-justify text-base">{message}</p>
        <button
          type="button"
          onClick={() => {
            if (additionalAction) {
              additionalAction();
            }
            if (clearAlert) clearAlert();
          }}
          className="font-semibold text-secondary bg-transparent  hover:bg-secondary hover:text-white active:bg-primary active:border-primary rounded block px-3 py-1 text-xl uppercase m-auto cursor-pointer transition-all"
        >
          {buttonText ?? "ok"}
        </button>
      </div>
    </div>
  );
};

export default Alert;
