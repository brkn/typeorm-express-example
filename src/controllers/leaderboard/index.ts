import {
  Request, Response
} from "express";
import {getRepository} from "typeorm";

import {Player} from "../../entity/player";

async function list(req: Request, res: Response) {
  const playerRepo = getRepository(Player);

  const players = await playerRepo
    .createQueryBuilder("player")
    .select(
      "user_id, display_name, country, points, RANK() OVER (ORDER BY points DESC) AS rank",
    )
    .orderBy("rank", "ASC")
    .getRawMany();

  res.status(200).json(players);
}

async function filterByCountry(
  req: Request,
  res: Response,
) {
  const {country_code} = req.params;

  const playerRepo = getRepository(Player);
  const players = await playerRepo
    .createQueryBuilder("player")
    .select(
      "user_id, display_name, country, points, RANK() OVER (ORDER BY points DESC) AS rank",
    )
    .where("player.country = :country", {
      country: country_code,
    })
    .orderBy("rank", "ASC")
    .getRawMany();

  res.status(200).json(players);
}

export const leaderboardController = {
  list,
  filterByCountry,
};
