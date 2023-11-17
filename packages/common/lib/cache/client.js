"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const redis_1 = require("redis");
const client = (0, redis_1.createClient)();
client.on("error", (err) => console.log("Redis Client Error", err));
client.on("ready", () => console.log("Redis Client Ready"));
client.connect().then(() => console.log("Redis Client Connected"));
exports.default = client;
//# sourceMappingURL=client.js.map