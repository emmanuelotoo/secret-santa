import * as React from "react"
import { cn } from "../../lib/utils"

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "default" | "secondary" | "outline" | "ghost" | "link"
  size?: "default" | "sm" | "lg" | "icon"
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "default", size = "default", ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={cn(
          "inline-flex items-center justify-center whitespace-nowrap rounded-full text-sm font-medium ring-offset-white transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-church-gold focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
          {
            "bg-church-gold text-white hover:bg-church-gold-hover shadow-sm hover:shadow-md": variant === "default",
            "bg-transparent text-church-text border border-church-border hover:bg-white hover:border-church-gold/50": variant === "outline",
            "bg-white text-church-text hover:bg-gray-50 border border-transparent": variant === "secondary",
            "hover:bg-church-border/30 hover:text-church-text": variant === "ghost",
            "text-church-gold underline-offset-4 hover:underline": variant === "link",
            "h-10 px-6 py-2": size === "default",
            "h-9 rounded-full px-4 text-xs": size === "sm",
            "h-12 rounded-full px-8 text-base": size === "lg",
            "h-10 w-10": size === "icon",
          },
          className
        )}
        {...props}
      />
    )
  }
)
Button.displayName = "Button"

export { Button }
