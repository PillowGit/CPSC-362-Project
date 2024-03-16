// hash
async function hash(message) {
  // Encode message as UTF-8
  const msgBuffer = new TextEncoder('utf-8').encode(message);

  // Use SubtleCrypto API for hashing
  const hashBuffer = await crypto.subtle.digest('SHA-256', msgBuffer);

  // Convert ArrayBuffer to a hex string (optional)
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  const hashHex = hashArray.map(b => ('00' + b.toString(16)).slice(-2)).join('');

  return hashHex; // Or return hashBuffer for raw binary data
}

export default async function makeAuth(username, password) {
  return hash(`;${username}-:${password};-`);
}