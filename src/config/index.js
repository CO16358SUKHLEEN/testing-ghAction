module.exports = {
  elementSelectors: {
    outputTextSelector: "div.result-shield-container.tlid-copy-target > span.tlid-translation.translation",
    inputTextInputFieldSelector: ".tlid-source-text-input",
    inputTextDropdownButtonSelector:
      "body > div.container > div.frame > div.page.tlid-homepage.homepage.translate-text > div.homepage-content-wrap > div.tlid-source-target.main-header > div.source-target-row > div.tlid-input.input > div.tlid-language-bar.ls-wrap > div.sl-wrap > div.sl-more.tlid-open-source-language-list",
    outputTextDropdownButtonSelector:
      "body > div.container > div.frame > div.page.tlid-homepage.homepage.translate-text > div.homepage-content-wrap > div.tlid-source-target.main-header > div.source-target-row > div.tlid-input.input > div.tlid-language-bar.ls-wrap > div.tl-wrap > div.tl-more.tlid-open-target-language-list",
    inputLanguagesSelector:
      ".language-list-unfiltered-langs-sl_list > * .language_list_item_language_name",
    outputLanguagesSelector:
      ".language-list-unfiltered-langs-tl_list > * .language_list_item_language_name",
  },
};
