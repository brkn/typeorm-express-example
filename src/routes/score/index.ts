import {
  Request, Response
} from "express";

import {Route} from "../../utils/type-utils";
import {scoreController} from "../../controllers/score";

const submit: Route = {
  path: "/score/submit",
  method: "post",
  handler: async (
    req: Request,
    res: Response,
  ) => {
    scoreController.submit(req, res);
  },
};

export default [submit];
