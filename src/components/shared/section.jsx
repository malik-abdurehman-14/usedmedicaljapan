import { cn } from "@/lib/utils";
import { Container } from "./container";

const tones = {
  white: "bg-white",
  paper: "bg-paper",
  ink: "bg-ink text-white",
};

/** Page section with consistent vertical rhythm. */
export function Section({ tone = "white", className, containerClassName, children, ...props }) {
  return (
    <section className={cn("py-20 md:py-28", tones[tone], className)} {...props}>
      <Container className={containerClassName}>{children}</Container>
    </section>
  );
}
