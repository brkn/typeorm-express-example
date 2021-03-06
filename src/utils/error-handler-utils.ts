import {
  Response, NextFunction
} from "express";

import {HTTPClientError} from "./http-error-models/client-error";
import {HTTP404Error} from "./http-error-models/404-error";

export const notFoundError = () => {
  throw new HTTP404Error("Method not found.");
};

export const clientError = (
  err: Error,
  res: Response,
  next: NextFunction,
) => {
  if (err instanceof HTTPClientError) {
    console.warn(err);
    res.status(err.statusCode).send(err.message);
    return;
  }
  next(err);
};

export const serverError = (
  err: Error,
  res: Response,
  next: NextFunction,
) => {
  console.error(err);
  if (process.env.NODE_ENV === "production") {
    res.status(500).send("Internal Server Error");
    return;
  }
  res.status(500).send(err.stack);
};

export class AlreadyExistsError extends Error {}
