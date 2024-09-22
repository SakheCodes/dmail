import { ethers } from "ethers";
import { Email } from "../components/NewEmail/NewEmailWrapper";
import { getContract } from "./getContract";
import getLastTwoWords from "./getLastTwoWords";

export const getMoney = async (email: Email) => {
  const contract = await getContract();
  const lastTwoWords = getLastTwoWords(email.message).toLowerCase();

  console.log("email.from", email.from);
  console.log("email.to", email.to);

  const exampleMessage = {
    message: lastTwoWords, // TransactionsPerPeriod
    //@ts-ignore
    value: ethers.parseEther(email.ethamount),
    from: email.from,
    to: email.to,
  };

  console.log("message: ", lastTwoWords);
  console.log("value: ", exampleMessage.value);
  console.log("from: ", exampleMessage.from);
  console.log("to: ", exampleMessage.to);

  const tx = await contract.verifyMessage(
    exampleMessage,
    email.v,
    email.r,
    email.s
  );

  await tx.wait();
};
