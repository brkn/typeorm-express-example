import {
  Request, Response
} from "express";
import {
  getRepository,
} from "typeorm";

import {
  Player,
  PlayerParams,
} from "../../entity/player";
import {checkIfUserIdAlreadyExists} from "../../utils/user-utils";
import {
  saveBatchUsers,
  saveBatchUsersSync,
} from "./save-batch-users";
import {generateRandomUsers} from "./generate-random-users";

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
      .status(201)
      .json({success: "User created", user});
  } catch (error) {
    console.error(error);
    res
      .status(422)
      .json({error: "Something went wrong"}); // TODO: fix this error message and response status
  }
}

async function batchCreate(
  req: Request,
  res: Response,
) {
  const playerParams = req.body as PlayerParams[];

  await saveBatchUsersSync(
    req,
    res,
    playerParams,
  );
}

async function batchCreateRandom(
  req: Request,
  res: Response,
) {
  const userCount = Number(req.body.count);

  const playerParams = generateRandomUsers(
    userCount,
  );

  saveBatchUsers(playerParams);

  res.status(202).json({
    success: "Request is being processed",
  });
}

async function get(req: Request, res: Response) {
  const {user_id} = req.params;

  const userRepository = getRepository(Player);
  const user = await userRepository.findOne({
    where: {user_id},
  });

  if (!user) {
    res.status(404).json({
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
  batchCreate,
  batchCreateRandom,
  get,
};
