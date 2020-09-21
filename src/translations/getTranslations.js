const inputInputText = require("./inputInputText");
const getOutputText = require("./getOutputText");

const getTranslations = async (page, keys) => {
  let translatedDict = {};

  for (let key of keys) {
    await inputInputText(page, key);
    await new Promise((resolve) => setTimeout(resolve, 2000));
    translatedDict[key] = await getOutputText(page);
  }

  return translatedDict;
};

module.exports = getTranslations;
