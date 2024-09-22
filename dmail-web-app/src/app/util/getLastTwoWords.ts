export default function getLastTwoWords(str: string) {
  // Split the string by spaces into an array of words
  const words = str.trim().split(/\s+/);

  // Get the last two words from the array
  const lastTwoWords = words.slice(-2).join(" ");

  return lastTwoWords;
}
