import { ethers, Transaction } from "ethers";
import { connectToMetaMask } from "./connectToMetamask";
import { Email } from "../components/NewEmail/NewEmailWrapper";
import getLastTwoWords from "./getLastTwoWords";
import { CONTRACT_ADDRESS } from "./constants";

export const createSignature = async (email: Email) => {
  if (!email.ethAmount) return;
  const connection = await connectToMetaMask();
  console.log((await connection?.provider.getNetwork())?.chainId);

  console.log("Email in createSignature", email);

  const tx = connection?.signer.sendTransaction({
    to: CONTRACT_ADDRESS,
    value: ethers.parseEther(email.ethAmount),
  });

  (await tx)?.wait();

  const domain = {
    name: "EIP712Example",
    version: "1",
    chainId: (await connection?.provider.getNetwork())?.chainId,
    verifyingContract: CONTRACT_ADDRESS,
    //salt: "0x70736575646f2d72616e646f6d2076616c756500000000000000000000000000"
    salt: "0x70736575646f2d74657874000000000000000000000000000000000000000000",
  };

  const types = {
    ExampleMessage: [
      { name: "message", type: "string" },
      { name: "value", type: "uint256" },
      { name: "from", type: "address" },
      { name: "to", type: "address" },
    ],
  };
  const lastTwoWords = getLastTwoWords(email.message).toLowerCase();

  const exampleMessage = {
    message: lastTwoWords, // TransactionsPerPeriod
    value: ethers.parseEther(email.ethAmount),
    from: connection?.signer.address,
    to: email.to,
  };

  console.log("message: ", lastTwoWords);
  console.log("value: ", exampleMessage.value);
  console.log("from: ", exampleMessage.from);
  console.log("to: ", exampleMessage.to);

  const signature = await connection?.signer.signTypedData(
    domain,
    types,
    exampleMessage
  );

  const { v, r, s } = ethers.Signature.from(signature);

  return {
    ...email,
    v,
    r,
    s,
  };

  //   // getting money
  //   const tx = await eip712Example
  //     .connect(to)
  //     .verifyMessage(exampleMessage, v, r, s);
};
