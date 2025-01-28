"use server";
import { Product } from "@/types";
import { createClient } from "@/utils/supabase/server";
import { encodedRedirect } from "@/utils/utils";
import { GetStoreFromUser } from "./stores";

export const CreateProduct = async (formData: FormData) => {
    const supabase = await createClient();
    const store = await GetStoreFromUser();    
    const {
        data,
        error,
    } = await supabase.from("products").insert([
        {
            name: formData.get("name"),
            description: formData.get("description"),
            price: formData.get("price"),
            store_id: store?.id,
        }
    ]);

    if (error) {
        console.error(error.message);
        return encodedRedirect(
            "error",
            "/admin/products/create",
            "Could not create product",
        );
    }

    return encodedRedirect(
        "success",
        "/admin/products",
        "Order created",
    );
}

export const GetProductsFromStore = async (store_id: string): Promise<Product[]> => {
    const supabase = await createClient();
    const { data, error } = await supabase
        .from("products")
        .select(`
            id,
            name,
            description,
            price:prices (
                amount
            )
        `)
        .eq("store_id", store_id);
    if (error) {
        console.error(error.message);
        return [];
    }
    
    return data.map((product) => ({
        ...product,
        price: Array.isArray(product.price) ? product.price[0] : product.price
    })) as Product[];
}