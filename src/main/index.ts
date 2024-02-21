import { app, BrowserWindow, ipcMain, dialog, shell } from 'electron';
import { join, basename } from 'path';
import { exec } from 'child_process';

let window: BrowserWindow | null = null;
let filePath: string | null = null;

const documentsPath = app.getPath('documents');
const reportPath = documentsPath + '/report.csv';

const createWindow = () => {
  window = new BrowserWindow({
    width: 1300,
    height: 800,
    minHeight: 780,
    minWidth: 1000,
    webPreferences: {
      preload: join(__dirname, 'preload.js'),
    },
  });

  if (MAIN_WINDOW_VITE_DEV_SERVER_URL) {
    window.loadURL(MAIN_WINDOW_VITE_DEV_SERVER_URL);
  } else {
    window.loadFile(
      join(__dirname, `../renderer/${MAIN_WINDOW_VITE_NAME}/index.html`)
    );
  }

  return window;
};

app.on('ready', () => {
  createWindow();
});

// app.dock.setIcon(join(__dirname, '../..', 'icons', 'pinnacle-prep-logo.gif'));

ipcMain.handle('load-file', async () => {
  const result = await dialog.showOpenDialog(window!, {
    properties: ['openFile'],
    filters: [
      { name: 'CSVs', extensions: ['csv', 'xls', 'xlsx', 'txt', 'Numbers'] },
    ],
  });

  if (result.canceled) return null;
  [filePath] = result.filePaths;
  return basename(filePath);
});

ipcMain.handle('run-analysis', (_, parameters) => {
  console.log(parameters);
  console.log(filePath);
  let parameterString = '';
  parameterString += parameters.years[0] + ' ' + parameters.years[1] + ' ';
  parameterString +=
    parameters.baseline[0] + ' ' + parameters.baseline[1] + ' ';
  parameterString +=
    parameters.sectionBaseline[0] + ' ' + parameters.sectionBaseline[1] + ' ';
  parameterString += parameters.minTutoringHours + ' ';
  parameterString += parameters.minTests + ' ';
  parameterString += parameters.excludeWithoutBaseline + ' ';
  parameterString += parameters.excludeIncomplete + ' ';
  parameterString += `"${parameters.name}"` + ' ';
  parameterString += `"${filePath}"`;

  exec(
    `python python/ScoreAnalysis_forElectron.py ${parameterString} ${reportPath}`,
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

ipcMain.on('open-report', () => {
  shell.openPath(reportPath);
});
