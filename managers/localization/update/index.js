const path = require("path");
const fs = require("fs");
const translateConfig = require("./translateConfig");

const defaultLang = "en";

module.exports = async function update({
  args = [],
  localizationFolderPath = "",
}) {
  const config = require(path.join(__dirname, "temp.json"));

  const actions = {
    u: {
      async logic({ config, localization, lang }) {
        localization = { ...localization };
        config = await translateConfig({ config, defaultLang });

        for (const key in config[lang]) {
          const translate = config[lang][key];

          if (translate === undefined) {
            throw Error(`(${lang}): key "${key}" not found`);
          }

          localization[key] = translate;
        }

        return localization;
      },
    },

    rm: {
      logic({ localization, config }) {
        localization = { ...localization };

        for (const key in config[defaultLang]) {
          delete localization[key];
        }

        return localization;
      },
    },
  };

  const actionKey = args[0];
  const action = actions[actionKey];

  if (action === undefined)
    throw Error(
      `The argument can only be: ${Object.keys(actions)
        .map((e) => `"${e}"`)
        .join(" or ")} (without ")`
    );

  if (config.en === undefined) {
    throw Error(`"en" lang is required`);
  }

  const localizationFiles = fs.readdirSync(path.join(localizationFolderPath));

  for (const file of localizationFiles) {
    const lang = file.slice(0, 2);

    if (config[lang] === undefined) config[lang] = null;
  }

  for (const file of localizationFiles) {
    const lang = file.split(".")[0];
    const filePath = path.join(localizationFolderPath, file);

    try {
      const data = await action.logic({
        config,
        lang,
        localization: JSON.parse(fs.readFileSync(filePath).toString()),
      });

      fs.writeFileSync(filePath, JSON.stringify(data));
    } catch (e) {
      console.log(e);
    }
  }

  console.log(`${actionKey}: success`);
};
