"use server";
import { FullOrder, OrderWithCustomer } from "@/types";
import { createClient } from "@/utils/supabase/server";
import { encodedRedirect } from "@/utils/utils";

export const CreateOrder = async (formData: FormData) => {
    const supabase = await createClient();
    const user = await supabase.auth.getUser();
    const userId = user.data.user?.id;

    const { data: maxOrderNumberData, error: maxOrderNumberError } = await supabase
        .from("orders")
        .select("order_number")
        .eq("store_id", formData.get("store_id"))
        .order("order_number", { ascending: false })
        .limit(1);

    if (maxOrderNumberError) {
        return encodedRedirect(
            "error",
            "/admin",
            "Could not retrieve the highest order number",
        );
    }

    const highestOrderNumber = maxOrderNumberData.length > 0 ? maxOrderNumberData[0].order_number : 0;
    const newOrderNumber = highestOrderNumber + 1;
    
    const {
        data,
        error,
    } = await supabase.from("orders").insert([
        {
            store_id: formData.get("store_id"),
            order_number: newOrderNumber,
            customer_id: userId,
        }
    ]).select("id");

    if (error) {
        return encodedRedirect(
            "error",
            "/admin",
            "Could not create order",
        );
    }

    const orderedItems = JSON.parse(formData.get("ordered_items") as string);

    const { error: orderedItemsError } = await supabase.from("ordered_products").insert(
        orderedItems.map((item: any) => ({
            order_id: data[0].id,
            product_id: item.product_id,
            amount: item.quantity,
            price_id: item.price_id,
        }))
    );

    if (orderedItemsError) {
        return encodedRedirect(
            "error",
            "/admin",
            "Could not insert ordered items",
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

export const GetOrderByOrderNumber = async (order_number: number): Promise<FullOrder> => {
    const supabase = await createClient();
    const { data, error } = await supabase
        .from("orders")
        .select(`
            id,
            order_number,
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
        .eq("order_number", order_number)
    if (error) return {} as FullOrder;
    if (data.length === 0) return {} as FullOrder;

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