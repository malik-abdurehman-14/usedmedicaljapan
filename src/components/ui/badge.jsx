import { cva } from "class-variance-authority";
import { cn } from "@/lib/utils";

const badgeVariants = cva("inline-flex items-center gap-1.5 rounded-sm font-medium", {
  variants: {
    variant: {
      default: "bg-teal-tint text-teal-dark",
      ink: "bg-ink text-white",
      outline: "border border-line text-slate",
      glass: "bg-white/90 text-ink backdrop-blur",
    },
    size: {
      sm: "px-2 py-0.5 text-xs",
      default: "px-2.5 py-1 text-sm",
    },
  },
  defaultVariants: { variant: "default", size: "default" },
});

function Badge({ className, variant, size, ...props }) {
  return <span data-slot="badge" className={cn(badgeVariants({ variant, size }), className)} {...props} />;
}

export { Badge, badgeVariants };
