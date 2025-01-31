"use client"
import { cva } from "class-variance-authority";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { Message } from "./form-message";

import { Transition } from "@headlessui/react";
const TIME_SHOWN = 5000;

const messageVariants = cva(
  "overflow-auto whitespace-normal",
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


export function ToastNotification({ message, size = "medium" }: { message?: Message; size?: "small" | "medium" | "large" }) {
  const [open, setOpen] = useState(false);
  const searchParams = useSearchParams();

  useEffect(() => {
    if (message || searchParams.get("error") || searchParams.get("success") || searchParams.get("message")) {
      setOpen(true);
      const timer = setTimeout(() => {
        setOpen(false);
        
        // const params = new URLSearchParams(window.location.search);
        // params.delete("error");
        // params.delete("success");
        // params.delete("message");
        // const newUrl = `${window.location.pathname}?${params.toString()}`;
        // window.history.replaceState({}, '', newUrl);
      }, TIME_SHOWN);
      return () => clearTimeout(timer);
    }
  }, [message, searchParams]);

  if (!message) {
    if (searchParams.get("error"))
      message = { error: searchParams.get("error") as string };
    else if (searchParams.get("success"))
      message = { success: searchParams.get("success") as string };
    else if (searchParams.get("message"))
      message = { message: searchParams.get("message") as string };
  }

  return (
    <Transition
      show={open}
      enter="transition-transform duration-300"
      enterFrom="translate-y-full"
      enterTo="translate-x-0"
      leave="transition-transform duration-300"
      leaveFrom="translate-x-0"
      leaveTo="translate-y-full"
    >
      <div className="fixed bottom-6 right-6 flex flex-col gap-2 w-full max-w-md text-sm">
        {message !== undefined && (
          <>
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
          </>
        )}
      </div>
    </Transition>
  );
}
