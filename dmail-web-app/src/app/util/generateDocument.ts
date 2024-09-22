const generateDocument = (address: string) => {
  return {
    id: `did:ethr:${address}`,
    publicKey: [
      {
        id: `did:ethr:${address}#owner`,
        type: "EcdsaSecp256k1VerificationKey2019",
        controller: `did:ethr:${address}`,
        publicKeyHex: 3, // Uncompressed public key
      },
    ],
    service: [
      {
        id: `did:ethr:${address}#didcomm`,
        type: "DIDCommMessaging",
        serviceEndpoint: `http://localhost:3001/communicate?userAddress=${address}`,
      },
    ],
  };
};
