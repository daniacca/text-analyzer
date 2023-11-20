import http from "http";
import https from "https";
import extractor from "unfluff";

type GeneralHttpClient = typeof http | typeof https;

const getScript = (url: string) => {
  return new Promise((resolve, reject) => {
    let client: GeneralHttpClient = http;

    if (url.toString().indexOf("https") === 0) {
      client = https;
    }

    let chunks = "";
    client
      .get(url, (resp) => {
        resp.on("data", (chunk) => {
          chunks += chunk;
        });
        resp.on("end", () => {
          resolve(chunks);
        });
      })
      .on("error", (err) => {
        reject(err);
      });
  });
};

export async function urlLoader(url: string, onDataCallback: (chunk: string) => void, closeCallback: () => void) {
  const htmlPage = await getScript(url);
  const data = extractor(htmlPage);
  onDataCallback(data.text);
  closeCallback();
}
