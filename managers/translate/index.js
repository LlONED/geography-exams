const puppeteer = require("puppeteer");

module.exports = async function ({ lang = "", data = [] }) {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();

  const inputSelector = '[aria-label="Source text"]';
  const resultSelector = '[jsname="jqKxS"]';

  const result = [];

  for (let i = 0; i < data.length; i++) {
    const progress = `${i + 1} / ${data.length}`;

    await page.goto(
      `https://translate.google.ru/?hl=en&sl=en&tl=${lang}&op=translate`
    );

    await page.waitForSelector(inputSelector);

    try {
      console.log(`${progress}: typing...`);

      await page.type(inputSelector, data[i]);

      console.log(`${progress}: parsing result...`);

      const r = await page.evaluate(
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

      result.push(r);
      console.log(`${progress}: success`);
    } catch (e) {
      console.log(`${progress}: error`, e);
    }
  }

  await browser.close();

  return result;
};
