const fs = require("fs-extra");

const readJSONKeys = async (filePath) => {
  let keys = [];
  const buffer_data = fs.readFileSync(filePath);
  let keys_data = JSON.parse(buffer_data);
  for (var key in keys_data) {
    keys.push(key);
  }

  return keys;
};

module.exports = readJSONKeys;
