import useCountriesRandom from "./useCountriesRandom";
import { randBetween } from "@/utils/tools";
import { countryOrderType } from "@/types/countries";

export default function* useCountriesGenerator({
  sourceCountries = [],
  questionField = "",
  answerField = "",
  countryOrder = "",
  answersCount = 0,
}) {
  answersCount =
    sourceCountries.length < answersCount
      ? sourceCountries.length
      : answersCount;

  let countries = [...sourceCountries];

  while (countries.length !== 0) {
    let country = {};

    if (countryOrder === countryOrderType.Default) country = countries.shift();

    if (
      countryOrder === countryOrderType.Random ||
      countryOrder === countryOrderType.Infinite
    ) {
      country = countries[randBetween(0, countries.length - 1)];

      if (countryOrder === countryOrderType.Random)
        countries = countries.filter(
          (e) => e[answerField] !== country[answerField]
        );
    }

    yield {
      countriesProgress:
        countryOrder === countryOrderType.Infinite
          ? "*"
          : `${sourceCountries.length - countries.length} / ${
              sourceCountries.length
            }`,

      answers: useCountriesRandom(
        sourceCountries,
        country[answerField],
        answersCount,
        answerField
      ),

      answer: country[answerField],

      question: country[questionField],

      wiki: country.wiki,
    };
  }
}
