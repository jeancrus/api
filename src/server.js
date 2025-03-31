import http from "node:http";
import { jsonHandler } from "./middleware/jsonHandler.js";

const server = http.createServer(async (req, res) => {
  const { method, url } = req;

  await jsonHandler(req, res);

  if (method === "GET" && url === "/") {
    return res
      .writeHead(200, {
        "Content-Type": "text/html",
      })
      .end("Hello World!!");
  }

  if (method === "POST" && url === "/users") {
    return res.end(JSON.stringify(req.body));
  }

  return res
    .writeHead(404, {
      "Content-Type": "text/html",
    })
    .end("Not found");
});

server.listen(3000, () => {
  console.log("Server is running on port 3000");
});
