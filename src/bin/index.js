#!/usr/bin/env node
const puppeteer = require("puppeteer");
const path = require("path");
const Spinner = require("cli-spinner").Spinner;
const selectLanguageFromDropdown = require("../translations")
  .selectLanguageFromDropdown;
const inputOutput = require("../translations").inputOutput;
const getTranslations = require("../translations").getTranslations;
const readJSONkeys = require("../filesystem").readJSONKeys;
const writeJSONKeys = require("../filesystem").writeJSONKeys;
const fetchConfig = require("./cli");
const lang = require("../LanguagesEnum/LanguagesEnum");

const main = async () => {
  const config = await fetchConfig();
  const inputFile = path.join(process.cwd(), config.inputFile);
  const outputDir = path.join(process.cwd(), config.outputDir);
  const outputLanguages = config.outputLanguages;
  const INPUT_LANG = config.inputLang;
  const NAMESPACE = config.NAMESPACE;
  const spinner = new Spinner("processing.. %s");
  spinner.setSpinnerString("|/-\\");
  const browser = await puppeteer.launch({
    headless: false,
    args: ["--start-maximized"],
  });
  const page = await browser.newPage();

  await page.goto("https://translate.google.com/");
  spinner.start();
  const keys = await readJSONkeys(inputFile);
  for (let language of outputLanguages) {
    let OutputDir = outputDir.replace("$LOCALE", language);
    await selectLanguageFromDropdown(page, INPUT_LANG, inputOutput.input);
    await selectLanguageFromDropdown(page, lang[language], inputOutput.output);
    const translatedDict = await getTranslations(page, keys);
    await writeJSONKeys(OutputDir, `${NAMESPACE}.json`, translatedDict).then(
      () => {
        console.log(" ", lang[language], "translation created");
      }
    );
  }
  spinner.stop(true);
  console.clear();
  await page.close();
  await browser.close();
};

main();
