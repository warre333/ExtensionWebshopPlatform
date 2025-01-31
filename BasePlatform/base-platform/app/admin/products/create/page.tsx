import { SubmitButton } from "@/components/submit-button";
import { ToastNotification } from "@/components/toast";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { GetUserAndStore } from "@/lib/functions";
import { CreateProduct } from "@/queries/products";

export default async function CreateProductPage() {
  const { user, store } = await GetUserAndStore();
  
  return (
    <div className="flex-1 w-full flex flex-col gap-4">
      <div className="flex items-center gap-4">
        <h1 className="text-3xl font-medium">Create a new product</h1>
      </div>
      <div className="flex flex-col gap-8">
        <ToastNotification />
        <div className="flex flex-col gap-4 w-full max-w-lg">
          <form className="flex flex-col gap-4">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                Product Name
              </label>
              <Input
                type="text"
                id="name"
                name="name"
                className="mt-1"
                required
              />
            </div>
            <div>
              <label htmlFor="description" className="block text-sm font-medium text-gray-700">
              Description
              </label>
              <Textarea
                id="description"
                name="description"
                rows={4}
                className="mt-1"
                required
              />
            </div>
            <div>
              <label htmlFor="price" className="block text-sm font-medium text-gray-700">
                Price
              </label>
              <Input
                type="currency"
                id="price"
                name="price"
                className="mt-1"
                required
              />
            </div>
            <SubmitButton formAction={CreateProduct} pendingText="Creating product...">Create product</SubmitButton>
          </form>
        </div>
      </div>
    </div>
  )
}
