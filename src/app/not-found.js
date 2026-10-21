import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/shared/container";
import { Logo } from "@/components/shared/logo";

export const metadata = { title: "Page not found" };

export default function NotFound() {
  return (
    <main id="main" className="min-h-screen bg-paper">
      <Container className="py-10">
        <Logo />
        <div className="max-w-xl py-28">
          <h1 className="text-display">This page doesn't exist.</h1>
          <p className="mt-5 text-lead text-slate">The link may be out of date. Browse the equipment catalogue or contact us directly.</p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Button asChild size="lg"><Link href="/equipment">Browse equipment</Link></Button>
            <Button asChild size="lg" variant="outline"><Link href="/contact">Contact us</Link></Button>
          </div>
        </div>
      </Container>
    </main>
  );
}
