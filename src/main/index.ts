import { app, BrowserWindow, ipcMain, dialog } from 'electron';
import { join, basename } from 'path';

let window: BrowserWindow | null = null;
let filePath: string | null = null;

const createWindow = () => {
  window = new BrowserWindow({
    width: 1300,
    height: 1000,
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

ipcMain.on('run-analysis', (_, parameters) => {
  console.log(parameters);
  console.log(filePath);
});
