const fs = require("fs-extra");
const path = require("path");

// Function to copy directory contents preserving structure and names
const copyDirectory = async (src, dest) => {
  try {
    await fs.copy(src, dest, { overwrite: true, errorOnExist: false });
    console.log(`Copied from ${src} to ${dest}`);
  } catch (err) {
    console.error(`Error copying from ${src} to ${dest}:`, err);
  }
};

// Copy tests screenshots
const src = path.resolve(__dirname, "../../screenshots");
const dest = path.resolve(__dirname, "../../reports/assets/screenshots");
copyDirectory(src, dest);
