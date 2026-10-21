import { Slot } from "@radix-ui/react-slot";
import { cva } from "class-variance-authority";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-sm font-medium transition-colors duration-200 disabled:pointer-events-none disabled:opacity-50 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-teal [&_svg]:size-4 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        default: "bg-teal text-white hover:bg-teal-dark",
        ink: "bg-ink text-white hover:bg-ink-soft",
        outline: "border border-ink/25 bg-white text-ink hover:border-ink hover:bg-paper",
        inverse: "bg-white text-ink hover:bg-mist",
        "outline-inverse": "border border-white/35 text-white hover:border-white hover:bg-white/10",
        whatsapp: "bg-whatsapp text-white hover:brightness-95",
        ghost: "text-ink hover:bg-mist",
        link: "px-0 text-teal underline-offset-4 hover:underline",
      },
      size: {
        sm: "h-9 px-3.5 text-sm",
        default: "h-11 px-5 text-[0.95rem]",
        lg: "h-12 px-6 text-base",
        icon: "size-10",
      },
    },
    compoundVariants: [{ variant: "link", className: "h-auto px-0" }],
    defaultVariants: { variant: "default", size: "default" },
  }
);

function Button({ className, variant, size, asChild = false, ...props }) {
  const Comp = asChild ? Slot : "button";
  return <Comp data-slot="button" className={cn(buttonVariants({ variant, size }), className)} {...props} />;
}

export { Button, buttonVariants };
