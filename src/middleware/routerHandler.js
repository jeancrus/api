import { Database } from "../database.js";
import { routes } from "../routes.js";
import { extractQueryParam } from "../utils/extract-query-param.js";

const database = new Database();

export const routerHandler = (req, res) => {
  const route = routes.find((route) => {
    if (route.method === req.method && route.path.test(req.url)) {
      return true;
    }

    return false;
  });

  if (!route) {
    return res
      .writeHead(404, {
        "Content-Type": "text/html",
      })
      .end("Rota não encontrada");
  }

  const routeParams = req.url.match(route.path);

  const { query, ...params } = routeParams.groups;

  req.params = params;
  req.query = query ? extractQueryParam(query) : {};

  return route.controller({ req, res, database });
};
