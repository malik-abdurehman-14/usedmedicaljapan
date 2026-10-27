import { ProductPage, productMetadata } from "@/views/product-page";
import { equipment } from "@/data/equipment";

export function generateStaticParams() {
  return equipment.map((e) => ({ slug: e.slug }));
}

export const dynamicParams = false;

export async function generateMetadata({ params }) {
  const { slug } = await params;
  return productMetadata(slug, "ja");
}

export default async function Page({ params }) {
  const { slug } = await params;
  return <ProductPage slug={slug} locale="ja" />;
}
