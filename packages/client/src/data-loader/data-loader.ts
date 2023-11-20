import { fileLoader } from "./file-reader";
import { urlLoader } from "./url-reader";
import { promises } from "fs";
import path from "path";

function isValidUrl(urlString: string) {
  try {
    return Boolean(new URL(urlString));
  } catch (e) {
    return false;
  }
}

async function isTxtFile(filePath: string) {
  const stats = await promises.stat(filePath);
  const ext = path.extname(filePath).toLowerCase();
  return stats.isFile() && ext === ".txt";
}

export async function dataLoader(input: string, onDataCallback: (line: string) => void, closeCallback: () => void) {
  if (isValidUrl(input)) {
    await urlLoader(input, onDataCallback);
  } else if (await isTxtFile(input)) {
    fileLoader(input, onDataCallback, closeCallback);
  } else {
    throw new Error("Invalid path");
  }
}
