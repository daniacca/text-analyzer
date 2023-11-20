import http from "http";
import https from "https";

type GeneralHttpClient = typeof http | typeof https;

const getScript = (url: string, onDataCallback: (chunk: string) => void) => {
  return new Promise((resolve, reject) => {
    let client: GeneralHttpClient = http;

    if (url.toString().indexOf("https") === 0) {
      client = https;
    }

    client
      .get(url, (resp) => {
        resp.on("data", onDataCallback);
        resp.on("end", () => {
          resolve(true);
        });
      })
      .on("error", (err) => {
        reject(err);
      });
  });
};

export async function urlLoader(url: string, onDataCallback: (chunk: string) => void) {
  await getScript(url, onDataCallback);
}
