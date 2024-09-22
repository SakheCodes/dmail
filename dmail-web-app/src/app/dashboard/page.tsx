"use client";

import { ScrollArea } from "@/components/ui/scroll-area";
import { api } from "@/lib/api";
import { decryptedText } from "../util/simpleGenerateKey";
import { useEffect, useState } from "react";
import { Email } from "../components/NewEmail/NewEmailWrapper";
import { getMoney } from "../util/getMoney";

export default function Inbox() {
  const [decryptedEmails, setDecryptedEmails] = useState<[]>([]);

  useEffect(() => {
    api
      .get("/communicate", {
        params: {
          userAddress: localStorage.getItem("currentUser"),
        },
      })
      .then((res) => setDecryptedEmails(res.data));
  }, []);

  const emails: Email[] = decryptedEmails.map((email: any) => {
    return JSON.parse(decryptedText(email, 3));
  });
  console.log(decryptedEmails);
  return (
    <div className="flex w-full h-screen bg-gray-100">
      <div className="flex-1 w-full p-8">
        <div className="w-full">
          <h2 className="text-2xl font-semibold mb-4">Inbox</h2>
          <ScrollArea className="h-[calc(100vh-12rem)] rounded-md border p-4">
            {emails.map((email, key) => (
              <div
                key={key}
                onClick={async () => {
                  // @ts-ignore
                  if (email.ethamount) await getMoney(email);
                }}
                className={`${
                  // @ts-ignore
                  email.ethamount
                    ? "border-solid border-2 border-blue-400 cursor-pointer "
                    : ""
                }w-full mb-4 p-4 bg-white rounded-lg shadow`}
              >
                {/* {console.log(email.ethAmount)} */}
                <h3 className="font-semibold">{email.subject}</h3>
                <p className="text-sm text-gray-600">
                  From:{email.ethAmount} {email.from}
                </p>
                <p className="mt-2">{email.message}</p>
                {/* @ts-ignore */}
                {email.ethamount && (
                  <p className="text-blue-400 text-end">
                    {/* @ts-ignore */}
                    ETH {email.ethamount}
                  </p>
                )}
              </div>
            ))}
          </ScrollArea>
        </div>
      </div>
    </div>
  );
}
