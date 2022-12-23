import useFetch from "./useFetch";

export default async function useFetchLocalization(
  url = "",
  langs = [],
  cacheKey = ""
) {
  return new Promise(async (res, rej) => {
    try {
      if (localStorage.getItem(cacheKey) === null) {
        const promises = langs.map((l) => useFetch(url + l + ".json"));
        const data = await Promise.all(promises);

        const localizations = {};

        for (let i = 0; i < data.length; i++) {
          localizations[langs[i]] = data[i];
        }

        localStorage.setItem(cacheKey, JSON.stringify(localizations));
        res(localizations);
      }

      res(JSON.parse(localStorage.getItem(cacheKey)));
    } catch (error) {
      rej(error);
    }
  });
}
