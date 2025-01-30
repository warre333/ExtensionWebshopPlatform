"use client"

import { Product } from "@/types"
import { useState } from "react";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { useSearchParams } from "next/navigation";
import { FormMessage } from "./form-message";

export const ProductDashboard = ({
    product,
    saveProduct,
  }: {
    product: Product;
    saveProduct: (product: Product) => Promise<void>;
  }) => {
    const searchParams = useSearchParams();
    const [isEditing, setIsEditing] = useState(searchParams.get("edit") === "true");
    const [editedProduct, setEditedProduct] = useState(product);

    async function handleSave() {
        try {
            await saveProduct(editedProduct);
            setIsEditing(false);
        } catch (error) {
            console.error("Failed to save product:", error);
        }
    }

    function handleCancel() {    
        setEditedProduct(product);    
        setIsEditing(false);
    }

    return (
        <div className="flex-1 w-full flex flex-col gap-4">
            { searchParams.get("error") && (<FormMessage message={{ error: searchParams.get("error") as string }} size="large" /> )}
            <div className="flex items-center gap-4">
                <h1 className="text-3xl font-medium">{product.name}</h1>
            </div>
            <div className="flex flex-col gap-8">
                <div className="flex flex-col gap-4">
                    <div className="flex flex-row justify-between items-center">
                        <h1 className="text-xl font-medium">Product details</h1>
                        {isEditing ? (
                            <div className="flex gap-4">
                                <Button variant={"destructive"} onClick={handleCancel}>
                                    <p>Cancel</p>
                                </Button>
                                <Button onClick={handleSave}>
                                    <p>Save</p>
                                </Button>
                            </div>
                        ) : (
                            <Button variant={"ghost"} size={"icon"} onClick={() => setIsEditing(true)}>
                                <svg viewBox="0 0 16 16" width="24" height="24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M13 0L16 3L9 10H6V7L13 0Z" fill="#000000"></path> <path d="M1 1V15H15V9H13V13H3V3H7V1H1Z" fill="#000000"></path> </g></svg>
                            </Button>
                        )}
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                        <h2 className="text-lg font-medium">Name</h2>
                        { isEditing ? (
                            <Input
                            type="text"
                            value={editedProduct.name}
                            onChange={(e) => setEditedProduct({...editedProduct, name: e.target.value}) }
                            className="border rounded p-2 w-full"
                            />
                            ) : (
                                <p>{editedProduct.name}</p>
                            )}
                        </div>
                        <div>
                        <h2 className="text-lg font-medium">Price</h2>
                        { isEditing ? (
                            <Input
                            type="number"
                            step="0.01"
                            value={(editedProduct.price.amount / 100).toString()}
                            onChange={(e) => setEditedProduct({...editedProduct, price: { amount: Math.round(parseFloat(e.target.value) * 100) }}) }
                            className="border rounded p-2 w-full"
                            />
                            ) : (
                                <p>€{(editedProduct.price.amount / 100).toFixed(2)}</p>
                            )}
                        </div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                        <h2 className="text-lg font-medium">Description</h2>
                        { isEditing ? (
                            <Input
                            type="text"
                            value={editedProduct.description}
                            onChange={(e) => setEditedProduct({...editedProduct, description: e.target.value}) }
                            className="border rounded p-2 w-full"
                            />
                            ) : (
                                <p>{editedProduct.description}</p>
                            )}
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
    )
}