export interface User {
    id: string,
    name: string
}

export interface Store {
    id: number,
    user_id: string,
    name: string
}

export interface Order {
    id: number,
    order_date: string,
    status: string
}

export interface Customer {
    id: number,
    name: string,
    email: string
}

export interface CustomerWithAddress extends Customer {
    shipping_address: string,
    billing_address: string
}

export interface OrderWithCustomer extends Order {
    customer: Customer
}

export interface OrderItem {
    id: number,
    name: string,
    quantity: number,
    price: number
}

export interface FullOrder extends Order {
    customer: CustomerWithAddress
    items: OrderItem[]
    total: number
}

export interface Product {
    id: number,
    name: string,
    description: string,
    price: {
        amount: number
    }
}