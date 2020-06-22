/* eslint-disable no-restricted-syntax */
/* eslint-disable no-await-in-loop */
import {
  Request, Response
} from "express";
import {
  getRepository,
  getConnection,
} from "typeorm";

import {
  Player,
  PlayerParams,
} from "../../entity/player";
import {checkIfUserIdAlreadyExists} from "../../utils/user-utils";
import {AlreadyExistsError} from "../../utils/error-handler-utils";

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

async function batchCreate(
  req: Request,
  res: Response,
) {
  const payload = req.body as PlayerParams[];

  const users = [] as Player[];

  try {
    await getConnection().transaction(
      async (transactionalEntityManager) => {
        for (const playerParams of payload) {
          const isUserIdAlreadyExists = await checkIfUserIdAlreadyExists(
            playerParams.user_id,
            res,
          );
          if (isUserIdAlreadyExists) {
            throw new AlreadyExistsError(
              "This user already exists",
            );
          }

          const user = new Player();
          user.construct(playerParams);

          await transactionalEntityManager.save(
            user,
          );
          users.push(user);
        }
      },
    );
  } catch (errorMessage) {
    console.error(errorMessage);
    if (
      !(
        errorMessage instanceof AlreadyExistsError
      )
    ) {
      res.status(422).json({
        error: "Something went wrong",
        errorMessage,
      }); // TODO: fix this error message and response status
    }
    return;
  }

  res
    .status(200)
    .json({success: "Users are created", users});
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
  batchCreate,
  get,
};
