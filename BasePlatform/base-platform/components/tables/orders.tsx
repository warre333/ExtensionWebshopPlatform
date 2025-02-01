"use client"

import Link from "next/link"
import { OrderWithCustomer } from "@/types"
import { BaseTable, Column } from "./base"
import { Button } from "../ui/button"
import { DeleteProduct } from "@/queries/products"

export function OrdersTable({ rows }: { rows: OrderWithCustomer[]}) {
  const colHeader = [ "Order ID", "Customer name", "Order date", "Status" ]

  return (
    <BaseTable colHeader={colHeader} >
      {rows.map((item, key) => (
        <tr key={key}>
          <td className={`${Column()} font-medium text-gray-900`}>{item.id}</td>
          <td className={`${Column()}`}>{item.customer.name}</td> 
          <td className={`${Column()}`}>{new Date(item.order_date).toLocaleString()}</td>
          <td className={`${Column()}`}>{item.status}</td>
          <td className={`${Column()}`}>
            <a href={`/admin/orders/${item.id}`} className="text-blue-500 hover:text-blue-700">View order</a>
          </td>
        </tr>  
      ))}    
      
      {rows.length === 0 && (
        <tr>
          <td className={`${Column()} text-center`} colSpan={5}>No orders found</td>
        </tr>
      )} 
    </BaseTable>
  )
}