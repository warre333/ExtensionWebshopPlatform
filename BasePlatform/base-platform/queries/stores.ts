"use server";

import { Store } from "@/types";
import { createClient } from "@/utils/supabase/server";
import { encodedRedirect } from "@/utils/utils";
import { redirect } from "next/navigation";

export const CreateStore = async (formData: FormData) => {
    const supabase = await createClient();
    const user = await supabase.auth.getUser();
    const userId = user.data.user?.id;
    
    const {
        data,
        error,
    } = await supabase.from("stores").insert([
        {
            user_id: userId,
            name: formData.get("storeName")
        }
    ]);
    
    if (error) {
        console.error(error.message);
        return encodedRedirect(
            "error",
            "/admin/create-store",
            "Could not create store",
        );
    }
    
    return redirect("/admin");
}

export const GetStoreFromUser = async (): Promise<Store | null> => {
    const supabase = await createClient();
    const user = await supabase.auth.getUser();
    const userId = user.data.user?.id;
    
    if (!userId) return null;
    
    const { data, error } = await supabase.from("stores").select("*").eq("user_id", userId);

    if (error) {
        console.error(error.message);
        return null;
    }
    
    return data[0];
}

export const GetStoreBySlug = async (slug: string): Promise<Partial<Store> | null> => {
    const supabase = await createClient();
    
    const { data, error } = await supabase.from("stores").select("id, name, slug").eq("slug", slug);

    if (error) {
        return null;
    }
    
    return data[0];
}