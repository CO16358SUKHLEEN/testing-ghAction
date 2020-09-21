const inputTextInputFieldSelector = require("../config").elementSelectors
  .inputTextInputFieldSelector;

const inputInputText = async (page, text) => {
  await page.$eval(
    inputTextInputFieldSelector,
    (el, text) => (el.value = text),
    text
  );
};

module.exports = inputInputText;
