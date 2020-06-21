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

export const userRoutes = [create];
