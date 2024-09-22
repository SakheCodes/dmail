"use client";
import { ScrollArea } from "@/components/ui/scroll-area";
import { api } from "@/lib/api";
import { decryptedText } from "@/app/util/simpleGenerateKey";
import { getAllLocalStorage } from "@/app/util/getAllOutboxMessages";
import { Email } from "@/app/components/NewEmail/NewEmailWrapper";

export default function Outbox() {
  const localStorageArray = getAllLocalStorage();

  return (
    <div className="flex w-full h-screen bg-gray-100">
      <div className="flex-1 w-full p-8">
        <div className="w-full">
          <h2 className="text-2xl font-semibold mb-4">Outbox</h2>
          <ScrollArea className="h-[calc(100vh-12rem)] rounded-md border p-4">
            {localStorageArray
              .filter(
                (item) =>
                  typeof Number(item.key) === "number" &&
                  !isNaN(Number(item.key))
              )
              .map((email: any, key: any) => {
                // const mail = JSON.parse(email.value);
                if (email.value !== "undefined") {
                  const mail = JSON.parse(email.value);
                  console.log(email);
                  return (
                    <div
                      key={key}
                      className="w-full mb-4 p-4 bg-white rounded-lg shadow"
                    >
                      <h3 className="font-semibold">{mail.subject}</h3>
                      <p className="text-sm text-gray-600">From: {mail.from}</p>
                      <p className="mt-2">{mail.message}</p>
                    </div>
                  );
                }

                // return (
                //   <div
                //     key={key}
                //     className="w-full mb-4 p-4 bg-white rounded-lg shadow"
                //   >
                //     {console.log(email)}
                //     <h3 className="font-semibold">{mail.subject}</h3>
                //     <p className="text-sm text-gray-600">From: {mail.from}</p>
                //     <p className="mt-2">{mail.message}</p>
                //   </div>
                // );
              })}
          </ScrollArea>
        </div>
      </div>
    </div>
  );
}
