"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Mail, Coins } from "lucide-react";
import { Email } from "./NewEmailWrapper";
import { createSignature } from "@/app/util/createSignature";
interface EmailDialogProps {
  onSendEmail: (email: Email) => void;
  isOpen: boolean;
  setIsOpen: (flag: boolean) => void;
}

export const NewEmailDialog = ({
  onSendEmail,
  isOpen,
  setIsOpen,
}: EmailDialogProps) => {
  const [to, setTo] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [isImportant, setIsImportant] = useState(false);
  const [ethAmount, setEthAmount] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const email = {
      to,
      from: localStorage.getItem("currentUser")!,
      subject,
      message,
      ethAmount,
    };
    const signedEmail = await createSignature(email);

    console.log("signedEmail:", signedEmail);
    onSendEmail(signedEmail ?? email);
    setIsOpen(false);
    // Reset form
    setTo("");
    setSubject("");
    setMessage("");
    setIsImportant(!isImportant);
    setEthAmount("");
    // Send email logic
  };

  return (
    <Dialog modal open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent className="bg-white sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Compose New Email</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="to">To</Label>
            <Input
              id="to"
              type="text"
              placeholder="0x00000000000"
              value={to}
              onChange={(e) => setTo(e.target.value)}
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="subject">Subject</Label>
            <Input
              id="subject"
              type="text"
              placeholder="Email subject"
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="content">Content</Label>
            <Textarea
              id="message"
              placeholder="Type your message here"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              required
            />
          </div>
          <div className="flex items-center space-x-2">
            <Switch
              id="important"
              checked={isImportant}
              onCheckedChange={setIsImportant}
            />
            <Label htmlFor="important">Mark as Important</Label>
          </div>
          {isImportant && (
            <div className="space-y-2">
              <Label htmlFor="eth-amount">ETH Amount</Label>
              <div className="relative">
                <Input
                  id="eth-amount"
                  type="number"
                  step="0.001"
                  min="0"
                  placeholder="0.00"
                  value={ethAmount}
                  onChange={(e) => setEthAmount(e.target.value)}
                  className="pl-8"
                  required
                />
                <Coins className="absolute left-2 top-2.5 h-5 w-5 text-gray-500" />
              </div>
            </div>
          )}
          <Button type="submit" className="w-full">
            Send Email
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
};
