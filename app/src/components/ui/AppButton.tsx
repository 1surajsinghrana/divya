import { cn } from "@/lib/utils";
import { type ButtonHTMLAttributes, forwardRef } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "outline" | "text" | "gold";
  size?: "sm" | "md" | "lg";
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "primary", size = "md", ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={cn(
          "inline-flex items-center justify-center font-medium uppercase tracking-wider transition-all duration-200 ease-out rounded active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed",
          {
            "bg-[#1B5E20] text-white hover:bg-[#D4AF37] hover:text-[#1B5E20]":
              variant === "primary",
            "bg-[#D4AF37] text-[#1B5E20] hover:bg-[#c9a430]": variant === "gold",
            "border-[1.5px] border-[#1B5E20] text-[#1B5E20] bg-transparent hover:bg-[#1B5E20] hover:text-white":
              variant === "secondary" || variant === "outline",
            "text-[#1B5E20] underline-offset-4 hover:underline hover:text-[#D4AF37]":
              variant === "text",
            "px-4 py-2 text-xs": size === "sm",
            "px-6 py-3 text-sm": size === "md",
            "px-8 py-4 text-base": size === "lg",
          },
          className
        )}
        {...props}
      />
    );
  }
);

Button.displayName = "Button";

export default Button;
