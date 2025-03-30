import http from "node:http";

const server = http.createServer(async (req, res) => {
  const { method, url } = req;

  if (method === "GET" && url === "/") {
    return res
      .writeHead(200, {
        "Content-Type": "text/html",
      })
      .end("Hello World!!");
  }

  if (method === "POST" && url === "/users") {
    const buffers = [];

    for await (const chunk of req) {
      buffers.push(chunk);
    }

    console.log("🚀 ~ server ~ buffers:", buffers);
    const data = JSON.parse(Buffer.concat(buffers).toString());

    console.log(data);

    return res.end("Criando um novo usuario");
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
