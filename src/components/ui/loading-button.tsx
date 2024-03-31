import { cn } from "@/lib/utils";
import { Button, ButtonProps } from "./button";
import { ReactNode } from "react";

type Props = {
  isLoading: boolean;
  children: ReactNode;
  className?: string;
} & ButtonProps;

const LoadingButton = ({ isLoading, children, className, ...rest }: Props) => {
  return (
    <Button
      disabled={isLoading}
      {...rest}
      className={cn("min-w-[85px]", className)}
    >
      {isLoading ? (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="w-4 h-4 animate-spin"
        >
          <line x1="12" x2="12" y1="2" y2="6" />
          <line x1="12" x2="12" y1="18" y2="22" />
          <line x1="4.93" x2="7.76" y1="4.93" y2="7.76" />
          <line x1="16.24" x2="19.07" y1="16.24" y2="19.07" />
          <line x1="2" x2="6" y1="12" y2="12" />
          <line x1="18" x2="22" y1="12" y2="12" />
          <line x1="4.93" x2="7.76" y1="19.07" y2="16.24" />
          <line x1="16.24" x2="19.07" y1="7.76" y2="4.93" />
        </svg>
      ) : (
        children
      )}
    </Button>
  );
};

export default LoadingButton;
