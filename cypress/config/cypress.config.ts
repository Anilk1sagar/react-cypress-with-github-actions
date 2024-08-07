import { defineConfig } from "cypress";
import { config as dotenvConfig } from "dotenv";

dotenvConfig({ path: "../.env" });

export default defineConfig({
  experimentalMemoryManagement: true,
  retries: {
    runMode: 2,
  },
  reporter: "mochawesome",
  reporterOptions: {
    reportDir: "cypress/reports/mocha",
    reportFilename: "report-[datetime]",
    reportPageTitle: "Cypress Tests Report",
    timestamp: "longDate",
    inline: true,
    charts: true,
    // disable overwrite to generate many JSON reports
    overwrite: false,
    // do not generate intermediate HTML reports
    html: false,
    // generate intermediate JSON reports
    json: true,
  },
  e2e: {
    baseUrl: "http://localhost:3000",
    env: {
      testEnv: process.env.TEST_ENV,
    },
    setupNodeEvents(on, config) {
      //
    },
  },
});
