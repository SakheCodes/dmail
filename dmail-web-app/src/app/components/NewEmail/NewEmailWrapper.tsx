"use client";

import React, { useState } from "react";
import { NewEmailDialog } from "./NewEmailDialog";
import { Button } from "@/components/ui/button";
import { PenSquare } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { api } from "@/lib/api";
import { cipherText } from "@/app/util/simpleGenerateKey";

type NewEmailWrapperProps = {
  className: string;
};

export type Email = {
  from: string;
  to: string;
  subject: string;
  message: string;
  ethAmount: string;
  v?: 27 | 28;
  r?: string;
  s?: string;
};

const NewEmailWrapper: React.FC<NewEmailWrapperProps> = ({ className }) => {
  const [isOpen, setIsOpen] = useState(false);
  const { toast } = useToast();

  const submitEmail = (email: Email) => {
    localStorage.setItem(JSON.stringify(Date.now()), JSON.stringify(email));

    api.post("/communicate", cipherText(JSON.stringify(email), 3), {
      params: {
        userAddress: email.to,
      },
    });
  };

  return (
    <div>
      <Button
        variant="default"
        className={className}
        onClick={() => setIsOpen(true)}
      >
        <PenSquare className="mr-2 h-4 w-4" /> Compose
      </Button>
      {isOpen ? (
        <NewEmailDialog
          onSendEmail={submitEmail}
          isOpen={isOpen}
          setIsOpen={setIsOpen}
        />
      ) : null}
    </div>
  );
};

export default NewEmailWrapper;
