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
    .orderBy("rank", "DESC")
    .getRawMany();

  res.status(200).json(players);
}

async function filterByCountry(
  req: Request,
  res: Response,
) {
  const countryCode = req.params.country_code;

  const playerRepo = getRepository(Player);
  const players = await playerRepo
    .createQueryBuilder("player")
    .select(
      "user_id, display_name, country, points, RANK() OVER (ORDER BY points DESC) AS rank",
    )
    .where("player.country = :country", {
      country: countryCode,
    })
    .orderBy("rank", "DESC")
    .getMany();

  res.status(200).json(players);
}

export const leaderboardController = {
  list,
  filterByCountry,
};
