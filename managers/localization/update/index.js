const path = require("path");
const fs = require("fs");

module.exports = function update({ args = [], localizationFolderPath = "" }) {
  const currentFolderPath = __dirname;
  const type = require(path.join(currentFolderPath, "type.js"));
  const config = require(path.join(currentFolderPath, "config.js"));
  const actions = {
    add: {
      logic({ config, localization, lang }) {
        localization = { ...localization };

        switch (config.type) {
          case type.Inline: {
            for (const key in config.data) {
              const translate = config.data[key][lang];

              if (translate === undefined) {
                throw Error(`(${lang}): key "${key}" not found`);
              }

              localization[key] = translate;
            }

            return localization;
          }

          case type.Mult: {
            for (const key in config.data[lang]) {
              const translate = config.data[lang][key];

              if (translate === undefined) {
                throw Error(`(${lang}): key "${key}" not found`);
              }

              localization[key] = translate;
            }

            return localization;
          }
        }
      },
    },

    rm: {
      logic({ localization, config }) {
        localization = { ...localization };

        for (const key in config.data) {
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

  if (Object.values(type).includes(config.type) === false)
    throw Error(
      `"${config.type}" is an invalid type (${path.join(
        currentFolderPath,
        "config.js"
      )})\n\nValid types: ${Object.keys(type).join(" or ")}`
    );

  const localizationFiles = fs.readdirSync(path.join(localizationFolderPath));

  for (const file of localizationFiles) {
    const lang = file.split(".")[0];
    const filePath = path.join(localizationFolderPath, file);

    try {
      const localization = action.logic({
        config,
        lang,
        localization: JSON.parse(fs.readFileSync(filePath).toString()),
      });

      fs.writeFileSync(filePath, JSON.stringify(localization));
    } catch (e) {
      console.log(e);
    }
  }

  console.log(`${actionKey}: success`);
};
