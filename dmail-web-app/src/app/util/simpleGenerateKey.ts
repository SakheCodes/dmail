export function caesarCipher(text: any, shift: any) {
  console.log(text);
  const alphabet = "abcdefghijklmnopqrstuvwxyz";
  const alphabetLength = alphabet.length;
  let encryptedText = "";

  for (let i = 0; i < text.length; i++) {
    const char = text[i].toLowerCase();
    const index = alphabet.indexOf(char);

    if (index !== -1) {
      const newIndex = (index + shift + alphabetLength) % alphabetLength;
      encryptedText += alphabet[newIndex];
    } else {
      encryptedText += char; // If not a letter, keep it as is
    }
  }

  console.log("encryptedText", encryptedText);

  return encryptedText;
}

export const cipherText = (plaintext: string, shiftValue: number) =>
  caesarCipher(plaintext, shiftValue);

export const decryptedText = (ciphertext: string, shiftValue: number) =>
  caesarCipher(ciphertext, -shiftValue);
