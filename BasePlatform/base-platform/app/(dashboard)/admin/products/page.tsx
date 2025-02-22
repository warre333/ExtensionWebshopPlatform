import { ProductsTable } from "@/components/tables/products";
import { ToastNotification } from "@/components/toast";
import { useAuth } from "@/context/AuthContext";
import { GetProductsFromStore } from "@/queries/products";

export default async function DashboardPage() {
  const { store } = useAuth();
  const products = await GetProductsFromStore(store.id.toString());

  return (
    <div className="flex-1 w-full flex flex-col gap-4">
      <div className="flex items-center gap-4">
        <h1 className="text-3xl font-medium">Products</h1>
      </div>
      <div className="flex flex-col gap-8">
        <ToastNotification />
        <div className="flex flex-col gap-4">
          <ProductsTable rows={products} />
        </div>
      </div>
    </div>
  )
}
