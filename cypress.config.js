const { defineConfig } = require("cypress");

module.exports = defineConfig({
  video: false,
  chromeWebSecurity: false,
  downloadsFolder: "C:\\Users\\dmonaldi\\Downloads\\",
  reporter: 'cypress-mochawesome-reporter',
  reporterOptions: {
    charts: true,
    reportPageTitle: 'SIGMA E2E Test report',
  },
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
      require('cypress-mochawesome-reporter/plugin')(on);
    },
  },
});
