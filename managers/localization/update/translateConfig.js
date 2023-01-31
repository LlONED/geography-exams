const translate = require("../../translate");
const concatWordPerN = require("../../translate/concatWordPerN");

module.exports = async function translateConfig({ config, defaultLang }) {
  for (const lang in config) {
    if (config[lang] !== null) continue;
    config[lang] = {};

    const sourceConfig = config[defaultLang];

    const configKeys = Object.keys(sourceConfig);
    const configValues = (
      await translate({
        lang,
        data: concatWordPerN(sourceConfig),
      })
    ).flat();

    for (let i = 0; i < configValues.length; i++) {
      config[lang][configKeys[i]] = configValues[i];
    }
  }

  return config;
};
