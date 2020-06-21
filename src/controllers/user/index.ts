import {
  Request, Response
} from "express";
import {getRepository} from "typeorm";

import {
  Player,
  PlayerParams,
} from "../../entity/player";
import {checkIfUserIdAlreadyExists} from "../../utils/user-utils";

async function create(
  req: Request,
  res: Response,
) {
  const payload = req.body as PlayerParams;

  const isUserIdAlreadyExists = await checkIfUserIdAlreadyExists(
    payload.user_id,
    res,
  );
  if (isUserIdAlreadyExists) {
    return;
  }

  const player = new Player();
  player.construct(payload);

  try {
    player.save();
    res
      .status(200)
      .json({success: "User created"});
  } catch (error) {
    console.error(error);
    res
      .status(422)
      .json({error: "Something went wrong"}); // TODO: fix this error message and response status
  }
}

export const userController = {
  create,
};
