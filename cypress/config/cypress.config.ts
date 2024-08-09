import { defineConfig } from "cypress";
import { config as dotenvConfig } from "dotenv";
import { mergeAndGenerateReport } from "support/scripts/generate-report";
import * as fs from "fs";
import * as path from "path";

dotenvConfig({ path: "../.env" });

export default defineConfig({
  experimentalMemoryManagement: true,
  retries: {
    runMode: 2,
  },
  reporter: "mochawesome",
  reporterOptions: {
    reportDir: "cypress/reports/mocha",
    overwrite: false, // disable overwrite to generate many JSON reports
    html: false, // do not generate intermediate HTML reports
    json: true, // generate intermediate JSON reports
  },
  e2e: {
    baseUrl: "http://localhost:3000",
    env: {
      testEnv: process.env.TEST_ENV,
    },
    setupNodeEvents(on, config) {
      on("before:run", (_runDetails) => {
        // Remove the reports directory before running the tests
        fs.rmSync(path.resolve(__dirname, "../reports"), { recursive: true, force: true });
      });

      on("after:run", async (results) => {
        if (results) {
          mergeAndGenerateReport();
        }
      });
    },
  },
});
