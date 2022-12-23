import { randBetween } from "@/utils/tools";

export default function useCountriesRandom(
  countries = [],
  answer = "",
  count = 0,
  key = ""
) {
  const result = [answer];

  while (result.length < count) {
    const index = randBetween(0, countries.length - 1);

    const country = countries[index];

    if (result.some((e) => e === country[key])) continue;

    result.push(country[key]);
  }

  return result.sort(() => Math.random() - 0.5);
}
