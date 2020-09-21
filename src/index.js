const puppeteer = require("puppeteer");
const Spinner = require('cli-spinner').Spinner;

const selectLanguageFromDropdown = require("./translations")
  .selectLanguageFromDropdown;
const inputOutput = require("./translations").inputOutput;
const getTranslations = require("./translations").getTranslations;
const readJSONkeys = require("./filesystem").readJSONKeys;
const writeJSONKeys = require("./filesystem").writeJSONKeys;
const inputFile = require("../translation-config").inputFile;
const outputDir = require("../translation-config").outputDir
const outputLanguages = require("../translation-config").outputLanguages
const INPUT_LANG = require("../translation-config").inputLang;
const NAMESPACE = require("../translation-config").NAMESPACE;
const lang = require("./LanguagesEnum/LanguagesEnum")

const main = async () => {
  const spinner = new Spinner('processing.. %s');
  spinner.setSpinnerString('|/-\\');
  const browser = await puppeteer.launch({
    headless: false,
    args: ["--start-maximized"],
  });
  const page = await browser.newPage();
  
  await page.goto("https://translate.google.com/");
  spinner.start();
  const keys = await readJSONkeys(inputFile);
    for (let language of outputLanguages) {
      let OutputDir = outputDir.replace("$LOCALE", language)
      await selectLanguageFromDropdown(page, INPUT_LANG, inputOutput.input);
      await selectLanguageFromDropdown(page, lang[language], inputOutput.output);
      const translatedDict = await getTranslations(page, keys);
      await writeJSONKeys(OutputDir, `${NAMESPACE}.json`, translatedDict).then(() => {
        console.log(" ",lang[language], "translation created")
      });
    }
  spinner.stop(true);
  await page.close();
  await browser.close();
};

main();
