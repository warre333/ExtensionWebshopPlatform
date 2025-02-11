import { parseTemplate } from "@/lib/templateParser";
import parse from "html-react-parser";

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

  return (
    <>
      {parse(content)}
    </>
  );
}
  