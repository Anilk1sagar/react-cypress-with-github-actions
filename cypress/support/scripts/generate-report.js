const { merge } = require("mochawesome-merge");
const marge = require("mochawesome-report-generator");
const fs = require("fs");
const fs2 = require("fs-extra");
const path = require("path");

function copyTestsAssets() {
  // Copy tests screenshots
  const src = path.resolve(__dirname, "../../screenshots");
  const dest = path.resolve(__dirname, "../../reports/assets/screenshots");

  if (fs.existsSync(src)) {
    fs2.copySync(src, dest, { overwrite: true, errorOnExist: false });
    console.log(`Copied from ${src} to ${dest}`);
  }
}

async function mergeJsonReports() {
  const jsonDir = path.resolve(__dirname, "../../reports/mocha");
  const mergedReportPath = path.resolve(__dirname, "../../reports/report.json");

  const jsonReport = await merge({
    files: [`${jsonDir}/*.json`],
  });

  // Write the merged JSON report to a file
  fs.writeFileSync(mergedReportPath, JSON.stringify(jsonReport, null, 2));

  // Remove temp mocha directory
  fs.rmSync(path.resolve(__dirname, "../../reports/mocha"), { recursive: true, force: true });

  return jsonReport;
}

async function mergeAndGenerateReport() {
  // Copy tests assets
  copyTestsAssets();

  try {
    const jsonReport = await mergeJsonReports();

    // Generate the HTML report from the merged JSON report
    await marge.create(jsonReport, {
      reportDir: path.resolve(__dirname, "../../reports"),
      reportFilename: "index",
      reportPageTitle: "Cypress Tests Report",
      inline: true,
      charts: true,
    });
  } catch (err) {
    console.error("Failed to merge, generate reports or copy assets", err);
  }
}

module.exports = { mergeAndGenerateReport };
