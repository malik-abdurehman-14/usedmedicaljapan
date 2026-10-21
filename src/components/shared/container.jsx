import { cn } from "@/lib/utils";

export function Container({ className, ...props }) {
  return <div className={cn("mx-auto w-full max-w-site px-5 sm:px-8", className)} {...props} />;
}
