import {
  Request, Response
} from "express";

import {Route} from "../../utils/type-utils";
import {leaderboardController} from "../../controllers/leaderboard";

const list: Route = {
  path: "/leaderboard",
  method: "get",
  handler: async (
    req: Request,
    res: Response,
  ) => {
    leaderboardController.list(req, res);
  },
};

const filterByCountry: Route = {
  path: "/leaderboard/:country_code",
  method: "get",
  handler: async (
    req: Request,
    res: Response,
  ) => {
    leaderboardController.filterByCountry(
      req,
      res,
    );
  },
};

export const leaderboardRoutes = [
  list,
  filterByCountry,
];
