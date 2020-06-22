import {getRepository} from "typeorm";
import {Response} from "express";

import {Player} from "../entity/player";

export async function checkIfUserIdAlreadyExists(
  user_id: string,
  res: Response,
) {
  const userRepository = getRepository(Player);
  const user = await userRepository.findOne({
    where: {user_id},
  });
  if (user) {
    res.status(400).json({
      Error: "user_id already exists",
      user_id,
    });
    return true;
  }

  return false;
}
