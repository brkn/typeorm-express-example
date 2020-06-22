import {v4 as uuidv4} from "uuid";

import {PlayerParams} from "../../entity/player";
import {getRandomElement} from "../../utils/array-utils";
import {getRandomInteger} from "../../utils/number-utils";

const COUNTRY_CODES = [
  "ca",
  "us",
  "tr",
  "fr",
  "de",
];

export function generateRandomUsers(
  count: number,
) {
  const playerParams = [] as PlayerParams[];

  for (
    let index = 1;
    index <= count;
    index += 1
  ) {
    const user_id = uuidv4();
    const display_name = `DN_${user_id}`;
    const points = getRandomInteger(2500) + 1000;

    playerParams.push({
      user_id,
      display_name,
      country: getRandomElement(COUNTRY_CODES),
      points,
    });
  }
  return playerParams;
}
