import { Contract } from "ethers";
import abi from "@/app/artifacts/abi.json";
import { connectToMetaMask } from "./connectToMetamask";
import { CONTRACT_ADDRESS } from "./constants";

export const getContract = async () => {
  const connection = await connectToMetaMask();
  const contract = new Contract(CONTRACT_ADDRESS, abi, connection?.signer);
  return contract;
};
