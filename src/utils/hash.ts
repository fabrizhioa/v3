import crypto from "crypto";

// utils/hash.ts
async function hash(message: string) {
  const hash = crypto.createHash("sha256");
  hash.update(message+"minds");
  return hash.digest("hex");
}

export default hash;
