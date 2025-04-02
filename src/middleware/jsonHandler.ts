import { ServerResponse } from "node:http";
import { CustomIncomingMessage } from "../types/http.js";

export const jsonHandler = async (
  req: CustomIncomingMessage,
  res: ServerResponse
) => {
  const buffers: Buffer[] = [];

  for await (const chunk of req) {
    buffers.push(chunk);
  }

  try {
    req.body = JSON.parse(Buffer.concat(buffers).toString());
  } catch (error) {
    req.body = null;
  }

  res.setHeader("Content-Type", "application/json");
};
