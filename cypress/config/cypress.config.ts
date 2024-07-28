import { defineConfig } from "cypress";
import { config as dotenvConfig } from "dotenv";

dotenvConfig({ path: "../.env" });

export default defineConfig({
  experimentalMemoryManagement: true,
  retries: {
    runMode: 2,
  },
  e2e: {
    baseUrl: "http://localhost:3000",
    env: {
      testEnv: process.env.TEST_ENV,
    },
  },
});
