import { cn } from "@/lib/utils";

function Textarea({ className, ...props }) {
  return (
    <textarea
      data-slot="textarea"
      className={cn(
        "min-h-32 w-full rounded-sm border border-input bg-white px-3.5 py-3 text-[0.95rem] text-ink placeholder:text-slate/70 transition-colors focus-visible:border-teal focus-visible:outline-none focus-visible:ring-3 focus-visible:ring-teal/15",
        className
      )}
      {...props}
    />
  );
}

export { Textarea };
