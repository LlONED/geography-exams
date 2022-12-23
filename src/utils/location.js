import { ILocation } from "@/types/location";

export function validateLocations(countries = []) {
  const locations = {};

  for (const country of countries) {
    const location = locations[country.location];

    if (location === undefined) {
      locations[country.location] = { ...ILocation };
      continue;
    }

    location.countriesCount += 1;
  }
  return locations;
}
