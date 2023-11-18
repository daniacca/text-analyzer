import { healthcheck } from "@mangosteen/background-healthcheck";

healthcheck(10000).then(process.exit);
