import { cn } from "@/lib/utils";

function Input({ className, type = "text", ...props }) {
  return (
    <input
      type={type}
      data-slot="input"
      className={cn(
        "h-11 w-full rounded-sm border border-input bg-white px-3.5 text-[0.95rem] text-ink placeholder:text-slate/70 transition-colors focus-visible:border-teal focus-visible:outline-none focus-visible:ring-3 focus-visible:ring-teal/15 aria-invalid:border-seal",
        className
      )}
      {...props}
    />
  );
}

export { Input };
