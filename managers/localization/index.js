const path = require("path");

(async () => {
  const currentFolderPath = __dirname;
  const localizationFolderPath = path.join(
    currentFolderPath,
    "..",
    "..",
    "db",
    "localization"
  );

  const actions = {
    update: {
      logic: require(path.join(currentFolderPath, "update")),
    },
    new: {
      logic: require(path.join(currentFolderPath, "new")),
    },
  };

  const actionKey = process.argv.slice(2)[0];
  const action = actions[actionKey];

  if (action === undefined)
    throw Error(
      `The argument can only be: ${Object.keys(actions)
        .map((e) => `"${e}"`)
        .join(" or ")} (without ")`
    );

  await action.logic({ localizationFolderPath, args: process.argv.slice(3) });
})();
