import { parseTemplate } from "@/lib/templateParser";
import { GetStoreBySlug } from "@/queries/stores";
import parse from "html-react-parser";
import { redirect } from "next/navigation";
import React from "react";

export default async function StorePage({ params }: { params: { subdomain: string }}) {
  const { subdomain } = await params;

  const store = await GetStoreBySlug(subdomain);

  if (!store) {
    redirect("http://localhost:3000");
    return null;
  }

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
    <React.Fragment>
      {parse(content.toString().trim().replace(/>\s+</g, '><'))}
    </React.Fragment>
  );
}
  