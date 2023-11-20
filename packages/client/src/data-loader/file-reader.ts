import fs from "fs";
import readline from "readline";

export function fileLoader(path: string, lineCallback: (line: string) => void, closeCallback: () => void) {
  const fileStream = fs.createReadStream(path);
  const rl = readline.createInterface({
    input: fileStream,
    crlfDelay: Infinity,
  });

  rl.on("line", lineCallback);
  rl.on("close", closeCallback);
}
