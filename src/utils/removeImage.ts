import { join } from "node:path";
import { unlink } from "node:fs/promises";

export default async function removeImage(path: string) {
  const publicDirectory = join(process.cwd(), "public", path);
  try {
    await unlink(publicDirectory);
  } catch  {
    return false;
  }
  
  return true;
}