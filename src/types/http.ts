import { IncomingMessage, ServerResponse } from "node:http";
import { Database } from "../database.ts";
import { DatabaseQuery } from "./database.ts";

export interface CustomIncomingMessage extends IncomingMessage {
  body?: any;
}

export interface CustomRequest extends IncomingMessage {
  body?: any;
  params?: Record<string, string>;
  query?: DatabaseQuery;
}

export interface CustomResponse extends ServerResponse {
  send?: (body: any) => void;
}

export interface RouteParams {
  req: CustomRequest;
  res: CustomResponse;
  database: Database;
}

export interface Route {
  method: "GET" | "POST" | "PUT" | "DELETE" | "PATCH";
  path: RegExp;
  controller: (params: RouteParams) => void;
}
