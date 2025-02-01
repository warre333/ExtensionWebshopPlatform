"use client"

import Link from "next/link"
import { Product } from "@/types"
import { BaseTable } from "./base"
import { Button } from "../ui/button"
import { DeleteProduct } from "@/queries/products"

export function ProductsTable({ rows }: { rows: Product[]}) {
  const colHeader = [ "Product name", "Description", "Price" ]
  const actionButton = (
    <Button size={"sm"}>
      <Link href="/admin/products/create" className="uppercase text-xs font-medium">Create product</Link>
    </Button>
  )

  return (
    <BaseTable colHeader={colHeader} action={actionButton} >
      {rows.map((item, key) => (
        <tr key={key}>
          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 w-full max-w-[30%]">{item.name}</td> 
          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 w-full max-w-[50%]">{item.description}</td> 
          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 w-full">€{item.price.amount / 100}</td>
          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 flex flex-row gap-4 w-fit">
            <Button variant={"ghost"} size={"icon"}>  
              <Link href={`/admin/products/${item.id}`}>
                <svg width="24px" height="24px" viewBox="0 0 24.00 24.00" fill="none" xmlns="http://www.w3.org/2000/svg" stroke="#000000" strokeWidth="0.00024000000000000003" transform="matrix(1, 0, 0, 1, 0, 0)"><g id="</Link>SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M9.75 12C9.75 10.7574 10.7574 9.75 12 9.75C13.2426 9.75 14.25 10.7574 14.25 12C14.25 13.2426 13.2426 14.25 12 14.25C10.7574 14.25 9.75 13.2426 9.75 12Z" fill="#000000"></path> <path fillRule="evenodd" clipRule="evenodd" d="M2 12C2 13.6394 2.42496 14.1915 3.27489 15.2957C4.97196 17.5004 7.81811 20 12 20C16.1819 20 19.028 17.5004 20.7251 15.2957C21.575 14.1915 22 13.6394 22 12C22 10.3606 21.575 9.80853 20.7251 8.70433C19.028 6.49956 16.1819 4 12 4C7.81811 4 4.97196 6.49956 3.27489 8.70433C2.42496 9.80853 2 10.3606 2 12ZM12 8.25C9.92893 8.25 8.25 9.92893 8.25 12C8.25 14.0711 9.92893 15.75 12 15.75C14.0711 15.75 15.75 14.0711 15.75 12C15.75 9.92893 14.0711 8.25 12 8.25Z" fill="#000000"></path> </g></svg>
              </Link>
            </Button>
            <Button variant={"ghost"} size={"icon"}>  
              <Link href={`/admin/products/${item.id}?edit=true`}>
                <svg viewBox="-1.6 -1.6 19.20 19.20" width="24px" height="24px" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M8.29289 3.70711L1 11V15H5L12.2929 7.70711L8.29289 3.70711Z" fill="#000000"></path> <path d="M9.70711 2.29289L13.7071 6.29289L15.1716 4.82843C15.702 4.29799 16 3.57857 16 2.82843C16 1.26633 14.7337 0 13.1716 0C12.4214 0 11.702 0.297995 11.1716 0.828428L9.70711 2.29289Z" fill="#000000"></path> </g></svg>
              </Link>
            </Button>
            <Button variant={"ghost"} size={"icon"} onClick={() => DeleteProduct(item.id)}>
              <svg viewBox="0 0 24 24" width="24px" height="24px" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M18 6L17.1991 18.0129C17.129 19.065 17.0939 19.5911 16.8667 19.99C16.6666 20.3412 16.3648 20.6235 16.0011 20.7998C15.588 21 15.0607 21 14.0062 21H9.99377C8.93927 21 8.41202 21 7.99889 20.7998C7.63517 20.6235 7.33339 20.3412 7.13332 19.99C6.90607 19.5911 6.871 19.065 6.80086 18.0129L6 6M4 6H20M16 6L15.7294 5.18807C15.4671 4.40125 15.3359 4.00784 15.0927 3.71698C14.8779 3.46013 14.6021 3.26132 14.2905 3.13878C13.9376 3 13.523 3 12.6936 3H11.3064C10.477 3 10.0624 3 9.70951 3.13878C9.39792 3.26132 9.12208 3.46013 8.90729 3.71698C8.66405 4.00784 8.53292 4.40125 8.27064 5.18807L8 6M14 10V17M10 10V17" stroke="#e60000" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path> </g></svg>
            </Button>
            </td>
        </tr>  
      ))}    
    </BaseTable>
  )
}