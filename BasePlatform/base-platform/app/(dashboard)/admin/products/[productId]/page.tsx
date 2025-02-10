import { ProductDashboard } from "@/components/ProductDashboard";
import { GetUserAndStore } from "@/lib/functions";
import { GetProductById, UpdateProduct } from "@/queries/products";

export default async function DashboardPage({
  params,
}: {
  params: Promise<{ productId: string }>
}) {
  const productId = (await params).productId;

  await GetUserAndStore();
  const product = await GetProductById(productId);

  

  return product ? (
    <ProductDashboard product={product} saveProduct={UpdateProduct} />
  ) : (
    <div className="flex-1 w-full flex flex-col gap-4">
      Product not found
    </div>
  );
}
