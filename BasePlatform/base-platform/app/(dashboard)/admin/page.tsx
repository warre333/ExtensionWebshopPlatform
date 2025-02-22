import { OrdersTable } from "@/components/tables/orders";
import { useAuth } from "@/context/AuthContext";
import { GetOrdersFromStore } from "@/queries/orders";

export default async function DashboardPage() {
  const { user, store } = useAuth();

  const orders = await GetOrdersFromStore(store.id.toString());

  return (
    <div className="flex-1 w-full flex flex-col gap-4">
      <div className="flex items-center gap-4">
        <h1 className="text-3xl font-medium">Dashboard</h1>
      </div>
      <div className="flex flex-col gap-8">
        <div className="flex items-center gap-4">
          <div className="w-1/2">
            <h2 className="text-lg font-light">Welcome back, {user.user_metadata.displayName || user.email}!</h2>
          </div>          
        </div>
        <div className="flex flex-col gap-4">
          <h1 className="text-xl font-medium">Orders</h1>
          <OrdersTable rows={orders} />
        </div>
      </div>
    </div>
  )
}
