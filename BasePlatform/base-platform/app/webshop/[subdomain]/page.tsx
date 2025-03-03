import { parseTemplate } from "@/lib/templateParser";
import { GetProductsFromStore } from "@/queries/products";
import { GetStoreBySlug } from "@/queries/stores";
import parse from "html-react-parser";
import { redirect } from "next/navigation";
import React from "react";

export default async function StorePage({ params }: { params: { subdomain: string }}) {
  const { subdomain } = await params;

  const store = await GetStoreBySlug(subdomain);

  if (!store) {
    redirect("http://localhost:3000");
  }

  const products = await GetProductsFromStore(store.id.toString())
  const content = await parseTemplate("test", "index", {
    storeName: store.name,
    products: products.map((product) => ({
      name: product.name,
      description: product.description,
      price: product.price.amount / 100,
      image: `https://placehold.co/1600x900?text=${product.name}`,
      url: `/product/${product.id}`,
    })),
  });

  return (
    <React.Fragment>
      {parse(content.toString().trim().replace(/>\s+</g, '><'))}
    </React.Fragment>
  );
}
  