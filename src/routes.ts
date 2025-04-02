import { Route, RouteParams } from "./types/http.ts";
import { parseRoutePath } from "./utils/parseRoutePath.ts";

const routesConfig: (Omit<Route, "path"> & { path: string })[] = [
  {
    path: "/products",
    method: "GET",
    controller: ({ req, res, database }: RouteParams) =>
      res
        .writeHead(200, {
          "Content-Type": "text/html",
        })
        .end(JSON.stringify(database.list(req.query ?? {}))),
  },
  {
    path: "/products",
    method: "POST",
    controller: ({ req, res, database }: RouteParams) =>
      res
        .writeHead(200, {
          "Content-Type": "text/html",
        })
        .end(JSON.stringify(database.create(req.body))),
  },
  {
    path: "/products/:id",
    method: "DELETE",
    controller: ({ req, res, database }: RouteParams) =>
      res
        .writeHead(200, {
          "Content-Type": "text/html",
        })
        .end(JSON.stringify(database.delete(req.params?.id ?? ""))),
  },
  {
    path: "/products/:id",
    method: "PUT",
    controller: ({ req, res, database }: RouteParams) =>
      res
        .writeHead(200, {
          "Content-Type": "text/html",
        })
        .end(
          JSON.stringify(database.update(req.params?.id ?? "", req.body ?? {}))
        ),
  },
];

export const routes: Route[] = routesConfig.map((route) => ({
  ...route,
  path: parseRoutePath(route.path),
}));
