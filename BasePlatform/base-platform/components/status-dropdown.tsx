"use client"

import { UpdateOrderStatus } from "@/queries/orders";
import { Button } from "./ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "./ui/dropdown-menu";

export const StatusDropdown = ({ orderId, orderNumber }: { orderId: number, orderNumber: number }) => {
    return (
        <DropdownMenu>
            <DropdownMenuTrigger>
              Change Status
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem onClick={() => UpdateOrderStatus(orderId, orderNumber, 'pending')}>
                Mark as Pending
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => UpdateOrderStatus(orderId, orderNumber, 'processing')}>
                Mark as Processing
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => UpdateOrderStatus(orderId, orderNumber, 'shipped')}>
                Mark as Shipped
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => UpdateOrderStatus(orderId, orderNumber, 'delivered')}>
                Mark as Delivered
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
    );
}