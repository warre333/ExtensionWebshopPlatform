import { FormMessage } from "@/components/form-message";
import { StatusDropdown } from "@/components/status-dropdown";
import { OrderedProductsTable } from "@/components/tables/ordered-products";
import { ToastNotification } from "@/components/toast";
import { GetUserAndStore } from "@/lib/functions";
import { GetOrderByOrderNumber } from "@/queries/orders";
import Link from "next/link";

export default async function OrderDashboardPage({
  params,
}: {
  params: Promise<{ orderNumber: string }>
}) {
  const orderNumber = (await params).orderNumber;

  await GetUserAndStore();
  const order = await GetOrderByOrderNumber(parseInt(orderNumber));

  return Object.keys(order).length !== 0 ? (
    <div className="flex-1 w-full flex flex-col gap-10">
      <div className="flex flex-row justify-between items-center gap-4">
        <div className="flex flex-row items-center gap-6">
          <Link href="/admin/orders">
            <svg viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg" fill="currentColor" className="w-6 h-6" ><g id="SVGRepo_bgCarrier" strokeWidth="0"></g> <g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g> <g id="SVGRepo_iconCarrier"> <polyline points="244 400 100 256 244 112" style={{ fill: "none", stroke: "currentColor", strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: "48px", }} ></polyline><line x1="120" y1="256" x2="412" y2="256" style={{ fill: "none", stroke: "currentColor", strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: "48px"}} ></line></g></svg>
          </Link>
          <div className="flex flex-col-reverse lg:flex-row items-start lg:items-center gap-1 lg:gap-6">
            <h1 className="text-2xl lg:text-3xl font-medium text-nowrap text-left">Order #{order.order_number}</h1>
            <span
              className={`text-sm font-medium mr-2 px-3 py-1 rounded-full ${
                order.status === "pending"
                  ? "bg-yellow-200 text-yellow-800"
                  : order.status === "delivered" || order.status === "shipped"
                  ? "bg-green-200 text-green-800"
                  : "bg-blue-200 text-blue-800"
              }`}
            >
              {order.status}
            </span>
          </div>
        </div>
        <div className="flex flex-row items-center gap-6">
          <StatusDropdown orderId={order.id} orderNumber={order.order_number} />
        </div>
      </div>
      <div className="flex flex-col gap-8">
        <ToastNotification />        
        <div className="flex flex-col lg:flex-row gap-6">
          {/* Items */}
          <div className="w-full">
            <OrderedProductsTable rows={order.items} />
          </div>

          {/* Customer */}
          <div className="flex flex-col border-2 rounded-md p-4">
            <h2 className="text-lg font-medium">Customer</h2>
            <div className="flex flex-col gap-4">
              <div className="flex flex-col">
                <p className="font-medium">Name</p>
                <p>{order.customer.name}</p>
              </div>
              <div className="flex flex-col">
                <p className="font-medium">Email</p>
                <p>{order.customer.email}</p>
              </div>
              <div className="flex flex-col">
                <p className="font-medium">Shipping address</p>
                <p>{order.customer.shipping_address}</p>
              </div>
              <div className="flex flex-col">
                <p className="font-medium">Billing address</p>
                <p>{order.customer.billing_address}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    // <div className="order-details">
      // <h1>Order Details</h1>
      // <p><strong>Order ID:</strong> {order.id}</p>
      // <p><strong>Customer Name:</strong> {order.customer.name}</p>
      // <p><strong>Order Date:</strong> {new Date(order.order_date).toLocaleDateString()}</p>
      // <p><strong>Status:</strong> {order.status}</p>
      // {/* <p><strong>Total Amount:</strong> ${order.totalAmount.toFixed(2)}</p> */}

      // <h2>Items</h2>
      // <ul>
      //   {order.items.map((item) => (
      //     <li key={item.id}>
      //       {item.name} - {item.quantity} x ${item.price.toFixed(2)}
      //     </li>
      //   ))}
      // </ul>

      // {/* <div className="actions">
      //   <button onClick={() => changeOrderStatus(order.id, 'Processing')}>Mark as Processing</button>
      //   <button onClick={() => changeOrderStatus(order.id, 'Shipped')}>Mark as Shipped</button>
      //   <button onClick={() => changeOrderStatus(order.id, 'Delivered')}>Mark as Delivered</button>
      // </div> */}
    // </div>
  ) : (
    <div className="flex-1 w-full flex flex-col gap-4">
      <FormMessage message={{ "error": `Order ${orderNumber} not found` }} />        
    </div>
  );
}
