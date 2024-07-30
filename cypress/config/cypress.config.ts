import { defineConfig } from "cypress";
import { config as dotenvConfig } from "dotenv";

dotenvConfig({ path: "../.env" });

export default defineConfig({
  experimentalMemoryManagement: true,
  retries: {
    runMode: 2,
  },
  reporter: "cypress-mochawesome-reporter",
  reporterOptions: {
    charts: true,
    reportPageTitle: "Cypress Tests Report",
    embeddedScreenshots: true,
    inlineAssets: true,
  },
  e2e: {
    baseUrl: "http://localhost:3000",
    env: {
      testEnv: process.env.TEST_ENV,
    },
    setupNodeEvents(on, config) {
      require("cypress-mochawesome-reporter/plugin")(on);
    },
  },
});
