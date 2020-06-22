import {leaderboardRoutes} from "./leaderboard";
import {userRoutes} from "./user";
import {scoreRoutes} from "./score";

export const routes = [
  ...leaderboardRoutes,
  ...userRoutes,
  ...scoreRoutes,
];
