export default async function useFetchCached(url = "", key = "") {
  return new Promise(async (res, rej) => {
    try {
      if (localStorage.getItem(key) === null) {
        const response = await fetch(url);
        const data = await response.json();

        localStorage.setItem(key, JSON.stringify(data));

        res(data);
      }

      const data = JSON.parse(localStorage.getItem(key));

      res(data);
    } catch (error) {
      rej(error);
    }
  });
}
