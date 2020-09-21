const jsonfile = require("jsonfile");
const mkdirp = require("mkdirp");

const writeJSONKeys = async (outputDir, fileName, translatedDict) => {
  await mkdirp(outputDir);
  jsonfile.writeFile(`${outputDir}/${fileName}`, translatedDict, (err) => {
    if (err) {
      console.error(err);
      throw err;
    }
  });
};

module.exports = writeJSONKeys;
