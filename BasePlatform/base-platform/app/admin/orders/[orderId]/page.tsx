import { ProductDashboard } from "@/components/ProductDashboard";
import { GetUserAndStore } from "@/lib/functions";
import { GetProductById, UpdateProduct } from "@/queries/products";

export default async function OrderDashboardPage({
  params,
}: {
  params: Promise<{ orderId: string }>
}) {
  const orderId = (await params).orderId;

  await GetUserAndStore();
  const order = await GetOrderById(orderId);

  

  return order ? (
    // <ProductDashboard order={order} saveProduct={UpdateProduct} />
    <>l</>
  ) : (
    <div className="flex-1 w-full flex flex-col gap-4">
      Order not found
    </div>
  );
}
