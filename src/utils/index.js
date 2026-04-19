function base64UrlEncode(arrayBuffer) {
  let binary = "";
  const bytes = new Uint8Array(arrayBuffer);
  
  bytes.forEach((b) => (binary += String.fromCharCode(b)));
  
  return btoa(binary)
  .replace(/\+/g, "-")
  .replace(/\//g, "_")
  .replace(/=+$/, "");
}

function pkceCodeVerifier() {
  //43-128
  const array = new Uint8Array(32);  // 32 bytes → ~43+ chars depois de encode
  crypto.getRandomValues(array);

  const verifier = base64UrlEncode(array);
  return verifier;
}

// Base64-URL-encoded SHA256
async function pkceCodeChallenge (verifier) {
  const encoder = new TextEncoder();
  const data = encoder.encode(verifier);
  const digest = await crypto.subtle.digest("SHA-256", data);
  console.log("digest", digest);
  return base64UrlEncode(digest);
}

export {
  pkceCodeChallenge,
  pkceCodeVerifier,
}