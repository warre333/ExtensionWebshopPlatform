'use server';
import { GetStoreFromUser } from "@/queries/stores";
import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";

export async function GetUserAndStore() {    
    const supabase = await createClient();

    const {
    data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
    return redirect("/sign-in");
    }

    const store = await GetStoreFromUser();

    if (!store) {
    return redirect("/admin/create-store");
    }

    return {
        supabase,
        user,
        store
    }
}