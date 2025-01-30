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
            store_id: store?.id,
        }
    ]).select("id").single();
    console.log(data, error)

    if (data) {
        const { error: priceInsertError } = await supabase.from("prices").insert({
            product_id: data.id,
            amount: Number(formData.get("price")) * 100,
        });

        if (priceInsertError) {
            return encodedRedirect(
                "error",
                "/admin/products/create",
                "Could not create product price",
            );
        }
    }

    if (error) {
        return encodedRedirect(
            "error",
            "/admin/products/create",
            "Could not create product",
        );
    }

    return encodedRedirect(
        "success",
        "/admin/products",
        "Product created",
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
        .eq("store_id", store_id)
        .eq("prices.active", true);
    if (error) {
        return [];
    }
    
    return data.map((product) => ({
        ...product,
        price: Array.isArray(product.price) ? product.price[0] : product.price
    })) as Product[];
}

export const GetProductById = async (productId: string): Promise<Product | null> => {
    const supabase = await createClient();
    const { data, error } = await supabase.from("products")
        .select(`
            id,
            name,
            description,
            price:prices (
                amount
            )
        `)
        .eq("id", productId)
        .eq("prices.active", true);
    
    if (error) {
        return null;
    }    
    
    return Array.isArray(data[0].price) ? { ...data[0], price: { amount: (data[0].price[0] as { amount: number }).amount }} : { ...data[0], price: { amount: (data[0].price as { amount: number }).amount }};
}

export const UpdateProduct = async (product: Product) => {
    const supabase = await createClient();

    const { data: existingPrice, error: existingPriceError } = await supabase
        .from("prices")
        .select("amount")
        .eq("product_id", product.id)
        .eq("active", true)
        .single();

    if (existingPriceError) {
        return encodedRedirect(
            "error",
            `/admin/products/${product.id}`,
            "Could not fetch existing price",
        );
    }

    if (existingPrice.amount !== product.price.amount) {
        const now = new Date().toISOString();
        const { error: priceUpdateError } = await supabase.from("prices").update({
            end_date: now,
            active: false,
        }).eq("product_id", product.id).eq("active", true);

        if (priceUpdateError) {
            return encodedRedirect(
                "error",
                `/admin/products/${product.id}`,
                "Could not update previous price",
            );
        }

        const { error: priceInsertError } = await supabase.from("prices").insert({
            product_id: product.id,
            amount: product.price.amount
        });

        if (priceInsertError) {            
            await supabase.from("prices").update({
                end_date: new Date(new Date().setFullYear(9999)).toISOString(),
                active: true,
            }).eq("product_id", product.id).eq("end_date", now);

            return encodedRedirect(
                "error",
                `/admin/products/${product.id}`,
                "Could not insert new price",
            );
        }
    }

    const { error: productUpdateError } = await supabase.from("products").update({
        name: product.name,
        description: product.description,
    }).eq("id", product.id);

    if (productUpdateError) {
        return encodedRedirect(
            "error",
            `/admin/products/${product.id}`,
            "Could not update product",
        );
    }

    return encodedRedirect(
        "success",
        "/admin/products",
        "Product updated",
    );
}