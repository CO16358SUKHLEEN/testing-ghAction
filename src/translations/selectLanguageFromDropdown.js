// TODO: Move selectors to external conf files
const {
  inputTextDropdownButtonSelector,
  outputTextDropdownButtonSelector,
  inputLanguagesSelector,
  outputLanguagesSelector,
} = require("../config").elementSelectors;

const inputOutput = require("./inputOutput");

const selectLanguageFromDropdown = async (page, language, inputOrOutput) => {
  const dropdownButton = await page.$(
    inputOrOutput === inputOutput.input
      ? inputTextDropdownButtonSelector
      : outputTextDropdownButtonSelector
  );

  await dropdownButton.click();

  await page.$$eval(
    inputOrOutput === inputOutput.input
      ? inputLanguagesSelector
      : outputLanguagesSelector,
    (elements, language) => {
      const element = elements.find(
        (element) => element.innerHTML === language
      );
      element.click();
    },
    language
  );
};

module.exports = selectLanguageFromDropdown;
