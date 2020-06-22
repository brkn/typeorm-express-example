import {
  Request, Response
} from "express";
import {getRepository} from "typeorm";

import {Player} from "../../entity/player";

interface SubmitScorePayload {
  user_id: string;
  timestamp: string;
  score_worth: number;
}

async function submit(
  req: Request,
  res: Response,
) {
  const payload = req.body as SubmitScorePayload;

  const userRepository = getRepository(Player);
  const user = await userRepository.findOne({
    where: {user_id: payload.user_id},
  });

  if (!user) {
    res.status(404).json({
      Error: "This user doesn't exists",
    });
    return;
  }

  try {
    user.points += payload.score_worth;
    await user.save();

    res.status(200).json({
      success: "Score is added to user",
      user,
    });
  } catch (error) {
    console.error(error);
    res
      .status(422)
      .json({error: "Something went wrong"}); // TODO: fix this error message and response status
  }
}

export const scoreController = {
  submit,
};
