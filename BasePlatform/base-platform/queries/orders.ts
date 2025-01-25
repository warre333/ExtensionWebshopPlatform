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
        console.error(error.message);
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

        console.log(data)
    if (error) {
        console.error(error.message);
        return [];
    }

    return data as unknown as OrderWithCustomer[]; // 😭 Customer type is an array type but isn't?
}