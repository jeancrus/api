import { parseRoutePath } from "./utils/parseRoutePath.js";

export const routes = [
  {
    path: "/products",
    method: "GET",
    controller: (req, res) =>
      res
        .writeHead(200, {
          "Content-Type": "text/html",
        })
        .end(JSON.stringify({ message: "Products", query: req.query })),
  },
  {
    path: "/products",
    method: "POST",
    controller: (req, res) =>
      res
        .writeHead(200, {
          "Content-Type": "text/html",
        })
        .end(JSON.stringify(req.body)),
  },
  {
    path: "/products/:id",
    method: "DELETE",
    controller: (req, res) =>
      res
        .writeHead(200, {
          "Content-Type": "text/html",
        })
        .end(
          JSON.stringify({
            message: `Product ${req.params.id} deleted`,
          })
        ),
  },
  {
    path: "/products/:id",
    method: "PUT",
    controller: (req, res) =>
      res
        .writeHead(200, {
          "Content-Type": "text/html",
        })
        .end(JSON.stringify({ message: "Product updated" })),
  },
].map((route) => ({
  ...route,
  path: parseRoutePath(route.path),
}));
