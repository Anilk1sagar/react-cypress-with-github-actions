// ***********************************************************
// This example support/e2e.ts is processed and
// loaded automatically before your test files.
//
// This is a great place to put global configuration and
// behavior that modifies Cypress.
//
// You can change the location of this file or turn off
// automatically serving support files with the
// 'supportFile' configuration option.
//
// You can read more here:
// https://on.cypress.io/configuration
// ***********************************************************

// Import commands.js using ES2015 syntax:
// Alternatively you can use CommonJS syntax:
// require('./commands')

import * as addContext from "mochawesome/addContext";
import { Context } from "mocha";
import "./commands";

/**
 * Attach screenshots to the tests report
 */
Cypress.on("test:after:run", (test, runnable) => {
  const testCtx = { test } as Context;

  // Add screenshots to tests report
  if (test.state === "failed") {
    // Construct the screenshot file name
    const screenshotFileNames = [
      `${runnable.parent.title} -- ${test.title} (failed).png`,
      `${runnable.parent.title} -- ${test.title} (failed) (attempt 2).png`,
      `${runnable.parent.title} -- ${test.title} (failed) (attempt 3).png`,
    ];

    // Construct the screenshot file path and add to context
    screenshotFileNames.forEach((screenshotFileName) => {
      const screenshotFilePath = `./assets/screenshots/${Cypress.spec.name}/${screenshotFileName}`;
      addContext(testCtx, screenshotFilePath);
    });
  }
});
