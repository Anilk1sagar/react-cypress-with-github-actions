function getReportsFolders() {
  return fetch("./reports/e2e/tests-list.json")
    .then((response) => response.json())
    .catch((error) => console.error("Error fetching JSON:", error));
}

function getReportsFoldersData(folders) {
  const fetchPromises = folders.map((folder) => {
    return fetch(`./reports/e2e/${folder}/report.json`)
      .then((response) => response.json())
      .then((data) => ({ folder, data })); // Return both folder name and data
  });

  return Promise.all(fetchPromises);
}

async function fetchAndRenderReports() {
  const folders = await getReportsFolders();
  const foldersData = await getReportsFoldersData(folders);

  console.log("foldersData: ", foldersData);
}

fetchAndRenderReports();
