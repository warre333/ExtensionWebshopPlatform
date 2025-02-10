import { OrdersTable } from "@/components/tables/orders";
import { ToastNotification } from "@/components/toast";
import { GetUserAndStore } from "@/lib/functions";
import { GetOrdersFromStore } from "@/queries/orders";

export default async function DashboardPage() {
  const { user, store } = await GetUserAndStore();

  const orders = await GetOrdersFromStore(store.id.toString());

  return (    
    <div className="flex-1 w-full flex flex-col gap-4">
      <div className="flex items-center gap-4">
        <h1 className="text-3xl font-medium">Orders</h1>
      </div>
      <div className="flex flex-col gap-8">
        <ToastNotification />
        <div className="flex flex-col gap-4">
          <OrdersTable rows={orders} />
        </div>
      </div>
    </div>
  )
}
