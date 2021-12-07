import { getResults } from ".";
import { Division } from "./typings";

const givenDivision: Division[] = [
  {
    name: "Rockets",
    points: 64,
  },
  {
    name: "Cardinals",
    points: 77,
  },
  {
    name: "Bruisers",
    points: 51,
  },
  {
    name: "Renegades",
    points: 37,
  },
  {
    name: "Porpoises",
    points: 52,
  },
];

test("returns one team to promote and one team to relegate", () => {
  const resultString = `Promote:
Cardinals

Relegate:
Renegades`;

  expect(getResults(givenDivision, 1)).toBe(resultString);
});

test("returns two teams to promote and two teams to relegate", () => {
  const resultString = `Promote:
Cardinals
Rockets

Relegate:
Bruisers
Renegades`;

  expect(getResults(givenDivision, 2)).toBe(resultString);
});

test("returns a notification message if division is not between 2 and 16 teams", () => {
  const resultString = `The division must be between 2 and 16 teams`;

  expect(getResults([givenDivision[0]], 2)).toBe(resultString);
});

test("returns a notification message if teams both in the top `n` and bottom `n` for the division", () => {
  const resultString =
    "The promotion and relegation process can not be performed as there are teams both in the top `n` and bottom `n` for the division";

  expect(
    getResults(
      [
        {
          name: "Cardinals",
          points: 77,
        },
        {
          name: "Cardinals",
          points: 37,
        },
      ],
      1
    )
  ).toBe(resultString);
});
