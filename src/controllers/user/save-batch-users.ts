/* eslint-disable no-restricted-syntax */
/* eslint-disable no-await-in-loop */

import {
  Request, Response
} from "express";
import {getConnection} from "typeorm";

import {
  PlayerParams,
  Player,
} from "../../entity/player";
import {checkIfUserIdAlreadyExists} from "../../utils/user-utils";
import {AlreadyExistsError} from "../../utils/error-handler-utils";
import {userController} from ".";

export async function saveBatchUsersSync(
  req: Request,
  res: Response,
  playerParamsArray: PlayerParams[],
) {
  const users = [] as Player[];

  try {
    await getConnection().transaction(
      async (transactionalEntityManager) => {
        for (const playerParams of playerParamsArray) {
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
    .status(201)
    .json({success: "Users are created", users});
}

export async function saveBatchUsers(
  playerParamsArray: PlayerParams[],
) {
  for (const playerParams of playerParamsArray) {
    const user = new Player();
    user.construct(playerParams);
    // eslint-disable-next-line no-constant-condition
    while (true) {
      try {
        user.save();
        break;
      } catch (errorMessage) {
        console.warn(
          `user_id ${user.user_id} already exists, trying again with adding suffix`,
        );
        user.user_id += "_";
      }
    }
  }
}
