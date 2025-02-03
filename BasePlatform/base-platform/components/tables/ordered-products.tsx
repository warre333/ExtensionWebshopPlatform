"use client"

import { OrderItem, Product } from "@/types"
import { BaseTable, Column } from "./base"

export function OrderedProductsTable({ rows }: { rows: OrderItem[]}) {
  const colHeader = [ "Product name", "Quantity", "Price" ]

  return (
    <BaseTable colHeader={colHeader} >
      {rows.map((item, key) => (
        <tr key={key}>
          <td className={`${Column()} w-full`}>{item.name}</td>  
          <td className={`${Column()} text-center`}>{item.quantity}</td>
          <td className={`${Column()}`}>€{item.price / 100}</td>
        </tr>  
      ))}     
      
      {rows.length === 0 && (
        <tr>
          <td className={`${Column()} text-center`} colSpan={3}>No products ordered</td>
        </tr>
      )}  
    </BaseTable>
  )
}