import {getRandomInteger} from "./number-utils";

export function getRandomElement(
  array: string[],
) {
  return array[getRandomInteger(array.length)];
}
