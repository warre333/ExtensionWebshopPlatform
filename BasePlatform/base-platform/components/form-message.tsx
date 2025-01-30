"use client"

import { cva } from "class-variance-authority";
import { useSearchParams } from "next/navigation";

export type Message =
  | { success: string }
  | { error: string }
  | { message: string };

const messageVariants = cva(
  "whitespace-nowrap",
  {
    variants: {
      type: {
        success: "text-white bg-green-500 border-green-500 border-l-2 px-4 rounded-md",
        error: "text-destructive-foreground bg-destructive px-4 py-2 rounded-md",
        message: "text-foreground border-l-2 px-4",
      },
      size: {
        small: "text-xs py-1",
        medium: "text-sm py-2",
        large: "text-lg py-4",
      },
    },
    defaultVariants: {
      type: "message",
      size: "medium",
    },
  },
);

export function FormMessage({ message, size = "medium" }: { message?: Message; size?: "small" | "medium" | "large" }) {
  const searchParams = useSearchParams();

  if (!message) {
    if (searchParams.get("error"))
      message = { error: searchParams.get("error") as string };
    else if (searchParams.get("success"))
      message = { success: searchParams.get("success") as string };
    else if (searchParams.get("message"))
      message = { message: searchParams.get("message") as string };
    else
      message = { message: "" };
  }

  return (
    <div className="flex flex-col gap-2 w-full max-w-md text-sm">
      {"success" in message && (
        <div className={messageVariants({ type: "success", size })}>
          {message.success}
        </div>
      )}
      {"error" in message && (
        <div className={messageVariants({ type: "error", size })}>
          {message.error}
        </div>
      )}
      {"message" in message && (
        <div className={messageVariants({ type: "message", size })}>
          {message.message}
        </div>
      )}
    </div>
  );
}
