import { WebshopRender } from "@/components/webshop/webshop-render";
import { parseTemplate } from "@/lib/templateParser";

export default async function StorePage({ params }: { params: { subdomain: string }}) {
  const { subdomain } = await params;

  

  const content = await parseTemplate("test", "index", {
    storeName: subdomain,
    storeDescription: "This is my store description",
    products: [
      {
        name: "Product 1",
        price: 100,
      },
      {
        name: "Product 2",
        price: 200,
      },
    ],
  });

  return <WebshopRender content={content} />;
}
  