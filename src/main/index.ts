import { app, BrowserWindow, ipcMain, dialog, shell } from "electron";
import { join, basename } from "path";
import fs from "fs";
import { exec } from "child_process";
import { PythonShell } from "python-shell";
import fixPath from "fix-path";
// const { updateElectronApp } = require('update-electron-app');
// updateElectronApp();

let window: BrowserWindow | null = null;
let filePath: string | null = null;

const appPath = app.getAppPath();
const documentsPath = app.getPath("documents");
const reportPath = documentsPath + "/report.csv";
const logFilePath = join(app.getPath("userData"), "app.log");
const logStream = fs.createWriteStream(logFilePath, { flags: "a" });

console.log = function (message) {
  if (typeof message === "object") logStream.write(`${JSON.stringify(message)}\n`);
  else logStream.write(`${message}\n`);
};

console.error = function (message) {
  logStream.write("ERROR\n");
  if (typeof message === "object") logStream.write(`${JSON.stringify(message)}\n`);
  else logStream.write(`${message}\n`);
};

const createWindow = () => {
  window = new BrowserWindow({
    width: 1300,
    height: 950,
    minHeight: 780,
    minWidth: 1000,
    icon: join(__dirname, "icons/icon.icns"),
    webPreferences: {
      preload: join(__dirname, "preload.js")
    }
  });

  if (MAIN_WINDOW_VITE_DEV_SERVER_URL) {
    window.loadURL(MAIN_WINDOW_VITE_DEV_SERVER_URL);
  } else {
    window.loadFile(join(__dirname, `../renderer/${MAIN_WINDOW_VITE_NAME}/index.html`));
  }

  console.log("App Path:" + appPath);

  console.log("Path:" + process.env.PATH);
  console.log("About to run fixPath");
  fixPath();
  // process.env.PATH = '/usr/sbin';
  console.log("Path:" + process.env.PATH);

  return window;
};

app.on("ready", () => {
  createWindow();
});

// app.dock.setIcon(join(__dirname, '../..', 'icons', 'pinnacle-prep-logo.gif'));

ipcMain.handle("load-file", async () => {
  const result = await dialog.showOpenDialog(window!, {
    properties: ["openFile"],
    filters: [{ name: "CSVs", extensions: ["csv", "xls", "xlsx", "txt", "Numbers"] }]
  });

  if (result.canceled) return null;
  [filePath] = result.filePaths;
  return basename(filePath);
});

ipcMain.handle("run-analysis", (_, parameters) => {
  console.log(parameters);
  console.log(filePath);
  let parameterString = "";
  parameterString += parameters.years[0] + " " + parameters.years[1] + " ";
  parameterString += parameters.baseline[0] + " " + parameters.baseline[1] + " ";
  parameterString += parameters.sectionBaseline[0] + " " + parameters.sectionBaseline[1] + " ";
  parameterString += parameters.minTutoringHours + " ";
  parameterString += parameters.minTests + " ";
  parameterString += parameters.excludeWithoutBaseline + " ";
  parameterString += parameters.excludeIncomplete + " ";
  parameterString += parameters.remove + " ";
  parameterString += `"${parameters.name}"` + " ";
  parameterString += `"${filePath}"`;

  exec(
    `python "${appPath}/python/ScoreAnalysis_forElectron.py" ${parameterString} ${documentsPath}`,
    (err, stdout) => {
      if (err) {
        console.log(`output: ${stdout}`);
        console.error(`exec error: ${err}`);
      } else {
        console.log(`output: ${stdout}`);
      }
    }
  );
});

ipcMain.on("open-report", () => {
  shell.openPath(reportPath);
});

ipcMain.on("open-students", () => {
  shell.openPath(documentsPath + "/slice.txt");
});

ipcMain.on("clear-report", () => {
  fs.unlink(reportPath, (err) => {
    if (err) {
      console.error("Error deleting file:", err);
      return;
    }

    console.log("File deleted successfully");
  });
});
