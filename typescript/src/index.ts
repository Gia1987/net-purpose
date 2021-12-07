import lodash from "lodash";
import { Division } from "./typings";

export const getResults = (division: Division[], n: number): string => {
  let result: string = "The division must be between 2 and 16 teams";

  const sortedDivision: Division[] = lodash.reverse(
    lodash.sortBy(division, ["points"])
  );

  const promoted: string[] = sortedDivision
    .slice(0, n)
    .map((team) => team?.name);

  const relegated: string[] = sortedDivision
    .slice(-n)
    .map((team) => team?.name);

  if (division?.length >= 2 && division?.length <= 16) {
    if (promoted.some((item) => relegated.includes(item))) {
      // Checks if teams both in the top `n` and bottom `n` for the division
      result =
        "The promotion and relegation process can not be performed as there are teams both in the top `n` and bottom `n` for the division";
    } else {
      result = `Promote:\n${promoted.join("\n")}\n\nRelegate:\n${relegated.join(
        "\n"
      )}`;
    }
  }

  return result;
};
