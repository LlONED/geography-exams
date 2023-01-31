const fs = require("fs");
const path = require("path");
const translate = require("../../translate");
const concatWordPerN = require("../../translate/concatWordPerN");

module.exports = async function ({ args = [], localizationFolderPath = "" }) {
  if (args.length === 0 || isNaN(args[0]) === false)
    throw Error("Language argument required");

  const n = +args[1] || 50;
  const localizationSource = JSON.parse(
    fs.readFileSync(path.join(localizationFolderPath, "en.json")).toString()
  );

  const localizationKeys = Object.keys(localizationSource);
  const words = concatWordPerN(localizationSource, n);
  const localization = {};

  const translatedWords = await translate({ lang: args[0], data: words });

  for (let i = 0; i < translatedWords.length; i++) {
    const words = translatedWords[i];

    for (let j = 0; j < words.length; j++) {
      const index = i * n + j;

      localization[localizationKeys[index]] = words[j];
    }
  }

  fs.writeFileSync(
    path.join(localizationFolderPath, args[0] + ".json"),
    JSON.stringify(localization)
  );
};
