"use server";
import { OrderWithCustomer } from "@/types";
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

export const GetOrderById = async (order_id: number): Promise<OrderWithCustomer> => {
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
        .eq("id", order_id);
    if (error) {
        console.error(error.message);
        return {} as OrderWithCustomer;
    }
    return data.map((order) => ({
        ...order,
        customer: Array.isArray(order.customer) ? order.customer[0] : order.customer
    }))[0] as OrderWithCustomer;
}