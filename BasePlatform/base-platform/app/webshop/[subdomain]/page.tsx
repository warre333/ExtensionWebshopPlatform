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
        price: 1.00,
        description: "This is a product description",
        url: "http://test.localhost:3000/product/1",
        image: "https://placehold.co/1200x400?text=Featured+Product+1"
      },
      {
        name: "Product 2",
        price: 1.00,
        description: "This is a product description",
        url: "http://test.localhost:3000/product/1",
        image: "https://placehold.co/1200x400?text=Featured+Product+2"
      },
      {
        name: "Product 3",
        price: 1.00,
        description: "This is a product description",
        url: "http://test.localhost:3000/product/1",
        image: "https://placehold.co/1200x400?text=Featured+Product+3"
      }, 
      {
        name: "Product 4",
        price: 1.00,
        description: "This is a product description",
        url: "http://test.localhost:3000/product/1",
        image: "https://placehold.co/1200x400?text=Featured+Product+4"
      },
      {
        name: "Product 5",
        price: 1.00,
        description: "This is a product description",
        url: "http://test.localhost:3000/product/1",
        image: "https://placehold.co/1200x400?text=Featured+Product+5"
      },
      {
        name: "Product 6",
        price: 1.00,
        description: "This is a product description",
        url: "http://test.localhost:3000/product/1",
        image: "https://placehold.co/1200x400?text=Featured+Product+6"
      },
      {
        name: "Product 7",
        price: 1.00,
        description: "This is a product description",
        url: "http://test.localhost:3000/product/1",
        image: "https://placehold.co/1200x400?text=Featured+Product+7"
      },
      {
        name: "Product 8",
        price: 1.00,
        description: "This is a product description",
        url: "http://test.localhost:3000/product/1",
        image: "https://placehold.co/1200x400?text=Featured+Product+8"
      },
      {
        name: "Product 9",
        price: 1.00,
        description: "This is a product description",
        url: "http://test.localhost:3000/product/1",
        image: "https://placehold.co/1200x400?text=Featured+Product+9"
      },
      {
        name: "Product 10",
        price: 1.00,
        description: "This is a product description",
        url: "http://test.localhost:3000/product/1",
        image: "https://placehold.co/1200x400?text=Featured+Product+10"
      }
    ],
  });

  return (
    <React.Fragment>
      {parse(content.toString().trim().replace(/>\s+</g, '><'))}
    </React.Fragment>
  );
}
  