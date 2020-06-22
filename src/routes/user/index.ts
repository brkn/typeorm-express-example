import {
  Request, Response
} from "express";

import {Route} from "../../utils/type-utils";
import {userController} from "../../controllers/user";

const create: Route = {
  path: "/user/create",
  method: "post",
  handler: async (
    req: Request,
    res: Response,
  ) => {
    userController.create(req, res);
  },
};

const batchCreate: Route = {
  path: "/user/create/batch",
  method: "post",
  handler: async (
    req: Request,
    res: Response,
  ) => {
    userController.batchCreate(req, res);
  },
};

const batchCreateRandom: Route = {
  path: "/user/create/batch-random",
  method: "post",
  handler: async (
    req: Request,
    res: Response,
  ) => {
    userController.batchCreateRandom(req, res);
  },
};

const get: Route = {
  path: "/user/profile/:user_id",
  method: "get",
  handler: async (
    req: Request,
    res: Response,
  ) => {
    userController.get(req, res);
  },
};

export const userRoutes = [
  create,
  batchCreate,
  batchCreateRandom,
  get,
];
