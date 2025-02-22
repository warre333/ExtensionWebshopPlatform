import { ProductDashboard } from "@/components/ProductDashboard";
import { GetProductById, UpdateProduct } from "@/queries/products";

export default async function DashboardPage({
  params,
}: {
  params: Promise<{ productId: string }>
}) {
  const productId = (await params).productId;
  const product = await GetProductById(productId);

  return product ? (
    <ProductDashboard product={product} saveProduct={UpdateProduct} />
  ) : (
    <div className="flex-1 w-full flex flex-col gap-4">
      Product not found
    </div>
  );
}
