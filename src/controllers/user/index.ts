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

  const user = new Player();
  user.construct(payload);

  try {
    await user.save();
    res
      .status(200)
      .json({success: "User created", user});
  } catch (error) {
    console.error(error);
    res
      .status(422)
      .json({error: "Something went wrong"}); // TODO: fix this error message and response status
  }
}

async function get(req: Request, res: Response) {
  const {user_id} = req.params;

  const userRepository = getRepository(Player);
  const user = await userRepository.findOne({
    where: {user_id},
  });

  if (!user) {
    res.status(404).send({
      Error: "This user doesn't exists",
    });
    return;
  }

  const {display_name, country, points} = user;

  res.status(200).json({
    user_id,
    display_name,
    country,
    points,
  });
}

export const userController = {
  create,
  get,
};
