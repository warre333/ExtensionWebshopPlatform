"use server";
import { createClient } from "@/utils/supabase/server";

export const CreateUser = async (userId: string, fullName: string) => {
    const supabase = await createClient();
    const { data, error } = await supabase.from("users").insert([
        {
            id: userId,
            name: fullName,
        }
    ]);
    
    if (error) {
        console.error(error.message);
        return {data: null, error: error.message};
    }
    
    return { data, error: null };
}

export const GetUser = async (userId: string) => {
    const supabase = await createClient();
    const { data, error } = await supabase.from("users").select("*").eq("id", userId);
    
    if (error) {
        console.error(error.message);
        return {data: null, error: error.message};
    }
    
    return { data, error: null };
}