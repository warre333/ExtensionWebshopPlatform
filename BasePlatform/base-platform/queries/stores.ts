import { createClient } from "@/utils/supabase/server";
import { encodedRedirect } from "@/utils/utils";

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
            name: formData.get("name")
        }
    ]);
    
    if (error) {
        console.error(error.message);
        return;
        // return encodedRedirect(
        //     "error",
        //     "/dashboard",
        //     "Could not create store",
        // );
    }
    
    return  // encodedRedirect(
    //     "success",
    //     "/dashboard",
    //     "Store created",
    // );
}

export const GetStoreFromUser = async () => {
    const supabase = await createClient();
    const user = await supabase.auth.getUser();
    const userId = user.data.user?.id;
    
    if (!userId) return null;
    
    const { data, error } = await supabase.from("stores").select("*").eq("user_id", userId);

    if (error) {
        console.error(error.message);
        return null;
    }
    
    return data;
}