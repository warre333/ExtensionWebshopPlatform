import { GetUserAndStore } from "@/lib/functions";
import { GetProductById } from "@/queries/products";

export default async function DashboardPage({
  params,
}: {
  params: Promise<{ productId: string }>
}) {
  const productId = (await params).productId;

  await GetUserAndStore();
  const product = await GetProductById(productId);

  return product ? (
    <div className="flex-1 w-full flex flex-col gap-4">
      <div className="flex items-center gap-4">
        <h1 className="text-3xl font-medium">{product.name}</h1>
      </div>
      <div className="flex flex-col gap-8">
        <div className="flex flex-col gap-4">
          <div className="flex flex-row justify-between items-center">
            <h1 className="text-xl font-medium">Product details</h1>
            <svg viewBox="0 0 16 16" width="24" height="24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M13 0L16 3L9 10H6V7L13 0Z" fill="#000000"></path> <path d="M1 1V15H15V9H13V13H3V3H7V1H1Z" fill="#000000"></path> </g></svg>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <h2 className="text-lg font-medium">Name</h2>
              <p>{product.name}</p>
            </div>
            <div>
              <h2 className="text-lg font-medium">Price</h2>
              <p>€{product.price.amount / 100}</p>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <h2 className="text-lg font-medium">Description</h2>
              <p>{product.description}</p>
            </div>
          </div>
          {/* Will add images later on */}
          {/* <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <h2 className="text-lg font-medium">Product image</h2>
              <img src={products[0].image} alt={products[0].name} />
            </div>
          </div> */}          
        </div>
      </div>
    </div>
  ) : (
    <div className="flex-1 w-full flex flex-col gap-4">
      Product not found
    </div>
  );
}
