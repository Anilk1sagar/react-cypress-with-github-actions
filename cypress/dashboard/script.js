function getReportsFolders() {
  return fetch("./reports/e2e/tests-list.json")
    .then((response) => response.json())
    .catch((error) => console.error("Error fetching JSON:", error));
}

async function getReportsData() {
  const folders = await getReportsFolders();

  const fetchPromises = folders.map((folder) => {
    return fetch(`./reports/e2e/${folder}/report.json`)
      .then((response) => response.json())
      .then((data) => ({ folder, data })); // Return both folder name and data
  });

  let reportsData = await Promise.allSettled(fetchPromises);

  reportsData = reportsData.filter((item) => item.status === "fulfilled").map((item) => item.value);

  // Sort reports recent to oldest
  reportsData.sort((a, b) => b.folder.localeCompare(a.folder));

  return reportsData.slice(0, 10);
}

function formatDuration(ms) {
  let seconds = Math.floor((ms / 1000) % 60);
  let minutes = Math.floor((ms / (1000 * 60)) % 60);
  let hours = Math.floor((ms / (1000 * 60 * 60)) % 24);

  let formattedTime = "";

  if (hours > 0) {
    formattedTime += hours + "h ";
  }
  if (minutes > 0) {
    formattedTime += minutes + "m ";
  }
  if (seconds > 0 || (hours === 0 && minutes === 0)) {
    // Show seconds if they are > 0, or if both hours and minutes are 0
    formattedTime += seconds + "s ";
  }

  return formattedTime.trim();
}

function getFormattedDateTime(utcDate) {
  const date = new Date(utcDate);

  const dateOptions = {
    timeZone: "Asia/Kolkata",
    year: "numeric",
    month: "short",
    day: "numeric",
  };

  const timeOptions = {
    timeZone: "Asia/Kolkata",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: false, // Use 24-hour format
  };

  // Format the date and time separately
  const formattedDate = new Intl.DateTimeFormat("en-IN", dateOptions).format(date);
  const formattedTime = new Intl.DateTimeFormat("en-IN", timeOptions).format(date);

  // Combine the date and time, and append "IST"
  const formattedIST = `${formattedDate} (${formattedTime} IST)`;

  return formattedIST;
}

function renderReportsChart(reports) {
  let reportsData = [...reports];
  reportsData = reportsData.reverse();

  const xAxisData = reportsData.map((report) => {
    const date = new Date(report.data.stats.end);

    const formattedDate = new Intl.DateTimeFormat("en-IN", {
      timeZone: "Asia/Kolkata",
      year: "numeric",
      month: "numeric",
      day: "numeric",
    }).format(new Date(date));

    const formattedTime = new Intl.DateTimeFormat("en-IN", {
      timeZone: "Asia/Kolkata",
      hour: "2-digit",
      minute: "2-digit",
      hour12: false, // Use 24-hour format
    }).format(new Date(date));

    return `${formattedDate} (${formattedTime} IST)`;
  });

  const trace1YData = reportsData.map((report) => report.data.stats.passes);
  const trace2YData = reportsData.map((report) => report.data.stats.failures);

  const trace1 = {
    x: xAxisData,
    y: trace1YData,
    name: "Passing",
    type: "bar",
    marker: {
      color: "#198753",
    },
    width: 0.3,
  };

  const trace2 = {
    x: xAxisData,
    y: trace2YData,
    name: "Failing",
    type: "bar",
    marker: {
      color: "#DC3444",
    },
    width: 0.3,
  };

  const data = [trace1, trace2];

  const config = {
    responsive: true,
  };

  const layout = {
    barmode: "stack",
  };

  setTimeout(function () {
    Plotly.newPlot("reports-chart", data, layout, config);
  }, 100);
}

function renderLastRunReport(report) {
  const { stats } = report;

  document.getElementById("last-run-passing").textContent = stats.passes;
  document.getElementById("last-run-failing").textContent = stats.failures;
  document.getElementById("last-run-duration").textContent = formatDuration(stats.duration);
  document.getElementById("last-run-end").textContent = getFormattedDateTime(stats.end);
}

function renderReportsList(reportsData) {
  const reportsList = document.getElementById("reports-list");
  const reportCard = document.getElementById("report-card");

  reportsData.forEach((report, index) => {
    const { folder, data } = report;
    const { stats } = data;

    // Clone report card element
    const clonedReportCard = reportCard.cloneNode(true);
    if (index === 0) {
      reportsList.innerHTML = "";
    }

    // Attach report card to list
    reportsList.appendChild(clonedReportCard);

    // Add end date time to the report card
    const runEnd = document.getElementById("run-end");
    runEnd.setAttribute("id", `run-end-${index}`);
    runEnd.textContent = getFormattedDateTime(stats.end);

    // Update view report button url in the report card
    const viewReportBtn = document.getElementById("view-report-btn");
    viewReportBtn.setAttribute("id", `run-end-${index}`);
    viewReportBtn.setAttribute("href", `./reports/e2e/${folder}`);

    // Add passing to the report card
    const runPassing = document.getElementById("run-passing");
    runPassing.setAttribute("id", `run-passing-${index}`);
    runPassing.textContent = stats.passes;

    // Add failing to the report card
    const runFailing = document.getElementById("run-failing");
    runFailing.setAttribute("id", `run-failing-${index}`);
    runFailing.textContent = stats.failures;

    // Add run duration to the report card
    const runDuration = document.getElementById("run-duration");
    runDuration.setAttribute("id", `run-duration-${index}`);
    runDuration.textContent = formatDuration(stats.duration);
  });
}

async function main() {
  const reportsData = await getReportsData();
  console.log("reportsData: ", reportsData);

  // Render reports chart
  renderReportsChart(reportsData);

  // Render last run report data
  renderLastRunReport(reportsData[0].data);

  // Render reports history list
  renderReportsList(reportsData);

  // Hide reports loader and show reports data
  setTimeout(() => {
    document.getElementById("reports-loader").classList.add("d-none");
    document.getElementById("main-content").classList.remove("d-none");
  }, 200);
}

main();
