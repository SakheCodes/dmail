// JSON.stringify(email),
export const generateKey = async () => {
  try {
    // Generate a 256-bit AES key for AES-GCM encryption
    const key = await window.crypto.subtle.generateKey(
      {
        name: "AES-GCM",
        length: 256, // 256-bit key
      },
      true, // The key is exportable
      ["encrypt", "decrypt"] // Usages for this key
    );
    return key;
  } catch (error) {
    console.error("Key generation error:", error);
  }
};

async function exportKeyToJWK(key: any) {
  const exportedKey = await window.crypto.subtle.exportKey("jwk", key);
  return exportedKey; // This will always be the same for the same key
}

async function encryptMessage(key: any, messageObject: any) {
  try {
    // Convert the message object to a JSON string
    const messageString = JSON.stringify(messageObject);

    // Encode the string to a Uint8Array (required by WebCrypto API)
    const encodedMessage = new TextEncoder().encode(messageString);

    // Generate a 12-byte (96-bit) random IV
    const iv = window.crypto.getRandomValues(new Uint8Array(12));

    // Encrypt the message using AES-GCM
    const encrypted = await window.crypto.subtle.encrypt(
      {
        name: "AES-GCM",
        iv: iv, // Initialization vector (must be 12 bytes)
      },
      key, // The AES key
      encodedMessage // The message to encrypt (as Uint8Array)
    );

    return { encryptedMessage: encrypted, iv: iv };
  } catch (error) {
    console.error("Encryption error:", error);
  }
}

// async function decryptMessage(key, encryptedMessage, iv) {
//   try {
//     // Decrypt the message using the AES key and IV
//     const decrypted = await window.crypto.subtle.decrypt(
//       {
//         name: "AES-GCM",
//         iv: iv, // The same IV used for encryption
//       },
//       key, // The AES key
//       encryptedMessage // The encrypted message (ArrayBuffer)
//     );

//     // Decode the decrypted message back to a string
//     const decodedMessage = new TextDecoder().decode(decrypted);
//     return JSON.parse(decodedMessage); // Return the original object
//   } catch (error) {
//     console.error("Decryption error:", error);
//   }
// }

// // Example usage
// (async () => {
//   const key = await generateKey();

//   const message = {
//     to: "tyler@gmail.com",
//     subject: "sdfsfsdf",
//     content: "dsfsdfsdf",
//     isImportant: "false",
//     ethAmount: "",
//   };

//   try {
//     // Encrypt the message
//     const { encryptedMessage, iv } = await encryptMessage(key, message);
//     console.log("Encrypted message:", encryptedMessage);

//     // Decrypt the message
//     const decryptedMessage = await decryptMessage(key, encryptedMessage, iv);
//     console.log("Decrypted message:", decryptedMessage);
//   } catch (error) {
//     console.error("Error:", error);
//   }
// })();
