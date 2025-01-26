import { FormMessage, Message } from "@/components/form-message";
import { SubmitButton } from "@/components/submit-button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { GetOrdersFromStore } from "@/queries/orders";
import { CreateStore, GetStoreFromUser } from "@/queries/stores";
import { CreateUser, GetUser } from "@/queries/users";
import { createClient } from "@/utils/supabase/server";
import { encodedRedirect } from "@/utils/utils";
import { redirect } from "next/navigation";

export default async function CreateStorePage(props: {
  searchParams: Promise<Message>;
}) {
  const searchParams = await props.searchParams;
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return redirect("/sign-in");
  }

  const { data, error } = await GetUser(user.id);
  console.log(data, error);
  if (data?.length === 0) {
    const { data, error } = await CreateUser(user.id, user.user_metadata.displayName);

    if (error) {
      console.error(error);
      return encodedRedirect(
        "error",
        "/admin/create-store",
        "Could not create user",
      );
    }
  }

  const store = await GetStoreFromUser();

  if (store) {
    return redirect("/admin");
  }

  return (
    <div className="flex-1 w-full flex flex-col gap-4">
      <form className="flex flex-col min-w-64 max-w-64 mx-auto">
        <h1 className="text-2xl font-medium">Create a store</h1>
        <div className="flex flex-col gap-2 [&>input]:mb-3 mt-8">
          {/* Name */}
          <Label htmlFor="storeName">Store name</Label>
          <Input name="storeName" placeholder="Cool store" required />

          <SubmitButton formAction={CreateStore} pendingText="creating...">
             Create
          </SubmitButton>
          <FormMessage message={searchParams} />
        </div>
      </form>
    </div>
  );
}
