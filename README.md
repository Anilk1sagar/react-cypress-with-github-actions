# Getting Started with Create React App

In the project directory, you can run:

### `API_URL=https://jsonplaceholder.typicode.com/ npm run start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

## Merge and generate cypress tests report with npm scripts

`npm i npm-run-all -D`

"cy:run": "cypress run --browser chrome --config-file ./cypress/config/cypress.config.ts",
"merge-cy:reports": "mochawesome-merge cypress/reports/mocha/\*.json > cypress/reports/report.json && rm -R -f cypress/reports/mocha",
"generate-cy:report": "marge cypress/reports/report.json -f report -i -o cypress/reports",
"pre-test-e2e": "rm -R -f cypress/reports",
"post-test-e2e": "npm run merge-cy:reports && npm run generate-cy:report && node cypress/support/scripts/copy-assets.js",
"test-e2e": "run-s -c pre-test-e2e cy:run post-test-e2e",
"test-e2e-gui": "run-s -c pre-test-e2e 'cy:run -- --headed' post-test-e2e",

spec: |
cypress/e2e/general/general.cy.ts
cypress/e2e/create-dataset-flow/create-dataset-kafka/create-dataset-kafka.cy.ts
