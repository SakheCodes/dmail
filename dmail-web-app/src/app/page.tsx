"use client";

import Link from "next/link";
import React from "react";

import { connectToMetaMask } from "./util/connectToMetamask";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
const page = () => {
  const router = useRouter();
  return (
    <div className="flex flex-col w-full items-center justify-center">
      <div className="relative w-80 h-80">
        <Image alt="" fill src="Frame.svg" />
      </div>
      <h1 className="text-8xl">dMail</h1>

      <h2>BLAZING FAST | SECURE | PRIVATE</h2>
      <div className="pt-8">
        <Button
          className="flex items-center space-x-2"
          onClick={async () => {
            localStorage.setItem(
              "currentUser",
              (await connectToMetaMask())?.signer.address!
            );
            router.push("/dashboard");
          }}
          about="Connect wallet"
        >
          <img
            src="/metamask-icon.svg"
            alt="MetaMask"
            className="w-4 h-4 mr-2"
          />
          Connect MetaMask
        </Button>
      </div>
    </div>
  );
};

export default page;
