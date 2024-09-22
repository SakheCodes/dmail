export function getAllLocalStorage() {
  const localStorageArray = [];

  // Loop through all keys in localStorage
  for (let i = 0; i < localStorage.length; i++) {
    const key = localStorage.key(i); // Get the key at the current index
    const value = key && localStorage.getItem(key); // Get the value for that key

    // Add the key-value pair as an object to the array
    localStorageArray.push({ key, value });
  }

  return localStorageArray;
}

// Example usage:
const allLocalStorageItems = getAllLocalStorage();
console.log(allLocalStorageItems);
