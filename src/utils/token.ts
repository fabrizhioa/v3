"use server";

import crypto from "crypto";
import { env } from "process";
const algoritmo = env.ENCRYPT_ALGORITHM as string;
const secretKey = crypto
  .createHash("sha256")
  .update(env.SECRET_KEY as string)
  .digest("hex")
  .substring(0, 32);

export async function encrypt(text: string) {
  const iv = crypto.randomBytes(16);
  const cipher = crypto.createCipheriv(algoritmo, secretKey, iv);

  const encrypt = Buffer.concat([cipher.update(text, "utf-8"), cipher.final()]);

  return `${iv.toString("hex")}:${encrypt.toString("hex")}`;
}

export async function decrypt(token: string) {
  if (!token.includes(":")) return token;

  const [iv, encrypt] = token
    .split(":")
    .map((part) => Buffer.from(part, "hex"));

  const decipher = crypto.createDecipheriv(algoritmo, secretKey, iv);

  const decrypt = Buffer.concat([decipher.update(encrypt), decipher.final()]);

  return decrypt.toString("utf-8");
}
