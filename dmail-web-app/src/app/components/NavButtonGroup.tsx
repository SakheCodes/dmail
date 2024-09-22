"use client";
import { Button } from "@/components/ui/button";
import { Inbox, PenSquare, Send } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import React from "react";
import NewEmailWrapper from "./NewEmail/NewEmailWrapper";

const NavButtonGroup = () => {
  const router = useRouter();
  const tabId = usePathname();

  return (
    <div>
      <Button
        variant={tabId === "/dashboard" ? "default" : "ghost"}
        className="w-full justify-start mb-2"
        onClick={() => {
          console.log(tabId);
          return router.push("/dashboard");
        }}
      >
        <Inbox className="mr-2 h-4 w-4" /> Inbox
      </Button>
      <Button
        variant={tabId === "/dashboard/outbox" ? "default" : "ghost"}
        className="w-full justify-start mb-2"
        onClick={() => router.push("/dashboard/outbox")}
      >
        <Send className="mr-2 h-4 w-4" /> Outbox
      </Button>
      <NewEmailWrapper className={"justify-start w-full bg-blue-400"} />
    </div>
  );
};

export default NavButtonGroup;
