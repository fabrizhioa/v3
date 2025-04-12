import { mkdir, writeFile } from "node:fs/promises";
import { join } from "node:path";

export default async function uploadImage(
  file: File,
  folderName: string,
  fileName?: string
): Promise<{ path?: string; error?: string }> {
  if (!file) {
    return { error: "No se subio ningun archivo" };
  }

  try {
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    // Generar un nombre de archivo único
    const timestamp = Date.now();

    let filename = timestamp + "-";
    if (fileName) {
      const fna = file.name.split(".");
      const fnext = fna[fna.length - 1];
      filename += `${fileName}.${fnext}`;
    } else {
      filename += file.name;
    }
    // Ruta a la carpeta public
    const publicDirectory = join(process.cwd(), "public", folderName);
    const filePath = join(publicDirectory, filename);

    await mkdir(publicDirectory, { recursive: true });
    await writeFile(filePath, buffer);

    return { path: `/${folderName}/${filename}` }; // URL de la imagen
  } catch (error) {
    console.error(error);
    return { error: "No se pudo subir la imagen" };
  }
}
