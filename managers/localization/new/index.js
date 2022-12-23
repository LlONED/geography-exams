const fs = require("fs");
const path = require("path");
const puppeteer = require("puppeteer");

function concatWordPerN(w = {}, n = 0) {
  const result = [];
  const values = Object.values(w);

  for (let i = 0; i < Math.ceil(values.length / n); i++) {
    result[i] = values.slice(i * n, i * n + n).join(".\n");
  }

  return result;
}

module.exports = async function ({ args = [], localizationFolderPath = "" }) {
  if (args.length === 0 || isNaN(args[0]) === false)
    throw Error("Language argument required");

  const n = +args[1] || 50;
  const localizationSource = JSON.parse(
    fs.readFileSync(path.join(localizationFolderPath, "en.json")).toString()
  );

  const browser = await puppeteer.launch();
  const page = await browser.newPage();

  const inputSelector = '[aria-label="Source text"]';
  const resultSelector = '[jsaction="mouseup:BR6jm"]';

  const localizationKeys = Object.keys(localizationSource);
  const words = concatWordPerN(localizationSource, n);
  const localization = {};

  for (let i = 0; i < words.length; i++) {
    const progress = `${i + 1} / ${words.length}`;

    try {
      await page.goto(
        `https://translate.google.ru/?hl=en&sl=en&tl=${args[0]}&op=translate`
      );

      await page.waitForSelector(inputSelector);

      console.log(`${progress}: typing...`);

      await page.type(inputSelector, words[i]);

      console.log(`${progress}: parsing result...`);

      const result = await page.evaluate(
        async (inputSelector, resultSelector) => {
          const sleep = (ms) => new Promise((res) => setTimeout(res, ms));
          await sleep(5000);

          console.log(resultSelector, document.querySelector(resultSelector));

          return [...document.querySelector(resultSelector).children]
            .filter(
              (el) => el.firstElementChild.textContent.search("\n") === -1
            )
            .map((el) => el.firstElementChild.textContent.replace(".", ""));
        },
        inputSelector,
        resultSelector
      );

      for (let j = 0; j < result.length; j++) {
        const index = i * n + j;

        localization[localizationKeys[index]] = result[j];
      }

      console.log(`${progress}: success`);
    } catch (e) {
      console.log(`${progress}: error`, e);
    }
  }

  await browser.close();
  fs.writeFileSync(
    path.join(localizationFolderPath, args[0] + ".json"),
    JSON.stringify(localization)
  );
};
