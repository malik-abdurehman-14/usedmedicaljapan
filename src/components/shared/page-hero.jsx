import { Container } from "./container";
import { Breadcrumbs } from "./breadcrumbs";

/** Inner-page header: breadcrumb, title, lead text, optional actions. */
export function PageHero({ breadcrumbs, title, description, children }) {
  return (
    <header className="border-b border-line bg-paper">
      <Container className="pb-14 pt-10 md:pb-20 md:pt-14">
        {breadcrumbs && <Breadcrumbs items={breadcrumbs} className="mb-10" />}
        <div className="max-w-3xl">
          <h1 className="text-display">{title}</h1>
          {description && <p className="mt-6 max-w-[60ch] text-lead text-slate">{description}</p>}
          {children && <div className="mt-8 flex flex-wrap gap-3">{children}</div>}
        </div>
      </Container>
    </header>
  );
}
