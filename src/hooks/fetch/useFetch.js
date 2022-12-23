export default async function useFetch(url = "") {
  return new Promise(async (res, rej) => {
    try {
      const response = await fetch(url);
      const data = await response.json();

      res(data);
    } catch (error) {
      rej(error);
    }
  });
}
