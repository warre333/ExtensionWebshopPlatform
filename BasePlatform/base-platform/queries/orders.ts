"use server";
import { FullOrder, OrderWithCustomer } from "@/types";
import { createClient } from "@/utils/supabase/server";
import { encodedRedirect } from "@/utils/utils";

export const CreateOrder = async (formData: FormData) => {
    const supabase = await createClient();
    const user = await supabase.auth.getUser();
    const userId = user.data.user?.id;
    
    const {
        data,
        error,
    } = await supabase.from("orders").insert([
        {
            user_id: userId,
            store_id: formData.get("store_id"),
            total: formData.get("total"),
            status: formData.get("status"),
        }
    ]);

    if (error) {
        return encodedRedirect(
            "error",
            "/admin",
            "Could not create order",
        );
    }

    return encodedRedirect(
        "success",
        "/admin",
        "Order created",
    );
}

export const GetOrdersFromStore = async (store_id: string): Promise<OrderWithCustomer[]> => {
    const supabase = await createClient();
    const { data, error } = await supabase
        .from("orders")
        .select(`
            id,
            customer:customers (
                id,
                name,
                email
            ),
            order_date,
            status   
        `)
        .eq("store_id", store_id);
    if (error) {
        return [];
    }
    return data.map((order) => ({
        ...order,
        customer: Array.isArray(order.customer) ? order.customer[0] : order.customer
    })) as OrderWithCustomer[];
}

export const GetOrderById = async (order_id: number): Promise<FullOrder> => {
    const supabase = await createClient();
    const { data, error } = await supabase
        .from("orders")
        .select(`
            id,
            customer:customers (
                id,
                name,
                email,
                shipping_address,
                billing_address
            ),
            order_date,
            status,
            items:ordered_products (
                id:product_id,
                quantity:amount,
                price:prices (
                    amount
                ),
                product:products (
                    name
                )
            )
        `)
        .eq("id", order_id);
    if (error) {
        return {} as FullOrder;
    }

    const total = data[0].items.reduce((acc: number, item: any) => {
        return acc + item.quantity * item.price.amount;
    }, 0);
    const formattedItems = data[0].items.map((item: any) => ({
        id: item.id,
        name: Array.isArray(item.product) ? item.product[0].name : item.product.name,
        quantity: item.quantity,
        price: Array.isArray(item.price) ? item.price[0].amount : item.price.amount,
    }));

    return {
        ...data[0],
        customer: Array.isArray(data[0].customer) ? data[0].customer[0] : data[0].customer,
        items: formattedItems,
        total,
    };
}