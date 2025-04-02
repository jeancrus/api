import { Database } from "../database.js";
import { routes } from "../routes.js";
import { extractQueryParam } from "../utils/extractQueryParams.js";
import {
  CustomRequest,
  CustomResponse,
  Route,
  RouteParams,
} from "../types/http.js";
const database = new Database();

export const routerHandler = (req: CustomRequest, res: CustomResponse) => {
  if (!req.url) {
    return res
      .writeHead(400, {
        "Content-Type": "text/html",
      })
      .end("URL inválida");
  }

  const route = routes.find((route: Route) => {
    if (route.method === req.method && route.path.test(req.url!)) {
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

  if (!routeParams?.groups) {
    return res
      .writeHead(400, {
        "Content-Type": "text/html",
      })
      .end("Parâmetros inválidos");
  }

  const { query, ...params } = routeParams.groups;

  req.params = params;
  req.query = query ? extractQueryParam(query) : {};

  return route.controller({
    req,
    res,
    database,
  } as RouteParams);
};
