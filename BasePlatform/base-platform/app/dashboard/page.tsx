import { GetOrdersFromStore } from "@/queries/orders";
import { GetStoreFromUser } from "@/queries/stores";
import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";

export default async function DashboardPage() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return redirect("/sign-in");
  }

  const store = await GetStoreFromUser();

  if (!store) {
    return redirect("/admin/create-store");
  }

  const storeId = store[0].id;
  const orders = await GetOrdersFromStore(storeId);

  return orders && orders.length > 0 ? (
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
          <table className="min-w-full divide-y divide-gray-200 border border-gray-200">
            <thead className="bg-gray-100">
              <tr>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Order ID
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Customer name
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Order date
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {orders.map((order, key) => (
                <tr key={key}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{order.id}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{order.customer.name}</td> {/* TODO: create ts interfaces for the database */}
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{order.order_date}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{order.status}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    <a href={`/admin/orders/${order.id}`} className="text-blue-500 hover:text-blue-700">View order</a>
                  </td>
                </tr>  
              ))}            
            </tbody>
          </table>
        </div>
      </div>
    </div>
  ) : (
    <div className="flex-1 w-full flex flex-col gap-4">
      <div className="flex items-center gap-4">
        <h1 className="text-3xl font-medium">Dashboard</h1>
      </div>
      <div className="flex flex-col gap-8">
        <div className="flex items-center gap-4">
          <div className="w-1/2">
            <h2 className="text-lg font-light">Welcome back, {user.email}!</h2>
          </div>          
        </div>
        <div className="flex flex-col gap-4">
          <h1 className="text-xl font-medium">Orders</h1>
          <table className="min-w-full divide-y divide-gray-200 border border-gray-200">
            <thead className="bg-gray-100">
              <tr>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Order ID
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Customer name
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Order date
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  View order
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              <tr>
                <td colSpan={5} className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 text-center">
                  No orders found.
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
