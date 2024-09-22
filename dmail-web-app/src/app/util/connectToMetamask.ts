import { ethers, BrowserProvider } from "ethers";

interface EthereumProvider {
  request: (object: Object) => Promise<void>;
  on: (event: string, callback: () => void) => void;
}

export const connectToMetaMask = async () => {
  // Check if MetaMask (or any Ethereum provider) is installed
  //@ts-ignore

  const ethereum: EthereumProvider = window.ethereum;
  if (typeof ethereum !== "undefined") {
    try {
      // Request account access
      //@ts-ignore
      await ethereum.request({ method: "eth_requestAccounts" });

      // Create a new instance of Web3Provider, using MetaMask's injected provider
      const provider = new BrowserProvider(ethereum);

      // Get the signer (this is the wallet/account interacting with the dApp)
      const signer = await provider.getSigner();

      console.log("MetaMask connected and signer obtained:", signer);
      return { signer, provider };
    } catch (error) {
      console.error(
        "User rejected connection or another error occurred:",
        error
      );
    }
  } else {
    console.error("MetaMask is not installed. Please install MetaMask.");
  }
};
