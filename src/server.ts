import http from "node:http";
import { jsonHandler } from "./middleware/jsonHandler.ts";
import { routerHandler } from "./middleware/routerHandler.ts";

const server = http.createServer(async (req, res) => {
  await jsonHandler(req, res);

  routerHandler(req, res);
});

server.listen(3000, () => {
  console.log("Server is running on port 3000");
});
